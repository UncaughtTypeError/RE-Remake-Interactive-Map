/**
 * @file Shared type definitions for static resource data.
 * @description Defines types and interfaces for resources (items, rooms, biohazards) used in data
 * files (e.g., `items.ts`, `map-data.ts`) and services. Includes string literal types for
 * consistent validation and filtering (e.g., `DifficultyLevel`, `ItemType`). Used across the
 * application for type safety.
 * @see {@link ./README.md} for data structure details.
 */

/**
 * General
 */
export type CharacterCode = 'JV' | 'CR';

export type DifficultyLevel =
    | 'JV-lvl-very-easy'
    | 'JV-lvl-easy'
    | 'JV-lvl-normal'
    | 'JV-lvl-hard'
    | 'CR-lvl-very-easy'
    | 'CR-lvl-easy'
    | 'CR-lvl-normal'
    | 'CR-lvl-hard';

export enum DifficultyLevelEnum {
    JV_VERY_EASY = 'JV-lvl-very-easy',
    JV_EASY = 'JV-lvl-easy',
    JV_NORMAL = 'JV-lvl-normal',
    JV_HARD = 'JV-lvl-hard',
    CR_VERY_EASY = 'CR-lvl-very-easy',
    CR_EASY = 'CR-lvl-easy',
    CR_NORMAL = 'CR-lvl-normal',
    CR_HARD = 'CR-lvl-hard',
}

interface RoomMapData {
    roomId: RoomID; // e.g. "keepersRoom"
    mapId: MapID; // e.g. "mansionF1"
}

/**
 * Items
 */
type ItemType =
    // Featured Items
    | 'Typewriter'
    | 'ItemBox'
    | 'Kerosene'
    | 'Map'
    | 'Interactable'
    // General Items
    | 'PersonOfInterest'
    | 'DoorKey'
    | 'InkRibbon'
    | 'ItemOfInterest'
    | 'Document'
    | 'GreenHerb'
    | 'RedHerb'
    | 'BlueHerb'
    | 'FirstAid'
    | 'MixedHerbs'
    | 'SelfDefense'
    | 'Ammunition'
    | 'Weapon';

export enum ItemTypeEnum {
    // Featured Items
    TYPEWRITER = 'Typewriter',
    ITEM_BOX = 'ItemBox',
    KEROSENE = 'Kerosene',
    MAP = 'Map',
    INTERACTABLE = 'Interactable',
    // General Items
    PERSON = 'PersonOfInterest',
    DOOR_KEY = 'DoorKey',
    INK_RIBBON = 'InkRibbon',
    ITEM_OF_INTEREST = 'ItemOfInterest',
    DOCUMENT = 'Document',
    GREEN_HERB = 'GreenHerb',
    RED_HERB = 'RedHerb',
    BLUE_HERB = 'BlueHerb',
    FIRST_AID = 'FirstAid',
    MIXED_HERBS = 'MixedHerbs',
    SELF_DEFENSE = 'SelfDefense',
    AMMUNITION = 'Ammunition',
    WEAPON = 'Weapon',
}

export type ItemID =
    // Persons
    | 'barryBurton'
    | 'rebeccaChambers'
    | 'kennethJSullivan'
    | 'richardAiken'
    // Interactable Items
    | 'typewriter'
    | 'itemBox'
    | 'kerosene'
    | 'map'
    | 'radio'
    | 'passCodeOutputTerminal'
    // Key Items
    | 'lighter'
    | 'lockpick'
    | 'oldKey'
    | 'goldenArrow'
    | 'arrowhead'
    | 'shieldKey'
    | 'emblemKey'
    | 'emblem'
    | 'blueGemstone'
    | 'redGemstone'
    | 'yellowGemstone'
    | 'kennethsFilm'
    | 'goldEmblem'
    | 'missingMusic'
    | 'brokenShotgun'
    | 'moDisk'
    | 'maskWithoutEyes'
    | 'maskWithoutMouth'
    | 'maskWithoutNose'
    | 'maskWithoutEyesNoseMouth'
    | 'lastBookVol1'
    | 'lastBookVol2'
    | 'medalOfEagle'
    | 'medalOfWolf'
    | 'sunMoonJewelryBox'
    | 'broach'
    | 'herbicide'
    | 'metalObject'
    | 'fuelCanteen'
    | 'inkRibbon'
    | 'bookOfCurses'
    | 'swordKey'
    | 'dogWhistle'
    | 'collar'
    | 'coin'
    | 'imitationOfAKey'
    | 'armorKey'
    | 'woodenMount'
    | 'jewelryBoxJewel'
    | 'musicMidPages'
    | 'moonlightSonata'
    | 'fishhook'
    | 'lureWithoutHook'
    | 'lureOfABee'
    | 'beeSpecimen'
    | 'windCrest'
    | 'stoneAndMetalObject'
    | 'moonCrest'
    | 'starCrest'
    | 'sunCrest'
    | 'squareCrank'
    | 'keyForRoom001'
    | 'insecticideSpray'
    | 'galleryKey'
    | 'unprintedBook'
    | 'controlRoomKey'
    | 'keyForRoom003'
    | 'emptyBottle'
    | 'water'
    | 'umbNo3'
    | 'np004'
    | 'yellow6'
    | 'umbNo7'
    | 'umbNo10'
    | 'vp017'
    | 'vJolt'
    | 'helmetKey'
    | 'jewelryBoxWithRecession'
    | 'battery'
    | 'hexagonCrank'
    | 'cylinder'
    | 'shaft'
    | 'cylinderShaft'
    | 'brokenFlamethrower'
    | 'jewelryBoxStoneRing'
    | 'stoneRing'
    | 'xRayOfClark'
    | 'xRayOfGail'
    | 'slideFilter'
    | 'keyForPowerArea'
    | 'fuelSupplyCapsuleEmpty'
    | 'fuelSupplyCapsuleFull'
    | 'masterKey'
    | 'fuseUnit'
    | 'signalRockets'
    | 'closetKey'
    | 'serum'
    // Recovery Items
    | 'greenHerb'
    | 'blueHerb'
    | 'redHerb'
    | 'firstAidSpray'
    | 'firstAidBox'
    | 'mixedHerbsGG'
    | 'mixedHerbsGR'
    | 'mixedHerbsGB'
    | 'mixedHerbsGGB'
    | 'mixedHerbsGGG'
    | 'mixedHerbsGRB'
    // Documents
    | 'trevorsDiaryVol1'
    | 'trevorsDiaryVol2'
    | 'trevorsDiaryVol3'
    | 'keepersDiary'
    | 'bodyDisposal'
    // Weaponry
    | 'survivalKnifeChris'
    | 'survivalKnifeJill'
    | 'survivalKnife'
    | 'handgun'
    | 'samuraiEdge'
    | 'dagger'
    | 'stunGun'
    | 'shotgun'
    | 'assaultShotgun'
    | 'grenadeLauncher'
    | 'selfDefenseGun'
    | 'magnumRevolver'
    | 'flamethrower'
    | 'barrys44Magnum'
    | 'rocketLauncher'
    | 'rocketLauncherSingleBarrel'
    | 'batteryPack'
    | 'flashGrenade'
    | 'handgunMagazine'
    | 'shotgunShells'
    | 'grenadeShells'
    | 'acidShells'
    | 'incendiaryShells'
    | 'magnumRounds';

export enum ItemIDEnum {
    // Persons
    BARRY_BURTON = 'barryBurton',
    REBECCA_CHAMBERS = 'rebeccaChambers',
    KENNETH_J_SULLIVAN = 'kennethJSullivan',
    RICHARD_AIKEN = 'richardAiken',
    // Interactable Items
    TYPEWRITER = 'typewriter',
    ITEM_BOX = 'itemBox',
    KEROSENE = 'kerosene',
    MAP = 'map',
    RADIO = 'radio',
    PASS_CODE_OUTPUT_TERMINAL = 'passCodeOutputTerminal',
    // Key Items
    LIGHTER = 'lighter',
    LOCKPICK = 'lockpick',
    OLD_KEY = 'oldKey',
    SHIELD_KEY = 'shieldKey',
    EMBLEM_KEY = 'emblemKey',
    EMBLEM = 'emblem',
    BLUE_GEMSTONE = 'blueGemstone',
    RED_GEMSTONE = 'redGemstone',
    KENNETHS_FILM = 'kennethsFilm',
    GOLD_EMBLEM = 'goldEmblem',
    MISSING_MUSIC = 'missingMusic',
    SERUM = 'serum',
    BROKEN_SHOTGUN = 'brokenShotgun',
    MO_DISK = 'moDisk',
    MASK_WITHOUT_EYES = 'maskWithoutEyes',
    MASK_WITHOUT_MOUTH = 'maskWithoutMouth',
    LAST_BOOK_VOL_1 = 'lastBookVol1',
    MEDAL_OF_EAGLE = 'medalOfEagle',
    SUN_MOON_JEWELRY_BOX = 'sunMoonJewelryBox',
    BROACH = 'broach',
    HERBICIDE = 'herbicide',
    METAL_OBJECT = 'metalObject',
    FUEL_CANTEEN = 'fuelCanteen',
    INK_RIBBON = 'inkRibbon',
    // Recovery Items
    GREEN_HERB = 'greenHerb',
    BLUE_HERB = 'blueHerb',
    RED_HERB = 'redHerb',
    FIRST_AID_SPRAY = 'firstAidSpray',
    // Documents
    TREVORS_DIARY_VOL_1 = 'TrevorsDiaryVol1',
    TREVORS_DIARY_VOL_2 = 'TrevorsDiaryVol2',
    TREVORS_DIARY_VOL_3 = 'TrevorsDiaryVol3',
    KEEPERS_DIARY = 'keepersDiary',
    BODY_DISPOSAL = 'bodyDisposal',
    // Weaponry
    HANDGUN = 'handgun',
    SHOTGUN = 'shotgun',
    BATTERY_PACK = 'batteryPack',
    FLASH_GRENADE = 'flashGrenade',
    DAGGER = 'dagger',
    HANDGUN_MAGAZINE = 'handgunMagazine',
    SHOTGUN_SHELLS = 'shotgunShells',
    GRENADE_SHELLS = 'grenadeShells',
    INCENDIARY_SHELLS = 'incendiaryShells',
    ACID_SHELLS = 'acidShells',
    MAGNUM_ROUNDS = 'magnumRounds',
}

type ItemDisplayName =
    // Persons
    | 'Barry Burton'
    | 'Rebecca Chambers'
    | 'Kenneth J. Sullivan'
    | 'Richard Aiken'
    // Interactable Items
    | 'Typewriter'
    | 'Item Box'
    | 'Kerosene'
    | 'Map - Mansion F1'
    | 'Map - Mansion F2'
    | 'Map - Mansion B1'
    | 'Map - Courtyard F1'
    | 'Map - Courtyard B1'
    | 'Map - Residence F1'
    | 'Map - Aqua Ring'
    | 'Map - Underground Laboratory'
    | 'Radio'
    | 'Pass Code Output Terminal'
    // Key Items
    | 'Lighter'
    | 'Lockpick'
    | 'Old Key'
    | 'Golden Arrow'
    | 'Arrowhead'
    | 'Shield Key'
    | 'Emblem Key'
    | 'Emblem'
    | 'Blue Gemstone'
    | 'Red Gemstone'
    | 'Yellow Gemstone'
    | "Kenneth's Film"
    | 'Gold Emblem'
    | 'Missing Music'
    | 'Broken Shotgun'
    | 'MO Disk'
    | 'Mask without Eyes'
    | 'Mask without Mouth'
    | 'Mask without Nose'
    | 'Mask without Eyes, Nose, or Mouth'
    | 'Last Book Vol. 1'
    | 'Last Book Vol. 2'
    | 'Medal of Eagle'
    | 'Medal of Wolf'
    | 'Sun & Moon Jewelry Box'
    | 'Broach'
    | 'Herbicide'
    | 'Metal Object'
    | 'Fuel Canteen'
    | 'Ink Ribbon'
    | 'Book of Curses'
    | 'Sword Key'
    | 'Dog Whistle'
    | 'Collar'
    | 'Coin'
    | 'Imitation of a Key'
    | 'Armor Key'
    | 'Wooden Mount'
    | 'Jewelry Box (1)'
    | 'Music, Mid-Pages'
    | '"Moonlight Sonata"'
    | 'Fishhook'
    | 'Lure without a Hook'
    | 'Lure of a Bee'
    | 'Bee Specimen'
    | 'Wind Crest'
    | 'Stone & Metal Object'
    | 'Moon Crest'
    | 'Star Crest'
    | 'Sun Crest'
    | 'Square Crank'
    | 'Key for Room 001'
    | 'Insecticide Spray'
    | 'Gallery Key'
    | 'Unprinted Book'
    | 'Control Room Key'
    | 'Key for Room 003'
    | 'Empty Bottle'
    | 'Water'
    | 'UMB No.3'
    | 'NP-004'
    | 'Yellow-6'
    | 'UMB No.7'
    | 'UMB No.10'
    | 'VP-017'
    | 'V-JOLT'
    | 'Helmet Key'
    | 'Jewelry Box (2)'
    | 'Battery'
    | 'Hexagon Crank'
    | 'Cylinder'
    | 'Shaft'
    | 'Cylinder Shaft'
    | 'Broken Flamethrower'
    | 'Jewelry Box (3)'
    | 'Stone Ring'
    | 'X-Ray of CLARK'
    | 'X-Ray of GAIL'
    | 'Slide Filter'
    | 'Key for the Power Area'
    | 'Fuel Supply Capsule (Empty)'
    | 'Fuel Supply Capsule (Full)'
    | 'Master Key'
    | 'Fuse Unit'
    | 'Signal Rockets'
    | 'Closet Key'
    | 'Serum'
    // Recovery Items
    | 'Green Herb'
    | 'Blue Herb'
    | 'Red Herb'
    | 'First Aid Spray'
    | 'First Aid Box'
    | 'Mixed Herbs (G+G)'
    | 'Mixed Herbs (G+R)'
    | 'Mixed Herbs (G+B)'
    | 'Mixed Herbs (G+G+B)'
    | 'Mixed Herbs (G+G+G)'
    | 'Mixed Herbs (G+R+B)'
    // Documents
    | "Trevor's Diary Vol. 1"
    | "Trevor's Diary Vol. 2"
    | "Trevor's Diary Vol. 3"
    | "Keeper's Diary"
    | 'Body Disposal'
    // Weaponry
    | 'Stun Gun'
    | 'Flash Grenade'
    | 'Dagger'
    | 'Survival Knife (Chris)'
    | 'Survival Knife (Jill)'
    | 'Survival Knife'
    | 'Handgun'
    | 'Samurai Edge'
    | 'Shotgun'
    | 'Assault Shotgun'
    | 'Grenade Launcher'
    | 'Self Defense Gun'
    | 'Magnum Revolver'
    | 'Flamethrower'
    | "Barry's 44 Magnum"
    | 'Rocket Launcher'
    | 'Rocket Launcher (Single Barrel)'
    | 'Battery Pack'
    | 'Handgun Magazine'
    | 'Shotgun Shells'
    | 'Grenade Shells'
    | 'Acid Shells'
    | 'Incendiary Shells'
    | 'Magnum Rounds';

type Taxonomy = 'Interactable Items' | 'Key Items' | 'Weaponry' | 'Documents' | 'Recovery Items';

type ItemFunction =
    | 'Save Point'
    | 'Storage Point'
    | 'Refill Point'
    | 'Navigation'
    | 'NPC Interaction'
    | 'Item Interaction'
    | 'Biohazard Interaction'
    | 'Environment Interaction'
    | 'Puzzle Interaction'
    | 'Access Tool'
    | 'Progress Save'
    | 'Defense'
    | 'Offense'
    | 'Ammunition'
    | 'Recovery'
    | 'Documentation'
    | null;
export interface QtyItems {
    qty: number; // e.g. 3
    difficultyLevel: DifficultyLevel[]; // e.g. ["JV-lvl-easy", "JV-lvl-normal", "JV-lvl-hard"]
}

export interface Uses {
    uses: number; // e.g. 4
    difficultyLevel: DifficultyLevel[]; // e.g. ["JV-lvl-very-easy", "JV-lvl-easy", "JV-lvl-normal", "JV-lvl-hard"]
}

type ItemRequirement =
    | 'none'
    | 'dialogue'
    | 'puzzleSolving'
    | 'examination'
    | 'investigation'
    | 'event';

export interface ItemData {
    id: ItemID; // e.g. "batteryPack"
    name: ItemDisplayName; // e.g. "Battery Pack"
    type: ItemType; // e.g. "SelfDefense"
    taxonomy: Taxonomy; // e.g. "Weaponry"
    function: ItemFunction | null; // e.g. "Save Point"
    imageSrc: string; // e.g. "assets/images/batteryPack.jpg"
    description: string; // e.g. "An ordinary battery sold in stores. Looks like it could be used as spares for the stun gun."
    exclusive: CharacterCode | null; // e.g. JV
}

export interface ItemRoomData {
    id: string; // e.g. "selfDefenseJV-keepersRoom"
    itemId: ItemID; // e.g. "batteryPack"
    map: RoomMapData; // e.g. { roomId: "keepersRoom", mapId: "mansionF1" }
    difficultyLevel: DifficultyLevel[]; // e.g. ["JV-lvl-very-easy", "JV-lvl-easy"]
    name: ItemDisplayName; // e.g. "Battery Pack"
    type: ItemType; // e.g. "SelfDefense"
    qty: number; // e.g. 5
    qtyItems: QtyItems[] | number | null; // e.g. [{ qty: 3, difficultyLevel: ["JV-lvl-easy", "JV-lvl-normal", "JV-lvl-hard"] }] or 5
    uses: Uses[] | null; // e.g. { uses: 4, difficultyLevel: ["JV-lvl-very-easy", "CR-lvl-very-easy"] }
    isFeatured: boolean; // e.g. false
    requirement: ItemRequirement; // e.g. "dialogue"
}

/**
 * Search filters for items.
 * @interface ItemSearchFilters
 */
export interface ItemSearchFilters {
    /** The room where the items are located (e.g., 'keepersRoom'). */
    room?: RoomID;
    /** The difficulty level (e.g., 'JV-lvl-easy'). */
    difficulty?: DifficultyLevel;
    /** The type of item (e.g., 'SelfDefense'). */
    type?: ItemType;
    /** The full or partial name of the item (case-insensitive). */
    name?: string;
}

export enum ItemSearchFiltersEnum {
    ROOM = 'room',
    DIFFICULTY = 'difficulty',
    TYPE = 'type',
    NAME = 'name',
}

/**
 * Biohazards
 */

export type BiohazardCode =
    | 'Ad' // Adder
    | 'Cr' // Crow
    | 'Fp' // Fountain Plant
    | 'Zb' // Zombie
    | 'Wp' // Wasp
    | 'Cb' // Cerberus
    | 'Fs' // Forest Speyer
    | 'Ch' // Crimson Head
    | 'Cp' // Crimson Head Prototype 1
    | 'Ht' // Hunter
    | 'Cm' // Chimera
    | 'Ws' // Web Spinner
    | 'Bt' // Black Tiger
    | 'Pl' // Plant 42
    | 'Nt' // Neptune
    | 'Yn' // Yawn
    | 'Ty' // Tyrant
    | 'Lt'; // Lisa Trevor

export enum BiohazardCodeEnum {
    ADDER = 'Ad',
    CROW = 'Cr',
    FOUNTAIN_PLANT = 'Fp',
    ZOMBIE = 'Zb',
    WASP = 'Wp',
    CERBERUS = 'Cb',
    FOREST_SPEYER = 'Fs',
    CRIMSON_HEAD = 'Ch',
    CRIMSON_HEAD_PROTOTYPE_1 = 'Cp',
    HUNTER = 'Ht',
    CHIMERA = 'Cm',
    WEB_SPINNER = 'Ws',
    BLACK_TIGER = 'Bt',
    PLANT_42 = 'Pl',
    NEPTUNE = 'Nt',
    YAWN = 'Yn',
    TYRANT = 'Ty',
    LISA_TREVOR = 'Lt',
}

type BiohazardDisplayName =
    | 'Adder'
    | 'Crow'
    | 'Fountain Plant'
    | 'Zombie'
    | 'Wasp'
    | 'Cerberus'
    | 'Forest Speyer'
    | 'Crimson Head'
    | 'Crimson Head Prototype 1'
    | 'Hunter'
    | 'Chimera'
    | 'Web Spinner'
    | 'Black Tiger'
    | 'Plant 42'
    | 'Neptune'
    | 'Yawn'
    | 'Tyrant'
    | 'Lisa Trevor';

type STARSClassification = 'Alpha' | 'Beta' | 'Gamma' | 'Delta' | 'Epsilon' | 'Zeta' | 'Eta';

type greeksClassification =
    | '\u03B1'
    | '\u03B2'
    | '\u03B3'
    | '\u03B4'
    | '\u03B5'
    | '\u03B6'
    | '\u03B7';

export type STARSRanking = '3' | '2Half' | '2' | '1Half' | '1' | '0Half' | '0';

type ThreatLevel =
    | 'Low'
    | 'Low-Moderate'
    | 'Moderate'
    | 'Moderate-High'
    | 'High'
    | 'Acute'
    | 'Severe';

type Directive =
    | 'Ignore else Engage'
    | 'Avoid else Engage'
    | 'Engage Cautiously'
    | 'Avoid Engaging'
    | 'Do Not Engage';

type Prevalence = 'Common' | 'Uncommon' | 'Rare' | 'Scarce' | 'Singular';

type Threat =
    | 'Mob Threat'
    | 'Ambush Threat'
    | 'Toxic Threat'
    | 'Mutation Threat'
    | 'Mobile Threat'
    | 'Concealed Threat'
    | 'Planes-walker Threat'
    | 'Proximity Threat'
    | 'Post Mortem Threat'
    | 'Severe Threat';

export interface BiohazardData {
    id: BiohazardCode; // e.g. "Zb"
    name: BiohazardDisplayName; // e.g. "Zombie"
    codeName: string | null; // e.g. "ZB-01"
    threatLevel: ThreatLevel; // e.g. "Low-Moderate"
    starsClassification: STARSClassification; // e.g. "Zeta"
    starsRanking: STARSRanking; // e.g. "0Half"
    directive: Directive; // e.g. "Avoid else Engage"
    prevalence: Prevalence; // e.g. "Common"
    imageSrc: string; // e.g. "assets/images/zombie.jpg"
    isVenomous: boolean; // e.g. false
    authorizedResponseProcedures: string[]; // e.g. ["Engage from secure distances", "Avoid close proximity", "Neutralize through severe head trauma or incineration"]
    effectiveMeasures: string | null; // e.g. "short to long-range small or medium arms, defensive weapons, fire"
    caution: string | null; // e.g. "Low-Moderate Risk threat level in close proximity with numbers in excess of 2."
    threats: {
        threat: Threat; // e.g. "Mutation Threat"
        description: string; // e.g. "Crimson Head mutation, V-ACT (Virus-Activation) secondary infection stage, if not neutralized effectively (see Authorized Response Procedures)"
    }[];
    characteristics: string[]; // e.g. ["slow-moving", "sedate", "unperceptive"]
}

export interface STARSRankingData {
    starsClassification: STARSClassification; // e.g. "Delta"
    greeksClassification?: greeksClassification; // e.g. "β"
    ranking: STARSRanking; // e.g. "1Half"
    threatLevel: ThreatLevel; // e.g. "Moderate-High"
    directive: Directive; // e.g. "Engage Cautiously"
    biohazardCodes: BiohazardCode[]; // e.g. ["Cp", "Cm", "Ht", "Ws"]
}

export interface BiohazardRoomData {
    id: string; // e.g. "zombie1-keepersRoom"
    map: RoomMapData;
    difficultyLevel: DifficultyLevel[]; // e.g. ["JV-lvl-very-easy", "JV-lvl-easy", "JV-lvl-normal", "JV-lvl-hard"]
    name: BiohazardDisplayName; // e.g. "Zombie"
    code: BiohazardCode; // used to look up all details, name, S.T.A.R.S. ranking, threat level, etc.
    qty: number; // e.g. 1
    ambush: boolean; // e.g. false
    isFeatured: boolean; // e.g. false
}

export interface BiohazardSTARSRankingByCode {
    code: BiohazardCode;
    starsRanking: Omit<STARSRankingData, 'biohazardCodes'>;
}

export interface BiohazardDetailsData extends BiohazardRoomData {
    starsRanking: Omit<STARSRankingData, 'biohazardCodes'>; // e.g. { starsClassification: "Zeta", ranking: "0Half", threatLevel: "Low", directive: "Avoid else Engage" }
}

/**
 * Search filters for biohazards.
 * @interface BiohazardSearchFilters
 */
export interface BiohazardSearchFilters {
    /** The room where the biohazards are located (e.g., 'keepersRoom'). */
    room?: RoomID;
    /** The difficulty level (e.g., 'JV-lvl-easy'). */
    difficulty?: DifficultyLevel;
    /** The lookup code for a biohazard (e.g., 'Zb'). */
    code?: BiohazardCode;
    /** The full or partial name of the biohazard (case-insensitive). */
    name?: string;
}

export enum BiohazardSearchFiltersEnum {
    ROOM = 'room',
    DIFFICULTY = 'difficulty',
    CODE = 'code',
    NAME = 'name',
}

/**
 * Map
 */
type Persons = 'Barry' | 'Rebecca' | 'Chris' | 'Jill' | 'Wesker' | 'Richard' | 'Forest' | 'Kenneth';

export enum PersonsEnum {
    BARRY = 'Barry',
    REBECCA = 'Rebecca',
    CHRIS = 'Chris',
    JILL = 'Jill',
    WESKER = 'Wesker',
    RICHARD = 'Richard',
    FOREST = 'Forest',
    KENNETH = 'Kenneth',
}

type Interactables = 'ItemBox' | 'Typewriter' | 'Kerosene';

export enum InteractablesEnum {
    ITEM_BOX = 'ItemBox',
    TYPEWRITER = 'Typewriter',
    KEROSENE = 'Kerosene',
}

type RoomFunction = 'none' | 'puzzleRoom' | 'safeRoom' | 'combatRoom' | 'trapRoom' | 'hiddenRoom';

export enum RoomFunctionEnum {
    NONE = 'none',
    PUZZLE_ROOM = 'puzzleRoom',
    SAVE_ROOM = 'safeRoom',
    COMBAT_ROOM = 'combatRoom',
    TRAP_ROOM = 'trapRoom',
    HIDDEN_ROOM = 'hiddenRoom',
}

interface RoomRisk {
    threatLevel: RoomThreatLevel; // e.g. "low-risk"
    difficultyLevel: DifficultyLevel[]; // e.g. ["JV-lvl-very-easy", "JV-lvl-easy", "JV-lvl-normal", "JV-lvl-hard"]
}

type RoomThreatLevel =
    | 'clear'
    | 'unknown'
    | 'low-risk'
    | 'low-moderate-risk'
    | 'moderate-risk'
    | 'moderate-high-risk'
    | 'high-risk'
    | 'acute-risk'
    | 'severe-risk';

export enum RoomThreatLevelEnum {
    CLEAR = 'clear',
    UNKNOWN = 'unknown',
    LOW_RISK = 'low-risk',
    LOW_MODERATE_RISK = 'low-moderate-risk',
    MODERATE_RISK = 'moderate-risk',
    MODERATE_HIGH_RISK = 'moderate-high-risk',
    HIGH_RISK = 'high-risk',
    ACUTE_RISK = 'acute-risk',
    SEVERE_RISK = 'severe-risk',
}

export interface AccessControl {
    accessKey: AccessKey | CharacterAccessKey[]; // e.g. "key"
    accessType: AccessType; // e.g. "Key"
}

export type AccessType = 'none' | 'key' | 'oneWay' | 'limitedUse' | 'blocked' | 'puzzle';

export enum AccessTypeEnum {
    NONE = 'none',
    KEY = 'key',
    ONE_WAY = 'oneWay',
    LIMITED_USE = 'limitedUse',
    BLOCKED = 'blocked',
    PUZZLE = 'puzzle',
}

export interface CharacterAccessKey {
    character: CharacterCode; // e.g. "JV"
    key: AccessKey; // e.g. "Lockpick"
}

export type AccessKey =
    | 'None'
    | 'Lockpick'
    | 'Old Key'
    | 'Puzzle Key'
    | 'Armor Key'
    | 'Helmet Key'
    | 'Sword Key'
    | 'Shield Key'
    | 'Emblem Key'
    | 'Closet Key';

export enum AccessKeyEnum {
    NONE = 'None',
    LOCK_PICK = 'Lock Pick',
    OLD_KEY = 'Old Key',
    PUZZLE_KEY = 'Puzzle Key',
    ARMOR_KEY = 'Armor Key',
    HELMET_KEY = 'Helmet Key',
    SWORD_KEY = 'Sword Key',
    SHIELD_KEY = 'Shield Key',
    EMBLEM_KEY = 'Emblem Key',
    CLOSET_KEY = 'Closet Key',
}

type AreaID = 'mansion' | 'courtyard' | 'guardhouseResidence' | 'altar' | 'undergroundLaboratory';

type Area = 'Mansion' | 'Courtyard' | 'Guardhouse Residence' | 'Altar' | 'Underground Laboratory';

type MapID =
    | 'unknown'
    | 'mansionF1'
    | 'mansionF2'
    | 'mansionF3'
    | 'mansionB1'
    | 'courtyardF1'
    | 'courtyardB1'
    | 'courtyardB2'
    | 'heliport'
    | 'residenceF1'
    | 'aquaRingB1'
    | 'aquaRingB2'
    | 'altarB1'
    | 'altarB2'
    | 'laboratoryB1'
    | 'laboratoryB2'
    | 'laboratoryB3'
    | 'laboratoryB4';

type Map =
    | 'Unknown'
    | 'Mansion F1'
    | 'Mansion F2'
    | 'Mansion F3'
    | 'Mansion B1'
    | 'Courtyard F1'
    | 'Courtyard B1'
    | 'Courtyard B2'
    | 'Heliport'
    | 'Residence F1'
    | 'Aqua Ring B1'
    | 'Aqua Ring B2'
    | 'Altar B1'
    | 'Altar B2'
    | 'Laboratory B1'
    | 'Laboratory B2'
    | 'Laboratory B3'
    | 'Laboratory B4';

export type RoomID =
    | 'unknown'
    // Mansion F1
    | 'greenhouse'
    | 'tigerStatueRoom'
    | 'westWingNorthCorridor'
    | 'westWingStoreroom'
    | 'clinic'
    | 'westWingNorthEastCorridor'
    | 'westWingNorthWestCorridor'
    | 'keepersRoom'
    | 'bar'
    | 'teaRoomCorridor'
    | 'diningRoomF1'
    | 'cemetery'
    | 'mainHallF1'
    | 'exhibitionRoomF1'
    | 'drawingRoom'
    | 'mirrorRoom'
    | 'hiddenPassage'
    | 'hiddenCloset'
    | 'eastWingEastCorridor'
    | 'eastWingNorthEastCorridor'
    | 'bathroom'
    | 'outdoorBoiler'
    | 'suspendedCeilingRoom'
    | 'parlour'
    | 'gallery'
    | 'eastWingNorthWestCorridor'
    | 'study'
    | 'eastWingNorthCorridorF1'
    | 'eastWingStoreroom'
    | 'outdoorCorridor'
    | 'shed'
    // Mansion F2
    | 'mainHallF2'
    | 'westWingNorthWestCorridor2F'
    | 'westWingNorthEastCorridor2F'
    | 'exhibitionRoomF2'
    | 'eastWingNorthCorridorF2'
    // Mansion F3
    // Mansion B1
    | 'crypt'
    | 'kitchen'
    | 'stairwayPassage'
    | 'eastBasementPassage'
    // Courtyard F1
    | 'gardenGazebo'
    | 'cemeteryPath';

type RoomDisplayName =
    | 'Unknown'
    // Mansion F1
    | 'Greenhouse'
    | 'Tiger Statue Room'
    | 'West Wing North Corridor'
    | 'West Wing Storeroom'
    | 'Clinic'
    | 'West Wing North East Corridor'
    | 'West Wing North West Corridor'
    | "Keeper's Room"
    | 'Bar'
    | 'Tea Room Corridor'
    | 'Dining Room F1'
    | 'Cemetery'
    | 'Main Hall F1'
    | 'Exhibition Room F1'
    | 'Drawing Room'
    | 'Mirror Room'
    | 'Hidden Passage'
    | 'Hidden Closet'
    | 'East Wing East Corridor'
    | 'East Wing North East Corridor'
    | 'Bathroom'
    | 'Outdoor Boiler'
    | 'Suspended Ceiling Room'
    | 'Parlour'
    | 'Gallery'
    | 'East Wing North West Corridor'
    | 'Study'
    | 'East Wing North Corridor F1'
    | 'East Wing Storeroom'
    | 'Outdoor Corridor'
    | 'Shed'
    // Mansion F2
    | 'Main Hall F2'
    | 'West Wing North West Corridor 2F'
    | 'West Wing North East Corridor 2F'
    | 'Exhibition Room F2'
    // Mansion F3
    // Mansion B1
    | 'Crypt'
    | 'Kitchen'
    | 'Stairway Passage'
    | 'East Basement Passage'
    // Courtyard F1
    | 'Garden Gazebo'
    | 'Cemetery Path';

export interface AreaData {
    id: AreaID; // e.g. "mansion"
    area: Area; // e.g. "Mansion"
    mapIds: MapID[]; // e.g. ["mansionF1", "mansionF2", "mansionF3", "mansionB1"]
}

export interface MapData {
    id: MapID; // e.g. "mansionF1"
    map: Map; // e.g. "Mansion F1"
    areaId: AreaID; // e.g. "mansion"
    roomIds: RoomID[]; // e.g. ["keepersRoom", "westWingNorthCorridor"]
}

export interface AdjoiningRoom {
    id: RoomID; // e.g. "westWingNorthCorridor"
    accessControl: AccessControl;
}

export interface RoomData {
    id: RoomID; // e.g. "keepersRoom"
    name: RoomDisplayName; // e.g. "Keeper's Room"
    mapId: MapID; // e.g. "mansionF1"
    roomNumber: number | null; // e.g. 5
    thumbnailSrc: string | null; // e.g. "assets/images/keepers-room-thumbnail.jpg"
    overview: {
        functions: RoomFunction[]; // e.g. ["safeRoom", "puzzleRoom"]
        accessControl: AccessControl;
        risk: RoomRisk[]; // e.g. [{ threatLevel: "low-moderate-risk", difficultyLevel: ["JV-lvl-very-easy", "JV-lvl-easy", "JV-lvl-normal", "JV-lvl-hard"] }]
    };
    intel: {
        examineText: string | null; // e.g. "The shelf is full of high-proof liquor."
        quote: {
            text: string | null; // e.g. "A quote from a character."
            cite: string | null; // e.g. "Character Name"
        };
        info: {
            text: string | null; // e.g. "Additional information about the room."
            cite: string | null; // e.g. "Source of the information."
        };
    };
    adjoiningRooms: AdjoiningRoom[]; // e.g. [{ id: "westWingNorthCorridor", accessControl: { accessType: "key", accessKey: "Armor Key" } }]
    detailList: {
        persons: string[];
        interactables: string[];
        biohazards: string[];
        items: string[];
    };
}

export interface RoomDetailsData extends RoomData {
    roomDetails: {
        persons: ItemRoomData[];
        interactables: ItemRoomData[];
        items: ItemRoomData[];
        biohazards: BiohazardDetailsData[];
    };
}

/**
 * Search filters for rooms.
 * @interface RoomSearchFilters
 */
export interface RoomSearchFilters {
    /** The map ID where the room is located (e.g., 'mansionF1'). */
    map?: MapID;
    /** Array of item IDs in the room (e.g., ['flashGrenade']). */
    items?: ItemID[];
    /** Array of biohazard IDs in the room (e.g., ['Zb']). */
    biohazards?: BiohazardCode[];
    /** Array of persons in the room (e.g., ['Barry']). */
    persons?: Persons[];
    /** Array of interactables in the room (e.g., ['ItemBox']). */
    interactables?: Interactables[];
    /** The room function (e.g., 'puzzleRoom'). */
    roomFunction?: RoomFunction;
    /** An adjoining room ID (e.g., 'westWingNorthCorridor'). */
    adjoiningRoom?: string;
    /** The access key type (e.g., 'Armor Key'). */
    accessKey?: AccessKey;
    /** The threat level (e.g., 'low-moderate-risk'). */
    threatLevel?: RoomThreatLevel;
    /** The room number (e.g., 5). */
    roomNumber?: number;
}

export enum RoomSearchFiltersEnum {
    MAP = 'map',
    ITEMS = 'items',
    BIOHAZARDS = 'biohazards',
    PERSONS = 'persons',
    INTERACTABLES = 'interactables',
    ROOM_FUNCTION = 'roomFunction',
    ADJOINING_ROOM = 'adjoiningRoom',
    ACCESS_KEY = 'accessKey',
    THREAT_LEVEL = 'threatLevel',
    ROOM_NUMBER = 'roomNumber',
}
