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


## Criteri per le fonti bibliografiche
Le voci bibliografiche devono rendere riconoscibile la natura del riferimento:
- **Fonte primaria / testo**: opera antica o testimonianza, con indicazione dell'edizione o della traduzione effettivamente consultabile.
- **Edizione critica**: testo stabilito filologicamente, con criteri editoriali e, quando disponibile, apparato; non va confusa con una semplice ristampa.
- **Traduzione**: indicare traduttore e lingua di arrivo; precisare quando la versione si basa su una specifica recensione o su testimoni manoscritti.
- **Studio secondario**: monografia o saggio interpretativo, da distinguere dalle fonti primarie.
- **Testimoni e tradizioni testuali**: per opere trasmesse in versioni differenti (per esempio il Daodejing), specificare il testimone o la recensione quando il dato è rilevante.

Non si deve presentare una traduzione come edizione critica, né una singola fonte come rappresentativa di tutti gli usi di un concetto. Per i lemmi comparativi, le note bibliografiche devono esplicitare il contesto linguistico, storico e disciplinare del riferimento. Le date, le attribuzioni e le ricostruzioni controverse vanno segnalate come tali.


## Classificazione delle voci bibliografiche

Ogni riferimento bibliografico espone un campo `type` per rendere esplicita la sua funzione:
- **Testo primario / traduzione**: opera della tradizione studiata in traduzione o edizione leggibile.
- **Edizione critica / testimone**: edizione filologica, raccolta di frammenti o testimonianza manoscritta specifica.
- **Studio secondario**: ricerca moderna che interpreta, ricostruisce o contestualizza il tema.
- **Edizione di riferimento**: raccolta o edizione generale utile per localizzare testi e stabilire una base di consultazione.

La classificazione descrive la funzione prevalente del riferimento nella singola scheda; non sostituisce la verifica dell'edizione effettivamente consultata e non implica che una traduzione sia un'edizione critica.
