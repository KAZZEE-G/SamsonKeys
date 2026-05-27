'use client'
import { useState, useEffect } from 'react'
import { Application } from '@/types'

const STATUS_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  pending: { color: '#fff', bg: 'rgba(184,154,106,0.12)', border: 'rgba(184,154,106,0.3)' },
  approved: { color: '#6abf7b', bg: 'rgba(106,191,123,0.1)', border: 'rgba(106,191,123,0.25)' },
  rejected: { color: 'var(--danger)', bg: 'rgba(200,80,80,0.1)', border: 'rgba(200,80,80,0.25)' },
}

export default function AdminApplications() {
  const [apps, setApps] = useState<Application[]>([])
  const [selected, setSelected] = useState<Application | null>(null)

  useEffect(() => { load() }, [])
  async function load() { const r = await fetch('/api/applications'); setApps(await r.json()) }

  async function updateStatus(id: string, status: string) {
    await fetch('/api/applications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    load()
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: status as Application['status'] } : null)
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 300, color: 'var(--bone)' }}>Applications</h1>
        <p style={{ fontSize: '11px', fontWeight: 300, color: 'var(--muted)', marginTop: '6px' }}>
          {apps.filter(a => a.status === 'pending').length} pending review
        </p>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Name', 'Email', 'Category', 'Pieces', 'Status', 'Date', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '9px', fontWeight: 300, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {apps.map(a => {
              const st = STATUS_STYLES[a.status] || STATUS_STYLES.pending
              return (
                <tr key={a.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 300, color: 'var(--bone)' }}>{a.first_name} {a.last_name}</td>
                  <td style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 300, color: 'var(--muted)' }}>{a.email}</td>
                  <td style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 300, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{a.category}</td>
                  <td style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 300, color: 'var(--muted)' }}>{a.pieces_per_year}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: '8px', padding: '3px 8px', letterSpacing: '0.2em', textTransform: 'uppercase', background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>{a.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 300, color: 'var(--muted)' }}>
                    {new Date(a.created_at).toLocaleDateString('en-ZA')}
                  </td>
                  <td style={{ padding: '12px 16px', display: 'flex', gap: '6px' }}>
                    <button onClick={() => setSelected(a)} style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--bone)', background: 'none', border: '1px solid var(--border)', padding: '5px 10px', cursor: 'pointer' }}>Read</button>
                    {a.status === 'pending' && (
                      <>
                        <button onClick={() => updateStatus(a.id, 'approved')} style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6abf7b', background: 'none', border: '1px solid rgba(106,191,123,0.3)', padding: '5px 10px', cursor: 'pointer' }}>Approve</button>
                        <button onClick={() => updateStatus(a.id, 'rejected')} style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--danger)', background: 'none', border: '1px solid rgba(200,80,80,0.25)', padding: '5px 10px', cursor: 'pointer' }}>Reject</button>
                      </>
                    )}
                  </td>
                </tr>
              )
            })}
            {apps.length === 0 && (
              <tr><td colSpan={7} style={{ padding: '3rem 16px', fontSize: '13px', fontWeight: 300, color: 'var(--muted)', textAlign: 'center' }}>No applications yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border-hi)', width: '100%', maxWidth: '600px', maxHeight: '85vh', overflowY: 'auto', padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 300, color: 'var(--bone)', marginBottom: '4px' }}>{selected.first_name} {selected.last_name}</h2>
                <p style={{ fontSize: '11px', fontWeight: 300, color: 'var(--muted)' }}>{selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>

            {[
              { label: 'Category', value: selected.category },
              { label: 'Pieces per year', value: selected.pieces_per_year },
              { label: 'Website', value: selected.website || 'Not provided' },
              { label: 'Applied', value: new Date(selected.created_at).toLocaleDateString('en-ZA') },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '1rem', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', minWidth: '130px', marginTop: '2px' }}>{label}</span>
                <span style={{ fontSize: '13px', fontWeight: 300, color: 'var(--bone)' }}>{value}</span>
              </div>
            ))}

            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}>Their pitch</p>
              <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--bone)', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>{selected.pitch}</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              {selected.status === 'pending' && (
                <>
                  <button onClick={() => updateStatus(selected.id, 'approved')} style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#000', background: '#6abf7b', padding: '12px 24px', border: 'none', cursor: 'pointer' }}>Approve</button>
                  <button onClick={() => updateStatus(selected.id, 'rejected')} style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#000', background: 'var(--danger)', padding: '12px 24px', border: 'none', cursor: 'pointer' }}>Reject</button>
                </>
              )}
              <button onClick={() => setSelected(null)} style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', background: 'none', border: '1px solid var(--border)', padding: '12px 24px', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
