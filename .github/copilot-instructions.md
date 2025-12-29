# KLineChart Pro AI Coding Instructions

You are working on **KLineChart Pro**, a professional financial charting library built with **SolidJS**, **TypeScript**, and **Vite**, extending the core `klinecharts` library for out-of-the-box financial chart functionality.

## 🏗 Project Architecture

- **Framework**: SolidJS (not React) - use SolidJS signals, effects, and lifecycle (`createSignal`, `createEffect`, `onMount`).
- **Entry Point**: `src/KLineChartPro.tsx` is a class that mounts the SolidJS app into DOM and exposes the ChartPro API.
- **Main Component**: `src/ChartProComponent.tsx` is the root SolidJS component managing chart UI, state, and widget integration.
- **Core Chart**: Uses `klinecharts` library for canvas-based chart rendering, overlays, and technical indicators.
- **Extensions**: `src/extension/` contains custom drawing tools (Fibonacci, Gann Box, Elliott Waves) implementing `klinecharts` Overlay interface.
- **Widgets**: `src/widget/` contains UI overlays (Drawing Bar, Period Bar, Settings Modal) as SolidJS components.
- **Components**: `src/component/` contains reusable UI primitives (Button, Modal, Select) built with SolidJS.
- **Styling**: LESS for styles. Global styles in `src/index.less`, component styles in sibling `index.less` files.
- **Data Layer**: `Datafeed` interface in `src/types.ts` for loading historical/realtime data. `src/DefaultDatafeed.ts` provides default implementation.

## 🚀 Key Workflows

- **Build**: `npm run build` creates UMD/ES modules in `dist/` (runs `build-core` + `build-dts`).
- **Development**: `npm run docs:dev` starts Vitepress dev server for documentation.
- **TypeScript**: Strict mode enabled, JSX preserved for SolidJS, external types from `klinecharts`.
- **Build Config**: Vite with SolidJS plugin, `klinecharts` as external dependency, CSS output as `klinecharts-pro.css`.

## 🧩 Development Patterns

### 1. Creating New Drawing Tools (Extensions)
- Create `src/extension/newTool.ts` implementing `OverlayTemplate` from `klinecharts`.
- Define `name`, `totalStep`, `createPointFigures`, `checkMousePointOn`, etc.
- Register in `src/extension/index.ts` array.
- Add icon component to `src/widget/drawing-bar/icons/`.
- Example: See `src/extension/arrow.ts` for basic line/arrow implementation.

### 2. UI Components (Widgets)
- Use SolidJS components (`.tsx`) with `class` (not `className`).
- **Never use React hooks** - use `createSignal`, `createEffect`, `onMount`.
- Props destructuring loses reactivity - use `props.value` or `mergeProps`.
- Styles in sibling `index.less`, imported in component.
- Example: `src/widget/period-bar/index.tsx` shows signal-based state management.

### 3. Internationalization (i18n)
- Add strings to `src/i18n/en-US.json` and `src/i18n/zh-CN.json`.
- Import `i18n` from `../../i18n` and call `i18n(key, locale)` for translations.
- Default locale is `zh-CN`, supports `en-US`.
- Example: `i18n('indicator', props.locale)` in widget components.

### 4. Data Integration
- Implement `Datafeed` interface for symbol search, historical data, and realtime subscriptions.
- `getHistoryKLineData` returns `KLineData[]` arrays, `subscribe` provides realtime updates.
- Chart handles data loading automatically via datafeed.
- Example: `src/DefaultDatafeed.ts` shows mock implementation pattern.

### 5. Chart API Integration
- Use `klinecharts` API for chart manipulation (zoom, scroll, indicators).
- Overlays extend chart with custom drawings via `OverlayTemplate`.
- Styles follow `klinecharts` `Styles` interface for theming.
- Example: Chart initialization in `ChartProComponent.tsx` with `init()` and `dispose()`.

## ⚠️ Common Pitfalls

- **SolidJS vs React**: Components run once, not per render. Signals for reactivity, effects for side effects.
- **KLineCharts API**: Familiarize with overlay creation, indicator management, and event handling.
- **DOM Access**: Use SolidJS refs (`ref` prop) for direct DOM manipulation.
- **Build Output**: Library targets UMD/ES modules, externalizes `klinecharts` - ensure peer dependency.
- **TypeScript**: Strict mode catches reactivity issues - use proper SolidJS patterns.

## 📂 Important Reference Files

- `src/KLineChartPro.tsx`: Library entry class and API facade.
- `src/ChartProComponent.tsx`: Main chart component with widget orchestration.
- `src/extension/index.ts`: Registry of all drawing tool extensions.
- `src/widget/drawing-bar/index.tsx`: Drawing tools UI and activation.
- `src/types.ts`: Core interfaces (SymbolInfo, Period, Datafeed, ChartPro).
- `src/DefaultDatafeed.ts`: Example datafeed implementation.
- `docs/`: Vitepress documentation structure.
