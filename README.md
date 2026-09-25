# Netacad Text Select

Chrome-extension der gør det muligt at **markere og kopiere tekst** på Cisco NetAcad / Skills for All.

## Installation (udviklertilstand)

1. Åbn Chrome og gå til `chrome://extensions`
2. Slå **Developer mode** til (øverst til højre)
3. Klik **Load unpacked**
4. Vælg denne mappe (`Netacad-text`)
5. Åbn NetAcad og genindlæs siden

## Brug

- Extensionen er **aktiv som standard** på:
  - `*.netacad.com`
  - `*.skillsforall.com`
  - `*.cisco.com`
- Klik på ikonet for at slå tekstmarkering til/fra
- Hvis markering stadig er blokeret: genindlæs siden

## Hvordan det virker

Kursusteksten ligger i en iframe (`/authoring-resources/`) og er bygget med Lit/Adapt (`base-view`, `.text__body`). Blokering sker med:

- CSS `user-select: none` (ofte inde i **Shadow DOM**)
- JavaScript `preventDefault` på `selectstart` / `mousedown`

Extensionen (v1.2):

1. Injicerer CSS i alle frames **og** alle open shadow roots
2. Kører i MAIN world og neutraliserer `preventDefault` på blokerende events
3. Forhindrer scripts i midlertidigt at clear'e markeringen under drag

## Opdatering efter ændring

1. Gå til `chrome://extensions`
2. Klik **Reload** på Netacad Text Select
3. Genindlæs NetAcad-fanen helt (F5)
4. Prøv at markere tekst i kursusmodulet

Hvis det stadig fejler: åbn DevTools → fanen **Console** i iframe'en med teksten, og tjek om der står fejl fra extensionen.
