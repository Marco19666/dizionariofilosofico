import Link from "next/link";
import { entries } from "@/data/catalog";

export default function IndexPage() {
 return <main className="indexes-page">
 <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">Φ</span><span><strong>Dizionario filosofico</strong><small>Storia universale del pensiero</small></span></Link><nav><Link href="/indici">Tutti gli indici</Link><Link href="/enciclopedia">Enciclopedia</Link></nav></header>
 <section className="indexes-hero"><p className="eyebrow">Indice 01 · Persone</p><h1>Autori</h1><p>Filosofi e pensatori presenti nell'enciclopedia, ordinati alfabeticamente.</p></section>
 <div className="section-wrap indexes-content"><section className="index-section"><ol className="alphabetical-index">{[...entries].filter((entry) => entry.kind === "autore").sort((a,b) => a.title.localeCompare(b.title,"it")).map((entry) => <li key={entry.id}><Link href={`/enciclopedia/${entry.slug}`}>{entry.title}</Link><span>{entry.period} · {entry.area}</span><small>{entry.id}</small></li>)}</ol></section><p className="editorial-note"><Link href="/indici">← Torna agli indici</Link></p></div>
 <footer className="site-footer"><span>© {new Date().getFullYear()} Dizionario universale della storia della filosofia</span></footer></main>;
}
