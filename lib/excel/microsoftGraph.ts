import { InquiryRow } from '@/lib/supabase/server'

interface TokenResponse {
  access_token: string
  expires_in: number
  token_type: string
}

let cachedToken: string | null = null
let tokenExpiryTime = 0

/**
 * Obtains an OAuth 2.0 client credentials access token for Microsoft Graph.
 * Supports token caching and renewal before expiration.
 */
async function getMicrosoftGraphAccessToken(): Promise<string> {
  const tenantId = process.env.MICROSOFT_TENANT_ID
  const clientId = process.env.MICROSOFT_CLIENT_ID
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error('Missing Microsoft Graph configuration: TENANT_ID, CLIENT_ID, or CLIENT_SECRET is not set.')
  }

  const now = Date.now()
  if (cachedToken && now < tokenExpiryTime - 60000) {
    return cachedToken
  }

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`
  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('client_secret', clientSecret)
  params.append('grant_type', 'client_credentials')
  params.append('scope', 'https://graph.microsoft.com/.default')

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Microsoft Graph token request failed: ${res.status} ${errorText}`)
  }

  const data = (await res.json()) as TokenResponse
  cachedToken = data.access_token
  tokenExpiryTime = now + data.expires_in * 1000

  return cachedToken
}

/**
 * Ensures the target table exists inside the OneDrive Excel workbook.
 * Table Name: 'Inquiries'
 * Columns:
 * 1. Inquiry ID
 * 2. Date
 * 3. Client Name
 * 4. Business Name
 * 5. Email
 * 6. Phone
 * 7. Service
 * 8. Budget
 * 9. Pricing Preference
 * 10. Project Description
 * 11. Status
 */
async function ensureExcelTableExists(accessToken: string, driveId: string, itemId: string, tableName: string) {
  const checkUrl = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/workbook/tables/${tableName}`

  const checkRes = await fetch(checkUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (checkRes.ok) {
    return // Table already exists
  }

  // If table does not exist (404), create it over the initial range A1:K1
  const createUrl = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/workbook/tables/add`
  const body = {
    address: 'A1:K1',
    hasHeaders: true,
  }

  const createRes = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!createRes.ok) {
    const err = await createRes.text()
    throw new Error(`Failed to create Excel table "${tableName}": ${err}`)
  }

  // Rename to configured table name and name header columns
  const createdData = await createRes.json()
  const tableId = createdData.id

  await fetch(`https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/workbook/tables/${tableId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: tableName }),
  })

  const headers = [
    'Inquiry ID',
    'Date',
    'Client Name',
    'Business Name',
    'Email',
    'Phone',
    'Service',
    'Budget',
    'Pricing Preference',
    'Project Description',
    'Status',
  ]

  // Set header values
  await fetch(
    `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/workbook/tables/${tableName}/headerRowRange`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [headers] }),
    }
  )
}

/**
 * Checks if the inquiry row with the given UUID already exists in the Excel table.
 * Guarantees idempotency and prevents duplicate row insertion during retries.
 */
async function isRowAlreadyInExcel(
  accessToken: string,
  driveId: string,
  itemId: string,
  tableName: string,
  inquiryId: string
): Promise<boolean> {
  const rowsUrl = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/workbook/tables/${tableName}/rows?$top=500`

  const res = await fetch(rowsUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    return false
  }

  const data = await res.json()
  if (Array.isArray(data.value)) {
    return data.value.some((row: { values?: unknown[][] }) => {
      const firstCol = row.values?.[0]?.[0]
      return String(firstCol).trim() === inquiryId
    })
  }

  return false
}

/**
 * Appends an inquiry row to the OneDrive Excel workbook table.
 * Idempotent: Skips insertion if inquiry ID already exists in the table.
 */
export async function appendInquiryToExcel(inquiry: InquiryRow): Promise<{ success: boolean; error?: string }> {
  const driveId = process.env.MICROSOFT_DRIVE_ID
  const itemId = process.env.MICROSOFT_WORKBOOK_ITEM_ID
  const tableName = process.env.MICROSOFT_EXCEL_TABLE_NAME || 'Inquiries'

  if (!driveId || !itemId) {
    return {
      success: false,
      error: 'Missing Microsoft Graph environment: MICROSOFT_DRIVE_ID or MICROSOFT_WORKBOOK_ITEM_ID is not configured.',
    }
  }

  try {
    const accessToken = await getMicrosoftGraphAccessToken()

    await ensureExcelTableExists(accessToken, driveId, itemId, tableName)

    const alreadyPresent = await isRowAlreadyInExcel(accessToken, driveId, itemId, tableName, inquiry.id)
    if (alreadyPresent) {
      return { success: true }
    }

    const rowValues = [
      [
        inquiry.id,
        new Date(inquiry.created_at).toISOString(),
        inquiry.full_name,
        inquiry.business_name || '',
        inquiry.email,
        inquiry.phone,
        inquiry.service_type,
        inquiry.budget || '',
        inquiry.pricing_preference || '',
        inquiry.project_description,
        inquiry.status,
      ],
    ]

    const appendUrl = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/workbook/tables/${tableName}/rows/add`

    const appendRes = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: rowValues }),
    })

    if (!appendRes.ok) {
      const err = await appendRes.text()
      return { success: false, error: `Excel append error (${appendRes.status}): ${err}` }
    }

    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return { success: false, error: msg }
  }
}

