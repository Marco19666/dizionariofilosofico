import Link from "next/link";
import { entries } from "@/data/entries";

export default function IndexPage() {
 return <main className="indexes-page">
 <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">Φ</span><span><strong>Dizionario filosofico</strong><small>Storia universale del pensiero</small></span></Link><nav><Link href="/indici">Tutti gli indici</Link><Link href="/enciclopedia">Enciclopedia</Link></nav></header>
 <section className="indexes-hero"><p className="eyebrow">Indice 03 · Testi e bibliografia</p><h1>Opere</h1><p>Libri, dialoghi, trattati e testi registrati nelle schede dell'enciclopedia.</p></section>
 <div className="section-wrap indexes-content"><section className="index-section"><ul className="work-index">{entries.flatMap((entry) => (entry.works ?? []).map((work) => ({...work,entry}))).sort((a,b) => a.title.localeCompare(b.title,"it")).map((work,index) => <li key={work.entry.id + work.title + index}><strong>{work.title}</strong><span>{work.note}</span><Link href={`/enciclopedia/${work.entry.slug}`}>{work.entry.title}</Link></li>)}</ul></section><p className="editorial-note"><Link href="/indici">← Torna agli indici</Link></p></div>
 <footer className="site-footer"><span>© {new Date().getFullYear()} Dizionario universale della storia della filosofia</span></footer></main>;
}
