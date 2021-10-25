# Eindopdracht 6V

![6VWO Eindopdracht](https://img.shields.io/badge/6VWO-Eindopdracht-red)


In dit repository beheer je het eindproject en plaats je de code voor
- de server (`server-app.js`)
- de webwidget (`widget/widget.js`)
- de knikkerbaan (meerdere bestanden in de map `arduino`)
- de database (`database/db-creation.sql`)


Het verslag schrijf je in `verslag.md`.

De database ontwerp je in `database/db-creation`. Voorgegeven data (om uit te proberen) kun je daar ook in stoppen.

Je werkt in dit project actief met GitHub. Dat betekent dat je vanuit issues en het planbord werkt en tijdens het ontwikkelen op een goede manier gebruik maakt van branches en commits.
Zorg ervoor dat (voor zowel je groepsleden als de docent) altijd duidelijk is waar je mee bezig bent.

Arduino kun je niet ontwikkelen binnen GitPod. Deze code zul je op een andere manier moeten committen in GitPod.

## Algemene structuur
De webwidget en de knikkerbaan geven informatie aan de database en vragen ook informatie daar op. De knikkerbaan kan alleen niet functioneren als de Arduino berichten naar de server stuurt. Je zult de knikkerbaan dus even stil moeten leggen met de bovenste poort, de berichten versturen, ontvangen en verwerken en daarna de poort weer open moeten zetten.

## Server
De server start en stop je met behulp van de debugger. Klik links op het icon met de kever of kies het menu Debug->Start Debugging. Je kunt breakpoint in je code aanbrengen waardoor je programma wordt gepauzeerd en je kunt inspecteren hoe je programma functioneert.

## Widget
Het widget wordt door de server eenmalig als statisch bestand gestuurd naar een browser die erom vraag. De code van de widget wordt niet door GitPod uitgevoerd, maar door het browservenster waarin het widget zichtbaar is. Het testen / debuggen van het widget doe je met de optie 'Javascript-console' van je browser. In Chrome vind je die onder het menu 'Weergave->Ontwikkelaar->Javascript-console' en in Safari onder 'Ontwikkelaar-> Toon Javascript Console'. Je kunt daar ook breakpoints maken en de inhoud van variabelen inspecteren.

## Database
Voor het uittesten van queries kun je in de terminal van GitPod verbinding maken met je database. Doe dit door het volgende commando in te tikken: `sqlite3 database/database.db`. 

## Handige links
* [Tinkercad](https://tinkercad.io) - voor het maken van een virtuele Arduino
* [KhanAcademy](https://khanacademy.org) - voor sql en javascript / p5js-functies
* [w3schools](https://w3shools.com) - extra javascript informatie
* [p5js](https://p5js.org/reference) - naslagmateriaal p5js
* [Arduino](https://www.arduino.cc/reference) - naslagmateriaal
* [Arduino-lessen](http://arduino-lessen.nl) - lessen die je 5V heb gezien
* [Seeed wiki](https://wiki.seeedstudio.com/Grove/) - informatie over evt. Grove modules
* [Markdown](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf) Opmaak van je verslag
* [Schema's tekenen](https://draw.io) Voor bijv. strokendiagram