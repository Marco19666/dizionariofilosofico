import Link from "next/link";
import { entries } from "@/data/catalog";

export default function IndexPage() {
 return <main className="indexes-page">
 <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">Φ</span><span><strong>Dizionario filosofico</strong><small>Storia universale del pensiero</small></span></Link><nav><Link href="/indici">Tutti gli indici</Link><Link href="/enciclopedia">Enciclopedia</Link></nav></header>
 <section className="indexes-hero"><p className="eyebrow">Indice 02 · Idee e problemi</p><h1>Temi</h1><p>Concetti, questioni e parole chiave: ogni tema raccoglie le voci enciclopediche pertinenti.</p></section>
 <div className="section-wrap indexes-content"><section className="index-section"><div className="tag-index">{[...new Set(entries.flatMap((entry) => entry.tags))].sort((a,b) => a.localeCompare(b,"it")).map((tag) => <div key={tag}><strong>{tag}</strong><span>{entries.filter((entry) => entry.tags.includes(tag)).sort((a,b) => a.title.localeCompare(b.title,"it")).map((entry) => <Link key={entry.id} href={`/enciclopedia/${entry.slug}`}>{entry.title}</Link>)}</span></div>)}</div></section><p className="editorial-note"><Link href="/indici">← Torna agli indici</Link></p></div>
 <footer className="site-footer"><span>© {new Date().getFullYear()} Dizionario universale della storia della filosofia</span></footer></main>;
}
