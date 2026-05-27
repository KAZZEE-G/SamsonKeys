'use client'
import { useState, useEffect } from 'react'
import { Ad } from '@/types'

const EMPTY: Partial<Ad> = { label: '', name: '', subtitle: '', position: 'banner', link_url: '', is_active: true, sort_order: 0 }
const S = {
  label: { fontSize: '9px', fontWeight: 300, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: '6px' },
  input: { background: 'var(--void)', border: '1px solid var(--border-mid)', color: '#fff', fontSize: '13px', fontWeight: 300, fontFamily: 'DM Sans, sans-serif', padding: '9px 12px', outline: 'none', width: '100%' },
}

export default function AdminAds() {
  const [ads, setAds] = useState<Ad[]>([])
  const [editing, setEditing] = useState<Partial<Ad> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => { load() }, [])
  async function load() { const r = await fetch('/api/ads'); setAds(await r.json()) }

  async function save() {
    setSaving(true)
    await fetch('/api/ads', { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    setSaving(false); setEditing(null); load()
  }

  async function confirmDelete() {
    if (!deleteId) return
    await fetch('/api/ads', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: deleteId }) })
    setDeleteId(null); load()
  }

  const F = (k: keyof Ad) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setEditing(p => ({ ...p, [k]: e.target.value }))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 300, color: '#fff' }}>Ads</h1>
        <button onClick={() => { setEditing({ ...EMPTY }); setIsNew(true) }} style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#000', background: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>+ Add ad</button>
      </div>
      <p style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', marginBottom: '1.5rem', lineHeight: 1.7 }}>Ad slots are invisible on the public site until a visitor hovers over them.</p>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Name', 'Label', 'Position', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '9px', fontWeight: 300, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ads.map(ad => (
              <tr key={ad.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 300, color: '#fff' }}>{ad.name}</td>
                <td style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}>{ad.label}</td>
                <td style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{ad.position}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: '8px', padding: '3px 8px', letterSpacing: '0.2em', textTransform: 'uppercase', background: ad.is_active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)', color: ad.is_active ? '#fff' : 'rgba(255,255,255,0.3)', border: `1px solid ${ad.is_active ? 'rgba(255,255,255,0.2)' : 'var(--border)'}` }}>{ad.is_active ? 'Active' : 'Hidden'}</span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => { setEditing(ad); setIsNew(false) }} style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', background: 'none', border: '1px solid var(--border)', padding: '5px 10px', cursor: 'pointer', marginRight: '8px' }}>Edit</button>
                  <button onClick={() => setDeleteId(ad.id)} style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c85050', background: 'none', border: '1px solid rgba(200,80,80,0.25)', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
            {ads.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '3rem 16px', fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>No ads yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border-hi)', padding: '2.5rem', maxWidth: '380px', width: '100%' }}>
            <p style={{ fontSize: '15px', fontWeight: 300, color: '#fff', marginBottom: '2rem' }}>Delete this ad?</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={confirmDelete} style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#fff', background: '#c85050', padding: '12px 24px', border: 'none', cursor: 'pointer' }}>Delete</button>
              <button onClick={() => setDeleteId(null)} style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', background: 'none', border: '1px solid var(--border)', padding: '12px 24px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border-hi)', width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 300, color: '#fff' }}>{isNew ? 'New ad' : 'Edit ad'}</h2>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[['label', 'Label (e.g. Motorcar)'], ['name', 'Name (e.g. Rolls-Royce)'], ['subtitle', 'Subtitle'], ['link_url', 'Link URL']].map(([k, ph]) => (
                <div key={k}>
                  <label style={S.label}>{ph!.split(' (')[0]}</label>
                  <input style={S.input} value={(editing as Record<string, string>)[k!] || ''} onChange={F(k as keyof Ad)} placeholder={ph} />
                </div>
              ))}
              <div>
                <label style={S.label}>Position</label>
                <select style={{ ...S.input, appearance: 'none' as const, cursor: 'pointer' }} value={editing.position || 'banner'} onChange={F('position')}>
                  <option value="banner">Banner (top strip)</option>
                  <option value="sidebar">Sidebar (right)</option>
                </select>
              </div>
              <div>
                <label style={S.label}>Sort order</label>
                <input type="number" style={S.input} value={editing.sort_order || 0} onChange={F('sort_order')} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="ad-active" checked={editing.is_active !== false} onChange={e => setEditing(ev => ({ ...ev, is_active: e.target.checked }))} />
                <label htmlFor="ad-active" style={{ fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}>Active</label>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={save} disabled={saving} style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#000', background: '#fff', padding: '12px 24px', border: 'none', cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save ad'}</button>
              <button onClick={() => setEditing(null)} style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', background: 'none', border: '1px solid var(--border)', padding: '12px 24px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
