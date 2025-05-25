# Emiles Scrum Board

En Scrum board byggt i **React** med **Firebase** som databas. Du kan enkelt skapa och tilldela uppgifter till medarbetare samt följa hur projekten fortlöper.

---

## Funktioner

### Uppgifter

- Lägg till uppgifter med titel och kategori, UX, Frontend eller Backend 
- Tilldela uppgifter till medarbetare  
- Flytta uppgifter mellan `Ny`, `Pågående`, `Färdig`  
- Ta bort uppgifter som inte behövs eller är avlustade

### Medarbetare

- Lägg till nya medlemmar med namn samt deras roll  
- Se alla medlemmar i en sidopanel  
- Filtrera uppgifter per medlem eller roll  
- Se antal pågående uppgifter per person  
- Radera medlem, vilet återställer deras uppgifter

### Filtrering & sortering

- Filtrera uppgifter per:
  - Status
  - Kategori
  - Medlem
- Sortera efter:
  - Titel A–Ö / Ö–A
  - Nyast / Äldst
- Återställ alla filter som nollställer alla filtreringsvyer

---

## Programflöde (översikt)

```text
App.jsx              – Centralt nav som kopplar ihop alla komponenter och håller i filtrering, toasts och Firebase-hantering

TaskBoard.jsx        – Filtrerar och sorterar uppgifter samt renderar tre kolumner för uppgifterna med olika status

TaskCard.jsx         – Visar ett uppgiftskort och innehåller logik för att tilldela, markera som klar, ångra och radera.

AddTask.jsx          – Formulär för att lägga till nya uppgifter

TeamMembersForm.jsx  – Formulär för att lägga till nya medlemmar

FilterSidebar.jsx    – Sidopanel för filtrering av uppgifter

MemberSidebar.jsx    – Sidopanel för medlemmar och filtrering per roll

FilterToggle.jsx     – Knapp för att visa/dölja filtreringspanelen

MemberToggle.jsx     – Knapp för att visa/dölja medlemspanelen

hooks/
├── useAlert.js       – Toast-system för feedback
├── useFirebaseData.js– Hook som hämtar realtidsdata från Firebase

utils/
├── timestamp.js      – Ger lokal tidsstämpel
├── format.js         – Formatterar status/kategori
```

---

## Installation

### Starta projektet

```bash
git clone https://github.com/eschboii/java24-react-slutprojekt-emile-schlick.git
cd java24-react-slutprojekt-emile-schlick
npm install
npm run dev
```

> Projektet använder Parcel

Öppna `http://localhost:1234` i webbläsaren

---

## Firebase-konfiguration

1. Skapa ett Firebase-projekt  
2. Aktivera **Realtime Database**  
3. Skapa `firebase/config.js` 

---

## Mappstruktur

```plaintext

docs/
src/
├── app.jsx
├── index.html
├── main.jsx
├── components/
│   ├── AddTask.jsx
│   ├── TeamMembersForm.jsx
│   ├── TaskBoard/
│   │    ├── TaskBoard.jsx
│   │    ├── TaskCard.jsx
│   │    └── TaskColumn.jsx
│   ├── FilterSidebar/
│   │    ├── FilterSection.jsx
│   │    ├── FilterSidebar.jsx
│   │    └── FilterToggle.jsx
│   └── MemberSidebar/
│         ├── MemberSidebar.jsx
│         └── MemberToggle.jsx
├── hooks/
│   ├── useAlert.js
│   └── useFirebaseData.js
├── utils/
│   ├── format.js
│   └── timestamp.js
└── firebase/
    └── config.js
```

---

## Exempel

1. Lägg till en uppgift → visas i kolumn "Ny uppgift"
2. Tilldela medlem → uppgiften flyttas till "Pågående"
3. Markera som klar → flyttas till "Färdig"
4. Filtrera på Backend → endast Backend-uppgifter visas
5. Radera medlem → tilldelade uppgifter återställs

---

## Licens

MIT
