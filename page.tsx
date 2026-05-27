import { supabase } from '@/lib/supabase'
import { Listing, Ad } from '@/types'
import Nav from '@/components/public/Nav'
import Footer from '@/components/public/Footer'
import ListingCard from '@/components/public/ListingCard'
import { BannerAd, SidebarAd } from '@/components/public/AdSlot'
import CategoryFilter from '@/components/public/CategoryFilter'

export const revalidate = 60

async function getData() {
  const [{ data: listings }, { data: ads }] = await Promise.all([
    supabase.from('listings').select('*').eq('is_active', true).order('created_at', { ascending: false }),
    supabase.from('ads').select('*').eq('is_active', true).order('sort_order'),
  ])
  return {
    listings: (listings || []) as Listing[],
    bannerAds: (ads || []).filter((a: Ad) => a.position === 'banner') as Ad[],
    sidebarAds: (ads || []).filter((a: Ad) => a.position === 'sidebar') as Ad[],
  }
}

export default async function HomePage() {
  const { listings, bannerAds, sidebarAds } = await getData()

  return (
    <>
      <Nav />
      {bannerAds.length > 0 && (
        <div style={{ display: 'flex', background: 'var(--void)', borderBottom: '1px solid var(--border)' }}>
          {bannerAds.map((ad: Ad) => <BannerAd key={ad.id} ad={ad} />)}
        </div>
      )}
      <CategoryFilter />
      <div style={{ padding: '2rem 2.5rem 4rem', display: 'flex', gap: '2px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1.5rem' }}>
            {listings.length} listing{listings.length !== 1 ? 's' : ''} — currently available
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }} className="listings-grid">
            {listings.map((listing: Listing) => <ListingCard key={listing.id} listing={listing} />)}
            {listings.length === 0 && (
              <p style={{ color: 'var(--muted)', fontSize: '13px', fontWeight: 300, gridColumn: 'span 4', padding: '4rem 0' }}>
                No listings available right now.
              </p>
            )}
          </div>
        </div>
        {sidebarAds.length > 0 && (
          <div style={{ width: '180px', flexShrink: 0, borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
            {sidebarAds.map((ad: Ad) => <SidebarAd key={ad.id} ad={ad} />)}
          </div>
        )}
      </div>
      <style>{`@media(max-width:900px){.listings-grid{grid-template-columns:1fr !important;}}`}</style>
      <Footer />
    </>
  )
}
