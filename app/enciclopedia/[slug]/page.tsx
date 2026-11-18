import Link from "next/link";
import { notFound } from "next/navigation";
import { entries, getEntryBySlug } from "@/data/entries";

export function generateStaticParams() {
  return entries.map((entry) => ({ slug: entry.slug }));
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);
  if (!entry) notFound();

  return (
    <main className="entry-page">
      <header className="site-header">
        <Link className="brand" href="/"><span className="brand-mark">Φ</span><span><strong>Dizionario filosofico</strong><small>Storia universale del pensiero</small></span></Link>
        <nav aria-label="Navigazione principale"><Link href="/enciclopedia">Enciclopedia</Link><Link href="/#metodo">Il progetto</Link></nav>
      </header>
      <div className="entry-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/enciclopedia">Enciclopedia</Link><span>/</span><span>{entry.title}</span></div>
      <section className="entry-hero">
        <p className="eyebrow">{entry.kind} · {entry.id}</p><p className="entry-area">{entry.area}</p>
        <h1>{entry.title}</h1><p className="entry-subtitle">{entry.subtitle}</p><p className="entry-period">{entry.period}</p>
        <p className="entry-lead">{entry.summary}</p><span className="status-note">Scheda dimostrativa · revisione scientifica da completare</span>
      </section>
      <div className="entry-layout">
        <article className="entry-article">
          {entry.sections.map((section) => <section className="article-section" key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>)}
          <section className="article-section"><h2>Bibliografia e fonti</h2><ul className="bibliography-list">{entry.bibliography.map((item) => <li key={item.label}><strong>{item.label}</strong><span>{item.note}</span></li>)}</ul></section>
          {entry.related.length > 0 && <section className="article-section"><h2>Voci correlate</h2><ul className="related-list">{entry.related.map((item) => <li key={item.slug}><Link href={`/enciclopedia/${item.slug}`}>{item.label}</Link><span>{item.relation}</span></li>)}</ul></section>}
          {comparativePaths.filter((path) => path.entries.includes(entry.slug)).length > 0 && (
            <section className="article-section">
              <h2>Percorsi comparativi</h2>
              <p>Confronti guidati tra voci del dizionario. Le connessioni indicano problemi di ricerca, non equivalenze automatiche.</p>
              <ul className="related-list">
                {comparativePaths.filter((path) => path.entries.includes(entry.slug)).map((path) => (
                  <li key={path.slug}>
                    <strong>{path.title}</strong>
                    <span>{path.entries.map((slug, index) => {
                      const linkedEntry = entries.find((candidate) => candidate.slug === slug);
                      return linkedEntry ? <span key={slug}>{index > 0 ? " · " : ""}<Link href={`/enciclopedia/${slug}`}>{linkedEntry.title}</Link></span> : null;
                    })}</span>
                    <span>{path.question}</span>
                    <span>{path.methodNote}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
        <aside className="entry-aside">
          <div><p className="eyebrow">Identificazione</p><dl><dt>Tipologia</dt><dd>{entry.kind}</dd><dt>Area culturale</dt><dd>{entry.area}</dd><dt>Periodo</dt><dd>{entry.period}</dd><dt>Codice</dt><dd>{entry.id}</dd></dl></div>
          <div><p className="eyebrow">Parole chiave</p><div className="tag-list">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
          <Link className="back-link" href="/enciclopedia">← Torna all'enciclopedia</Link>
        </aside>
      </div>
      <footer className="site-footer"><span>© {new Date().getFullYear()} Dizionario universale della storia della filosofia</span><span>Voce in fase di elaborazione</span></footer>
    </main>
  );
}
