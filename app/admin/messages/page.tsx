'use client'
import { useState, useEffect } from 'react'

interface Message { id: string; name: string; email: string; subject: string; message: string; created_at: string }

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selected, setSelected] = useState<Message | null>(null)

  useEffect(() => { load() }, [])
  async function load() { const r = await fetch('/api/contact'); setMessages(await r.json()) }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 300, color: 'var(--bone)' }}>Messages</h1>
        <p style={{ fontSize: '11px', fontWeight: 300, color: 'var(--muted)', marginTop: '6px' }}>{messages.length} total messages</p>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Name', 'Email', 'Subject', 'Date', ''].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '9px', fontWeight: 300, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {messages.map(m => (
              <tr key={m.id} style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => setSelected(m)}>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 300, color: 'var(--bone)' }}>{m.name}</td>
                <td style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 300, color: 'var(--muted)' }}>{m.email}</td>
                <td style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 300, color: 'var(--muted)' }}>{m.subject}</td>
                <td style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 300, color: 'var(--muted)' }}>{new Date(m.created_at).toLocaleDateString('en-ZA')}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>Read →</span>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '3rem 16px', fontSize: '13px', fontWeight: 300, color: 'var(--muted)', textAlign: 'center' }}>No messages yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border-hi)', width: '100%', maxWidth: '540px', padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 300, color: 'var(--bone)' }}>{selected.subject}</h2>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>
            {[{ label: 'From', value: selected.name }, { label: 'Email', value: selected.email }, { label: 'Date', value: new Date(selected.created_at).toLocaleDateString('en-ZA') }].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '1rem', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', minWidth: '80px', marginTop: '2px' }}>{label}</span>
                <span style={{ fontSize: '13px', fontWeight: 300, color: 'var(--bone)' }}>{value}</span>
              </div>
            ))}
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}>Message</p>
              <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--bone)', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
            </div>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <a href={`mailto:${selected.email}`} style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--void)', background: 'var(--accent)', padding: '12px 24px', textDecoration: 'none' }}>Reply via email</a>
              <button onClick={() => setSelected(null)} style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', background: 'none', border: '1px solid var(--border)', padding: '12px 24px', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
