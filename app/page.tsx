"use client";

import { useMemo, useState } from "react";

import { entries } from "@/data/entries";

const areas = ["Tutte le aree", ...Array.from(new Set(entries.map((entry) => entry.area)))];

export default function Home() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("Tutte le aree");
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("it");
    return entries.filter((entry) => {
      const areaMatch = area === "Tutte le aree" || entry.area === area;
      const text = [entry.id, entry.title, entry.period, entry.area, entry.summary, ...entry.tags].join(" ").toLocaleLowerCase("it");
      return areaMatch && (!q || text.includes(q));
    });
  }, [query, area]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="/"><span className="brand-mark">Φ</span><span><strong>Dizionario filosofico</strong><small>Storia universale del pensiero</small></span></a>
        <nav aria-label="Navigazione principale"><a href="/enciclopedia">Enciclopedia</a><a href="/cronologie">Cronologie</a><a href="/indici">Indici</a><a href="#metodo">Il progetto</a><a href="#percorsi">Percorsi</a></nav>
      </header>
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Un progetto enciclopedico globale</p>
          <h1>La filosofia è una storia <em>plurale</em>.</h1>
          <p className="hero-copy">Un viaggio tra autori, idee, opere e tradizioni del mondo. Con rigore storico, apertura interculturale e strumenti per esplorare le connessioni senza cancellare le differenze.</p>
          <a className="primary-link" href="/enciclopedia">Esplora il dizionario <span aria-hidden="true">↘</span></a><a className="timeline-home-link" href="/cronologie">Esplora le cronologie parallele →</a>
        </div>
        <div className="hero-note" aria-hidden="true"><span>λόγος</span><span>道</span><span>धर्म</span><span>حكمة</span></div>
      </section>
      <section className="principles" id="metodo">
        <div><span className="principle-number">01</span><h2>Molte tradizioni</h2><p>Le storie filosofiche del mondo, ciascuna nel proprio contesto.</p></div>
        <div><span className="principle-number">02</span><h2>Confronti rigorosi</h2><p>Somiglianze, differenze e influenze documentate, senza equivalenze forzate.</p></div>
        <div><span className="principle-number">03</span><h2>Conoscenza verificabile</h2><p>Fonti, bibliografie e revisioni al centro di ogni voce.</p></div>
      </section>
      <section className="encyclopedia section-wrap" id="enciclopedia">
        <div className="section-heading"><div><p className="eyebrow">Il repertorio</p><h2>Esplora l&apos;enciclopedia</h2></div><span className="entry-count">{filtered.length} di {entries.length} voci</span></div>
        <div className="search-panel">
          <label className="search-label" htmlFor="entry-search">Cerca nel dizionario</label>
          <input id="entry-search" type="search" placeholder="Autore, concetto, opera, tradizione…" value={query} onChange={(e) => setQuery(e.target.value)} />
          <label className="filter-label" htmlFor="area-filter">Area culturale</label>
          <select id="area-filter" value={area} onChange={(e) => setArea(e.target.value)}>{areas.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
        {filtered.length ? <div className="entry-grid">{filtered.map((entry) => <a className="entry-card" href={`/enciclopedia/${entry.slug}`} key={entry.id}>
          <div className="card-meta"><span>{entry.kind}</span><span>{entry.id}</span></div><p className="entry-area">{entry.area}</p><h3>{entry.title}</h3><p className="entry-period">{entry.period}</p><p className="entry-description">{entry.description}</p>
          <div className="tag-list">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><span className="card-foot">Apri la scheda ↗</span>
        </a>)}</div> : <p className="empty-state">Nessuna voce trovata. Prova un altro termine o modifica il filtro.</p>}
        <p className="editorial-note">Il primo nucleo editoriale comprende 16 schede. La redazione è stata completata; le attribuzioni e le bibliografie restano soggette a verifica specialistica.</p>
      </section>
      <section className="pathways" id="percorsi"><div className="section-wrap pathways-inner"><p className="eyebrow">Oltre i confini</p><h2>La storia del pensiero, letta da più prospettive.</h2><p>Il progetto organizzerà cronologie parallele, atlanti storici, lessici multilingue e itinerari comparativi. Non una sola linea del tempo, ma molte storie in dialogo.</p></div></section>
      <footer className="site-footer"><span>© {new Date().getFullYear()} Dizionario universale della storia della filosofia</span><span>Edizione editoriale 1.0 · Italiano</span></footer>
    </main>
  );
}
