export type ElementKind = "metal" | "metalloid" | "nonmetal" | "lanthanide" | "actinide";
export type MineralFamily =
  | "silicate"
  | "carbonate"
  | "sulfide"
  | "oxide"
  | "halide"
  | "sulfate"
  | "nitrate"
  | "phosphate"
  | "native";
export type CrystalSystem = "cubic" | "tetragonal" | "orthorhombic" | "hexagonal" | "trigonal" | "monoclinic" | "triclinic";
export type ColorGroup = "light" | "green" | "blue" | "warm" | "dark" | "metallic" | "multicolor";
export type HardnessBand = "soft" | "moderate" | "hard" | "very-hard";

export type ElementData = {
  number: number;
  symbol: string;
  name: string;
  col: number;
  row: number;
  kind: ElementKind;
};

export type MineralRecordKind = "species" | "group" | "series";

export type MineralData = {
  id: string;
  name: string;
  formula: string;
  family: MineralFamily;
  recordKind?: MineralRecordKind;
  elements: string[];
  substitutes?: string[];
  note: string;
  locality?: string;
  country?: string;
  localityContext?: string;
  sourceName?: string;
  sourceUrl?: string;
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageSourceUrl?: string;
  hardness: [number, number];
  hardnessBand: HardnessBand;
  crystalSystem: CrystalSystem;
  colorGroup: ColorGroup;
  coordinates?: { lat: number; lng: number };
};

const e = (
  number: number,
  symbol: string,
  name: string,
  col: number,
  row: number,
  kind: ElementKind,
): ElementData => ({ number, symbol, name, col, row, kind });

export const elements: ElementData[] = [
  e(1, "H", "Hydrogen", 1, 1, "nonmetal"), e(2, "He", "Helium", 18, 1, "nonmetal"),
  e(3, "Li", "Lithium", 1, 2, "metal"), e(4, "Be", "Beryllium", 2, 2, "metal"), e(5, "B", "Boron", 13, 2, "metalloid"), e(6, "C", "Carbon", 14, 2, "nonmetal"), e(7, "N", "Nitrogen", 15, 2, "nonmetal"), e(8, "O", "Oxygen", 16, 2, "nonmetal"), e(9, "F", "Fluorine", 17, 2, "nonmetal"), e(10, "Ne", "Neon", 18, 2, "nonmetal"),
  e(11, "Na", "Sodium", 1, 3, "metal"), e(12, "Mg", "Magnesium", 2, 3, "metal"), e(13, "Al", "Aluminium", 13, 3, "metal"), e(14, "Si", "Silicon", 14, 3, "metalloid"), e(15, "P", "Phosphorus", 15, 3, "nonmetal"), e(16, "S", "Sulfur", 16, 3, "nonmetal"), e(17, "Cl", "Chlorine", 17, 3, "nonmetal"), e(18, "Ar", "Argon", 18, 3, "nonmetal"),
  e(19, "K", "Potassium", 1, 4, "metal"), e(20, "Ca", "Calcium", 2, 4, "metal"), e(21, "Sc", "Scandium", 3, 4, "metal"), e(22, "Ti", "Titanium", 4, 4, "metal"), e(23, "V", "Vanadium", 5, 4, "metal"), e(24, "Cr", "Chromium", 6, 4, "metal"), e(25, "Mn", "Manganese", 7, 4, "metal"), e(26, "Fe", "Iron", 8, 4, "metal"), e(27, "Co", "Cobalt", 9, 4, "metal"), e(28, "Ni", "Nickel", 10, 4, "metal"), e(29, "Cu", "Copper", 11, 4, "metal"), e(30, "Zn", "Zinc", 12, 4, "metal"), e(31, "Ga", "Gallium", 13, 4, "metal"), e(32, "Ge", "Germanium", 14, 4, "metalloid"), e(33, "As", "Arsenic", 15, 4, "metalloid"), e(34, "Se", "Selenium", 16, 4, "nonmetal"), e(35, "Br", "Bromine", 17, 4, "nonmetal"), e(36, "Kr", "Krypton", 18, 4, "nonmetal"),
  e(37, "Rb", "Rubidium", 1, 5, "metal"), e(38, "Sr", "Strontium", 2, 5, "metal"), e(39, "Y", "Yttrium", 3, 5, "metal"), e(40, "Zr", "Zirconium", 4, 5, "metal"), e(41, "Nb", "Niobium", 5, 5, "metal"), e(42, "Mo", "Molybdenum", 6, 5, "metal"), e(43, "Tc", "Technetium", 7, 5, "metal"), e(44, "Ru", "Ruthenium", 8, 5, "metal"), e(45, "Rh", "Rhodium", 9, 5, "metal"), e(46, "Pd", "Palladium", 10, 5, "metal"), e(47, "Ag", "Silver", 11, 5, "metal"), e(48, "Cd", "Cadmium", 12, 5, "metal"), e(49, "In", "Indium", 13, 5, "metal"), e(50, "Sn", "Tin", 14, 5, "metal"), e(51, "Sb", "Antimony", 15, 5, "metalloid"), e(52, "Te", "Tellurium", 16, 5, "metalloid"), e(53, "I", "Iodine", 17, 5, "nonmetal"), e(54, "Xe", "Xenon", 18, 5, "nonmetal"),
  e(55, "Cs", "Caesium", 1, 6, "metal"), e(56, "Ba", "Barium", 2, 6, "metal"), e(72, "Hf", "Hafnium", 4, 6, "metal"), e(73, "Ta", "Tantalum", 5, 6, "metal"), e(74, "W", "Tungsten", 6, 6, "metal"), e(75, "Re", "Rhenium", 7, 6, "metal"), e(76, "Os", "Osmium", 8, 6, "metal"), e(77, "Ir", "Iridium", 9, 6, "metal"), e(78, "Pt", "Platinum", 10, 6, "metal"), e(79, "Au", "Gold", 11, 6, "metal"), e(80, "Hg", "Mercury", 12, 6, "metal"), e(81, "Tl", "Thallium", 13, 6, "metal"), e(82, "Pb", "Lead", 14, 6, "metal"), e(83, "Bi", "Bismuth", 15, 6, "metal"), e(84, "Po", "Polonium", 16, 6, "metalloid"), e(85, "At", "Astatine", 17, 6, "metalloid"), e(86, "Rn", "Radon", 18, 6, "nonmetal"),
  e(87, "Fr", "Francium", 1, 7, "metal"), e(88, "Ra", "Radium", 2, 7, "metal"), e(104, "Rf", "Rutherfordium", 4, 7, "metal"), e(105, "Db", "Dubnium", 5, 7, "metal"), e(106, "Sg", "Seaborgium", 6, 7, "metal"), e(107, "Bh", "Bohrium", 7, 7, "metal"), e(108, "Hs", "Hassium", 8, 7, "metal"), e(109, "Mt", "Meitnerium", 9, 7, "metal"), e(110, "Ds", "Darmstadtium", 10, 7, "metal"), e(111, "Rg", "Roentgenium", 11, 7, "metal"), e(112, "Cn", "Copernicium", 12, 7, "metal"), e(113, "Nh", "Nihonium", 13, 7, "metal"), e(114, "Fl", "Flerovium", 14, 7, "metal"), e(115, "Mc", "Moscovium", 15, 7, "metal"), e(116, "Lv", "Livermorium", 16, 7, "metal"), e(117, "Ts", "Tennessine", 17, 7, "nonmetal"), e(118, "Og", "Oganesson", 18, 7, "nonmetal"),
  e(57, "La", "Lanthanum", 3, 8, "lanthanide"), e(58, "Ce", "Cerium", 4, 8, "lanthanide"), e(59, "Pr", "Praseodymium", 5, 8, "lanthanide"), e(60, "Nd", "Neodymium", 6, 8, "lanthanide"), e(61, "Pm", "Promethium", 7, 8, "lanthanide"), e(62, "Sm", "Samarium", 8, 8, "lanthanide"), e(63, "Eu", "Europium", 9, 8, "lanthanide"), e(64, "Gd", "Gadolinium", 10, 8, "lanthanide"), e(65, "Tb", "Terbium", 11, 8, "lanthanide"), e(66, "Dy", "Dysprosium", 12, 8, "lanthanide"), e(67, "Ho", "Holmium", 13, 8, "lanthanide"), e(68, "Er", "Erbium", 14, 8, "lanthanide"), e(69, "Tm", "Thulium", 15, 8, "lanthanide"), e(70, "Yb", "Ytterbium", 16, 8, "lanthanide"), e(71, "Lu", "Lutetium", 17, 8, "lanthanide"),
  e(89, "Ac", "Actinium", 3, 9, "actinide"), e(90, "Th", "Thorium", 4, 9, "actinide"), e(91, "Pa", "Protactinium", 5, 9, "actinide"), e(92, "U", "Uranium", 6, 9, "actinide"), e(93, "Np", "Neptunium", 7, 9, "actinide"), e(94, "Pu", "Plutonium", 8, 9, "actinide"), e(95, "Am", "Americium", 9, 9, "actinide"), e(96, "Cm", "Curium", 10, 9, "actinide"), e(97, "Bk", "Berkelium", 11, 9, "actinide"), e(98, "Cf", "Californium", 12, 9, "actinide"), e(99, "Es", "Einsteinium", 13, 9, "actinide"), e(100, "Fm", "Fermium", 14, 9, "actinide"), e(101, "Md", "Mendelevium", 15, 9, "actinide"), e(102, "No", "Nobelium", 16, 9, "actinide"), e(103, "Lr", "Lawrencium", 17, 9, "actinide"),
];

type MineralBase = Omit<MineralData, "hardness" | "hardnessBand" | "crystalSystem" | "colorGroup" | "coordinates">;

const baseMinerals: MineralBase[] = [
  { id: "quartz", name: "Quartz", formula: "SiO₂", family: "silicate", elements: ["Si", "O"], note: "The most abundant framework silica mineral.", locality: "Hot Springs", country: "United States", localityContext: "Arkansas is a classic source of clear rock-crystal quartz.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-3337.html", image: "/specimens/quartz.jpg", imageAlt: "Clear quartz crystal cluster on a black background", imageCredit: "Wikimedia Commons", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Quartz,_Tibet.jpg" },
  { id: "albite", name: "Albite", formula: "NaAlSi₃O₈", family: "silicate", elements: ["Na", "Al", "Si", "O"], note: "Sodium end-member of plagioclase feldspar." },
  { id: "orthoclase", name: "Orthoclase", formula: "KAlSi₃O₈", family: "silicate", elements: ["K", "Al", "Si", "O"], note: "A potassium feldspar common in granitic rocks." },
  { id: "anorthite", name: "Anorthite", formula: "CaAl₂Si₂O₈", family: "silicate", elements: ["Ca", "Al", "Si", "O"], note: "Calcium end-member of plagioclase feldspar." },
  { id: "olivine", name: "Olivine group", formula: "(Mg,Fe)₂SiO₄", family: "silicate", recordKind: "series", elements: ["Mg", "Fe", "Si", "O"], note: "A magnesium–iron solid-solution series." },
  { id: "beryl", name: "Beryl", formula: "Be₃Al₂Si₆O₁₈", family: "silicate", elements: ["Be", "Al", "Si", "O"], note: "The mineral family of emerald and aquamarine." },
  { id: "kaolinite", name: "Kaolinite", formula: "Al₂Si₂O₅(OH)₄", family: "silicate", elements: ["Al", "Si", "O", "H"], note: "A principal clay mineral formed by weathering." },
  { id: "muscovite", name: "Muscovite", formula: "KAl₂(AlSi₃O₁₀)(OH)₂", family: "silicate", elements: ["K", "Al", "Si", "O", "H"], note: "A light-colored sheet mica." },
  { id: "talc", name: "Talc", formula: "Mg₃Si₄O₁₀(OH)₂", family: "silicate", elements: ["Mg", "Si", "O", "H"], note: "A very soft magnesium sheet silicate." },
  { id: "garnet", name: "Garnet group", formula: "X₃Y₂(SiO₄)₃", family: "silicate", recordKind: "group", elements: ["Si", "O"], substitutes: ["Fe", "Mg", "Ca", "Mn", "Al", "Cr"], note: "X and Y sites host metals such as Fe, Mg, Ca, Mn, Al, and Cr; those cations are optional occupants, not required formula elements." },
  { id: "calcite", name: "Calcite", formula: "CaCO₃", family: "carbonate", elements: ["Ca", "C", "O"], note: "The dominant mineral in limestone and marble.", locality: "Elmwood Mine, Tennessee", country: "United States", localityContext: "A classic source of lustrous calcite crystals.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-859.html", image: "/specimens/calcite.jpg", imageAlt: "Calcite crystal specimen", imageCredit: "Wikimedia Commons", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Calcite.jpg" },
  { id: "dolomite", name: "Dolomite", formula: "CaMg(CO₃)₂", family: "carbonate", elements: ["Ca", "Mg", "C", "O"], note: "A calcium–magnesium carbonate." },
  { id: "malachite", name: "Malachite", formula: "Cu₂CO₃(OH)₂", family: "carbonate", elements: ["Cu", "C", "O", "H"], note: "A vivid green secondary copper mineral." },
  { id: "azurite", name: "Azurite", formula: "Cu₃(CO₃)₂(OH)₂", family: "carbonate", elements: ["Cu", "C", "O", "H"], note: "A deep-blue secondary copper mineral." },
  { id: "rhodochrosite", name: "Rhodochrosite", formula: "MnCO₃", family: "carbonate", elements: ["Mn", "C", "O"], note: "A manganese carbonate, often rose-pink." },
  { id: "pyrite", name: "Pyrite", formula: "FeS₂", family: "sulfide", elements: ["Fe", "S"], note: "A widespread iron sulfide known as fool’s gold.", locality: "Navajún, La Rioja", country: "Spain", localityContext: "World-famous for sharply formed cubic pyrite crystals.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-3314.html", image: "/specimens/pyrite.jpg", imageAlt: "Metallic golden pyrite crystal specimen", imageCredit: "Wikimedia Commons", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Pyrite_(18858891699).jpg" },
  { id: "chalcopyrite", name: "Chalcopyrite", formula: "CuFeS₂", family: "sulfide", elements: ["Cu", "Fe", "S"], note: "The most important copper ore mineral." },
  { id: "galena", name: "Galena", formula: "PbS", family: "sulfide", elements: ["Pb", "S"], note: "The principal ore mineral of lead.", locality: "Viburnum Trend, Missouri", country: "United States", localityContext: "A major lead district noted for galena specimens.", sourceName: "USGS", sourceUrl: "https://www.usgs.gov/media/images/galena-specimen", image: "/specimens/galena.jpg", imageAlt: "Metallic gray galena specimen", imageCredit: "Wikimedia Commons", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Galena.jpg" },
  { id: "sphalerite", name: "Sphalerite", formula: "ZnS", family: "sulfide", elements: ["Zn", "S"], note: "The principal ore mineral of zinc." },
  { id: "molybdenite", name: "Molybdenite", formula: "MoS₂", family: "sulfide", elements: ["Mo", "S"], note: "The principal ore mineral of molybdenum." },
  { id: "cinnabar", name: "Cinnabar", formula: "HgS", family: "sulfide", elements: ["Hg", "S"], note: "The principal ore mineral of mercury." },
  { id: "hematite", name: "Hematite", formula: "Fe₂O₃", family: "oxide", elements: ["Fe", "O"], note: "A major iron ore and common red pigment mineral.", locality: "Minas Gerais", country: "Brazil", localityContext: "A classic district for lustrous iron-rose hematite.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-1856.html", image: "/specimens/hematite.jpg", imageAlt: "Dark metallic hematite crystal specimen", imageCredit: "Wikimedia Commons", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Hematite.jpg" },
  { id: "magnetite", name: "Magnetite", formula: "Fe₃O₄", family: "oxide", elements: ["Fe", "O"], note: "A naturally magnetic iron oxide." },
  { id: "corundum", name: "Corundum", formula: "Al₂O₃", family: "oxide", elements: ["Al", "O"], note: "The mineral family of ruby and sapphire." },
  { id: "rutile", name: "Rutile", formula: "TiO₂", family: "oxide", elements: ["Ti", "O"], note: "A major titanium mineral." },
  { id: "chromite", name: "Chromite", formula: "FeCr₂O₄", family: "oxide", elements: ["Fe", "Cr", "O"], note: "The principal ore mineral of chromium." },
  { id: "cassiterite", name: "Cassiterite", formula: "SnO₂", family: "oxide", elements: ["Sn", "O"], note: "The principal ore mineral of tin." },
  { id: "ilmenite", name: "Ilmenite", formula: "FeTiO₃", family: "oxide", elements: ["Fe", "Ti", "O"], note: "An iron–titanium oxide and titanium ore." },
  { id: "halite", name: "Halite", formula: "NaCl", family: "halide", elements: ["Na", "Cl"], note: "Rock salt: the natural mineral form of sodium chloride." },
  { id: "fluorite", name: "Fluorite", formula: "CaF₂", family: "halide", elements: ["Ca", "F"], note: "A calcium fluoride known for vivid colors.", locality: "Weardale, County Durham", country: "United Kingdom", localityContext: "A celebrated source of purple and green fluorite crystals.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-1576.html", image: "/specimens/fluorite.jpg", imageAlt: "Purple fluorite crystals", imageCredit: "Wikimedia Commons", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Fluorite.jpg" },
  { id: "sylvite", name: "Sylvite", formula: "KCl", family: "halide", elements: ["K", "Cl"], note: "A potassium chloride evaporite mineral." },
  { id: "gypsum", name: "Gypsum", formula: "CaSO₄·2H₂O", family: "sulfate", elements: ["Ca", "S", "O", "H"], note: "A hydrated calcium sulfate used in plaster." },
  { id: "barite", name: "Barite", formula: "BaSO₄", family: "sulfate", elements: ["Ba", "S", "O"], note: "A dense barium sulfate mineral." },
  { id: "apatite", name: "Apatite group", formula: "Ca₅(PO₄)₃(F,Cl,OH)", family: "phosphate", recordKind: "group", elements: ["Ca", "P", "O"], substitutes: ["F", "Cl", "H"], note: "A phosphate group whose channel anion may be F, Cl, or OH." },
  { id: "scheelite", name: "Scheelite", formula: "CaWO₄", family: "oxide", elements: ["Ca", "W", "O"], note: "An important tungsten-bearing mineral." },
  { id: "gold", name: "Native gold", formula: "Au", family: "native", elements: ["Au"], note: "Gold occurring as a native elemental mineral." },
  { id: "copper", name: "Native copper", formula: "Cu", family: "native", elements: ["Cu"], note: "Copper occurring naturally in elemental form." },
  { id: "graphite", name: "Graphite", formula: "C", family: "native", elements: ["C"], note: "A crystalline allotrope of elemental carbon." },
  { id: "sulfur", name: "Native sulfur", formula: "S", family: "native", elements: ["S"], note: "Sulfur occurring as a native elemental mineral." },
  { id: "zircon", name: "Zircon", formula: "ZrSiO₄", family: "silicate", elements: ["Zr", "Si", "O"], note: "Its durable crystals can preserve uranium–lead ages from the earliest crust.", locality: "Jack Hills, Western Australia", country: "Australia", localityContext: "Hosts zircon grains dated to about 4.4 billion years—among Earth’s oldest known minerals.", sourceName: "Geoscience Australia", sourceUrl: "https://www.ga.gov.au/education/minerals-energy/australian-mineral-facts/zircon" },
  { id: "spodumene", name: "Spodumene", formula: "LiAlSi₂O₆", family: "silicate", elements: ["Li", "Al", "Si", "O"], note: "A lithium ore whose gem varieties include kunzite and hiddenite.", locality: "Utö Mines, Stockholm County", country: "Sweden", localityContext: "The type locality designated for the original species description.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-3733.html" },
  { id: "topaz", name: "Topaz", formula: "Al₂SiO₄(F,OH)₂", family: "silicate", elements: ["Al", "Si", "O", "F", "H"], note: "Forms in pegmatites, rhyolite cavities, and high-temperature quartz veins.", locality: "Ouro Preto, Minas Gerais", country: "Brazil", localityContext: "The classic source of prized golden-orange imperial topaz.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-3996.html" },
  { id: "jadeite", name: "Jadeite", formula: "NaAlSi₂O₆", family: "silicate", elements: ["Na", "Al", "Si", "O"], note: "A pyroxene formed in high-pressure rocks associated with subduction zones.", locality: "Hpakan region", country: "Myanmar", localityContext: "Myanmar is the classic source and type locality for gem jadeite.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-2062.html" },
  { id: "chrysotile", name: "Chrysotile", formula: "Mg₃Si₂O₅(OH)₄", family: "silicate", elements: ["Mg", "Si", "O", "H"], note: "A fibrous serpentine-group sheet silicate with several recognized polytypes.", locality: "Złoty Stok, Lower Silesia", country: "Poland", localityContext: "The type locality for chrysotile.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-975.html" },
  { id: "tourmaline", name: "Tourmaline group", formula: "XY₃Z₆(T₆O₁₈)(BO₃)₃V₃W", family: "silicate", recordKind: "group", elements: ["B", "Al", "Si", "O"], substitutes: ["Na", "Ca", "Li", "Mg", "Fe", "Mn", "Cr", "Ti", "F", "H", "K"], note: "A chemically variable borosilicate group. V and W in the general formula are anion sites (O, OH, F), not vanadium or tungsten.", locality: "Island of Elba", country: "Italy", localityContext: "The classic locality that gave the tourmaline species elbaite its name.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-4003.html" },
  { id: "siderite", name: "Siderite", formula: "FeCO₃", family: "carbonate", elements: ["Fe", "C", "O"], note: "An iron carbonate found in hydrothermal veins and sedimentary ironstones.", locality: "Wyndham Colliery, South Wales", country: "United Kingdom", localityContext: "Noted for unusual stellate-twinned siderite crystals.", sourceName: "National Museum Wales", sourceUrl: "https://museum.wales/mineralogy-of-wales/database/?mineral=110&name=Siderite" },
  { id: "smithsonite", name: "Smithsonite", formula: "ZnCO₃", family: "carbonate", elements: ["Zn", "C", "O"], note: "A secondary zinc mineral commonly forming colorful botryoidal masses.", locality: "Kelly Mine, New Mexico", country: "United States", localityContext: "A classic source of blue-green botryoidal smithsonite specimens.", sourceName: "Smithsonian NMNH", sourceUrl: "https://naturalhistory.si.edu/explore/collections/geogallery/10002730" },
  { id: "bornite", name: "Bornite", formula: "Cu₅FeS₄", family: "sulfide", elements: ["Cu", "Fe", "S"], note: "An important copper ore whose surface tarnishes to peacock blues and purples.", locality: "Jáchymov, Karlovy Vary", country: "Czech Republic", localityContext: "The designated type locality for bornite.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-727.html" },
  { id: "pentlandite", name: "Pentlandite", formula: "(Ni,Fe)₉S₈", family: "sulfide", elements: ["Ni", "Fe", "S"], note: "A bronze-colored iron–nickel sulfide and major ore of nickel.", locality: "Espedalen mines, Innlandet", country: "Norway", localityContext: "A recognized co-type locality for pentlandite.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-3155.html" },
  { id: "cuprite", name: "Cuprite", formula: "Cu₂O", family: "oxide", elements: ["Cu", "O"], note: "A red secondary oxide formed in the weathered zone of copper deposits.", locality: "Lodge Park, Ceredigion", country: "United Kingdom", localityContext: "Produced exceptional euhedral wine-red cuprite crystals.", sourceName: "National Museum Wales", sourceUrl: "https://museum.wales/mineralogy-of-wales/database/?mineral=396&name=Cuprite" },
  { id: "spinel", name: "Spinel", formula: "MgAl₂O₄", family: "oxide", elements: ["Mg", "Al", "O"], note: "A durable gem mineral historically confused with ruby and sapphire.", locality: "Ratnapura district", country: "Sri Lanka", localityContext: "A classic gem-gravel district producing exceptional spinel.", sourceName: "Smithsonian NMNH", sourceUrl: "https://naturalhistory.si.edu/explore/collections/geogallery/10002923" },
  { id: "cryolite", name: "Cryolite", formula: "Na₃AlF₆", family: "halide", elements: ["Na", "Al", "F"], note: "A rare sodium–aluminium fluoride once essential as a flux in aluminium production.", locality: "Ivittuut mine, Sermersooq", country: "Greenland", localityContext: "The world’s only commercial cryolite mine and the classic locality.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/loc-1958.html" },
  { id: "celestine", name: "Celestine", formula: "SrSO₄", family: "sulfate", elements: ["Sr", "S", "O"], note: "A strontium sulfate found in sedimentary rocks, nodules, and hydrothermal veins.", locality: "Bell’s Mill, Pennsylvania", country: "United States", localityContext: "The type locality where celestine was first described.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/loc-16045.html" },
  { id: "turquoise", name: "Turquoise", formula: "CuAl₆(PO₄)₄(OH)₈·4H₂O", family: "phosphate", elements: ["Cu", "Al", "P", "O", "H"], note: "A blue-to-green hydrous phosphate formed by weathering in arid settings.", locality: "Neyshabur region", country: "Iran", localityContext: "A historic source of fine sky-blue turquoise for more than a millennium.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-4060.html" },
  { id: "monazite", name: "Monazite group", formula: "REEPO₄", family: "phosphate", recordKind: "group", elements: ["Ce", "P", "O"], substitutes: ["La", "Nd", "Sm", "Gd"], note: "A rare-earth phosphate whose uranium and thorium content supports geochronology. Ce is the common end-member; other REE occupy the same site.", locality: "Ilmen Nature Reserve, Chelyabinsk", country: "Russia", localityContext: "The type locality of monazite-(Ce), the group’s most common member.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-2750.html" },
  { id: "silver", name: "Native silver", formula: "Ag", family: "native", elements: ["Ag"], note: "A malleable native metal that may form spectacular wires and crystals.", locality: "Kongsberg Silver District", country: "Norway", localityContext: "The world’s most celebrated locality for wire-silver specimens.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-3664.html" },
  { id: "diamond", name: "Diamond", formula: "C", family: "native", elements: ["C"], note: "The hardest natural substance, built from a three-dimensional carbon lattice.", locality: "Cullinan Mine, Gauteng", country: "South Africa", localityContext: "Source of the 3,106-carat Cullinan, the largest gem-quality rough diamond found.", sourceName: "GIA", sourceUrl: "https://www.gia.edu/gems-gemology/summer-2006-cullinan-diamond-scarratt" },
  { id: "allanite", name: "Allanite group", formula: "(Ca,Ce,La,Nd,Y)₂(Al,Fe)₃(Si₂O₇)(SiO₄)O(OH)", family: "silicate", recordKind: "group", elements: ["Ca", "Al", "Fe", "Si", "O", "H"], substitutes: ["Ce", "La", "Nd", "Y"], note: "A rare-earth-rich member of the epidote supergroup. REE occupy the A site and are optional occupants in this group record.", sourceName: "WGNHS", sourceUrl: "https://home.wgnhs.wisc.edu/allanite/" },
  { id: "uraninite", name: "Uraninite", formula: "UO₂", family: "oxide", elements: ["U", "O"], note: "The most important primary ore mineral of uranium.", sourceName: "Geology.com", sourceUrl: "https://geology.com/minerals/uraninite.shtml" },
  { id: "columbite", name: "Columbite-(Fe)", formula: "FeNb₂O₆", family: "oxide", elements: ["Fe", "Nb", "O"], note: "The iron-dominant niobate end member of the columbite group.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-1514.html" },
  { id: "bismuthinite", name: "Bismuthinite", formula: "Bi₂S₃", family: "sulfide", elements: ["Bi", "S"], note: "A soft metallic sulfide and important ore of bismuth.", sourceName: "Minerals Education Coalition", sourceUrl: "https://mineralseducationcoalition.org/minerals-database/bismuth/" },
  { id: "stibnite", name: "Stibnite", formula: "Sb₂S₃", family: "sulfide", elements: ["Sb", "S"], note: "The principal ore mineral of antimony.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-3782.html" },
  { id: "realgar", name: "Realgar", formula: "As₄S₄", family: "sulfide", elements: ["As", "S"], note: "A light-sensitive red-orange arsenic sulfide.", sourceName: "Webmineral", sourceUrl: "https://webmineral.com/data/Realgar.shtml" },
  { id: "anglesite", name: "Anglesite", formula: "PbSO₄", family: "sulfate", elements: ["Pb", "S", "O"], note: "A secondary lead sulfate formed by oxidation of galena.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-233.html" },
  { id: "cerussite", name: "Cerussite", formula: "PbCO₃", family: "carbonate", elements: ["Pb", "C", "O"], note: "A lead carbonate common in oxidized lead deposits.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-934.html" },
  { id: "sperrylite", name: "Sperrylite", formula: "PtAs₂", family: "sulfide", elements: ["Pt", "As"], note: "A platinum arsenide and important platinum-group mineral.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-3723.html" },
  { id: "michenerite", name: "Michenerite", formula: "PdBiTe", family: "sulfide", elements: ["Pd", "Bi", "Te"], note: "A rare palladium–bismuth telluride mineral.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-2703.html" },
  { id: "skutterudite", name: "Skutterudite", formula: "CoAs₃", family: "sulfide", elements: ["Co", "As"], note: "A metallic cobalt arsenide of the skutterudite group.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-3682.html" },
  { id: "millerite", name: "Millerite", formula: "NiS", family: "sulfide", elements: ["Ni", "S"], note: "A nickel sulfide often forming radiating acicular crystals.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-2711.html" },
  { id: "powellite", name: "Powellite", formula: "CaMoO₄", family: "oxide", elements: ["Ca", "Mo", "O"], note: "A calcium molybdate found in oxidized molybdenum deposits.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-3275.html" },
  { id: "wolframite", name: "Wolframite", formula: "(Fe,Mn)WO₄", family: "oxide", elements: ["Fe", "Mn", "W", "O"], note: "The iron–manganese tungstate series and an important tungsten ore.", sourceName: "Webmineral", sourceUrl: "https://webmineral.com/data/Wolframite.shtml" },
  { id: "lepidolite", name: "Lepidolite", formula: "K(Li,Al)₃(Si,Al)₄O₁₀(F,OH)₂", family: "silicate", recordKind: "group", elements: ["K", "Li", "Al", "Si", "O"], substitutes: ["F", "H"], note: "A lithium-rich mica common in rare-element pegmatites.", sourceName: "Webmineral", sourceUrl: "https://webmineral.com/data/Lepidolite.shtml" },
  { id: "pollucite", name: "Pollucite", formula: "(Cs,Na)₂Al₂Si₄O₁₂·2H₂O", family: "silicate", elements: ["Cs", "Na", "Al", "Si", "O", "H"], note: "A caesium-rich zeolite found in rare-element pegmatites.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-3255.html" },
  { id: "bazzite", name: "Bazzite", formula: "Be₃Sc₂Si₆O₁₈", family: "silicate", elements: ["Be", "Sc", "Si", "O"], note: "The blue, scandium-dominant analogue of beryl.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-586.html" },
  { id: "hafnon", name: "Hafnon", formula: "HfSiO₄", family: "silicate", elements: ["Hf", "Si", "O"], note: "A rare hafnium-rich member of the zircon group.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-1792.html" },
  { id: "thorite", name: "Thorite", formula: "ThSiO₄", family: "silicate", elements: ["Th", "Si", "O"], note: "A radioactive thorium silicate of the zircon structural group.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-3946.html" },
  { id: "nitratine", name: "Nitratine", formula: "NaNO₃", family: "nitrate", elements: ["Na", "N", "O"], note: "Sodium nitrate occurring as efflorescences in hot, arid regions.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-2916.html" },
  { id: "gallite", name: "Gallite", formula: "CuGaS₂", family: "sulfide", elements: ["Cu", "Ga", "S"], note: "A rare copper–gallium member of the chalcopyrite group.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-1644.html" },
  { id: "germanite", name: "Germanite", formula: "Cu₁₃Fe₂Ge₂S₁₆", family: "sulfide", elements: ["Cu", "Fe", "Ge", "S"], note: "A rare copper–iron–germanium sulfide found in polymetallic ores.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-1681.html" },
  { id: "clausthalite", name: "Clausthalite", formula: "PbSe", family: "sulfide", elements: ["Pb", "Se"], note: "A lead selenide in the galena mineral group.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-1061.html" },
  { id: "bromargyrite", name: "Bromargyrite", formula: "AgBr", family: "halide", elements: ["Ag", "Br"], note: "A secondary silver bromide of oxidized silver deposits.", sourceName: "Handbook of Mineralogy", sourceUrl: "https://www.handbookofmineralogy.org/pdfs/bromargyrite.pdf" },
  { id: "rubicline", name: "Rubicline", formula: "(Rb,K)AlSi₃O₈", family: "silicate", recordKind: "series", elements: ["Rb", "Al", "Si", "O"], substitutes: ["K"], note: "The rubidium-dominant analogue of microcline feldspar.", sourceName: "American Mineralogist", sourceUrl: "https://pubs.geoscienceworld.org/msa/ammin/article/83/11-12_Part_1/1335/43446/Rubicline-a-new-feldspar-from-San-Piero-in-Campo" },
  { id: "rutheniridosmine", name: "Rutheniridosmine", formula: "(Ir,Os,Ru)", family: "native", elements: ["Ir", "Os", "Ru"], note: "A naturally occurring hexagonal alloy of platinum-group metals.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-3482.html" },
  { id: "greenockite", name: "Greenockite", formula: "CdS", family: "sulfide", elements: ["Cd", "S"], note: "A cadmium sulfide often found as yellow coatings on sphalerite.", sourceName: "National Museum Wales", sourceUrl: "https://museum.wales/mineralogy-of-wales/database/?mineral=260&name=Greenockite" },
  { id: "roquesite", name: "Roquesite", formula: "CuInS₂", family: "sulfide", elements: ["Cu", "In", "S"], note: "A rare indium-bearing member of the chalcopyrite group.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-3445.html" },
  { id: "iodargyrite", name: "Iodargyrite", formula: "AgI", family: "halide", elements: ["Ag", "I"], note: "A soft silver iodide associated with weathered silver ores.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-2037.html" },
  { id: "tantalite", name: "Tantalite-(Fe)", formula: "FeTa₂O₆", family: "oxide", elements: ["Fe", "Ta", "O"], note: "The iron-dominant tantalate member of the columbite supergroup.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-1530.html" },
  { id: "rheniite", name: "Rheniite", formula: "ReS₂", family: "sulfide", elements: ["Re", "S"], note: "A rare rhenium sulfide found in high-temperature fumaroles.", sourceName: "Handbook of Mineralogy", sourceUrl: "https://handbookofmineralogy.org/wp-content/uploads/2022/07/Rheniite.pdf" },
  { id: "lorandite", name: "Lorandite", formula: "TlAsS₂", family: "sulfide", elements: ["Tl", "As", "S"], note: "A rare thallium–arsenic sulfosalt from low-temperature deposits.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-2434.html" },
  { id: "calaverite", name: "Calaverite", formula: "AuTe₂", family: "sulfide", elements: ["Au", "Te"], note: "A metallic gold telluride and economically important gold mineral.", sourceName: "Mindat", sourceUrl: "https://www.mindat.org/min-852.html" },
  { id: "xenotime", name: "Xenotime-(Y)", formula: "YPO₄", family: "phosphate", elements: ["Y", "P", "O"], note: "A yttrium phosphate common as an accessory mineral in igneous rocks.", sourceName: "Webmineral", sourceUrl: "https://webmineral.com/data/Xenotime-(Y).shtml" },
];

const band = (minimum: number, maximum: number): HardnessBand => {
  if (maximum <= 2.5) return "soft";
  if (maximum <= 5) return "moderate";
  if (maximum < 7.5) return "hard";
  return "very-hard";
};

type TraitData = {
  hardness: [number, number];
  crystalSystem: CrystalSystem;
  colorGroup: ColorGroup;
  coordinates?: { lat: number; lng: number };
};

const mineralTraits: Record<string, TraitData> = {
  quartz: { hardness: [7, 7], crystalSystem: "trigonal", colorGroup: "light", coordinates: { lat: 34.504, lng: -93.055 } },
  albite: { hardness: [6, 6.5], crystalSystem: "triclinic", colorGroup: "light" },
  orthoclase: { hardness: [6, 6], crystalSystem: "monoclinic", colorGroup: "warm" },
  anorthite: { hardness: [6, 6.5], crystalSystem: "triclinic", colorGroup: "light" },
  olivine: { hardness: [6.5, 7], crystalSystem: "orthorhombic", colorGroup: "green" },
  beryl: { hardness: [7.5, 8], crystalSystem: "hexagonal", colorGroup: "green" },
  kaolinite: { hardness: [2, 2.5], crystalSystem: "triclinic", colorGroup: "light" },
  muscovite: { hardness: [2, 2.5], crystalSystem: "monoclinic", colorGroup: "light" },
  talc: { hardness: [1, 1], crystalSystem: "monoclinic", colorGroup: "light" },
  garnet: { hardness: [6.5, 7.5], crystalSystem: "cubic", colorGroup: "warm" },
  calcite: { hardness: [3, 3], crystalSystem: "trigonal", colorGroup: "light", coordinates: { lat: 36.248, lng: -85.955 } },
  dolomite: { hardness: [3.5, 4], crystalSystem: "trigonal", colorGroup: "light" },
  malachite: { hardness: [3.5, 4], crystalSystem: "monoclinic", colorGroup: "green" },
  azurite: { hardness: [3.5, 4], crystalSystem: "monoclinic", colorGroup: "blue" },
  rhodochrosite: { hardness: [3.5, 4], crystalSystem: "trigonal", colorGroup: "warm" },
  pyrite: { hardness: [6, 6.5], crystalSystem: "cubic", colorGroup: "metallic", coordinates: { lat: 42.311, lng: -2.101 } },
  chalcopyrite: { hardness: [3.5, 4], crystalSystem: "tetragonal", colorGroup: "metallic" },
  galena: { hardness: [2.5, 2.75], crystalSystem: "cubic", colorGroup: "metallic", coordinates: { lat: 37.714, lng: -91.129 } },
  sphalerite: { hardness: [3.5, 4], crystalSystem: "cubic", colorGroup: "warm" },
  molybdenite: { hardness: [1, 1.5], crystalSystem: "hexagonal", colorGroup: "metallic" },
  cinnabar: { hardness: [2, 2.5], crystalSystem: "trigonal", colorGroup: "warm" },
  hematite: { hardness: [5.5, 6.5], crystalSystem: "trigonal", colorGroup: "metallic", coordinates: { lat: -18.513, lng: -44.556 } },
  magnetite: { hardness: [5.5, 6.5], crystalSystem: "cubic", colorGroup: "dark" },
  corundum: { hardness: [9, 9], crystalSystem: "trigonal", colorGroup: "multicolor" },
  rutile: { hardness: [6, 6.5], crystalSystem: "tetragonal", colorGroup: "warm" },
  chromite: { hardness: [5.5, 5.5], crystalSystem: "cubic", colorGroup: "dark" },
  cassiterite: { hardness: [6, 7], crystalSystem: "tetragonal", colorGroup: "dark" },
  ilmenite: { hardness: [5, 6], crystalSystem: "trigonal", colorGroup: "dark" },
  halite: { hardness: [2.5, 2.5], crystalSystem: "cubic", colorGroup: "light" },
  fluorite: { hardness: [4, 4], crystalSystem: "cubic", colorGroup: "multicolor", coordinates: { lat: 54.73, lng: -2.0 } },
  sylvite: { hardness: [2, 2.5], crystalSystem: "cubic", colorGroup: "light" },
  gypsum: { hardness: [2, 2], crystalSystem: "monoclinic", colorGroup: "light" },
  barite: { hardness: [3, 3.5], crystalSystem: "orthorhombic", colorGroup: "light" },
  apatite: { hardness: [5, 5], crystalSystem: "hexagonal", colorGroup: "multicolor" },
  scheelite: { hardness: [4.5, 5], crystalSystem: "tetragonal", colorGroup: "light" },
  gold: { hardness: [2.5, 3], crystalSystem: "cubic", colorGroup: "metallic" },
  copper: { hardness: [2.5, 3], crystalSystem: "cubic", colorGroup: "metallic" },
  graphite: { hardness: [1, 2], crystalSystem: "hexagonal", colorGroup: "dark" },
  sulfur: { hardness: [1.5, 2.5], crystalSystem: "orthorhombic", colorGroup: "warm" },
  zircon: { hardness: [7.5, 7.5], crystalSystem: "tetragonal", colorGroup: "warm", coordinates: { lat: -26.2, lng: 117.2 } },
  spodumene: { hardness: [6.5, 7], crystalSystem: "monoclinic", colorGroup: "light", coordinates: { lat: 58.963, lng: 18.326 } },
  topaz: { hardness: [8, 8], crystalSystem: "orthorhombic", colorGroup: "multicolor", coordinates: { lat: -20.385, lng: -43.503 } },
  jadeite: { hardness: [6.5, 7], crystalSystem: "monoclinic", colorGroup: "green", coordinates: { lat: 25.613, lng: 96.319 } },
  chrysotile: { hardness: [2.5, 3], crystalSystem: "monoclinic", colorGroup: "green", coordinates: { lat: 50.444, lng: 16.875 } },
  tourmaline: { hardness: [7, 7.5], crystalSystem: "trigonal", colorGroup: "multicolor", coordinates: { lat: 42.783, lng: 10.284 } },
  siderite: { hardness: [3.5, 4.5], crystalSystem: "trigonal", colorGroup: "warm", coordinates: { lat: 51.58, lng: -3.58 } },
  smithsonite: { hardness: [4, 4.5], crystalSystem: "trigonal", colorGroup: "multicolor", coordinates: { lat: 34.063, lng: -107.053 } },
  bornite: { hardness: [3, 3.25], crystalSystem: "orthorhombic", colorGroup: "multicolor", coordinates: { lat: 50.369, lng: 12.913 } },
  pentlandite: { hardness: [3.5, 4], crystalSystem: "cubic", colorGroup: "metallic", coordinates: { lat: 61.257, lng: 9.489 } },
  cuprite: { hardness: [3.5, 4], crystalSystem: "cubic", colorGroup: "warm", coordinates: { lat: 52.46, lng: -3.94 } },
  spinel: { hardness: [8, 8], crystalSystem: "cubic", colorGroup: "multicolor", coordinates: { lat: 6.68, lng: 80.4 } },
  cryolite: { hardness: [2.5, 3], crystalSystem: "monoclinic", colorGroup: "light", coordinates: { lat: 61.2, lng: -48.17 } },
  celestine: { hardness: [3, 3.5], crystalSystem: "orthorhombic", colorGroup: "blue", coordinates: { lat: 40.6, lng: -78.34 } },
  turquoise: { hardness: [5, 6], crystalSystem: "triclinic", colorGroup: "blue", coordinates: { lat: 36.214, lng: 58.793 } },
  monazite: { hardness: [5, 5.5], crystalSystem: "monoclinic", colorGroup: "warm", coordinates: { lat: 55.16, lng: 60.13 } },
  silver: { hardness: [2.5, 3], crystalSystem: "cubic", colorGroup: "metallic", coordinates: { lat: 59.669, lng: 9.651 } },
  diamond: { hardness: [10, 10], crystalSystem: "cubic", colorGroup: "light", coordinates: { lat: -25.672, lng: 28.523 } },
  allanite: { hardness: [5.5, 6], crystalSystem: "monoclinic", colorGroup: "dark" },
  uraninite: { hardness: [5, 6], crystalSystem: "cubic", colorGroup: "dark" },
  columbite: { hardness: [6, 6], crystalSystem: "orthorhombic", colorGroup: "dark" },
  bismuthinite: { hardness: [2, 2.5], crystalSystem: "orthorhombic", colorGroup: "metallic" },
  stibnite: { hardness: [2, 2], crystalSystem: "orthorhombic", colorGroup: "metallic" },
  realgar: { hardness: [1.5, 2], crystalSystem: "monoclinic", colorGroup: "warm" },
  anglesite: { hardness: [2.5, 3], crystalSystem: "orthorhombic", colorGroup: "light" },
  cerussite: { hardness: [3, 3.5], crystalSystem: "orthorhombic", colorGroup: "light" },
  sperrylite: { hardness: [6, 7], crystalSystem: "cubic", colorGroup: "metallic" },
  michenerite: { hardness: [2.5, 2.5], crystalSystem: "cubic", colorGroup: "metallic" },
  skutterudite: { hardness: [5.5, 6], crystalSystem: "cubic", colorGroup: "metallic" },
  millerite: { hardness: [3, 3.5], crystalSystem: "hexagonal", colorGroup: "metallic" },
  powellite: { hardness: [3.5, 4], crystalSystem: "tetragonal", colorGroup: "warm" },
  wolframite: { hardness: [4, 4.5], crystalSystem: "monoclinic", colorGroup: "dark" },
  lepidolite: { hardness: [2.5, 3], crystalSystem: "monoclinic", colorGroup: "warm" },
  pollucite: { hardness: [6.5, 7], crystalSystem: "cubic", colorGroup: "light" },
  bazzite: { hardness: [6.5, 7], crystalSystem: "hexagonal", colorGroup: "blue" },
  hafnon: { hardness: [7.5, 7.5], crystalSystem: "tetragonal", colorGroup: "warm" },
  thorite: { hardness: [4.5, 5], crystalSystem: "tetragonal", colorGroup: "warm" },
  nitratine: { hardness: [1.5, 2], crystalSystem: "trigonal", colorGroup: "light" },
  gallite: { hardness: [3, 3.5], crystalSystem: "tetragonal", colorGroup: "metallic" },
  germanite: { hardness: [4, 4], crystalSystem: "cubic", colorGroup: "warm" },
  clausthalite: { hardness: [2.5, 3], crystalSystem: "cubic", colorGroup: "metallic" },
  bromargyrite: { hardness: [2.5, 2.5], crystalSystem: "cubic", colorGroup: "green" },
  rubicline: { hardness: [6, 6], crystalSystem: "triclinic", colorGroup: "light" },
  rutheniridosmine: { hardness: [6, 7], crystalSystem: "hexagonal", colorGroup: "metallic" },
  greenockite: { hardness: [3, 3.5], crystalSystem: "hexagonal", colorGroup: "warm" },
  roquesite: { hardness: [3.5, 4], crystalSystem: "tetragonal", colorGroup: "dark" },
  iodargyrite: { hardness: [1.5, 2], crystalSystem: "hexagonal", colorGroup: "light" },
  tantalite: { hardness: [6, 6.5], crystalSystem: "orthorhombic", colorGroup: "dark" },
  rheniite: { hardness: [1.5, 1.5], crystalSystem: "triclinic", colorGroup: "metallic" },
  lorandite: { hardness: [2, 2.5], crystalSystem: "monoclinic", colorGroup: "warm" },
  calaverite: { hardness: [2.5, 3], crystalSystem: "monoclinic", colorGroup: "metallic" },
  xenotime: { hardness: [4, 5], crystalSystem: "tetragonal", colorGroup: "warm" },
};

export const minerals: MineralData[] = baseMinerals.map((mineral) => {
  const traits = mineralTraits[mineral.id];
  if (!traits) throw new Error(`Missing filter traits for ${mineral.id}`);
  return {
    ...mineral,
    ...traits,
    hardnessBand: band(...traits.hardness),
  };
});

export const familyMeta: Record<MineralFamily, { label: string; color: string; glow: string }> = {
  silicate: { label: "Silicates", color: "#68d8c3", glow: "rgba(104,216,195,.42)" },
  carbonate: { label: "Carbonates", color: "#f0c36f", glow: "rgba(240,195,111,.42)" },
  sulfide: { label: "Sulfides", color: "#e89060", glow: "rgba(232,144,96,.42)" },
  oxide: { label: "Oxides", color: "#7bb6f0", glow: "rgba(123,182,240,.42)" },
  halide: { label: "Halides", color: "#b795e8", glow: "rgba(183,149,232,.42)" },
  sulfate: { label: "Sulfates", color: "#e18fa5", glow: "rgba(225,143,165,.42)" },
  nitrate: { label: "Nitrates", color: "#d98fcf", glow: "rgba(217,143,207,.42)" },
  phosphate: { label: "Phosphates", color: "#9dcd65", glow: "rgba(157,205,101,.42)" },
  native: { label: "Native elements", color: "#d8d1bd", glow: "rgba(216,209,189,.36)" },
};
