"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { entries } from "@/data/entries";
import { terms } from "@/data/terms";

const areas = ["Tutte le aree", ...Array.from(new Set(entries.map((entry) => entry.area)))];
const kinds = ["Tutte le tipologie", ...Array.from(new Set(entries.map((entry) => entry.kind)))];
const suggestions = Array.from(new Set([...entries.map((entry) => entry.title), ...entries.flatMap((entry) => entry.tags), ...terms.map((item) => item.term)]));

export default function EncyclopediaPage() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("Tutte le aree");
  const [kind, setKind] = useState("Tutte le tipologie");
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("it");
    return entries.filter((entry) => {
      const matchesArea = area === "Tutte le aree" || entry.area === area;
      const matchesKind = kind === "Tutte le tipologie" || entry.kind === kind;
      const searchable = [entry.id, entry.title, entry.subtitle, entry.area, entry.period, entry.summary, ...entry.tags].join(" ").toLocaleLowerCase("it");
      return matchesArea && matchesKind && (!q || searchable.includes(q));
    });
  }, [query, area, kind]);

  return (
    <main className="archive-page">
      <header className="site-header">
        <Link className="brand" href="/"><span className="brand-mark">Φ</span><span><strong>Dizionario filosofico</strong><small>Storia universale del pensiero</small></span></Link>
        <nav aria-label="Navigazione principale"><Link href="/">Home</Link><Link href="/cronologie">Cronologie</Link><Link href="/indici">Indici</Link><Link href="/#metodo">Il progetto</Link></nav>
      </header>
      <section className="archive-hero">
        <p className="eyebrow">Repertorio in costruzione</p><h1>Enciclopedia</h1>
        <p>Autori, concetti, opere e tradizioni: un archivio in crescita, organizzato per aree culturali e relazioni storiche.</p>
      </section>
      <section className="section-wrap archive-content">
        <div className="section-heading"><div><p className="eyebrow">Le voci</p><h2>Esplora il repertorio</h2></div><span className="entry-count">{filtered.length} di {entries.length} voci</span></div>
        <div className="search-panel">
          <label className="search-label" htmlFor="archive-search">Cerca per autore, tema o parola chiave</label>
          <input id="archive-search" type="search" list="archive-suggestions" autoComplete="off" placeholder="Es. etica, Cina, metafisica…" value={query} onChange={(event) => setQuery(event.target.value)} />
          <datalist id="archive-suggestions">{suggestions.map((suggestion) => <option key={suggestion} value={suggestion} />)}</datalist>
          <label className="filter-label" htmlFor="archive-area">Area culturale</label>
          <select id="archive-area" value={area} onChange={(event) => setArea(event.target.value)}>{areas.map((item) => <option key={item}>{item}</option>)}</select>
          <label className="filter-label" htmlFor="archive-kind">Tipologia di voce</label>
          <select id="archive-kind" value={kind} onChange={(event) => setKind(event.target.value)}>{kinds.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
        {filtered.length ? <div className="entry-grid">{filtered.map((entry) => (
          <Link className="entry-card archive-card" href={`/enciclopedia/${entry.slug}`} key={entry.id}>
            <div className="card-meta"><span>{entry.kind}</span><span>{entry.id}</span></div>
            <p className="entry-area">{entry.area}</p><h3>{entry.title}</h3><p className="entry-period">{entry.period}</p>
            <p className="entry-description">{entry.summary}</p>
            <div className="tag-list">{entry.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
            <span className="card-foot">Leggi la scheda <span aria-hidden="true">↗</span></span>
          </Link>
        ))}</div> : <p className="empty-state">Nessuna voce trovata. Prova un altro termine o modifica il filtro.</p>}
        <p className="editorial-note">Le voci sono prototipi editoriali: contenuti, cronologie e bibliografie richiedono verifica specialistica prima della pubblicazione definitiva.</p>
      </section>
      <footer className="site-footer"><span>© {new Date().getFullYear()} Dizionario universale della storia della filosofia</span><span>Repertorio dimostrativo · Italiano</span></footer>
    </main>
  );
}
