# Lernfeld 1 Trainer

Multiple-Choice-Trainer für die Ausbildung Kaufmann/Kauffrau im E-Commerce, Lernfeld 1
„Das Unternehmen präsentieren und die eigene Rolle mitgestalten“.

Online: https://cansi798.github.io/quiz/

## Funktionen

- 200 Fragen aus den Tagesquiz der Seminartage 1 bis 5, je 20 Fragen pro Quizteil, alle mit Erklärung
- Schnellstart mit 20, 50 oder allen 200 Fragen oder eigene Auswahl der Quizteile
- Übungsmodus mit sofortiger Auflösung, Prüfmodus mit Auswertung am Ende und Auflösung pro Frage auf Wunsch
- Prüfungssimulation: 30 zufällige Fragen aus allen Quizteilen in 60 Minuten, Übersicht zum Überspringen und Ändern, bestanden ab 50 Prozent
- Fehlerkartei: falsch beantwortete Fragen werden gemerkt und lassen sich gezielt üben, bis sie zweimal in Folge richtig waren
- Statistik: Verlauf aller Durchläufe, Trend, Quote je Quizteil von schwach nach stark
- Antworten werden bei jedem Durchlauf neu gemischt, laufende Durchläufe lassen sich fortsetzen
- Als App installierbar, läuft nach dem ersten Aufruf komplett offline
- Hell- und Dunkelmodus, Wischgesten und feste Aktionsleiste auf dem Handy, Tastatursteuerung, Screenreader-Unterstützung

Alle Daten wie Fehlerkartei, Statistik und Einstellungen bleiben im Browser des Geräts.

## Aufbau

- `index.html` und `sw.js` sind generierte Dateien. Nicht direkt bearbeiten.
- `src/template.html` ist die Vorlage mit Layout und Logik.
- `src/data/quiz1.json` bis `quiz10.json` enthalten die Fragen. Felder je Frage: `q` Frage, `o` vier Antworten, `c` Index der richtigen Antwort (0 bis 3), `e` Erklärung.
- `src/sw.js` ist die Vorlage des Service Workers, die Versionsnummer wird beim Build eingesetzt.
- `fonts/` enthält die Schrift Manrope (SIL Open Font License), `icons/` die App-Icons.

## Bauen

```
node src/build.js
```

Erzeugt `index.html` und `sw.js` im Repo-Root. Einzelne Fragendateien lassen sich mit `node src/check.js src/data/quiz1.json` prüfen: 20 Fragen, je vier Antworten, gültiger Lösungsindex, Erklärung vorhanden, Lösungen gleichmäßig auf A bis D verteilt.

Nach dem Push auf `main` baut GitHub Pages die Seite in unter einer Minute neu.
