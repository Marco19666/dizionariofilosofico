"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { terms } from "@/data/terms";
import { entries } from "@/data/entries";



const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const suggestions = Array.from(new Set([...terms.map((item) => item.term), ...entries.filter((entry) => entry.kind === "autore").map((entry) => entry.title)]));
export default function LexiconPage() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("Tutte le aree");
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("it");
    return terms.filter((item) => (area === "Tutte le aree" || item.area === area) && (!q || [item.term,item.area,item.definition,item.distinction].join(" ").toLocaleLowerCase("it").includes(q)));
  }, [query, area]);
  const areas = ["Tutte le aree", ...Array.from(new Set(terms.map((item) => item.area))).sort((a,b)=>a.localeCompare(b,"it"))];
  const groups = alphabet.map((letter) => ({letter,items:filtered.filter((item)=>item.term.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleUpperCase("it").startsWith(letter))})).filter((group)=>group.items.length);
  return <main className="lexicon-page">
    <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">Φ</span><span><strong>Dizionario filosofico</strong><small>Storia universale del pensiero</small></span></Link><nav aria-label="Navigazione principale"><Link href="/enciclopedia">Enciclopedia</Link><Link href="/cronologie">Cronologie</Link><Link href="/indici">Indici</Link><Link href="/">Home</Link></nav></header>
    <section className="lexicon-hero"><p className="eyebrow">Strumento di consultazione</p><h1>Lessico filosofico</h1><p>Parole, concetti e distinzioni per orientarsi tra le tradizioni del pensiero. Le definizioni indicano i principali usi storici senza presumere che un termine abbia sempre lo stesso significato.</p><div className="lexicon-count"><strong>{filtered.length}</strong><span>di {terms.length} termini</span></div></section>
    <div className="section-wrap lexicon-content">
      <div className="lexicon-search"><label htmlFor="lexicon-search">Cerca un termine o una definizione</label><input id="lexicon-search" type="search" list="lexicon-suggestions" autoComplete="off" placeholder="Es. essere, dharma, dialettica…" value={query} onChange={(event)=>setQuery(event.target.value)}/><datalist id="lexicon-suggestions">{suggestions.map((suggestion) => <option key={suggestion} value={suggestion} />)}</datalist><label htmlFor="lexicon-area">Ambito</label><select id="lexicon-area" value={area} onChange={(event)=>setArea(event.target.value)}>{areas.map((item)=><option key={item}>{item}</option>)}</select></div>
      <nav className="lexicon-letters" aria-label="Indice alfabetico">{alphabet.map((letter)=><a key={letter} className={groups.some((group)=>group.letter===letter)?"":"disabled"} href={groups.some((group)=>group.letter===letter?true:false)?`#letter-${letter}`:undefined}>{letter}</a>)}</nav>
      {groups.length ? groups.map((group)=><section className="lexicon-letter" id={`letter-${group.letter}`} key={group.letter}><h2>{group.letter}</h2><div className="lexicon-terms">{group.items.map((item)=><article className="lexicon-term" key={item.term}><div className="lexicon-term-heading"><h3>{item.term}</h3><span>{item.area}</span></div><p>{item.definition}</p><p className="lexicon-distinction"><strong>Da distinguere:</strong> {item.distinction}</p>{item.related?.length ? <div className="lexicon-related">{item.related.map((link)=><Link href={`/enciclopedia/${link.slug}`} key={link.slug}>{link.label} ↗</Link>)}</div>:null}</article>)}</div></section>):<p className="empty-state">Nessun termine corrisponde alla ricerca. Prova un’altra parola o modifica l’ambito.</p>}
      <p className="editorial-note">Lessico in ampliamento. I termini sono definiti nel loro contesto storico e culturale; le traduzioni sono orientative e non sostituiscono l’uso specifico nelle singole tradizioni.</p>
    </div>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Dizionario universale della storia della filosofia</span><span>Lessico filosofico · Edizione iniziale</span></footer>
  </main>;
}
