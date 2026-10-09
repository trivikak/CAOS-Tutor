import { Link } from 'react-router-dom';
import './Home.css';
export default function Home() {
  return <div className="home-scrap"><div className="home-inner"><div className="hs-wrap">
    <section className="hs-hero"><div className="hs-hero-copy">
      <span className="hs-eyebrow">Rensselaer Polytechnic Institute ↘</span>
      <h1 className="hs-headline">Make sense<br/>of <span className="hs-mark">the CAOS.</span></h1>
      <p className="hs-lede">Your study companion for Computer Architecture &amp; Operating Systems.</p>
      <div className="hs-cta-row"><Link to="/learning" className="hs-btn-primary">Start learning <span className="hs-arrow">→</span></Link></div>
      <p className="hs-microcopy">Focused lesson topics, hands-on practice, and room to take notes.</p>
      <div className="hero-tags"><span>ARCHITECTURE</span><span>C &amp; ASSEMBLY</span><span>OPERATING SYSTEMS</span></div>
    </div><div className="hs-collage">
      <figure className="hs-card hs-polaroid"><span className="hs-tape hs-tape--top"/><div className="hs-photo"><svg viewBox="0 0 220 200" aria-label="CPU connected to memory and input/output"><g stroke="#19202d" strokeWidth="2.5" fill="none"><path d="M110 76V110M60 130H35V55H75M160 130H190V55H145"/><rect x="75" y="25" width="70" height="52" rx="4" fill="#f8d7d7"/><rect x="60" y="110" width="100" height="45" rx="3" fill="#fff"/></g><g textAnchor="middle" fill="#19202d" fontFamily="monospace" fontSize="15"><text x="110" y="57">CPU</text><text x="110" y="138">MEMORY</text><text x="110" y="185">fetch → decode → execute</text></g></svg></div><figcaption className="hs-cap">one system, connected <span className="hs-chk">✓</span></figcaption></figure>
      <div className="hs-card hs-sticky"><span className="hs-pin"/><div className="hs-kicker">Your course roadmap</div><ul>{['Bits & logic','C & assembly','Memory & processes','Threads & networks'].map(t=><li key={t}><span className="hs-box"/><span>{t}</span></li>)}</ul></div>
      <div className="hs-card hs-chat"><div className="hs-dots"><i/><i/><i/></div><div className="hs-bubble q">Why isn’t <code>counter++</code> thread-safe?</div><div className="hs-bubble a">It reads, adds, then writes. Two threads can read the same value and lose an update. Protect the critical section with a mutex.</div><span className="hs-srctag">↳ Synchronization · topic 10</span></div>
      <div className="hs-card hs-formula"><span className="hs-pin hs-pin--pen"/><div className="hs-formula-lbl">think in bits</div><div className="hs-formula-eq">1111 1011</div><div className="hs-formula-sub">−5 in 8-bit two’s complement</div></div>
    </div></section>
  </div></div></div>;
}
