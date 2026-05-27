'use client'
import { useRouter, useSearchParams } from 'next/navigation'

const CATEGORIES = ['All', 'Art', 'Motor', 'Property', 'Jewellery', 'Watch', 'Collectible', 'Memorabilia']

export default function CategoryFilter() {
  const router = useRouter()
  const params = useSearchParams()
  const active = params.get('cat') || 'all'

  function select(cat: string) {
    const val = cat.toLowerCase()
    router.push(val === 'all' ? '/' : `/?cat=${val}`)
  }

  return (
    <div style={{
      padding: '1rem 2.5rem',
      display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
      borderBottom: '1px solid var(--border)',
      background: '#000',
    }}>
      {CATEGORIES.map(cat => {
        const val = cat.toLowerCase()
        const isActive = val === active || (val === 'all' && active === 'all')
        return (
          <button
            key={cat}
            onClick={() => select(cat)}
            style={{
              fontSize: '9px', fontWeight: 300, letterSpacing: '0.28em',
              textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
              background: isActive ? '#fff' : 'none',
              color: isActive ? '#000' : 'var(--muted)',
              border: isActive ? '1px solid #fff' : '1px solid var(--border)',
              padding: '5px 13px',
            }}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
