'use client'

import { usePathname, useRouter } from 'next/navigation'
import Dock, { DockItemData } from './Dock'
import { Home, Briefcase, FileText, Users, Send } from 'lucide-react'

export default function GlobalDockNav() {
  const router = useRouter()
  const pathname = usePathname()

  const items: DockItemData[] = [
    {
      icon: <Home size={20} />,
      label: 'Home',
      active: pathname === '/',
      onClick: () => router.push('/'),
    },
    {
      icon: <Briefcase size={20} />,
      label: 'Works',
      active: pathname === '/work',
      onClick: () => router.push('/work'),
    },
    {
      icon: <FileText size={20} />,
      label: 'Case Studies',
      active: pathname.startsWith('/case-studies'),
      onClick: () => router.push('/case-studies'),
    },
    {
      icon: <Users size={20} />,
      label: 'Founders',
      active: pathname === '/founders',
      onClick: () => router.push('/founders'),
    },
    { separator: true },
    {
      icon: <Send size={20} />,
      label: 'Inquire',
      active: pathname === '/inquire',
      badge: '★',
      onClick: () => router.push('/inquire'),
    },
  ]

  return (
    <div className="fixed bottom-3 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto shadow-2xl">
        <Dock
          items={items}
          position="bottom"
          theme="dark"
          baseItemSize={46}
          magnification={66}
          panelHeight={62}
          gap={10}
          roundness={0.6}
          bounce={true}
          accentColor="#ff5b1f"
          badgeColor="#ff5b1f"
        />
      </div>
    </div>
  )
}

