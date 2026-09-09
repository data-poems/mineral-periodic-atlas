export type ElementKind = "metal" | "metalloid" | "nonmetal" | "lanthanide" | "actinide";
export type MineralFamily =
  | "silicate"
  | "carbonate"
  | "sulfide"
  | "oxide"
  | "halide"
  | "sulfate"
  | "phosphate"
  | "native";

export type ElementData = {
  number: number;
  symbol: string;
  name: string;
  col: number;
  row: number;
  kind: ElementKind;
};

export type MineralData = {
  id: string;
  name: string;
  formula: string;
  family: MineralFamily;
  elements: string[];
  note: string;
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

export const minerals: MineralData[] = [
  { id: "quartz", name: "Quartz", formula: "SiO₂", family: "silicate", elements: ["Si", "O"], note: "The most abundant framework silica mineral." },
  { id: "albite", name: "Albite", formula: "NaAlSi₃O₈", family: "silicate", elements: ["Na", "Al", "Si", "O"], note: "Sodium end-member of plagioclase feldspar." },
  { id: "orthoclase", name: "Orthoclase", formula: "KAlSi₃O₈", family: "silicate", elements: ["K", "Al", "Si", "O"], note: "A potassium feldspar common in granitic rocks." },
  { id: "anorthite", name: "Anorthite", formula: "CaAl₂Si₂O₈", family: "silicate", elements: ["Ca", "Al", "Si", "O"], note: "Calcium end-member of plagioclase feldspar." },
  { id: "olivine", name: "Olivine group", formula: "(Mg,Fe)₂SiO₄", family: "silicate", elements: ["Mg", "Fe", "Si", "O"], note: "A magnesium–iron solid-solution series." },
  { id: "beryl", name: "Beryl", formula: "Be₃Al₂Si₆O₁₈", family: "silicate", elements: ["Be", "Al", "Si", "O"], note: "The mineral family of emerald and aquamarine." },
  { id: "kaolinite", name: "Kaolinite", formula: "Al₂Si₂O₅(OH)₄", family: "silicate", elements: ["Al", "Si", "O", "H"], note: "A principal clay mineral formed by weathering." },
  { id: "muscovite", name: "Muscovite", formula: "KAl₂(AlSi₃O₁₀)(OH)₂", family: "silicate", elements: ["K", "Al", "Si", "O", "H"], note: "A light-colored sheet mica." },
  { id: "talc", name: "Talc", formula: "Mg₃Si₄O₁₀(OH)₂", family: "silicate", elements: ["Mg", "Si", "O", "H"], note: "A very soft magnesium sheet silicate." },
  { id: "garnet", name: "Garnet group", formula: "X₃Y₂(SiO₄)₃", family: "silicate", elements: ["Fe", "Mg", "Ca", "Mn", "Al", "Cr", "Si", "O"], note: "X and Y sites host metals such as Fe, Mg, Ca, Mn, Al, and Cr." },
  { id: "calcite", name: "Calcite", formula: "CaCO₃", family: "carbonate", elements: ["Ca", "C", "O"], note: "The dominant mineral in limestone and marble." },
  { id: "dolomite", name: "Dolomite", formula: "CaMg(CO₃)₂", family: "carbonate", elements: ["Ca", "Mg", "C", "O"], note: "A calcium–magnesium carbonate." },
  { id: "malachite", name: "Malachite", formula: "Cu₂CO₃(OH)₂", family: "carbonate", elements: ["Cu", "C", "O", "H"], note: "A vivid green secondary copper mineral." },
  { id: "azurite", name: "Azurite", formula: "Cu₃(CO₃)₂(OH)₂", family: "carbonate", elements: ["Cu", "C", "O", "H"], note: "A deep-blue secondary copper mineral." },
  { id: "rhodochrosite", name: "Rhodochrosite", formula: "MnCO₃", family: "carbonate", elements: ["Mn", "C", "O"], note: "A manganese carbonate, often rose-pink." },
  { id: "pyrite", name: "Pyrite", formula: "FeS₂", family: "sulfide", elements: ["Fe", "S"], note: "A widespread iron sulfide known as fool’s gold." },
  { id: "chalcopyrite", name: "Chalcopyrite", formula: "CuFeS₂", family: "sulfide", elements: ["Cu", "Fe", "S"], note: "The most important copper ore mineral." },
  { id: "galena", name: "Galena", formula: "PbS", family: "sulfide", elements: ["Pb", "S"], note: "The principal ore mineral of lead." },
  { id: "sphalerite", name: "Sphalerite", formula: "ZnS", family: "sulfide", elements: ["Zn", "S"], note: "The principal ore mineral of zinc." },
  { id: "molybdenite", name: "Molybdenite", formula: "MoS₂", family: "sulfide", elements: ["Mo", "S"], note: "The principal ore mineral of molybdenum." },
  { id: "cinnabar", name: "Cinnabar", formula: "HgS", family: "sulfide", elements: ["Hg", "S"], note: "The principal ore mineral of mercury." },
  { id: "hematite", name: "Hematite", formula: "Fe₂O₃", family: "oxide", elements: ["Fe", "O"], note: "A major iron ore and common red pigment mineral." },
  { id: "magnetite", name: "Magnetite", formula: "Fe₃O₄", family: "oxide", elements: ["Fe", "O"], note: "A naturally magnetic iron oxide." },
  { id: "corundum", name: "Corundum", formula: "Al₂O₃", family: "oxide", elements: ["Al", "O"], note: "The mineral family of ruby and sapphire." },
  { id: "rutile", name: "Rutile", formula: "TiO₂", family: "oxide", elements: ["Ti", "O"], note: "A major titanium mineral." },
  { id: "chromite", name: "Chromite", formula: "FeCr₂O₄", family: "oxide", elements: ["Fe", "Cr", "O"], note: "The principal ore mineral of chromium." },
  { id: "cassiterite", name: "Cassiterite", formula: "SnO₂", family: "oxide", elements: ["Sn", "O"], note: "The principal ore mineral of tin." },
  { id: "ilmenite", name: "Ilmenite", formula: "FeTiO₃", family: "oxide", elements: ["Fe", "Ti", "O"], note: "An iron–titanium oxide and titanium ore." },
  { id: "halite", name: "Halite", formula: "NaCl", family: "halide", elements: ["Na", "Cl"], note: "Rock salt: the natural mineral form of sodium chloride." },
  { id: "fluorite", name: "Fluorite", formula: "CaF₂", family: "halide", elements: ["Ca", "F"], note: "A calcium fluoride known for vivid colors." },
  { id: "sylvite", name: "Sylvite", formula: "KCl", family: "halide", elements: ["K", "Cl"], note: "A potassium chloride evaporite mineral." },
  { id: "gypsum", name: "Gypsum", formula: "CaSO₄·2H₂O", family: "sulfate", elements: ["Ca", "S", "O", "H"], note: "A hydrated calcium sulfate used in plaster." },
  { id: "barite", name: "Barite", formula: "BaSO₄", family: "sulfate", elements: ["Ba", "S", "O"], note: "A dense barium sulfate mineral." },
  { id: "apatite", name: "Apatite group", formula: "Ca₅(PO₄)₃(F,Cl,OH)", family: "phosphate", elements: ["Ca", "P", "O", "F", "Cl", "H"], note: "A phosphate group with variable F, Cl, or OH." },
  { id: "scheelite", name: "Scheelite", formula: "CaWO₄", family: "oxide", elements: ["Ca", "W", "O"], note: "An important tungsten-bearing mineral." },
  { id: "gold", name: "Native gold", formula: "Au", family: "native", elements: ["Au"], note: "Gold occurring as a native elemental mineral." },
  { id: "copper", name: "Native copper", formula: "Cu", family: "native", elements: ["Cu"], note: "Copper occurring naturally in elemental form." },
  { id: "graphite", name: "Graphite", formula: "C", family: "native", elements: ["C"], note: "A crystalline allotrope of elemental carbon." },
  { id: "sulfur", name: "Native sulfur", formula: "S", family: "native", elements: ["S"], note: "Sulfur occurring as a native elemental mineral." },
];

export const familyMeta: Record<MineralFamily, { label: string; color: string; glow: string }> = {
  silicate: { label: "Silicates", color: "#68d8c3", glow: "rgba(104,216,195,.42)" },
  carbonate: { label: "Carbonates", color: "#f0c36f", glow: "rgba(240,195,111,.42)" },
  sulfide: { label: "Sulfides", color: "#e89060", glow: "rgba(232,144,96,.42)" },
  oxide: { label: "Oxides", color: "#7bb6f0", glow: "rgba(123,182,240,.42)" },
  halide: { label: "Halides", color: "#b795e8", glow: "rgba(183,149,232,.42)" },
  sulfate: { label: "Sulfates", color: "#e18fa5", glow: "rgba(225,143,165,.42)" },
  phosphate: { label: "Phosphates", color: "#9dcd65", glow: "rgba(157,205,101,.42)" },
  native: { label: "Native elements", color: "#d8d1bd", glow: "rgba(216,209,189,.36)" },
};
