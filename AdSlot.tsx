'use client'
import { Ad } from '@/types'
import { useState } from 'react'

export function BannerAd({ ad }: { ad: Ad }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={ad.link_url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1, height: '72px',
        background: hovered ? 'var(--lift)' : 'var(--void)',
        position: 'relative', overflow: 'hidden',
        cursor: 'pointer',
        borderRight: '1px solid var(--border)',
        textDecoration: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.35s',
      }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '3px',
        alignItems: 'center', textAlign: 'center', padding: '0 1.5rem',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.35s',
      }}>
        <span style={{ fontSize: '7px', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          {ad.label}
        </span>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', fontWeight: 300, color: '#fff', letterSpacing: '0.05em' }}>
          {ad.name}
        </span>
        <span style={{ fontSize: '9px', fontWeight: 300, color: 'var(--muted)', letterSpacing: '0.1em' }}>
          {ad.subtitle}
        </span>
      </div>
    </a>
  )
}

export function SidebarAd({ ad }: { ad: Ad }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={ad.link_url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1, minHeight: '200px',
        background: hovered ? 'var(--lift)' : 'var(--void)',
        cursor: 'pointer', textDecoration: 'none',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.35s',
      }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '8px',
        alignItems: 'center', textAlign: 'center', padding: '1.5rem 1rem',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.35s',
      }}>
        <span style={{ fontSize: '7px', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          {ad.label}
        </span>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 300, color: '#fff', lineHeight: 1.2 }}>
          {ad.name}
        </span>
        <span style={{ fontSize: '9px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.5 }}>
          {ad.subtitle}
        </span>
      </div>
    </a>
  )
}
