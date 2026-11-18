"use client";

import { useMemo, useState } from "react";

type Entry = {
  id: string; title: string; period: string; area: string;
  description: string; tags: string[];
};

const entries: Entry[] = [
  { id: "AUT-000011", title: "Platone", period: "Antichità · IV secolo a.C.", area: "Grecia antica", description: "Filosofo ateniese, autore di dialoghi dedicati a conoscenza, giustizia, anima, politica e realtà.", tags: ["Grecia", "metafisica", "conoscenza"] },
  { id: "AUT-000012", title: "Aristotele", period: "Antichità · IV secolo a.C.", area: "Grecia antica", description: "Filosofo e studioso di molteplici discipline; la sua opera ha segnato logica, metafisica, etica e filosofia della natura.", tags: ["Grecia", "logica", "etica"] },
  { id: "AUT-000013", title: "Confucio", period: "Antichità · VI–V secolo a.C.", area: "Cina", description: "Maestro associato alla tradizione confuciana, attento alla formazione morale, ai riti e alla vita politica.", tags: ["Cina", "confucianesimo", "virtù"] },
  { id: "AUT-000014", title: "Laozi", period: "Antichità · datazione discussa", area: "Cina", description: "Figura tradizionalmente associata al Daodejing e alla riflessione sul dao, sulla spontaneità e sul non-agire.", tags: ["Cina", "daoismo", "dao"] },
  { id: "AUT-000015", title: "Nāgārjuna", period: "Antichità tarda · datazione discussa", area: "India", description: "Filosofo buddhista centrale per la tradizione Madhyamaka e per l'analisi della vacuità e dell'origine dipendente.", tags: ["India", "buddhismo", "vacuità"] },
  { id: "AUT-000016", title: "Avicenna", period: "Medioevo · X–XI secolo", area: "Mondo persiano e islamico", description: "Filosofo e medico che elaborò una influente metafisica e una distinzione tra essenza ed esistenza.", tags: ["Persia", "filosofia islamica", "metafisica"] }
];

const areas = ["Tutte le aree", "Grecia antica", "Cina", "India", "Mondo persiano e islamico"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("Tutte le aree");
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("it");
    return entries.filter((entry) => {
      const areaMatch = area === "Tutte le aree" || entry.area === area;
      const text = [entry.id, entry.title, entry.period, entry.area, entry.description, ...entry.tags].join(" ").toLocaleLowerCase("it");
      return areaMatch && (!q || text.includes(q));
    });
  }, [query, area]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="/"><span className="brand-mark">Φ</span><span><strong>Dizionario filosofico</strong><small>Storia universale del pensiero</small></span></a>
        <nav aria-label="Navigazione principale"><a href="#enciclopedia">Enciclopedia</a><a href="#metodo">Il progetto</a><a href="#percorsi">Percorsi</a></nav>
      </header>
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Un progetto enciclopedico globale</p>
          <h1>La filosofia è una storia <em>plurale</em>.</h1>
          <p className="hero-copy">Un viaggio tra autori, idee, opere e tradizioni del mondo. Con rigore storico, apertura interculturale e strumenti per esplorare le connessioni senza cancellare le differenze.</p>
          <a className="primary-link" href="#enciclopedia">Esplora il dizionario <span aria-hidden="true">↘</span></a>
        </div>
        <div className="hero-note" aria-hidden="true"><span>λόγος</span><span>道</span><span>धर्म</span><span>حكمة</span></div>
      </section>
      <section className="principles" id="metodo">
        <div><span className="principle-number">01</span><h2>Molte tradizioni</h2><p>Le storie filosofiche del mondo, ciascuna nel proprio contesto.</p></div>
        <div><span className="principle-number">02</span><h2>Confronti rigorosi</h2><p>Somiglianze, differenze e influenze documentate, senza equivalenze forzate.</p></div>
        <div><span className="principle-number">03</span><h2>Conoscenza verificabile</h2><p>Fonti, bibliografie e revisioni al centro di ogni voce.</p></div>
      </section>
      <section className="encyclopedia section-wrap" id="enciclopedia">
        <div className="section-heading"><div><p className="eyebrow">Il repertorio</p><h2>Esplora l&apos;enciclopedia</h2></div><span className="entry-count">{filtered.length} voci dimostrative</span></div>
        <div className="search-panel">
          <label className="search-label" htmlFor="entry-search">Cerca nel dizionario</label>
          <input id="entry-search" type="search" placeholder="Autore, concetto, opera, tradizione…" value={query} onChange={(e) => setQuery(e.target.value)} />
          <label className="filter-label" htmlFor="area-filter">Area culturale</label>
          <select id="area-filter" value={area} onChange={(e) => setArea(e.target.value)}>{areas.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
        {filtered.length ? <div className="entry-grid">{filtered.map((entry) => <article className="entry-card" key={entry.id}>
          <div className="card-meta"><span>Autore</span><span>{entry.id}</span></div><p className="entry-area">{entry.area}</p><h3>{entry.title}</h3><p className="entry-period">{entry.period}</p><p className="entry-description">{entry.description}</p>
          <div className="tag-list">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><span className="card-foot">Scheda dimostrativa</span>
        </article>)}</div> : <p className="empty-state">Nessuna voce trovata. Prova un altro termine o modifica il filtro.</p>}
        <p className="editorial-note">Le schede mostrate sono contenuti iniziali dimostrativi: non costituiscono ancora voci enciclopediche sottoposte a revisione scientifica.</p>
      </section>
      <section className="pathways" id="percorsi"><div className="section-wrap pathways-inner"><p className="eyebrow">Oltre i confini</p><h2>La storia del pensiero, letta da più prospettive.</h2><p>Il progetto organizzerà cronologie parallele, atlanti storici, lessici multilingue e itinerari comparativi. Non una sola linea del tempo, ma molte storie in dialogo.</p></div></section>
      <footer className="site-footer"><span>© {new Date().getFullYear()} Dizionario universale della storia della filosofia</span><span>Progetto in fase di sviluppo · Italiano</span></footer>
    </main>
  );
}
