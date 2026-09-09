# Map and filter visual verification

The initial 1440-pixel desktop capture confirmed that the locality section, filter trigger, mineral trait badges, and 24-entry locality index integrate cleanly with the existing atlas. The live Google map could not initialize in the screenshot environment, and the error path rendered correctly rather than leaving a blank panel.

A second desktop capture used the shareable filter state `hardness=very-hard` and `crystal=cubic`. It returned three minerals and two mapped localities, correctly narrowing the active-element detail list and the locality index. The deterministic offline world projection rendered automatically, with separate markers for Spinel in Sri Lanka and Diamond in South Africa. The map, filtered counts, control states, and empty/partial result behavior are visually coherent.

The 390-pixel mobile capture confirmed that the search, comparison, filter trigger, three advanced controls, result counts, horizontal periodic table, filtered empty state, world projection, and locality index stack without clipping. A moderate-hardness plus blue filter correctly returned two minerals and one mapped locality (Celestine).

The browser interaction test confirmed that the Clear action removes both active trait filters, changes the active-filter badge from 2 to none, restores all 57 minerals and all 24 mapped localities, repopulates Silicon’s 16 matching minerals, and restores the full element-connection set.

The locality interaction test clicked the Turquoise entry directly. The locality row became selected, the periodic-table focus changed to Copper (the first constituent element), the detail count updated to seven Copper-bearing minerals, and the Turquoise card expanded with its Neyshabur context and source link. This confirms click synchronization between the map index, element network, and mineral detail panel.
