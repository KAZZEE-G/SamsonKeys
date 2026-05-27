'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const NAV = [
  { href: '/admin',              label: 'Dashboard' },
  { href: '/admin/listings',     label: 'Listings' },
  { href: '/admin/ads',          label: 'Ads' },
  { href: '/admin/applications', label: 'Applications' },
  { href: '/admin/messages',     label: 'Messages' },
]

export default function AdminNav({ user }: { user?: { name?: string | null; email?: string | null } }) {
  const path = usePathname()

  return (
    <aside style={{ width: '220px', background: 'var(--surface)', borderRight: '1px solid var(--border)', padding: '2rem 0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div style={{ padding: '0 1.5rem 2rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'baseline', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '16px' }}>
          <span style={{ color: '#fff' }}>Samson</span>
          <span style={{ color: '#000', background: '#fff', padding: '0 3px', marginLeft: '2px' }}>Keys</span>
        </span>
        <p style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: '6px' }}>Admin</p>
      </div>

      <nav style={{ flex: 1, padding: '0 1rem' }}>
        {NAV.map(({ href, label }) => {
          const active = href === '/admin' ? path === '/admin' : path.startsWith(href)
          return (
            <Link key={href} href={href} style={{
              display: 'block', padding: '9px 12px', marginBottom: '2px',
              fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em',
              textTransform: 'uppercase', textDecoration: 'none',
              color: active ? '#fff' : 'rgba(255,255,255,0.35)',
              background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
              borderLeft: active ? '1px solid #fff' : '1px solid transparent',
              transition: 'all 0.15s',
            }}>
              {label}
            </Link>
          )
        })}
      </nav>

      <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <p style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.4)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</p>
        <p style={{ fontSize: '9px', fontWeight: 300, color: 'rgba(255,255,255,0.18)', marginBottom: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</p>
        <button onClick={() => signOut({ callbackUrl: '/admin/login' })} style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', background: 'none', border: '1px solid var(--border)', padding: '6px 12px', cursor: 'pointer' }}>
          Sign out
        </button>
      </div>
    </aside>
  )
}
