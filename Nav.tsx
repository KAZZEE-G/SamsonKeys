'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SamsonKeysLogo({ size = 17 }: { size?: number }) {
  return (
    <span className="sk-logo" style={{ fontSize: `${size}px` }}>
      <span className="sk-samson">Samson</span>
      <span className="sk-keys">Keys</span>
    </span>
  )
}

export { SamsonKeysLogo }

export default function Nav() {
  const path = usePathname()

  const links = [
    { href: '/', label: 'Collection' },
    { href: '/about', label: 'About' },
    { href: '/apply', label: 'Submit Work' },
    { href: '/contact', label: 'Contact', cta: true },
  ]

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2.5rem', height: '62px',
      background: 'rgba(0,0,0,0.97)',
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(16px)',
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <SamsonKeysLogo size={18} />
      </Link>
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {links.map(({ href, label, cta }) => (
          <Link key={href} href={href} style={{
            fontSize: '10px', fontWeight: 300, letterSpacing: '0.28em',
            textTransform: 'uppercase', textDecoration: 'none',
            color: cta ? '#000' : path === href ? '#fff' : 'var(--muted)',
            background: cta ? '#fff' : 'transparent',
            border: cta ? 'none' : 'none',
            padding: cta ? '8px 16px' : '0',
            transition: 'all 0.2s',
          }}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
