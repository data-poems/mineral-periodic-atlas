# Mineral Periodic Atlas

Interactive periodic table of mineral-forming element co-occurrence.

Live: [datapoems.io/periodic/](https://datapoems.io/periodic/)

Arcs connect an element to other elements that share a **required** formula occupant in this reference set. Optional substitutions (garnet cations, apatite F/Cl/OH, tourmaline site chemistry) appear only when that mineral is pinned. Tourmaline’s general-formula `V` and `W` are anion sites, not vanadium or tungsten.

```bash
pnpm install
pnpm dev          # http://localhost:3000/
pnpm test
pnpm validate
VITE_BASE_PATH=/periodic/ pnpm exec vite build
```

Deep links are query state, for example `/periodic/?element=Pt&mineral=sperrylite`.
