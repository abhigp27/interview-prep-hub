# Copilot Instructions for prep-hub

## Project Overview
This project is a single-page web application for algorithm interview preparation, focused on delivering AI-generated explanations, code examples, and interview tips for various algorithmic topics. The app uses vanilla JavaScript in a modular structure, Tailwind CSS (via CDN), and several client-side libraries (marked.js, highlight.js, lucide icons).

## Key Patterns & Architecture
- **Modular JavaScript:** Code is split across multiple files in `js/` directory with specific responsibilities:
  - `data.js`: Configuration, roadmap data, and API prompt template
  - `cache.js`: IndexedDB caching functionality  
  - `api.js`: Gemini API interaction with retry logic
  - `ui.js`: DOM manipulation and content rendering
  - `theme.js`: Dark/light mode management
  - `app.js`: Main application class and initialization
- **Class-Based Architecture:** Main `AlgoPrep` class manages application state and coordinates modules
- **Content Flow:** Topic selection → Cache check → API fetch (if needed) → Markdown render → Cache store
- **Script Loading Order:** Dependencies loaded in specific sequence: `data.js` → `cache.js` → `theme.js` → `api.js` → `ui.js` → `app.js`

## Core Data Flow
1. Navigation generated from `roadmap` array in `data.js`
2. Topic click triggers `handleTopicSelection()` in `AlgoPrep` class
3. Cache lookup via `getTopicFromCache()` using `category-topic` keys
4. API fetch via `fetchExplanation()` with exponential backoff retry
5. Content rendered with marked.js + highlight.js via `renderContent()`

## Developer Workflows
- **No build step:** Static files served directly, edit and refresh
- **Add new topics:** Update `roadmap` array in `js/data.js`
- **Change API prompt:** Edit `createPrompt()` function in `js/data.js`
- **Modify styling:** Update `css/styles.css` (custom styles) or Tailwind classes in HTML
- **Debug content:** Check browser's IndexedDB for cached topics

## Integration Points
- **Gemini API:** Configured in `CONFIG` object in `data.js`, uses specific prompt structure
- **IndexedDB:** Database name `AlgoPrepCacheDB`, single `topics` store with `{id, content}` structure
- **External CDNs:** Tailwind, marked.js, highlight.js, lucide icons loaded from CDN

## Project Conventions
- **API Key Security:** Hardcoded in `CONFIG.API_KEY` - replace for production
- **Cache Keys:** Format `${category}-${topic}` for consistent lookups
- **Error Handling:** Graceful degradation with `renderError()` fallback
- **Theme Persistence:** localStorage with `theme` key, class-based dark mode
- **No Framework Dependencies:** Pure vanilla JS, no bundlers or transpilation

## Key Files
- `index.html`: Main HTML structure and CDN imports
- `js/data.js`: All configuration and topic data
- `js/app.js`: Application initialization and main logic
- `css/styles.css`: Custom styling beyond Tailwind

## Critical Implementation Details
- **Script loading is synchronous** - maintain order in `index.html`
- **API prompt in `createPrompt()`** defines content structure - edit carefully
- **Lucide icons** require `lucide.createIcons()` call after DOM changes
- **Theme switching** toggles both document classes and highlight.js themes
