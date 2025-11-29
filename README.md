# STVOREC-02

![Banner](assets/banner.png)

## Prečo sme to spravili?

Úprimne? Báli sme sa.

Každý deň čítame o tom, ako AI nahradí programátorov, grafikov, copywriterov... nás. Namiesto paniky sme sa rozhodli pozrieť pravde do očí. Potrebovali sme nástroj, ktorý nám nedá len prázdne sľuby, ale tvrdé dáta.

**STVOREC-02** je výsledok našej paranoje a zvedavosti. Je to analytický nástroj, ktorý ti povie, či tvoja kariéra prežije rok 2030, a ak nie, čo s tým máš robiť.

---

## Čo to vlastne robí?

Neveštíme z gule. Používame **GPT-5.1** a komplexné analytické reťazce na to, aby sme pochopili podstatu tvojej práce.

### 1. Rozklad na súčiastky
Tvoju prácu nerozumieme ako "názov pozície". Rozoberieme ju na stovky mikro-taskov a skillov. Vidíme to, čo ty možno prehliadaš.

### 2. Realistické skóre automatizácie
Žiadne "50% šanca". Ideme do hĺbky. Pre každý jeden task vypočítame pravdepodobnosť, že ho AI zvládne lepšie a lacnejšie ako ty. Výsledok? Číslo, ktoré možno zabolí, ale otvorí ti oči.

### 3. Plán B (a C, a D...)
Ak ti vyjde, že si nahraditeľný, nenecháme ťa v tom. Systém ti nájde príbuzné kariérne cesty, kde využiješ to, čo už vieš, ale v kontexte, ktorý AI (zatiaľ) nedokáže replikovať.

---

## Ako to funguje pod kapotou?

Sme vývojári, takže vieme, že "AI magic" nestačí. Tu je to, na čom to reálne beží:

*   **Backend**: Python + FastAPI. Rýchle, typované, stabilné.
*   **AI Orchestrácia**: LangChain. Nie je to len jeden prompt. Je to sústava agentov, ktorí sa navzájom kontrolujú a dopĺňajú.
*   **Frontend**: Next.js 16 + Tailwind 4. Chceli sme, aby to nielen fungovalo, ale aby sa na to aj dobre pozeralo. Žiadne zbytočné loadery, všetko realtime streamované.

---

## Spusti si to u seba

Ak si chceš overiť, či nekecáme, kľudne si to buildni.

**Backend:**
```bash
cd backend
poetry install
poetry run python main.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## Kto za tým stojí?

Sme partia kamošov, ktorí nechceli stráviť víkend spaním.

*   **[Meno]** - Frontend & Design
*   **[Meno]** - Backend & AI Logic
*   **[Meno]** - Data & Prompts
*   **[Meno]** - Idea & Panic Management

Dúfame, že vám to pomôže tak, ako to pomohlo nám (upokojiť sa, že ešte pár rokov máme prácu). Peace. ✌️
