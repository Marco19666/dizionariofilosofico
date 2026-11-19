import Link from "next/link";
import { entries } from "@/data/entries";
const authors = entries.filter((entry) => entry.kind === "autore");
const themes = [...new Set(entries.flatMap((entry) => entry.tags))];
const works = entries.flatMap((entry) => entry.works ?? []);
const sections = [
  { href: "/indici/autori", title: "Autori", description: "Filosofi e pensatori in ordine alfabetico.", count: authors.length },
  { href: "/indici/temi", title: "Temi", description: "Concetti, problemi e parole chiave.", count: themes.length },
  { href: "/indici/opere", title: "Opere", description: "Libri, dialoghi, trattati e testi.", count: works.length },
  { href: "/lessico", title: "Lessico filosofico", description: "Termini, definizioni e distinzioni tra tradizioni.", count: 50 },
];
export default function IndexesPage() {
  return <main className="indexes-page">
    <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">Φ</span><span><strong>Dizionario filosofico</strong><small>Storia universale del pensiero</small></span></Link><nav><Link href="/">Home</Link><Link href="/enciclopedia">Enciclopedia</Link><Link href="/cronologie">Cronologie</Link></nav></header>
    <section className="indexes-hero"><p className="eyebrow">Strumenti di consultazione</p><h1>Indici</h1><p>Indici dedicati e un lessico autonomo per esplorare autori, temi, opere e concetti.</p><div className="indexes-stat"><strong>{authors.length}</strong><span>autori</span><strong>{themes.length}</strong><span>temi</span><strong>{works.length}</strong><span>opere e testi</span></div></section>
    <div className="section-wrap indexes-content"><div className="index-columns">{sections.map((section, i) => <Link className="index-group" href={section.href} key={section.href}><p className="eyebrow">0{i + 1} · Indice dedicato</p><h2>{section.title}</h2><p>{section.description}</p><strong>{section.count} elementi</strong><p>Apri l'indice →</p></Link>)}</div>
      <section className="index-section"><div className="section-heading"><div><p className="eyebrow">Altri strumenti</p><h2>Orientarsi nel repertorio</h2></div></div><div className="index-columns"><div className="index-group"><h3>Per epoca</h3><p>Consulta le voci attraverso la loro collocazione storica.</p><Link href="/cronologie">Cronologie parallele →</Link></div><div className="index-group"><h3>Per tipologia</h3><p>Scuole, tradizioni e periodi.</p><Link href="/enciclopedia">Esplora l'enciclopedia →</Link></div></div></section>
      <p className="editorial-note">Gli indici sono generati direttamente dai dati delle schede e si aggiornano insieme al repertorio.</p></div>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Dizionario universale della storia della filosofia</span><span>Indici editoriali</span></footer></main>;
}