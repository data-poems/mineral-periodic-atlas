# Mineral Periodic Atlas

Explore the elements listed together in simplified mineral formulas. Select an element,
focus a mineral, or compare two elements across a curated set of 91 mineral
records. The table includes all 118 elements; an empty result means there is
no match in this collection.

[Open the atlas](https://datapoems.io/periodic/)

## Explore

- Search by name, symbol, or atomic number. Press Enter to select the first result.
- Select an element to keep it in view. Hover or focus a mineral to see its connections; select it to keep its details open.
- Use Compare to find shared formula elements. Filter by mineral family, hardness, crystal system, or typical color.
- Select a map marker to open a mineral at an example locality. The map does not show occurrence ranges or the origins of every pictured specimen.
- Share the current URL to preserve the selected element, mineral, comparison, and filters.

## Read the connections

The default graph uses the elements listed as required by each record's
simplified formula. “Required” describes that represented formula, not a measurement of a natural specimen. A species record represents an ideal composition; a group
or series record summarizes a range of compositions. Natural specimens can
contain substitutions and impurities that are not listed here.

Focus a mineral to include its listed variable occupants. For example, olivine's
metal sites can contain magnesium, iron, or both. A variable occupant is not the
same as an empty site. The focused view shows possibilities, not a claim that
every listed element occurs together in one specimen.

Comparison counts use required formula elements only. The data is an educational
reference set, not a complete mineral database or a specimen-identification test.
Hardness, color, and locality values are typical or approximate. See
[the data notes and sources](docs/DATA.md) for selected formula decisions and their sources.

## Run locally

Use Node.js 22.12 or later and pnpm 10.4.1.

```bash
git clone https://github.com/data-poems/mineral-periodic-atlas.git
cd mineral-periodic-atlas
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000/` for development.

```bash
pnpm check
pnpm test
pnpm validate
pnpm run audit
pnpm build
pnpm start
```

The production server opens the atlas at `http://localhost:3000/periodic/`.
`PORT` changes the server port. A static host can serve `dist/public` under
`/periodic/`; configure it to return the index page for application routes.
The app uses Google Fonts when available and local font fallbacks otherwise.
No API key or database is required.

To build for a different path, set the base at build time:

```bash
VITE_BASE_PATH=/ pnpm build
pnpm start
```

The build records its base path for the bundled server. `pnpm preview` is also
available for inspecting a build. `pnpm validate` checks data structure;
`pnpm run audit` lists connection coverage. Neither establishes chemical accuracy.
Bare `pnpm audit` is the package manager's dependency-security check.

## Code and image licenses

Code and original documentation are by Luke Steuber and released under the
[MIT License](LICENSE). The six specimen photographs retain their own licenses
or public-domain status. Their creators, sources, terms, and display changes
are listed in [Third-party notices](THIRD_PARTY_NOTICES.md) and in the atlas's
expanded mineral details. The MIT license does not relicense those photographs.
