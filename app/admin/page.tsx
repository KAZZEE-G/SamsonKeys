import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [{ count: listingsCount }, { count: appsCount }, { count: msgsCount }] = await Promise.all([
    supabaseAdmin.from('listings').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabaseAdmin.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabaseAdmin.from('contact_messages').select('*', { count: 'exact', head: true }),
  ])

  const cards = [
    { label: 'Active listings', value: listingsCount ?? 0, href: '/admin/listings', cta: 'Manage listings' },
    { label: 'Pending applications', value: appsCount ?? 0, href: '/admin/applications', cta: 'Review applications' },
    { label: 'Contact messages', value: msgsCount ?? 0, href: '/admin/messages', cta: 'Read messages' },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 300, color: 'var(--bone)', marginBottom: '2.5rem' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px', marginBottom: '3rem' }}>
        {cards.map(({ label, value, href, cta }) => (
          <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem' }}>
            <p style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}>{label}</p>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: 300, color: 'var(--bone)', lineHeight: 1, marginBottom: '1.5rem' }}>{value}</p>
            <Link href={href} style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#fff', textDecoration: 'none' }}>{cta} →</Link>
          </div>
        ))}
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem' }}>
        <p style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1.5rem' }}>Quick actions</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/admin/listings" style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#000', background: '#fff', padding: '10px 20px', textDecoration: 'none' }}>+ Add listing</Link>
          <Link href="/admin/ads" style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--bone)', background: 'none', border: '1px solid var(--border-mid)', padding: '10px 20px', textDecoration: 'none' }}>+ Add ad</Link>
          <Link href="/" target="_blank" style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', background: 'none', border: '1px solid var(--border)', padding: '10px 20px', textDecoration: 'none' }}>View live site ↗</Link>
        </div>
      </div>
    </div>
  )
}
