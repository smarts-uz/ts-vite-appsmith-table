# @teamprodevs/appsmith-custom-table

[![npm version](https://img.shields.io/npm/v/%40teamprodevs/appsmith-custom-table.svg)](https://www.npmjs.com/package/@teamprodevs/appsmith-custom-table)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#license)
[![Storybook](https://img.shields.io/badge/storybook-live-ff4785.svg)](https://custom-appsmith-table.netlify.app/)

A highly configurable table system built for Appsmith custom widgets. It marries React 18, TanStack Table v8, and TailwindCSS to deliver both server-side infinite lists and lightweight client-side tables with the same API surface.

## Features

- Full Appsmith custom component support (bundled + CDN).
- Dual rendering modes: SSR infinite loading and client-side in-memory tables.
- Typed configuration powered by Zod schemas for columns, fetchers, and models.
- Rich styling hooks with Tailwind-first tokenization.
- Action hooks, event callbacks, and controlled `updateModel` APIs.
- Designed for pgrest/dbtorest pagination models.

## Table of Contents

1. [Demo](#demo)
2. [Installation](#installation)
3. [CDN Usage](#cdn-usage)
4. [Quick Start](#quick-start)
5. [Usage](#usage)
6. [Configuration Schemas](#configuration-schemas)
7. [Customization](#customization)
8. [SSR Table Capabilities](#ssr-table-capabilities)
9. [Client-Side Table Highlights](#client-side-table-highlights)
10. [Development](#development)
11. [Contributing](#contributing)
12. [License](#license)
13. [Acknowledgements](#acknowledgements)

## Demo

Explore the live Storybook playground: https://custom-appsmith-table.netlify.app/

## Installation

```bash
npm install @teamprodevs/appsmith-custom-table
# or
yarn add @teamprodevs/appsmith-custom-table
```

## CDN Usage

Ideal for Appsmith widgets where bundling is not available.

```html
<script src="https://unpkg.com/@teamprodevs/appsmith-custom-table/dist/app.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@teamprodevs/appsmith-custom-table/dist/styles.css" />
```

## Quick Start

1. Define a schema describing each column’s type, filtering, and sorting behavior.
2. Render the `AppsmithTable` with either `data` (client) or `tableModel` (SSR).
3. Optionally pass custom styles, actions, events, and an `updateModel` handler for controlled flows.

## Usage

### Client-side Table

```tsx
import { AppsmithTable } from "@teamprodevs/appsmith-custom-table";

const data = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

const schema = {
  id: { type: "text", filter: true, sort: true },
  name: { type: "text", filter: true, sort: true },
  age: { type: "number", filter: true, sort: true },
};

const ClientTable = () => <AppsmithTable schema={schema} data={data} />;
```

### SSR Infinite Table

```tsx
import { AppsmithTable } from "@teamprodevs/appsmith-custom-table";

const tableModel = {
  fetcher: {
    url: "https://api.example.com/users",
    method: "GET",
    perPage: 20,
    paginationKeys: { offset: "offset", limit: "limit" },
  },
  schema,
  updateModel: (state) => console.log("table state", state),
};

const UsersTable = () => <AppsmithTable tableModel={tableModel} />;
```

## Configuration Schemas

Every table is fully typed using Zod schemas. Key primitives include:

- **`ColumnItemSchema`**: Describes column type (`text`, `number`, etc.), sorting, filtering, sizing, visibility, and formatting.
- **`FetcherSchema`**: Encapsulates REST config—method, headers, query/body params, pagination keys, debounce, and optimistic flags.
- **`TableModelSchema`**: The orchestration layer combining schema, fetcher, selection settings, actions, row styles, and callbacks.

These schemas keep your tables consistent, validated, and shareable across projects.

## Customization

### Styles

```tsx
import {
  AppsmithTable,
  AppsmithTableStyles,
} from "@teamprodevs/appsmith-custom-table";

const styles: AppsmithTableStyles = {
  table: "border border-gray-200 rounded-md",
  head: { cell: "bg-gray-50 text-gray-700 font-semibold" },
  body: { cell: "px-3 py-2" },
  footer: "bg-white border-t",
};

const StyledTable = () => (
  <AppsmithTable schema={schema} data={data} styles={styles} />
);
```

### Actions & Events

- Define per-row action buttons or icons (edit, delete, open modal, etc.).
- Trigger events with contextual payloads for Appsmith event handlers.
- Consume `updateModel` to keep external state in sync with table interactions.

## SSR Table Capabilities

- Works seamlessly with infinite-query patterns and cursor or offset pagination.
- Handles server-driven sorting, filtering, and per-page controls.
- Compatible with pgrest and dbtorest APIs out of the box.
- Type-safe update flows ensure controlled mutations across distributed widgets.

## Client-Side Table Highlights

- Lightweight, in-memory data rendering with the same schema as SSR.
- Perfect for Appsmith custom components shipped via CDN.
- Supports local filtering, sorting, row selection, and inline actions without API calls.

## Development

1. Clone and install dependencies.
2. Run `npm run storybook` for live component development.
3. Add stories, ensure lint/tests pass, then open a PR.

```bash
git clone <your-fork>
cd appsmith-custom-table
npm install
npm run storybook
```

## Contributing

- Fork the repository and create a topic branch.
- Add tests or stories that cover your changes.
- Ensure formatting/lint pass, then submit a PR with context.
- Please attribute inspiration to `tablecn`.

## License

MIT © Ramz001

## Acknowledgements

Huge thanks to the Appsmith community and the `tablecn` project for the foundational inspiration that sparked this library.
 
