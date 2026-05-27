import { Listing } from '@/types'
import Image from 'next/image'

const BADGE_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  rare:   { bg: 'rgba(255,255,255,0.08)', color: '#fff',          border: '1px solid rgba(255,255,255,0.2)' },
  sold:   { bg: 'rgba(200,80,80,0.1)',    color: '#c85050',       border: '1px solid rgba(200,80,80,0.25)' },
  new:    { bg: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' },
  unique: { bg: '#ffffff',               color: '#000000',        border: '1px solid #fff' },
}

function formatPrice(price: number, currency: string) {
  const symbols: Record<string, string> = { ZAR: 'R', CHF: 'CHF', USD: '$', EUR: '€', GBP: '£' }
  const sym = symbols[currency] || currency
  if (price >= 1_000_000) return `${sym} ${(price / 1_000_000).toFixed(1)}M`
  if (price >= 1_000) return `${sym} ${(price / 1_000).toFixed(0)}K`
  return `${sym} ${price.toLocaleString()}`
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const badge = BADGE_STYLES[listing.badge] || BADGE_STYLES.new
  const remaining = listing.pieces_total - listing.pieces_sold

  return (
    <div className="listing-card group" style={{
      position: 'relative', overflow: 'hidden', cursor: 'pointer',
      background: 'var(--deep)', aspectRatio: '3/4',
      border: '1px solid var(--border)',
      transition: 'border-color 0.4s',
    }}>
      {/* Image */}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {listing.image_url ? (
          <Image
            src={listing.image_url}
            alt={listing.title}
            fill
            style={{ objectFit: 'cover', filter: 'grayscale(20%)' }}
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(160deg, #0a0a0a 0%, #111 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.1)',
            }}>No image</span>
          </div>
        )}
      </div>

      {/* Badge top-left */}
      <span style={{
        position: 'absolute', top: '14px', left: '14px',
        fontSize: '7px', fontWeight: 400, letterSpacing: '0.3em',
        textTransform: 'uppercase', padding: '4px 9px', zIndex: 2,
        ...badge,
      }}>
        {listing.badge === 'unique' ? '1 only' : listing.badge.charAt(0).toUpperCase() + listing.badge.slice(1)}
      </span>

      {/* Pieces top-right */}
      <span style={{
        position: 'absolute', top: '14px', right: '14px',
        fontSize: '8px', fontWeight: 300, letterSpacing: '0.15em',
        color: 'rgba(255,255,255,0.45)', zIndex: 2,
      }}>
        {listing.badge === 'sold' ? 'Closed' : remaining <= 1 ? `${remaining} left` : `${listing.pieces_sold} of ${listing.pieces_total}`}
      </span>

      {/* Bottom info — slides up on hover */}
      <div className="listing-info" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '2rem 1.2rem 1.2rem',
        background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.75) 55%, transparent 100%)',
        transform: 'translateY(30px)',
        transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>
        <p style={{ fontSize: '8px', fontWeight: 300, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '5px' }}>
          {listing.category}
        </p>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '17px', fontWeight: 300, color: '#fff', marginBottom: '4px', lineHeight: 1.2 }}>
          {listing.title}
        </h3>
        <p className="listing-desc" style={{ fontSize: '10px', fontWeight: 300, color: 'rgba(255,255,255,0.45)', marginBottom: '12px', lineHeight: 1.6, opacity: 0, transition: 'opacity 0.25s 0.1s' }}>
          {listing.description}
        </p>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '19px', fontWeight: 300, color: '#fff', letterSpacing: '0.02em' }}>
          {formatPrice(listing.price, listing.currency)}
        </p>
      </div>

      <style>{`
        .listing-card:hover { border-color: rgba(255,255,255,0.22) !important; }
        .listing-card:hover .listing-info { transform: translateY(0) !important; }
        .listing-card:hover .listing-desc { opacity: 1 !important; }
      `}</style>
    </div>
  )
}
