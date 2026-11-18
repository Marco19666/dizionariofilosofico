import Link from "next/link";
import { comparativePaths, entries } from "@/data/entries";

const byTitle = [...entries].sort((a, b) => a.title.localeCompare(b.title, "it"));
const kinds = ["autore", "concetto", "opera", "scuola", "tradizione", "periodo"] as const;
const areas = [...new Set(entries.map((entry) => entry.area))].sort((a, b) => a.localeCompare(b, "it"));
const tags = [...new Set(entries.flatMap((entry) => entry.tags))].sort((a, b) => a.localeCompare(b, "it"));
const terms = entries.flatMap((entry) => (entry.keyTerms ?? []).map((term) => ({ ...term, entry }))).sort((a, b) => a.term.localeCompare(b.term, "it"));
const works = entries.flatMap((entry) => (entry.works ?? []).map((work) => ({ ...work, entry }))).sort((a, b) => a.title.localeCompare(b.title, "it"));
const periods = [...new Set(entries.map((entry) => entry.period))].sort((a, b) => a.localeCompare(b, "it"));

export default function IndexesPage() {
  return <main className="indexes-page">
    <header className="site-header">
      <Link className="brand" href="/"><span className="brand-mark">Φ</span><span><strong>Dizionario filosofico</strong><small>Storia universale del pensiero</small></span></Link>
      <nav aria-label="Navigazione principale"><Link href="/">Home</Link><Link href="/enciclopedia">Enciclopedia</Link><Link href="/cronologie">Cronologie</Link></nav>
    </header>
    <section className="indexes-hero">
      <p className="eyebrow">Strumenti di consultazione</p><h1>Indici</h1>
      <p>Accessi incrociati al repertorio: per nome, tipologia, area culturale, tema, testo e collocazione cronologica. Ogni indice rinvia alla scheda da cui il dato è tratto.</p>
      <div className="indexes-stat"><strong>{entries.length}</strong><span>voci catalogate</span><strong>{tags.length}</strong><span>parole chiave</span><strong>{works.length}</strong><span>opere e testi schedati</span></div>
    </section>
    <div className="section-wrap indexes-content">
      <section className="index-section" id="alfabetico">
        <div className="section-heading"><div><p className="eyebrow">01 · A–Z</p><h2>Indice alfabetico delle voci</h2></div><span className="entry-count">{byTitle.length} lemmi</span></div>
        <ol className="alphabetical-index">{byTitle.map((entry) => <li key={entry.id}><Link href={`/enciclopedia/${entry.slug}`}>{entry.title}</Link><span>{entry.kind} · {entry.area}</span><small>{entry.id}</small></li>)}</ol>
      </section>
      <section className="index-section" id="tipologie">
        <div className="section-heading"><div><p className="eyebrow">02 · Classificazione</p><h2>Indice per tipologia</h2></div></div>
        <div className="index-columns">{kinds.map((kind) => {
          const group = byTitle.filter((entry) => entry.kind === kind);
          return group.length ? <div className="index-group" key={kind}><h3>{kind} <small>{group.length}</small></h3><ul>{group.map((entry) => <li key={entry.id}><Link href={`/enciclopedia/${entry.slug}`}>{entry.title}</Link></li>)}</ul></div> : null;
        })}</div>
      </section>
      <section className="index-section" id="aree">
        <div className="section-heading"><div><p className="eyebrow">03 · Geografie intellettuali</p><h2>Indice per area culturale</h2></div></div>
        <div className="index-columns">{areas.map((area) => <div className="index-group" key={area}><h3>{area} <small>{entries.filter((entry) => entry.area === area).length}</small></h3><ul>{byTitle.filter((entry) => entry.area === area).map((entry) => <li key={entry.id}><Link href={`/enciclopedia/${entry.slug}`}>{entry.title}</Link></li>)}</ul></div>)}</div>
      </section>
      <section className="index-section" id="temi">
        <div className="section-heading"><div><p className="eyebrow">04 · Lessico</p><h2>Indice tematico</h2></div><span className="entry-count">{tags.length} temi</span></div>
        <div className="tag-index">{tags.map((tag) => <div key={tag}><strong>{tag}</strong><span>{byTitle.filter((entry) => entry.tags.includes(tag)).map((entry) => <Link key={entry.id} href={`/enciclopedia/${entry.slug}`}>{entry.title}</Link>)}</span></div>)}</div>
        {terms.length > 0 && <><h3 className="sub-index-title">Concetti e termini nelle lingue originali</h3><div className="term-index">{terms.map((term) => <div key={term.entry.id + term.term}><strong>{term.term}</strong><span>{term.explanation}</span><Link href={`/enciclopedia/${term.entry.slug}`}>{term.entry.title}</Link></div>)}</div></>}
      </section>
      <section className="index-section" id="opere">
        <div className="section-heading"><div><p className="eyebrow">05 · Testi</p><h2>Indice delle opere e dei testi</h2></div><span className="entry-count">{works.length} riferimenti</span></div>
        <ul className="work-index">{works.map((work) => <li key={work.entry.id + work.title}><strong>{work.title}</strong><span>{work.note}</span><Link href={`/enciclopedia/${work.entry.slug}`}>{work.entry.title}</Link></li>)}</ul>
      </section>
      <section className="index-section" id="cronologico">
        <div className="section-heading"><div><p className="eyebrow">06 · Tempo</p><h2>Indice per periodo</h2></div></div>
        <div className="index-columns">{periods.map((period) => <div className="index-group" key={period}><h3>{period}</h3><ul>{byTitle.filter((entry) => entry.period === period).map((entry) => <li key={entry.id}><Link href={`/enciclopedia/${entry.slug}`}>{entry.title}</Link></li>)}</ul></div>)}</div>
        <p className="editorial-note">Le etichette cronologiche sono quelle dichiarate nelle singole schede; non costituiscono una scala temporale normalizzata. Per la sequenza degli eventi consulta <Link href="/cronologie">Cronologie parallele</Link>.</p>
      </section>
      <section className="index-section" id="percorsi">
        <div className="section-heading"><div><p className="eyebrow">07 · Comparazione</p><h2>Percorsi comparativi</h2></div><span className="entry-count">{comparativePaths.length} percorsi</span></div>
        <ul className="path-index">{comparativePaths.map((path) => <li key={path.slug}><strong>{path.title}</strong><span>{path.entries.map((slug) => entries.find((entry) => entry.slug === slug)?.title).filter(Boolean).join(" · ")}</span><p>{path.question}</p><small>{path.methodNote}</small></li>)}</ul>
      </section>
      <p className="editorial-note">Gli indici sono generati direttamente dai dati delle schede: quando una voce, una parola chiave o un testo viene aggiornato, i relativi accessi si aggiornano insieme al repertorio.</p>
    </div>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Dizionario universale della storia della filosofia</span><span>Indici editoriali · Edizione 1.0</span></footer>
  </main>;
}
