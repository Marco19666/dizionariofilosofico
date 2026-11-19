"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Event = { id: string; date: string; sort: number; area: string; title: string; detail: string; slug?: string; certainty: string };
const events: Event[] = [
  {id:"e1",date:"III millennio a.C. (circa)",sort:-2500,area:"Egitto e Vicino Oriente",title:"Sapienze egizie e mesopotamiche",detail:"Testi sapienziali, riflessioni sulla giustizia, sull'ordine, sul destino e sul buon governo circolano in contesti scribali. Le raccolte hanno storie redazionali complesse.",certainty:"Tradizioni testuali stratificate"},
  {id:"e2",date:"XXIV–XXIII secolo a.C. (datazione discussa)",sort:-2300,area:"Egitto e Vicino Oriente",title:"Insegnamenti attribuiti a Ptahhotep",detail:"La tradizione egizia conserva massime sull'autocontrollo, la parola, l'ascolto e la condotta sociale; la datazione della composizione e dei testimoni è discussa.",certainty:"Attribuzione e datazione discusse"},
  {id:"e3",date:"I millennio a.C.",sort:-950,area:"India",title:"Composizione e trasmissione delle Upaniṣad antiche",detail:"Si sviluppano riflessioni su ātman, brahman, conoscenza e liberazione. I testi appartengono a fasi diverse e non a un singolo momento.",certainty:"Processo testuale plurisecolare"},
  {id:"e4",date:"VIII–VI secolo a.C.",sort:-650,area:"Grecia e Mediterraneo",title:"Prime indagini filosofiche greche",detail:"Nelle città greche d'Asia Minore e poi in altri centri si sviluppano ricerche sulla natura, sull'arché e sulle trasformazioni del cosmo.",certainty:"Periodizzazione convenzionale"},
  {id:"e5",date:"VI–V secolo a.C.",sort:-500,area:"Cina",title:"Confucio e le tradizioni confuciane",detail:"La vita di Confucio è tradizionalmente collocata tra il VI e il V secolo a.C.; i Dialoghi si formano attraverso una trasmissione successiva.",slug:"confucio",certainty:"Date biografiche tradizionali"},
  {id:"e6",date:"VI–V secolo a.C.",sort:-500,area:"India",title:"Vita del Buddha e prime comunità buddhiste",detail:"La cronologia del Buddha storico è dibattuta. Le comunità buddhiste elaborano progressivamente dottrine, pratiche e testi.",certainty:"Cronologia storica discussa"},
  {id:"e7",date:"V secolo a.C.",sort:-450,area:"Grecia e Mediterraneo",title:"Socrate ad Atene",detail:"La ricerca etica e il dialogo socratico sono ricostruiti attraverso testimonianze differenti, soprattutto Platone e Senofonte.",certainty:"Vita circa 469–399 a.C."},
  {id:"e8",date:"V–III secolo a.C.",sort:-350,area:"Cina",title:"Le Cento scuole del pensiero",detail:"Confuciani, moisti, daoisti, legisti e altre correnti discutono ordine politico, linguaggio, natura umana e condotta.",certainty:"Etichetta storiografica per un periodo ampio"},
  {id:"e9",date:"IV secolo a.C.",sort:-350,area:"Grecia e Mediterraneo",title:"Platone e la fondazione dell'Accademia",detail:"I dialoghi platonici affrontano conoscenza, giustizia, anima, forme e organizzazione della città.",slug:"platone",certainty:"Circa 427–347 a.C."},
  {id:"e10",date:"IV secolo a.C.",sort:-330,area:"Grecia e Mediterraneo",title:"Aristotele e il Liceo",detail:"Si organizzano ricerche di logica, metafisica, biologia, fisica, etica, poetica e politica.",slug:"aristotele",certainty:"384–322 a.C."},
  {id:"e11",date:"IV–III secolo a.C.",sort:-300,area:"India",title:"Sviluppo delle scuole śramaṇa e dei sistemi classici",detail:"Tradizioni buddhiste, jaina e brahmaniche articolano posizioni differenti su conoscenza, causalità, disciplina e liberazione.",certainty:"Sviluppi plurali e non simultanei"},
  {id:"e12",date:"III secolo a.C.",sort:-250,area:"Grecia e Mediterraneo",title:"Epicureismo e stoicismo",detail:"Epicuro e Zenone di Cizio avviano scuole che elaborano etica, fisica e logica; le tradizioni si trasformano nei secoli successivi.",slug:"stoicismo",certainty:"Fondazioni convenzionalmente datate al IV–III secolo a.C."},
  {id:"e13",date:"III secolo a.C. – I secolo d.C.",sort:-100,area:"Cina",title:"Consolidamento dei classici e del pensiero imperiale",detail:"I testi classici vengono raccolti, commentati e istituzionalizzati; il rapporto tra confucianesimo, cosmologia e governo assume nuove forme.",certainty:"Processo storico di lunga durata"},
  {id:"e14",date:"I secolo a.C. – I secolo d.C.",sort:0,area:"India",title:"Prime fasi della letteratura mahāyāna",detail:"Si compongono e circolano sutra mahāyāna; datazioni e stratificazioni variano secondo i testi e le tradizioni manoscritte.",certainty:"Intervallo ampio e discusso"},
  {id:"e15",date:"I–II secolo d.C. (circa)",sort:125,area:"India",title:"Nāgārjuna e la filosofia Madhyamaka",detail:"Le opere attribuite a Nāgārjuna sviluppano un'analisi della vacuità e della causalità; la cronologia dell'autore resta incerta.",slug:"nagarjuna",certainty:"Datazione discussa"},
  {id:"e16",date:"II–III secolo d.C.",sort:225,area:"Grecia e Mediterraneo",title:"Plotino e il neoplatonismo",detail:"Le Enneadi, ordinate da Porfirio, articolano una filosofia dell'Uno, dell'Intelletto e dell'Anima.",certainty:"Plotino circa 204/5–270"},
  {id:"e17",date:"IV–V secolo",sort:400,area:"Africa e Mediterraneo",title:"Agostino d'Ippona",detail:"Le opere di Agostino intrecciano platonismo, cristianesimo, interiorità, tempo, memoria e problema del male.",certainty:"354–430"},
  {id:"e18",date:"VI–VII secolo",sort:600,area:"Cina",title:"Fioritura del buddhismo cinese",detail:"Traduzioni, commentari e scuole interpretative trasformano il buddhismo nel contesto intellettuale cinese.",certainty:"Processo di lunga durata"},
  {id:"e19",date:"VIII–IX secolo",sort:800,area:"Mondo islamico",title:"Movimento delle traduzioni e filosofia in arabo",detail:"A Baghdad e in altri centri vengono tradotti e discussi testi greci, siriaci e persiani; si sviluppano nuove pratiche filosofiche e scientifiche.",certainty:"Processo pluridecennale"},
  {id:"e20",date:"IX–X secolo",sort:900,area:"Mondo islamico",title:"Al-Kindī e al-Fārābī",detail:"La falsafa in lingua araba elabora temi di metafisica, intelletto, scienza, profezia e città virtuosa.",certainty:"Cronologie individuali differenti"},
  {id:"e21",date:"X–XI secolo",sort:1000,area:"Mondo islamico",title:"Avicenna (Ibn Sīnā)",detail:"Le sue opere sistematizzano logica, filosofia della natura, psicologia e metafisica e influenzano tradizioni latine e islamiche.",slug:"avicenna",certainty:"Circa 980–1037"},
  {id:"e22",date:"XI–XII secolo",sort:1100,area:"Europa latina",title:"Rinascita delle scuole e traduzioni",detail:"Scuole urbane, traduzioni e commenti favoriscono nuove forme di logica, teologia e filosofia naturale nell'Europa latina.",certainty:"Periodizzazione storiografica"},
  {id:"e23",date:"XII secolo",sort:1150,area:"Mondo islamico",title:"Averroè (Ibn Rushd)",detail:"I commenti ad Aristotele e gli scritti su filosofia e religione diventano centrali nelle discussioni filosofiche mediterranee.",certainty:"1126–1198"},
  {id:"e24",date:"XIII secolo",sort:1250,area:"Europa latina",title:"Scolastica universitaria",detail:"Le università europee consolidano la discussione sistematica su metafisica, etica, conoscenza e rapporto tra ragione e fede.",certainty:"Sviluppo istituzionale non uniforme"},
  {id:"e25",date:"XIII secolo",sort:1250,area:"Asia orientale",title:"Dōgen e il buddhismo Zen giapponese",detail:"Dōgen sviluppa una riflessione originale su pratica, tempo, linguaggio e risveglio nella tradizione Sōtō.",certainty:"1200–1253"},
  {id:"e26",date:"XIV secolo",sort:1350,area:"Africa e Mediterraneo",title:"Ibn Khaldūn e la filosofia della storia",detail:"La Muqaddima propone un'analisi della società, del potere, della solidarietà e delle condizioni della conoscenza storica.",certainty:"1332–1406"},
  {id:"e27",date:"XV–XVI secolo",sort:1500,area:"Europa latina",title:"Umanesimo e trasformazioni della filosofia",detail:"Filologia, riscoperta dei testi antichi, riforme religiose e nuove pratiche scientifiche modificano i quadri della riflessione europea.",certainty:"Periodizzazione ampia"},
  {id:"e28",date:"XVII secolo",sort:1625,area:"Europa",title:"Razionalismo e nuove filosofie della natura",detail:"Cartesio, Spinoza e Leibniz elaborano sistemi diversi su sostanza, mente, conoscenza e ordine naturale.",certainty:"Autori e opere distribuiti nel secolo"},
  {id:"e29",date:"XVII secolo",sort:1650,area:"Africa",title:"Zera Yacob e la filosofia etiopica",detail:"Il testo Hatata, associato a Zera Yacob, propone un'indagine razionale su fede, ragione, giustizia e dignità umana; storia e datazione del testo sono oggetto di discussione.",certainty:"Attribuzione e contesto discussi"},
  {id:"e30",date:"XVII–XVIII secolo",sort:1700,area:"Asia meridionale",title:"Filosofie e riforme nell'India moderna",detail:"Nel subcontinente indiano si confrontano tradizioni filosofiche, dibattiti religiosi e nuove condizioni politiche e intellettuali.",certainty:"Quadro plurale, non riducibile a un singolo evento"},
  {id:"e31",date:"XVIII secolo",sort:1750,area:"Europa",title:"Illuminismo e filosofia critica",detail:"Kant, Hume, Rousseau e altri autori riformulano i problemi di conoscenza, autonomia, politica, storia e religione.",certainty:"Opere distribuite nel secolo"},
  {id:"e32",date:"XIX secolo",sort:1850,area:"Europa",title:"Idealismo, materialismo e critica della modernità",detail:"Hegel, Marx, Kierkegaard, Nietzsche e altri autori trasformano il dibattito su storia, società, soggettività e valori.",certainty:"Correnti e autori non omogenei"},
  {id:"e33",date:"XIX–XX secolo",sort:1900,area:"Asia orientale",title:"Modernizzazione e nuove filosofie in Giappone e Cina",detail:"La ricezione della filosofia europea si intreccia con riforme, nazionalismi, tradizioni locali e nuove scuole di pensiero.",certainty:"Processo storico articolato"},
  {id:"e34",date:"XX secolo",sort:1950,area:"Europa e Americhe",title:"Fenomenologia, esistenzialismo e filosofia analitica",detail:"Si sviluppano programmi diversi su esperienza, linguaggio, logica, scienza, libertà e condizione umana.",certainty:"Etichette per movimenti plurali"},
  {id:"e36",date:"VI–V secolo a.C.",sort:-500,area:"Cina",title:"Mozi e il mohismo",detail:"Mozi e i suoi seguaci criticano il particolarismo, difendono una forma di cura imparziale e discutono guerra, utilità pubblica, rituali e criteri del governo.",certainty:"Cronologia dell'autore e stratificazione dei testi discusse"},
  {id:"e37",date:"V–III secolo a.C.",sort:-400,area:"Cina",title:"Mencio e Xunzi: dibattiti sulla natura umana",detail:"Mencio sostiene la presenza di germogli morali innati; Xunzi insiste sul ruolo formativo di educazione, rituali e istituzioni. Il confronto segna profondamente il confucianesimo.",certainty:"Autori collocati in fasi diverse del periodo"},
  {id:"e38",date:"IV–III secolo a.C.",sort:-320,area:"Cina",title:"Zhuangzi e il pensiero daoista",detail:"I testi associati a Zhuangzi mettono in discussione distinzioni rigide, convenzioni linguistiche e ambizioni di controllo, valorizzando trasformazione e spontaneità.",certainty:"Opera composita, formata in più strati"},
  {id:"e39",date:"VI–V secolo a.C.",sort:-480,area:"India",title:"Mahāvīra e la tradizione jaina",detail:"La tradizione jaina sviluppa una disciplina di nonviolenza, ascesi e liberazione. La cronologia di Mahāvīra varia tra ricostruzioni storiche e tradizioni religiose.",certainty:"Cronologia tradizionale e ricostruzioni non coincidenti"},
  {id:"e40",date:"I secolo a.C. – I secolo d.C.",sort:25,area:"Grecia e Mediterraneo",title:"Filosofia ellenistica a Roma",detail:"Cicerone contribuisce alla ricezione latina delle scuole greche, traducendo e discutendo problemi di etica, politica, conoscenza e dovere.",certainty:"106–43 a.C.; opere distribuite nella tarda repubblica"},
  {id:"e41",date:"I secolo d.C.",sort:75,area:"Africa e Mediterraneo",title:"Filone di Alessandria",detail:"Filone interpreta la tradizione ebraica attraverso categorie della filosofia greca, soprattutto platoniche e stoiche, sviluppando un lessico influente per il pensiero successivo.",certainty:"Circa 20 a.C. – 50 d.C."},
  {id:"e42",date:"IV–V secolo",sort:425,area:"India",title:"Vasubandhu e lo sviluppo delle scuole buddhiste",detail:"Le opere attribuite a Vasubandhu affrontano coscienza, percezione, costruzione dell'esperienza e analisi della realtà, in un contesto di intenso dibattito tra scuole.",certainty:"Datazione dell'autore discussa"},
  {id:"e43",date:"VII–VIII secolo",sort:700,area:"India",title:"Śaṅkara e l'Advaita Vedānta",detail:"La tradizione advaita, associata a Śaṅkara, elabora una lettura non-dualista del rapporto tra brahman, ātman e mondo, attraverso commenti e testi sistematici.",certainty:"Cronologia tradizionale dell'autore discussa"},
  {id:"e44",date:"XI secolo",sort:1050,area:"Mondo islamico",title:"Al-Ghazālī: filosofia, teologia e esperienza spirituale",detail:"Al-Ghazālī critica alcune tesi dei filosofi, ne utilizza strumenti logici e affronta il rapporto tra dimostrazione razionale, fede e trasformazione interiore.",certainty:"1058–1111"},
  {id:"e45",date:"XII secolo",sort:1150,area:"Europa e Mediterraneo",title:"Maimonide e la filosofia ebraica",detail:"Maimonide affronta il rapporto tra ragione e rivelazione, l'interpretazione della Scrittura e i limiti del linguaggio umano quando parla di Dio.",certainty:"1138–1204"},
  {id:"e46",date:"XIII secolo",sort:1270,area:"Europa latina",title:"Tommaso d'Aquino: sintesi aristotelica e teologia",detail:"Tommaso integra strumenti aristotelici nella riflessione su essere, causalità, conoscenza, etica e teologia, distinguendo ma coordinando ragione e fede.",certainty:"Circa 1225–1274"},
  {id:"e47",date:"XV–XVI secolo",sort:1500,area:"Asia orientale",title:"Neoconfucianesimo e Wang Yangming",detail:"Wang Yangming sviluppa una filosofia dell'unità tra conoscenza e azione e della consapevolezza morale, reinterpretando criticamente la tradizione neoconfuciana.",certainty:"1472–1529"},
  {id:"e48",date:"XV–XVI secolo",sort:1510,area:"Europa",title:"Machiavelli e la riflessione sulla politica",detail:"Il pensiero politico di Machiavelli analizza conflitto, potere, istituzioni e fortuna, osservando la politica nella sua autonomia e concretezza storica.",certainty:"1469–1527"},
  {id:"e49",date:"XVI–XVII secolo",sort:1600,area:"Europa",title:"Francis Bacon e il nuovo metodo",detail:"Bacon promuove una riforma del sapere fondata sull'indagine della natura, sulla critica degli idoli e su procedure di ricerca organizzate.",certainty:"1561–1626"},
  {id:"e50",date:"XVII–XVIII secolo",sort:1690,area:"Europa",title:"Locke e la filosofia dell'esperienza",detail:"Locke indaga origine e limiti della conoscenza, identità personale, tolleranza e legittimità del potere politico.",certainty:"1632–1704"},
  {id:"e51",date:"XVIII secolo",sort:1790,area:"Europa",title:"Mary Wollstonecraft e l'uguaglianza",detail:"Wollstonecraft contesta l'educazione diseguale e argomenta a favore dell'uguaglianza razionale e civile delle donne.",certainty:"1759–1797"},
  {id:"e52",date:"XIX–XX secolo",sort:1905,area:"Africa e Americhe",title:"W. E. B. Du Bois: razza, democrazia e doppia coscienza",detail:"Du Bois analizza la costruzione sociale della razza, la segregazione e la tensione vissuta dai soggetti afroamericani tra appartenenza e sguardo dominante.",certainty:"1868–1963"},
  {id:"e53",date:"XIX–XX secolo",sort:1920,area:"Asia meridionale",title:"Rabindranath Tagore e il pensiero umanista",detail:"Tagore intreccia educazione, libertà, creatività e dialogo tra culture, criticando nazionalismi esclusivi e modelli puramente strumentali di sviluppo.",certainty:"1861–1941"},
  {id:"e54",date:"XX secolo",sort:1935,area:"Asia meridionale",title:"B. R. Ambedkar: democrazia e critica delle caste",detail:"Ambedkar collega libertà, uguaglianza e fraternità alla critica radicale della gerarchia castale e alla trasformazione delle istituzioni democratiche.",certainty:"1891–1956"},
  {id:"e55",date:"XX secolo",sort:1945,area:"Europa",title:"Hannah Arendt e la teoria del totalitarismo",detail:"Arendt indaga totalitarismo, azione politica, pluralità, responsabilità e spazio pubblico, distinguendo la politica dalla semplice amministrazione del potere.",certainty:"1906–1975"},
  {id:"e56",date:"XX secolo",sort:1955,area:"Africa e Americhe",title:"Frantz Fanon: colonialismo e liberazione",detail:"Fanon analizza gli effetti psichici e politici del colonialismo e il rapporto tra violenza, soggettività, cultura e liberazione.",certainty:"1925–1961"},
  {id:"e57",date:"XX secolo",sort:1960,area:"Europa",title:"Simone de Beauvoir e la filosofia della condizione femminile",detail:"De Beauvoir esamina la costruzione storica della condizione femminile, la libertà situata e i meccanismi culturali che producono subordinazione.",certainty:"1908–1986"},
  {id:"e35",date:"XX–XXI secolo",sort:2000,area:"Mondo",title:"Filosofie globali e dialoghi interculturali",detail:"La ricerca filosofica si confronta con decolonizzazione, femminismi, ecologia, tecnologie, giustizia globale e pluralità delle tradizioni.",certainty:"Processo contemporaneo in corso"},
];

const areas = ["Tutte le aree", ...Array.from(new Set(events.map((e) => e.area)))];

export default function ChronologyPage() {
  const [area, setArea] = useState("Tutte le aree");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"tempo" | "parallele">("tempo");
  const visible = useMemo(() => events.filter((e) =>
    (area === "Tutte le aree" || e.area === area) &&
    (query.trim() === "" || `${e.title} ${e.detail} ${e.area} ${e.date}`.toLocaleLowerCase("it").includes(query.trim().toLocaleLowerCase("it")))
  ).sort((a, b) => a.sort - b.sort), [area, query]);
  const tracks = useMemo(() => Array.from(new Set(visible.map((e) => e.area))).map((name) => ({
    name,
    items: visible.filter((e) => e.area === name).sort((a, b) => a.sort - b.sort),
  })), [visible]);

  return <main className="timeline-page">
    <header className="site-header">
      <Link className="brand" href="/"><span className="brand-mark">Φ</span><span><strong>Dizionario filosofico</strong><small>Storia universale del pensiero</small></span></Link>
      <nav aria-label="Navigazione principale"><Link href="/enciclopedia">Enciclopedia</Link><Link href="/cronologie">Cronologie</Link><Link href="/indici">Indici</Link><Link href="/#metodo">Il progetto</Link></nav>
    </header>
    <section className="timeline-hero">
      <p className="eyebrow">Strumento comparativo · edizione ampliata</p>
      <h1>Cronologie parallele</h1>
      <p>Una mappa di autori, scuole, testi e trasformazioni intellettuali in diverse aree del mondo. Le linee permettono di confrontare periodi e contesti, senza presumere contatti o influenze non documentati.</p>
      <Link className="timeline-home-link" href="/indici">Esplora anche gli indici tematici e degli autori ↗</Link>
    </section>
    <section className="section-wrap timeline-content">
      <div className="section-heading"><div><p className="eyebrow">Dal III millennio a.C. al presente</p><h2>Le idee nel tempo</h2></div><span className="entry-count">{visible.length} eventi / {tracks.length} linee culturali</span></div>
      <div className="timeline-controls">
        <div className="timeline-filter"><label htmlFor="timeline-area">Area culturale</label><select id="timeline-area" value={area} onChange={(e) => setArea(e.target.value)}>{areas.map((a) => <option key={a}>{a}</option>)}</select></div>
        <label className="timeline-search-label" htmlFor="timeline-search">Cerca nella cronologia</label>
        <input id="timeline-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Autore, scuola, testo, periodo…" />
        <div className="timeline-view-switch" aria-label="Modalità di visualizzazione">
          <button type="button" className={view === "tempo" ? "active" : ""} aria-pressed={view === "tempo"} onClick={() => setView("tempo")}>Sequenza temporale</button>
          <button type="button" className={view === "parallele" ? "active" : ""} aria-pressed={view === "parallele"} onClick={() => setView("parallele")}>Linee parallele</button>
        </div>
      </div>
      {visible.length === 0 ? <p className="empty-state">Nessun evento corrisponde alla ricerca. Prova un altro termine o un'altra area.</p> : view === "tempo" ? <ol className="timeline-list">{visible.map((event) => <li className="timeline-event" key={event.id}>
        <div className="timeline-date">{event.date}<small>{event.area}</small></div>
        <div className="timeline-marker" aria-hidden="true"></div>
        <article className="timeline-card"><div className="timeline-card-top"><span>{event.certainty}</span>{event.slug && <Link href={`/enciclopedia/${event.slug}`}>Apri la voce ↗</Link>}</div><h3>{event.title}</h3><p>{event.detail}</p></article>
      </li>)}</ol> : <div className="parallel-tracks">{tracks.map((track) => <section className="parallel-track" key={track.name}><header><h3>{track.name}</h3><span>{track.items.length} eventi</span></header><ol>{track.items.map((event) => <li key={event.id}><time>{event.date}</time><article><h4>{event.title}</h4><p>{event.detail}</p><small>{event.certainty}</small>{event.slug && <Link href={`/enciclopedia/${event.slug}`}>Leggi la voce ↗</Link>}</article></li>)}</ol></section>)}</div>}
      <div className="timeline-caution"><strong>Come leggere le date</strong><p>Le date sono indicative e non hanno tutte lo stesso statuto: alcune riguardano la vita di un autore, altre la composizione o la trasmissione di testi, altre ancora processi storici di lunga durata. Le collocazioni più controverse sono segnalate. L'ordine e la contemporaneità non dimostrano da soli rapporti causali, influenze o trasmissioni culturali. Questa è una mappa editoriale di orientamento, da ampliare e collegare progressivamente alle voci dell’enciclopedia.</p></div>
      <p className="editorial-note">Prossimo ampliamento: collegare gli eventi alle voci enciclopediche, precisare gli intervalli cronologici e rendere più visibili le contemporaneità tra autori, opere e scuole.</p>
    </section>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Dizionario universale della storia della filosofia</span><span>Cronologie comparative · Italiano</span></footer>
  </main>;
}
