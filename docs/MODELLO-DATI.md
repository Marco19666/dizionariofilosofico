# Modello dati editoriale — versione iniziale

## Obiettivo
Il modello separa i contenuti scientifici dall'interfaccia del sito. La prima implementazione usa dati TypeScript versionati nel repository; il passaggio a un database sarà valutato quando schema, workflow e volume delle voci saranno più stabili.

## Entità
Ogni scheda possiede:
- Identificatore stabile: codice editoriale, distinto dallo slug URL.
- Tipologia: autore, concetto, opera, scuola, tradizione o periodo.
- Titolo e sottotitolo.
- Area culturale e collocazione cronologica, con formule prudenti quando la datazione è discussa.
- Sintesi e sezioni testuali.
- Parole chiave.
- Relazioni esplicite verso altre schede, accompagnate da una descrizione del tipo di relazione.
- Bibliografia e fonti, da completare con riferimenti verificabili.
- Stato editoriale, che distingue prototipi e voci revisionate.

## Regole editoriali
1. La somiglianza tra concetti non prova una derivazione o un'influenza storica.
2. Le relazioni devono indicare se sono cronologiche, testuali, istituzionali, di ricezione o di confronto.
3. Le incertezze cronologiche e attributive vanno dichiarate, non nascoste.
4. Una scheda dimostrativa non deve essere presentata come scientificamente validata.
5. Le bibliografie provvisorie non vanno trattate come apparati critici completi.

## Implementazione
- data/entries.ts: tipi e contenuti strutturati.
- app/enciclopedia/page.tsx: archivio con ricerca e filtro.
- app/enciclopedia/[slug]/page.tsx: pagina di dettaglio generata staticamente.
- I codici identificativi sono stabili; gli slug servono solo alla navigazione.

## Prima estensione concettuale
Sono state inserite sei schede dimostrative di concetti: Dao, Logos, Dharma, Śūnyatā, Essere e Virtù. Sono state redatte come lemmi contestualizzati, non come definizioni universali. I collegamenti tra concetti e autori indicano rapporti tematici o testuali descritti nella scheda, non automaticamente influenze storiche.
