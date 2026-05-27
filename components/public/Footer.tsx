import Link from 'next/link'
import { SamsonKeysLogo } from './Nav'

export default function Footer() {
  return (
    <footer style={{
      background: '#000',
      borderTop: '1px solid var(--border)',
      padding: '3rem 2.5rem 2rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <SamsonKeysLogo size={15} />
      <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.12em', color: 'var(--muted)' }}>
        &copy; {new Date().getFullYear()} Samson Keys. All rights reserved.
      </span>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {['Privacy', 'Terms'].map(t => (
          <Link key={t} href="#" style={{
            fontSize: '10px', fontWeight: 300, letterSpacing: '0.12em',
            color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s',
          }}>{t}</Link>
        ))}
        <Link href="/contact" style={{
          fontSize: '10px', fontWeight: 300, letterSpacing: '0.12em',
          color: 'var(--muted)', textDecoration: 'none',
        }}>Contact</Link>
      </div>
    </footer>
  )
}
