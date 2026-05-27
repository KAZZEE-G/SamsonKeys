'use client'
import { useState, useEffect, useRef } from 'react'
import { Listing } from '@/types'
import Image from 'next/image'

const EMPTY: Partial<Listing> = { title: '', description: '', price: 0, currency: 'ZAR', category: 'art', badge: 'new', pieces_total: 1, pieces_sold: 0, image_url: '', seller_name: '', medium: '', year: undefined, dimensions: '', is_active: true }
const S = {
  label: { fontSize: '9px', fontWeight: 300, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'var(--muted)', display: 'block', marginBottom: '6px' },
  input: { background: 'var(--void)', border: '1px solid var(--border-mid)', color: 'var(--bone)', fontSize: '13px', fontWeight: 300, fontFamily: 'DM Sans, sans-serif', padding: '9px 12px', outline: 'none', width: '100%', transition: 'border-color 0.2s' },
}

export default function AdminListings() {
  const [listings, setListings] = useState<Listing[]>([])
  const [editing, setEditing] = useState<Partial<Listing> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const res = await fetch('/api/listings')
    setListings(await res.json())
  }

  async function save() {
    if (!editing) return
    setSaving(true)
    const method = isNew ? 'POST' : 'PUT'
    await fetch('/api/listings', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    setSaving(false)
    setEditing(null)
    load()
  }

  async function remove(id: string) {
    if (!confirm('Delete this listing?')) return
    await fetch('/api/listings', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    load()
  }

  async function uploadImage(file: File) {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const { url } = await res.json()
    setEditing(e => ({ ...e, image_url: url }))
    setUploading(false)
  }

  const F = (key: keyof Listing) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setEditing(prev => ({ ...prev, [key]: e.target.value }))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 300, color: 'var(--bone)' }}>Listings</h1>
        <button onClick={() => { setEditing({ ...EMPTY }); setIsNew(true) }} style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#000', background: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>+ Add listing</button>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Image', 'Title', 'Category', 'Price', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '9px', fontWeight: 300, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listings.map(l => (
              <tr key={l.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 16px', width: '60px' }}>
                  {l.image_url ? <Image src={l.image_url} alt={l.title} width={48} height={48} style={{ objectFit: 'cover' }} /> : <div style={{ width: 48, height: 48, background: 'var(--lift)' }} />}
                </td>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 300, color: 'var(--bone)' }}>{l.title}</td>
                <td style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 300, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l.category}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 300, color: 'var(--bone)' }}>{l.currency} {Number(l.price).toLocaleString()}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: '8px', padding: '3px 8px', letterSpacing: '0.2em', textTransform: 'uppercase', background: l.is_active ? 'rgba(184,154,106,0.15)' : 'rgba(237,232,222,0.05)', color: l.is_active ? 'var(--accent)' : 'var(--muted)', border: `1px solid ${l.is_active ? 'rgba(184,154,106,0.3)' : 'var(--border)'}` }}>
                    {l.is_active ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => { setEditing(l); setIsNew(false) }} style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bone)', background: 'none', border: '1px solid var(--border)', padding: '5px 10px', cursor: 'pointer', marginRight: '8px' }}>Edit</button>
                  <button onClick={() => remove(l.id)} style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--danger)', background: 'none', border: '1px solid rgba(200,80,80,0.25)', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit / Add Modal */}
      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border-hi)', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 300, color: 'var(--bone)' }}>{isNew ? 'New listing' : 'Edit listing'}</h2>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={S.label}>Title</label>
                <input style={S.input} value={editing.title || ''} onChange={F('title')} placeholder="Listing title" />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={S.label}>Description</label>
                <textarea style={{ ...S.input, minHeight: '80px', resize: 'vertical' }} value={editing.description || ''} onChange={F('description')} placeholder="Short description" />
              </div>
              <div>
                <label style={S.label}>Price</label>
                <input type="number" style={S.input} value={editing.price || ''} onChange={F('price')} />
              </div>
              <div>
                <label style={S.label}>Currency</label>
                <select style={S.input} value={editing.currency || 'ZAR'} onChange={F('currency')}>
                  {['ZAR', 'USD', 'EUR', 'GBP', 'CHF'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={S.label}>Category</label>
                <select style={S.input} value={editing.category || 'art'} onChange={F('category')}>
                  {['art','motor','property','jewellery','watch','collectible','memorabilia','other'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={S.label}>Badge</label>
                <select style={S.input} value={editing.badge || 'new'} onChange={F('badge')}>
                  {['new','rare','sold','unique'].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label style={S.label}>Pieces total</label>
                <input type="number" style={S.input} value={editing.pieces_total || 1} onChange={F('pieces_total')} />
              </div>
              <div>
                <label style={S.label}>Pieces sold</label>
                <input type="number" style={S.input} value={editing.pieces_sold || 0} onChange={F('pieces_sold')} />
              </div>
              <div>
                <label style={S.label}>Seller name</label>
                <input style={S.input} value={editing.seller_name || ''} onChange={F('seller_name')} />
              </div>
              <div>
                <label style={S.label}>Medium</label>
                <input style={S.input} value={editing.medium || ''} onChange={F('medium')} placeholder="Oil on linen, Bronze..." />
              </div>
              <div>
                <label style={S.label}>Year</label>
                <input type="number" style={S.input} value={editing.year || ''} onChange={F('year')} />
              </div>
              <div>
                <label style={S.label}>Dimensions</label>
                <input style={S.input} value={editing.dimensions || ''} onChange={F('dimensions')} placeholder="180 × 140 cm" />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={S.label}>Image</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <input style={S.input} value={editing.image_url || ''} onChange={F('image_url')} placeholder="Cloudinary URL or paste directly" />
                  </div>
                  <button type="button" onClick={() => fileRef.current?.click()} style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bone)', background: 'var(--lift)', border: '1px solid var(--border-mid)', padding: '9px 14px', cursor: 'pointer', flexShrink: 0 }}>
                    {uploading ? 'Uploading...' : 'Upload file'}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) uploadImage(e.target.files[0]) }} />
                </div>
                {editing.image_url && <Image src={editing.image_url} alt="preview" width={80} height={80} style={{ objectFit: 'cover', marginTop: '8px' }} />}
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="active" checked={editing.is_active !== false} onChange={e => setEditing(ev => ({ ...ev, is_active: e.target.checked }))} />
                <label htmlFor="active" style={{ fontSize: '12px', fontWeight: 300, color: 'var(--muted)', cursor: 'pointer' }}>Active (visible on public site)</label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={save} disabled={saving} style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#000', background: '#fff', padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
                {saving ? 'Saving...' : 'Save listing'}
              </button>
              <button onClick={() => setEditing(null)} style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', background: 'none', border: '1px solid var(--border)', padding: '12px 24px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
