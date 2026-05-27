import Nav from '@/components/public/Nav'
import Footer from '@/components/public/Footer'

const PRINCIPLES = [
  { n: '01', title: 'Scarcity is not a strategy', body: 'It is a result. We do not manufacture urgency. We list things that are genuinely rare and let that truth do the work.' },
  { n: '02', title: 'The seller comes first', body: '85% is a number with a point of view. It says we work for you, not for a cut. The 15% covers everything. There is nothing else.' },
  { n: '03', title: 'Curation over volume', body: 'We turn away more than 94% of applicants. Not because we are gatekeeping. Because the work on this platform must mean something to the people who buy it.' },
  { n: '04', title: 'No algorithm here', body: 'Nothing on Samson Keys is ranked, boosted, or promoted by a machine. Every listing gets the same visibility. The work earns attention on its own merit.' },
]

export default function AboutPage() {
  return (
    <>
      <Nav />
      <div style={{ padding: '7rem 2.5rem 5rem', maxWidth: '860px', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '2.5rem', display: 'block' }}>
          Who we are
        </span>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(44px,6vw,84px)', fontWeight: 300, color: '#fff', lineHeight: 0.93, marginBottom: '3.5rem', letterSpacing: '-0.01em' }}>
          A gallery<br />that knows<br /><em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>when to stop.</em>
        </h1>
        <div style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.95, color: 'rgba(255,255,255,0.45)', maxWidth: '580px' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Samson Keys exists for one reason: <strong style={{ color: '#fff', fontWeight: 400 }}>the rarest things deserve a different kind of home.</strong> Not a marketplace. Not an auction. A curated space where scarcity is structural, not manufactured.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Every artist, maker, or seller on this platform commits to listing fewer than 8 pieces per year. That limit is not negotiable. It is the foundation of everything we do.
          </p>
          <p>
            We take 15%. You keep 85%. The economics of most galleries are extractive. Ours are not. We only win when you win.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
        {[
          { n: '8', label: 'Maximum pieces any seller may list per calendar year. No exceptions.' },
          { n: '85%', label: 'What every seller takes home. Always. No hidden deductions.' },
          { n: '<6%', label: 'Of applicants are accepted. We review every submission personally.' },
        ].map(({ n, label }, i) => (
          <div key={n} style={{ padding: '3.5rem 2.5rem', borderRight: i < 2 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '56px', fontWeight: 300, color: '#fff', display: 'block', lineHeight: 1, marginBottom: '10px' }}>{n}</span>
            <p style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', lineHeight: 1.7 }}>{label}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: '5rem 2.5rem' }}>
        <span style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: '3rem' }}>What we believe</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)' }}>
          {PRINCIPLES.map(({ n, title, body }) => (
            <div key={n} style={{ padding: '3rem', background: '#000' }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', fontWeight: 300, color: 'rgba(255,255,255,0.08)', marginBottom: '1.5rem', display: 'block' }}>{n}</span>
              <p style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#fff', marginBottom: '1rem' }}>{title}</p>
              <p style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.4)', lineHeight: 1.85 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
