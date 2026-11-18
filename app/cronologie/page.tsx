"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Event = { id: string; date: string; sort: number; area: string; title: string; detail: string; slug?: string; certainty: string };
const events: Event[] = [
  {id:"e1",date:"VIII–VI secolo a.C.",sort:-650,area:"Grecia",title:"Filosofia presocratica",detail:"Si sviluppano indagini sulla natura, sul mutamento, sull'arché e sul rapporto tra ragione e realtà.",certainty:"Intervallo convenzionale"},
  {id:"e2",date:"VI–V secolo a.C.",sort:-500,area:"Cina",title:"Confucio",detail:"La tradizione colloca in quest'epoca la vita del maestro; la raccolta dei Dialoghi ha una storia testuale successiva.",slug:"confucio",certainty:"Date tradizionali"},
  {id:"e3",date:"V secolo a.C.",sort:-450,area:"Grecia",title:"Socrate",detail:"La sua attività ad Atene è ricostruita soprattutto attraverso testimonianze di discepoli e autori successivi.",certainty:"Cronologia storica approssimativa"},
  {id:"e4",date:"V–III secolo a.C.",sort:-350,area:"Cina",title:"Formazione dei testi classici cinesi",detail:"Testi e scuole vengono composti, trasmessi e rielaborati in un periodo di pluralità intellettuale.",certainty:"Processo pluridecennale"},
  {id:"e5",date:"IV secolo a.C.",sort:-350,area:"Grecia",title:"Platone",detail:"L'Accademia e i dialoghi platonici segnano la riflessione su conoscenza, etica e politica.",slug:"platone",certainty:"Circa 427–347 a.C."},
  {id:"e6",date:"IV secolo a.C.",sort:-330,area:"Grecia",title:"Aristotele",detail:"Il Liceo sviluppa ricerche di logica, filosofia della natura, metafisica, etica e politica.",slug:"aristotele",certainty:"384–322 a.C."},
  {id:"e7",date:"III secolo a.C.",sort:-250,area:"Grecia e mondo ellenistico",title:"Nascita dello stoicismo",detail:"Zenone di Cizio avvia ad Atene la scuola stoica, poi articolata in diverse fasi.",slug:"stoicismo",certainty:"Inizio convenzionalmente collocato intorno al 300 a.C."},
  {id:"e8",date:"I secolo a.C. – I secolo d.C.",sort:0,area:"India",title:"Sviluppi delle tradizioni mahāyāna",detail:"Si formano e circolano testi e pratiche mahāyāna; datazioni e stratificazioni variano secondo i corpora.",certainty:"Intervallo ampio e discusso"},
  {id:"e9",date:"I–II secolo d.C. (circa)",sort:125,area:"India",title:"Nāgārjuna",detail:"La sua cronologia è discussa; è associato alla formulazione classica delle argomentazioni Madhyamaka.",slug:"nagarjuna",certainty:"Datazione incerta"},
  {id:"e10",date:"X–XI secolo",sort:1000,area:"Mondo persiano e islamico",title:"Avicenna (Ibn Sīnā)",detail:"Elabora opere influenti di logica, medicina, psicologia e metafisica nel mondo persiano e islamico.",slug:"avicenna",certainty:"Circa 980–1037"},
];
const areas = ["Tutte le aree", ...Array.from(new Set(events.map(e => e.area)))];

export default function ChronologyPage() {
  const [area, setArea] = useState("Tutte le aree");
  const visible = useMemo(() => events.filter(e => area === "Tutte le aree" || e.area === area).sort((a,b)=>a.sort-b.sort),[area]);
  return <main className="timeline-page">
    <header className="site-header">
      <Link className="brand" href="/"><span className="brand-mark">Φ</span><span><strong>Dizionario filosofico</strong><small>Storia universale del pensiero</small></span></Link>
      <nav aria-label="Navigazione principale"><Link href="/enciclopedia">Enciclopedia</Link><Link href="/cronologie">Cronologie</Link><Link href="/indici">Indici</Link><Link href="/#metodo">Il progetto</Link></nav>
    </header>
    <section className="timeline-hero">
      <p className="eyebrow">Strumento comparativo · versione iniziale</p>
      <h1>Cronologie parallele</h1>
      <p>Una prima mappa temporale di autori, scuole e trasformazioni intellettuali in diverse aree del mondo. Le linee sono accostate per orientare lo studio, non per suggerire automaticamente contatti o influenze.</p>
    </section>
    <section className="section-wrap timeline-content">
      <div className="section-heading"><div><p className="eyebrow">Sequenza temporale</p><h2>Le voci nel tempo</h2></div><span className="entry-count">{visible.length} eventi</span></div>
      <div className="timeline-filter"><label htmlFor="timeline-area">Filtra per area culturale</label><select id="timeline-area" value={area} onChange={e=>setArea(e.target.value)}>{areas.map(a=><option key={a}>{a}</option>)}</select></div>
      <ol className="timeline-list">{visible.map(event=><li className="timeline-event" key={event.id}>
        <div className="timeline-date">{event.date}<small>{event.area}</small></div>
        <div className="timeline-marker" aria-hidden="true"></div>
        <div className="timeline-card"><div className="timeline-card-top"><span>{event.certainty}</span>{event.slug && <Link href={`/enciclopedia/${event.slug}`}>Apri la voce ↗</Link>}</div><h3>{event.title}</h3><p>{event.detail}</p></div>
      </li>)}</ol>
      <div className="timeline-caution"><strong>Nota metodologica</strong><p>Le date sono approssimative e hanno gradi di certezza diversi: date biografiche tradizionali, intervalli di formazione testuale e periodizzazioni storiografiche non sono la stessa cosa. L'ordine cronologico non dimostra rapporti causali, simultaneità precisa o trasmissioni culturali. Le schede e la cronologia sono dimostrative e richiedono bibliografia specialistica e revisione.</p></div>
      <p className="editorial-note">La cronologia sarà ampliata con fonti citate, intervalli visualizzati come tali, eventi regionali e collegamenti documentati tra testi e tradizioni.</p>
    </section>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Dizionario universale della storia della filosofia</span><span>Cronologia dimostrativa · Italiano</span></footer>
  </main>;
}
