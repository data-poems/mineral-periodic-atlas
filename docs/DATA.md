# Data notes

Mineral Periodic Atlas contains a small, curated collection of simplified mineral
formulas. Links represent relationships in that collection, not chemical bonds,
measured abundance, or all combinations that can occur in nature.

## Required and variable occupants

`elements` contains the required elements in the record's represented formula.
`substitutes` contains selected variable occupants. Those lists are explicit
editorial choices, not the output of a formula parser. Parentheses can mark
hydroxyl groups, repeated units, variable occupants, or crystallographic sites.
They do not have one universal meaning.

The graph shows variable occupants when a mineral is hovered, focused, or pinned.
That union is a set of possibilities; it does not encode site proportions,
charge balance, or whether all alternatives can coexist. A missing element does
not establish that it never occurs in that mineral.

## Reviewed formula choices

| Record | Representation | Sources |
|---|---|---|
| Olivine series | Si and O are shared; Mg and Fe vary between endmembers | [Forsterite](https://handbookofmineralogy.org/pdfs/forsterite.pdf), [fayalite](https://handbookofmineralogy.org/pdfs/fayalite.pdf) |
| Topaz | Al, Si, O framework; F/OH site occupancy varies | [F/OH site study](https://ejm.copernicus.org/articles/34/507/2022/) |
| Monazite rare-earth phosphate records | P and O shared; rare-earth occupancy varies; Ce is not universal | [Monazite-(Nd)](https://handbookofmineralogy.org/pdfs/monazite-Nd.pdf) |
| Wolframite series | W and O shared; Fe/Mn site varies | [Ferberite and its series](https://handbookofmineralogy.org/pdfs/ferberite.pdf) |
| Pollucite | Cs-bearing framework; Na substitution and variable water content | [Pollucite reference aggregation](https://pubchem.ncbi.nlm.nih.gov/compound/Pollucite) |
| Tourmaline group | Borosilicate framework; Al is among variable metal-site occupants | [Tourmaline nomenclature](https://repository.lsu.edu/geo_pubs/900/), [Museum Wales formula](https://museum.wales/mineralogy-of-wales/database/?mineral=238&name=Tourmaline) |
| Allanite-(Ce) | A named Ce-dominant species and ideal formula, rather than a claim covering the entire group | [Allanite-(Ce)](https://handbookofmineralogy.org/pdfs/allanite-Ce.pdf) |
| Rubicline | Rb-dominant species; K can substitute | [Original description](https://pubs.geoscienceworld.org/msa/ammin/article/83/11-12_Part_1/1335/43446/Rubicline-a-new-feldspar-from-San-Piero-in-Campo) |
| Pentlandite | Fe and Ni retained in the represented species formula; parentheses describe variable proportions | [Pentlandite](https://handbookofmineralogy.org/pdfs/pentlandite.pdf) |

Tourmaline's general-formula V and W are site labels. They must not be parsed as
vanadium and tungsten. This does not claim that vanadium never occurs in
natural tourmaline: the selected substitutions are not exhaustive.

The garnet, apatite, monazite, and tourmaline rows are deliberately limited
summaries of familiar compositions, not complete mineral-supergroup definitions.
Each broader group can include chemistry beyond this collection's formula.

## Properties, places, and images

Hardness ranges, crystal systems, and typical colors support browsing. They do
not describe every specimen. Map coordinates mark selected classic or type
localities, sometimes a district or regional approximation. They are not
sampling locations or distribution boundaries.

A photograph illustrates the mineral. Its specimen origin can differ from the
mapped locality. Photo credits identify that distinction where the source
provides an origin. Thumbnail display crops the image; open the original photo
to inspect its full composition. Screen color is not a diagnostic mineral test.

## Validation limits

The data validator checks element symbols, duplicate records, property ranges,
locality metadata, and image-credit completeness. Regression tests cover selected
formula decisions and graph behavior. These checks do not certify the full
collection as a mineralogical database. Corrections should include a source and
a test when they change the meaning of the graph.
