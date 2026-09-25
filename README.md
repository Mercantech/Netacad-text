# Netacad Text Select

Chrome-extension (virker også i **Brave** og **Edge**), der gør det muligt at **markere og kopiere tekst** på Cisco NetAcad / Skills for All.

Repository: [https://github.com/Mercantech/Netacad-text](https://github.com/Mercantech/Netacad-text)

---

## Kom godt i gang (fra GitHub til Chrome)

Følg trinene i rækkefølge. Du behøver **ikke** at kunne programmere — du downloader bare koden og indlæser mappen i browseren.

### Del A — Hent koden fra GitHub

Du kan vælge **enten** metode 1 (nemmest) **eller** metode 2 (hvis du bruger Git).

#### Metode 1: Download ZIP (anbefalet for de fleste)

1. Åbn repositoryet i browseren:  
   [https://github.com/Mercantech/Netacad-text](https://github.com/Mercantech/Netacad-text)
2. Klik på den grønne knap **Code**.
3. Klik **Download ZIP**.
4. Find ZIP-filen i din **Downloads**-mappe (typisk `Netacad-text-main.zip`).
5. Udpak ZIP-filen:
   - **Windows:** Højreklik på ZIP → **Udpak alle…** → vælg en placering, f.eks. `Dokumenter`, og klik **Udpak**.
   - **macOS:** Dobbeltklik på ZIP-filen.
6. Du skal nu have en mappe, der hedder noget i stil med:
   - `Netacad-text-main`  
   eller  
   - `Netacad-text`
7. Åbn mappen og tjek, at du kan se mindst disse filer:
   - `manifest.json`
   - `content.js`
   - `page.js`
   - `content.css`
   - `popup.html`
   - `popup.js`
   - mappen `icons/`

> **Vigtigt:** Det er **denne mappe** (den der indeholder `manifest.json`), du senere skal vælge i Chrome — ikke ZIP-filen, og ikke en mappe *ovenover*.

#### Metode 2: Klon med Git

Hvis du har Git installeret:

1. Åbn terminal / PowerShell.
2. Gå til den mappe, hvor du vil gemme projektet, f.eks.:

```powershell
cd $env:USERPROFILE\Documents
```

3. Kør:

```powershell
git clone https://github.com/Mercantech/Netacad-text.git
cd Netacad-text
```

4. Bekræft at `manifest.json` ligger i den mappe, du står i.

---

### Del B — Installer extensionen i Chrome (eller Brave / Edge)

Extensionen installeres i **udviklertilstand** (“Load unpacked”). Den kommer ikke fra Chrome Web Store.

#### 1. Åbn siden for extensions

Skriv én af disse adresser i adresselinjen og tryk Enter:

| Browser | Adresse |
|--------|---------|
| Google Chrome | `chrome://extensions` |
| Brave | `brave://extensions` |
| Microsoft Edge | `edge://extensions` |

#### 2. Slå udviklertilstand til

1. Find kontakten **Developer mode** / **Udviklertilstand** (typisk øverst til højre).
2. Slå den **til**.

Når den er slået til, vises knapper som **Load unpacked** / **Indlæs udpakket**.

#### 3. Indlæs mappen

1. Klik **Load unpacked** / **Indlæs udpakket**.
2. Naviger til mappen med koden (den mappe der indeholder `manifest.json`).
   - Eksempel på Windows:  
     `C:\Users\<dit-brugernavn>\Documents\Netacad-text-main`  
     eller  
     `C:\Users\<dit-brugernavn>\Documents\GitHub\Netacad-text`
3. Markér mappen og klik **Vælg mappe** / **Select Folder**.

#### 4. Tjek at installationen lykkedes

Du bør nu se en extension med navnet **Netacad Text Select** på listen.

- Status skal være **slået til** (blå/aktiv kontakt).
- Hvis der står en fejl i rødt under extensionen: læs fejlteksten, og tjek at du valgte den rigtige mappe (den med `manifest.json`).

#### 5. (Valgfrit) Pin ikonet

1. Klik på puslespils-ikonet (extensions) i værktøjslinjen.
2. Find **Netacad Text Select**.
3. Klik på knappenappen / pin, så ikonet altid er synligt.

---

### Del C — Brug extensionen på NetAcad

1. Gå til NetAcad, f.eks. [https://www.netacad.com](https://www.netacad.com) og log ind.
2. Åbn dit kursus / curriculum-modulet (den side hvor teksten normalt ikke kan markeres).
3. **Genindlæs siden helt** med `F5` eller `Ctrl+R` (på Mac: `Cmd+R`).  
   Det er vigtigt første gang, så scriptet indlæses i kursus-iframe’en.
4. Prøv at markere tekst med musen og kopiere med `Ctrl+C` / `Cmd+C`.

#### Til/fra

1. Klik på extension-ikonet **Netacad Text Select**.
2. Brug kontakten **Tekstmarkering** til at slå funktionen til eller fra.
3. Genindlæs siden, hvis ændringen ikke slår igennem med det samme.

Extensionen er **aktiv som standard** på:

- `*.netacad.com`
- `*.skillsforall.com`
- `*.cisco.com`

---

## Opdatér til nyeste version fra GitHub

Når der kommer rettelser i repositoryet:

### Hvis du downloadede ZIP

1. Download en ny ZIP fra GitHub (samme fremgangsmåde som Del A, metode 1).
2. Udpak den (gerne oven i den gamle mappe, eller erstat den gamle mappe helt).
3. Gå til `chrome://extensions` (eller `brave://extensions`).
4. Find **Netacad Text Select**.
5. Klik **Reload** / **Genindlæs** (cirkulær pil).
6. Genindlæs din NetAcad-fane med `F5`.

> Hvis du udpakkede til en **ny** mappe med nyt navn: fjern den gamle extension (Remove) og lav **Load unpacked** igen med den nye mappe.

### Hvis du klonede med Git

I projektmappen:

```powershell
git pull
```

Derefter:

1. `chrome://extensions` → **Reload** på Netacad Text Select  
2. Genindlæs NetAcad-fanen med `F5`

---

## Fejlfinding

### Jeg kan ikke finde “Load unpacked”

- Sørg for at **Developer mode** er slået til.
- Brug den rigtige adresse: `chrome://extensions` (ikke Chrome Web Store).

### Fejl ved indlæsning / “Manifest file is missing or unreadable”

- Du har sandsynligvis valgt den forkerte mappe.
- Vælg den mappe der **direkte** indeholder `manifest.json` (ikke ZIP, ikke `icons` alene, ikke en forældremappe uden manifest).

### Extensionen er installeret, men jeg kan stadig ikke markere tekst

1. Tjek at extensionen er **slået til**.
2. Genindlæs NetAcad-fanen helt (`F5`).
3. Klik på ikonet og bekræft at **Tekstmarkering** er aktiveret.
4. Åbn kursusindholdet igen (teksten ligger ofte i en indlejret iframe).
5. Genindlæs extensionen under `chrome://extensions` → **Reload**, og genindlæs derefter siden.

### Siden bliver langsom eller fryser

1. Gå til `chrome://extensions`.
2. Slå **Netacad Text Select** midlertidigt fra, eller klik **Remove**.
3. Genindlæs siden.
4. Hent seneste version fra GitHub og installér igen (se “Opdatér”).

### Virker det i Brave?

Ja. Brug `brave://extensions` i stedet for `chrome://extensions`, og følg ellers samme trin. Hvis noget blokeres, prøv at tillade extensionen / justere Shields på NetAcad midlertidigt.

---

## Filoversigt (hvad ligger i mappen?)

| Fil / mappe | Formål |
|-------------|--------|
| `manifest.json` | Extensionens “id-kort” til Chrome (MV3) |
| `content.js` | Content script (isolated world) + CSS i shadow DOM |
| `page.js` | Script i sidens MAIN world (overstyrer JS-blokering) |
| `content.css` | CSS der tvinger `user-select: text` |
| `popup.html` / `popup.js` | Lille popup med til/fra-kontakt |
| `icons/` | Ikoner til værktøjslinjen |

---

## Hvordan det virker (kort teknisk)

Kursusteksten ligger typisk i en iframe (`/authoring-resources/`) og er bygget med Lit/Adapt (`base-view`, `.text__body`). NetAcad blokerer markering med:

- CSS `user-select: none` (ofte inde i **Shadow DOM**)
- JavaScript `preventDefault` på blokerende events (fx `selectstart`)

Extensionen:

1. Injicerer CSS i alle frames og open shadow roots  
2. Kører i MAIN world og neutraliserer relevante `preventDefault`-kald  
3. Begrænser scripts i at clear’e markeringen midt under et træk med musen  

---

## Licens / brug

Til personlig studiebrug, så du kan markere og kopiere kursustekst til egne noter. Respektér Ciscos vilkår og din skoles regler for eksamen og academic integrity.
