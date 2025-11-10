/**
 * @file Static in-memory data for items.
 * @description Defines the `itemsRoomData` array of {@link ItemRoomData} objects, representing items
 * (e.g., Battery Pack, Flash Grenade) used by services like `src/services/itemsService.ts` for
 * querying and filtering. Uses `as const` for immutability and precise type inference (e.g.,
 * `difficultyLevel` as readonly tuple). Suitable for endpoints like `GET /api/items`.
 * @see {@link ./README.md} for data structure details.
 */
import { ItemData, PersonData, ItemRoomData, TranscriptionData } from '.';

// Dictionary of thumbnail IDs and image source paths
const thumbnailPaths: Record<string, string> = {
    // Persons
    jillValentine: 'https://placeholder-image-url.jpg',
    chrisRedfield: 'https://placeholder-image-url.jpg',
    barryBurton: 'https://placeholder-image-url.jpg',
    rebeccaChambers: 'https://placeholder-image-url.jpg',
    kennethJSullivan: 'https://placeholder-image-url.jpg',
    richardAiken: 'https://placeholder-image-url.jpg',
    albertWesker: 'https://placeholder-image-url.jpg',
    bradVickers: 'https://placeholder-image-url.jpg',
    forestSpeyer: 'https://placeholder-image-url.jpg',
    josephFrost: 'https://placeholder-image-url.jpg',
    enricoMarini: 'https://placeholder-image-url.jpg',
    // Interactable Items
    typewriter:
        'https://s-media-cache-ak0.pinimg.com/originals/f1/26/57/f126578050920fc271fd8b33534a9605.jpg',
    itemBox:
        'https://s-media-cache-ak0.pinimg.com/originals/f1/26/57/f126578050920fc271fd8b33534a9605.jpg',
    kerosene:
        'https://s-media-cache-ak0.pinimg.com/originals/f1/26/57/f126578050920fc271fd8b33534a9605.jpg',
    mapMansionF1:
        'https://s-media-cache-ak0.pinimg.com/originals/f1/26/57/f126578050920fc271fd8b33534a9605.jpg',
    mapMansionF2:
        'https://s-media-cache-ak0.pinimg.com/originals/f1/26/57/f126578050920fc271fd8b33534a9605.jpg',
    mapMansionB1:
        'https://s-media-cache-ak0.pinimg.com/originals/f1/26/57/f126578050920fc271fd8b33534a9605.jpg',
    mapCourtyardF1:
        'https://s-media-cache-ak0.pinimg.com/originals/f1/26/57/f126578050920fc271fd8b33534a9605.jpg',
    mapCourtyardB1:
        'https://s-media-cache-ak0.pinimg.com/originals/f1/26/57/f126578050920fc271fd8b33534a9605.jpg',
    mapResidenceF1:
        'https://s-media-cache-ak0.pinimg.com/originals/f1/26/57/f126578050920fc271fd8b33534a9605.jpg',
    mapAquaRing:
        'https://s-media-cache-ak0.pinimg.com/originals/f1/26/57/f126578050920fc271fd8b33534a9605.jpg',
    mapUndergroundLaboratory:
        'https://s-media-cache-ak0.pinimg.com/originals/f1/26/57/f126578050920fc271fd8b33534a9605.jpg',
    radio: 'https://s-media-cache-ak0.pinimg.com/originals/f1/26/57/f126578050920fc271fd8b33534a9605.jpg',
    passCodeOutputTerminal:
        'https://s-media-cache-ak0.pinimg.com/originals/f1/26/57/f126578050920fc271fd8b33534a9605.jpg',
    // Key Items
    goldenArrow: 'https://placeholder-image-url.jpg',
    arrowhead: 'https://placeholder-image-url.jpg',
    lighter: 'https://placeholder-image-url.jpg',
    lockpick: 'https://placeholder-image-url.jpg',
    oldKey: 'https://placeholder-image-url.jpg',
    bookOfCurses: 'https://placeholder-image-url.jpg',
    swordKey: 'https://placeholder-image-url.jpg',
    herbicide: 'https://placeholder-image-url.jpg',
    fuelCanteen: 'https://placeholder-image-url.jpg',
    dogWhistle: 'https://placeholder-image-url.jpg',
    collar: 'https://placeholder-image-url.jpg',
    coin: 'https://placeholder-image-url.jpg',
    imitationOfAKey: 'https://placeholder-image-url.jpg',
    armorKey: 'https://placeholder-image-url.jpg',
    woodenMount: 'https://placeholder-image-url.jpg',
    brokenShotgun: 'https://placeholder-image-url.jpg',
    blueGemstone: 'https://placeholder-image-url.jpg',
    jewelryBoxJewel: 'https://placeholder-image-url.jpg',
    missingMusic: 'https://placeholder-image-url.jpg',
    musicMidPages: 'https://placeholder-image-url.jpg',
    moonlightSonata: 'https://placeholder-image-url.jpg',
    emblem: 'https://placeholder-image-url.jpg',
    goldEmblem: 'https://placeholder-image-url.jpg',
    fishhook: 'https://placeholder-image-url.jpg',
    lureWithoutHook: 'https://placeholder-image-url.jpg',
    lureOfABee: 'https://placeholder-image-url.jpg',
    beeSpecimen: 'https://placeholder-image-url.jpg',
    windCrest: 'https://placeholder-image-url.jpg',
    maskWithoutEyes: 'https://placeholder-image-url.jpg',
    maskWithoutMouth: 'https://placeholder-image-url.jpg',
    maskWithoutNose: 'https://placeholder-image-url.jpg',
    maskWithoutEyesNoseMouth: 'https://placeholder-image-url.jpg',
    stoneAndMetalObject: 'https://placeholder-image-url.jpg',
    moonCrest: 'https://placeholder-image-url.jpg',
    starCrest: 'https://placeholder-image-url.jpg',
    sunCrest: 'https://placeholder-image-url.jpg',
    squareCrank: 'https://placeholder-image-url.jpg',
    keyForRoom001: 'https://placeholder-image-url.jpg',
    insecticideSpray: 'https://placeholder-image-url.jpg',
    galleryKey: 'https://placeholder-image-url.jpg',
    unprintedBook: 'https://placeholder-image-url.jpg',
    controlRoomKey: 'https://placeholder-image-url.jpg',
    keyForRoom003: 'https://placeholder-image-url.jpg',
    emptyBottle: 'https://placeholder-image-url.jpg',
    water: 'https://placeholder-image-url.jpg',
    umbNo3: 'https://placeholder-image-url.jpg',
    np004: 'https://placeholder-image-url.jpg',
    yellow6: 'https://placeholder-image-url.jpg',
    umbNo7: 'https://placeholder-image-url.jpg',
    umbNo10: 'https://placeholder-image-url.jpg',
    vp017: 'https://placeholder-image-url.jpg',
    vJolt: 'https://placeholder-image-url.jpg',
    helmetKey: 'https://placeholder-image-url.jpg',
    metalObject: 'https://placeholder-image-url.jpg',
    redGemstone: 'https://placeholder-image-url.jpg',
    yellowGemstone: 'https://placeholder-image-url.jpg',
    moDisk: 'https://placeholder-image-url.jpg',
    jewelryBoxWithRecession: 'https://placeholder-image-url.jpg',
    broach: 'https://placeholder-image-url.jpg',
    emblemKey: 'https://placeholder-image-url.jpg',
    lastBookVol1: 'https://placeholder-image-url.jpg',
    medalOfEagle: 'https://placeholder-image-url.jpg',
    lastBookVol2: 'https://placeholder-image-url.jpg',
    medalOfWolf: 'https://placeholder-image-url.jpg',
    battery: 'https://placeholder-image-url.jpg',
    hexagonCrank: 'https://placeholder-image-url.jpg',
    cylinder: 'https://placeholder-image-url.jpg',
    shaft: 'https://placeholder-image-url.jpg',
    cylinderShaft: 'https://placeholder-image-url.jpg',
    brokenFlamethrower: 'https://placeholder-image-url.jpg',
    jewelryBoxStoneRing: 'https://placeholder-image-url.jpg',
    stoneRing: 'https://placeholder-image-url.jpg',
    xRayOfClark: 'https://placeholder-image-url.jpg',
    xRayOfGail: 'https://placeholder-image-url.jpg',
    slideFilter: 'https://placeholder-image-url.jpg',
    keyForPowerArea: 'https://placeholder-image-url.jpg',
    fuelSupplyCapsuleEmpty: 'https://placeholder-image-url.jpg',
    fuelSupplyCapsuleFull: 'https://placeholder-image-url.jpg',
    masterKey: 'https://placeholder-image-url.jpg',
    fuseUnit: 'https://placeholder-image-url.jpg',
    signalRockets: 'https://placeholder-image-url.jpg',
    closetKey: 'https://placeholder-image-url.jpg',
    // Recovery Items
    greenHerb: 'https://placeholder-image-url.jpg',
    redHerb: 'https://placeholder-image-url.jpg',
    blueHerb: 'https://placeholder-image-url.jpg',
    firstAidSpray: 'https://placeholder-image-url.jpg',
    firstAidBox: 'https://placeholder-image-url.jpg',
    serum: 'https://placeholder-image-url.jpg',
    mixedHerbsGG: 'https://placeholder-image-url.jpg',
    mixedHerbsGR: 'https://placeholder-image-url.jpg',
    mixedHerbsGB: 'https://placeholder-image-url.jpg',
    mixedHerbsGGB: 'https://placeholder-image-url.jpg',
    mixedHerbsGGG: 'https://placeholder-image-url.jpg',
    mixedHerbsGRB: 'https://placeholder-image-url.jpg',
    // Documents
    starsManual: 'https://placeholder-image-url.jpg',
    kennethsFilm: 'https://placeholder-image-url.jpg',
    trevorsDiaryVol1: 'https://placeholder-image-url.jpg',
    trevorsDiaryVol2: 'https://placeholder-image-url.jpg',
    trevorsDiaryVol3: 'https://placeholder-image-url.jpg',
    crumpledMemo: 'https://placeholder-image-url.jpg',
    botanyBook: 'https://placeholder-image-url.jpg',
    bodyDisposal: 'https://placeholder-image-url.jpg',
    keepersDiary: 'https://placeholder-image-url.jpg',
    researchersWill: 'https://placeholder-image-url.jpg',
    mailToChiefOfSecurity: 'https://placeholder-image-url.jpg',
    suicideNote: 'https://placeholder-image-url.jpg',
    plant42Report: 'https://placeholder-image-url.jpg',
    organicChemistryLabExperiment: 'https://placeholder-image-url.jpg',
    familyPictureAndNotes: 'https://placeholder-image-url.jpg',
    barrysPhotograph: 'https://placeholder-image-url.jpg',
    researchersLetter: 'https://placeholder-image-url.jpg',
    vAct: 'https://placeholder-image-url.jpg',
    fax: 'https://placeholder-image-url.jpg',
    securityProtocols: 'https://placeholder-image-url.jpg',
    observationNote: 'https://placeholder-image-url.jpg',
    // Weaponry
    survivalKnifeChris: 'https://placeholder-image-url.jpg',
    survivalKnifeJill: 'https://placeholder-image-url.jpg',
    survivalKnife: 'https://placeholder-image-url.jpg',
    handgun: 'https://placeholder-image-url.jpg',
    samuraiEdge: 'https://placeholder-image-url.jpg',
    dagger: 'https://placeholder-image-url.jpg',
    stunGun: 'https://placeholder-image-url.jpg',
    shotgun: 'https://placeholder-image-url.jpg',
    assaultShotgun: 'https://placeholder-image-url.jpg',
    grenadeLauncher: 'https://placeholder-image-url.jpg',
    selfDefenseGun: 'https://placeholder-image-url.jpg',
    magnumRevolver: 'https://placeholder-image-url.jpg',
    flamethrower: 'https://placeholder-image-url.jpg',
    barrys44Magnum: 'https://placeholder-image-url.jpg',
    rocketLauncher: 'https://placeholder-image-url.jpg',
    rocketLauncherSingleBarrel: 'https://placeholder-image-url.jpg',
    batteryPack:
        'https://s-media-cache-ak0.pinimg.com/originals/f1/26/57/f126578050920fc271fd8b33534a9605.jpg',
    flashGrenade:
        'https://s-media-cache-ak0.pinimg.com/originals/f1/26/57/f126578050920fc271fd8b33534a9605.jpg',
    handgunMagazine: 'https://placeholder-image-url.jpg',
    shotgunShells: 'https://placeholder-image-url.jpg',
    grenadeShells: 'https://placeholder-image-url.jpg',
    acidShells: 'https://placeholder-image-url.jpg',
    incendiaryShells: 'https://placeholder-image-url.jpg',
    magnumRounds: 'https://placeholder-image-url.jpg',
} as const;

export const itemsData: ReadonlyArray<ItemData> = [
    // Interactable Items
    {
        id: 'typewriter',
        name: 'Typewriter',
        type: 'Typewriter',
        taxonomy: 'Interactable Items',
        function: 'Save Point',
        imageSrc: thumbnailPaths.typewriter,
        description:
            'A typewriter that can be used to rudimentarily record progression when providing an Ink Ribbon.',
        exclusive: null,
    },
    {
        id: 'itemBox',
        name: 'Item Box',
        type: 'ItemBox',
        taxonomy: 'Interactable Items',
        function: 'Storage Point',
        imageSrc: thumbnailPaths.itemBox,
        description:
            'Item storage container providing storage for any items. Stowed items are accessible from any other Item Box.',
        exclusive: null,
    },
    {
        id: 'kerosene',
        name: 'Kerosene',
        type: 'Kerosene',
        taxonomy: 'Interactable Items',
        function: 'Refill Point',
        imageSrc: thumbnailPaths.kerosene,
        description: 'Kerosene storage container providing limited refills for Fuel Canteens.',
        exclusive: null,
    },
    {
        id: 'map',
        name: 'Map - Mansion F1',
        type: 'Map',
        taxonomy: 'Interactable Items',
        function: 'Navigation',
        imageSrc: thumbnailPaths.mapMansionF1,
        description:
            'Map of the Spencer Mansion First Floor (F1). Shows room layouts, locked doors, rooms not yet accessed, the completion status of rooms, where typewriters and item boxes are located, and your current location on the map.',
        exclusive: null,
    },
    {
        id: 'map',
        name: 'Map - Mansion F2',
        type: 'Map',
        taxonomy: 'Interactable Items',
        function: 'Navigation',
        imageSrc: thumbnailPaths.mapMansionF2,
        description:
            'Map of the Spencer Mansion First Floor (F2). Shows room layouts, locked doors, rooms not yet accessed, the completion status of rooms, where typewriters and item boxes are located, and your current location on the map.',
        exclusive: null,
    },
    {
        id: 'map',
        name: 'Map - Mansion B1',
        type: 'Map',
        taxonomy: 'Interactable Items',
        function: 'Navigation',
        imageSrc: thumbnailPaths.mapMansionB1,
        description:
            'Map of the Spencer Mansion First Floor (B1). Shows room layouts, locked doors, rooms not yet accessed, the completion status of rooms, where typewriters and item boxes are located, and your current location on the map.',
        exclusive: null,
    },
    {
        id: 'map',
        name: 'Map - Courtyard F1',
        type: 'Map',
        taxonomy: 'Interactable Items',
        function: 'Navigation',
        imageSrc: thumbnailPaths.mapCourtyardF1,
        description:
            'Map of the Spencer Mansion Courtyard (F1). Shows room layouts, locked doors, rooms not yet accessed, the completion status of rooms, where typewriters and item boxes are located, and your current location on the map.',
        exclusive: null,
    },
    {
        id: 'map',
        name: 'Map - Courtyard B1',
        type: 'Map',
        taxonomy: 'Interactable Items',
        function: 'Navigation',
        imageSrc: thumbnailPaths.mapCourtyardB1,
        description:
            'Map of the Spencer Mansion Courtyard (B1). Shows room layouts, locked doors, rooms not yet accessed, the completion status of rooms, where typewriters and item boxes are located, and your current location on the map.',
        exclusive: null,
    },
    {
        id: 'map',
        name: 'Map - Residence F1',
        type: 'Map',
        taxonomy: 'Interactable Items',
        function: 'Navigation',
        imageSrc: thumbnailPaths.mapResidenceF1,
        description:
            'Map of the Guardhouse Residence (F1). Shows room layouts, locked doors, rooms not yet accessed, the completion status of rooms, where typewriters and item boxes are located, and your current location on the map.',
        exclusive: null,
    },
    {
        id: 'map',
        name: 'Map - Aqua Ring',
        type: 'Map',
        taxonomy: 'Interactable Items',
        function: 'Navigation',
        imageSrc: thumbnailPaths.mapAquaRing,
        description:
            'Map of the Guardhouse Aqua Ring (B1) and Aqua Ring (B2). Shows room layouts, locked doors, rooms not yet accessed, the completion status of rooms, where typewriters and item boxes are located, and your current location on the map.',
        exclusive: null,
    },
    {
        id: 'map',
        name: 'Map - Underground Laboratory',
        type: 'Map',
        taxonomy: 'Interactable Items',
        function: 'Navigation',
        imageSrc: thumbnailPaths.mapUndergroundLaboratory,
        description:
            'Map of the all Underground Laboratory floors. Shows room layouts, locked doors, rooms not yet accessed, the completion status of rooms, where typewriters and item boxes are located, and your current location on the map.',
        exclusive: null,
    },
    {
        id: 'radio',
        name: 'Radio',
        type: 'ItemOfInterest',
        taxonomy: 'Interactable Items',
        function: 'NPC Interaction',
        imageSrc: thumbnailPaths.radio,
        description:
            'A radio that belonged to Richard Aiken. Used for communication between various Alpha team members.',
        exclusive: null,
    },
    {
        id: 'passCodeOutputTerminal',
        name: 'Pass Code Output Terminal',
        type: 'ItemOfInterest',
        taxonomy: 'Interactable Items',
        function: 'Item Interaction',
        imageSrc: thumbnailPaths.radio,
        description: 'An authentication device used for transmitting pass codes via MO Disks.',
        exclusive: null,
    },
    // Key Items
    {
        id: 'inkRibbon',
        name: 'Ink Ribbon',
        type: 'InkRibbon',
        taxonomy: 'Key Items',
        function: 'Progress Save',
        imageSrc: thumbnailPaths.inkRibbon,
        description:
            'To be used with a typewriter. A roll of typewriter ribbon. Use these on a Typewriter in order to save your progress.',
        exclusive: null,
    },
    {
        id: 'lockpick',
        name: 'Lockpick',
        type: 'DoorKey',
        taxonomy: 'Key Items',
        function: 'Access Tool',
        imageSrc: thumbnailPaths.lockpick,
        description: 'A tool for unlocking most simple locks.',
        exclusive: 'JV',
    },
    {
        id: 'oldKey',
        name: 'Old Key',
        type: 'DoorKey',
        taxonomy: 'Key Items',
        function: 'Access Tool',
        imageSrc: thumbnailPaths.oldKey,
        description:
            'An old key of the mansion. Looks like you might be able to open most simply designed door locks.',
        exclusive: 'CR',
    },
    {
        id: 'lighter',
        name: 'Lighter',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Environment Interaction',
        imageSrc: thumbnailPaths.lighter,
        description:
            'It\'s a brass lighter coated with gold. Words are carved on it. "Don\'t play with fire! Love, Jessica"',
        exclusive: null,
    },
    {
        id: 'goldenArrow',
        name: 'Golden Arrow',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.goldenArrow,
        description: 'The arrowhead looks like it can be removed.',
        exclusive: null,
    },
    {
        id: 'arrowhead',
        name: 'Arrowhead',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.arrowhead,
        description:
            "The arrowhead is made from peridot, sometimes referred as a poor man's emerald.",
        exclusive: null,
    },
    {
        id: 'bookOfCurses',
        name: 'Book of Curses',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.bookOfCurses,
        description: 'It\'s titled, "Book of Curses." There\'s a key embedded on the back cover.',
        exclusive: null,
    },
    {
        id: 'swordKey',
        name: 'Sword Key',
        type: 'DoorKey',
        taxonomy: 'Key Items',
        function: 'Access Tool',
        imageSrc: thumbnailPaths.swordKey,
        description: "There's an engraving of a sword.",
        exclusive: null,
    },
    {
        id: 'herbicide',
        name: 'Herbicide',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Environment Interaction',
        imageSrc: thumbnailPaths.herbicide,
        description: 'A chemical agent to destroy plant growth.',
        exclusive: null,
    },
    {
        id: 'fuelCanteen',
        name: 'Fuel Canteen',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Environment Interaction',
        imageSrc: thumbnailPaths.fuelCanteen,
        description: 'You can carry with you fuel to light a few times using a lighter.',
        exclusive: null,
    },
    {
        id: 'dogWhistle',
        name: 'Dog Whistle',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'NPC Interaction',
        imageSrc: thumbnailPaths.dogWhistle,
        description:
            'By blowing into it, it generates frequencies only audible to the ears of dogs. You can call a dog with this whistle.',
        exclusive: null,
    },
    {
        id: 'collar',
        name: 'Collar',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Item Interaction',
        imageSrc: thumbnailPaths.collar,
        description: "There's a switch. A coin was hidden inside the collar.",
        exclusive: null,
    },
    {
        id: 'coin',
        name: 'Coin',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.coin,
        description: 'It changed into the shape of a key.',
        exclusive: null,
    },
    {
        id: 'imitationOfAKey',
        name: 'Imitation of a Key',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.imitationOfAKey,
        description: 'Shaped like a key, but lacks the rigidity to be used as one.',
        exclusive: null,
    },
    {
        id: 'armorKey',
        name: 'Armor Key',
        type: 'DoorKey',
        taxonomy: 'Key Items',
        function: 'Access Tool',
        imageSrc: thumbnailPaths.armorKey,
        description: "There's an engraving of armor.",
        exclusive: null,
    },
    {
        id: 'woodenMount',
        name: 'Wooden Mount',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.woodenMount,
        description: "There's a paper attached on the inside. Nothing is written on it.",
        exclusive: null,
    },
    {
        id: 'brokenShotgun',
        name: 'Broken Shotgun',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.brokenShotgun,
        description: "It's broken and can't be fired. Maybe there's another use for this...",
        exclusive: null,
    },
    {
        id: 'blueGemstone',
        name: 'Blue Gemstone',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.blueGemstone,
        description: "It's beautifully cut and polished to a mirror-like surface.",
        exclusive: null,
    },
    {
        id: 'jewelryBoxJewel',
        name: 'Jewelry Box (1)',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.jewelryBoxJewel,
        description:
            'There\'s a design of the sun and the moon. On the plate it says, "Sunshine will awaken me."',
        exclusive: null,
    },
    {
        id: 'missingMusic',
        name: 'Missing Music',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.missingMusic,
        description:
            'It\'s titled, "Moonlight Sonata". A section of the music is missing, leaving only the beginning and the end of the music.',
        exclusive: null,
    },
    {
        id: 'musicMidPages',
        name: 'Music, Mid-Pages',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.musicMidPages,
        description: 'The beginning and the last sections of the music are missing.',
        exclusive: null,
    },
    {
        id: 'moonlightSonata',
        name: '"Moonlight Sonata"',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.moonlightSonata,
        description:
            'It\'s titled, "Moonlight Sonata". The complete musical score of the "Moonlight Sonata".',
        exclusive: null,
    },
    {
        id: 'emblem',
        name: 'Emblem',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.emblem,
        description: "It's galled all around the outer edges due to frequent fitting.",
        exclusive: null,
    },
    {
        id: 'goldEmblem',
        name: 'Gold Emblem',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.goldEmblem,
        description: "It's galled all around the outer edges due to frequent fitting.",
        exclusive: null,
    },
    {
        id: 'fishhook',
        name: 'Fishhook',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.fishhook,
        description: "It's a hook for fishing.",
        exclusive: null,
    },
    {
        id: 'lureWithoutHook',
        name: 'Lure without a Hook',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.lureWithoutHook,
        description: "It's a lure shaped like a bee. There's no hook on it.",
        exclusive: null,
    },
    {
        id: 'lureOfABee',
        name: 'Lure of a Bee',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.lureOfABee,
        description: "It's a lure shaped like a bee with the hook attached.",
        exclusive: null,
    },
    {
        id: 'beeSpecimen',
        name: 'Bee Specimen',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.beeSpecimen,
        description: "It's a giant bee specimen for mounting. It's well preserved.",
        exclusive: null,
    },
    {
        id: 'windCrest',
        name: 'Wind Crest',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.windCrest,
        description: "There's an icon depicting wind.",
        exclusive: null,
    },
    {
        id: 'maskWithoutEyes',
        name: 'Mask without Eyes',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.maskWithoutEyes,
        description: "It's a death mask without eyes.",
        exclusive: null,
    },
    {
        id: 'maskWithoutMouth',
        name: 'Mask without Mouth',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.maskWithoutMouth,
        description: "It's a death mask without a mouth.",
        exclusive: null,
    },
    {
        id: 'maskWithoutNose',
        name: 'Mask without Nose',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.maskWithoutNose,
        description: "It's a death mask without a nose.",
        exclusive: null,
    },
    {
        id: 'maskWithoutEyesNoseMouth',
        name: 'Mask without Eyes, Nose, or Mouth',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.maskWithoutEyesNoseMouth,
        description: "It's a death mask without eyes, nose, or mouth.",
        exclusive: null,
    },
    {
        id: 'stoneAndMetalObject',
        name: 'Stone & Metal Object',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.stoneAndMetalObject,
        description: 'An emblem is carved on the octagonal object.',
        exclusive: null,
    },
    {
        id: 'moonCrest',
        name: 'Moon Crest',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.moonCrest,
        description: "There's an icon depicting the moon. There are two projecting lines.",
        exclusive: null,
    },
    {
        id: 'starCrest',
        name: 'Star Crest',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.starCrest,
        description:
            "There's an icon depicting a star. The base is protruded in the shape of a cross.",
        exclusive: null,
    },
    {
        id: 'sunCrest',
        name: 'Sun Crest',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.sunCrest,
        description: "There's an icon depicting the sun. There are three projecting lines.",
        exclusive: null,
    },
    {
        id: 'squareCrank',
        name: 'Square Crank',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.squareCrank,
        description: 'The end is shaped square.',
        exclusive: null,
    },
    {
        id: 'keyForRoom001',
        name: 'Key for Room 001',
        type: 'DoorKey',
        taxonomy: 'Key Items',
        function: 'Access Tool',
        imageSrc: thumbnailPaths.keyForRoom001,
        description: 'Numbers, 001 is imprinted.',
        exclusive: null,
    },
    {
        id: 'insecticideSpray',
        name: 'Insecticide Spray',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Environment Interaction',
        imageSrc: thumbnailPaths.insecticideSpray,
        description: "It's a pump-action spray. There's plenty of insecticide inside.",
        exclusive: null,
    },
    {
        id: 'galleryKey',
        name: 'Gallery Key',
        type: 'DoorKey',
        taxonomy: 'Key Items',
        function: 'Access Tool',
        imageSrc: thumbnailPaths.galleryKey,
        description: 'The word "GALLERY" is imprinted on it.',
        exclusive: null,
    },
    {
        id: 'unprintedBook',
        name: 'Unprinted Book',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.unprintedBook,
        description:
            "It's a book with a red cover. Nothing is printed on any of the pages. Is there a special way to use it?",
        exclusive: null,
    },
    {
        id: 'controlRoomKey',
        name: 'Control Room Key',
        type: 'DoorKey',
        taxonomy: 'Key Items',
        function: 'Access Tool',
        imageSrc: thumbnailPaths.controlRoomKey,
        description: "It's a key for entering the Control Room.",
        exclusive: null,
    },
    {
        id: 'keyForRoom003',
        name: 'Key for Room 003',
        type: 'DoorKey',
        taxonomy: 'Key Items',
        function: 'Access Tool',
        imageSrc: thumbnailPaths.keyForRoom003,
        description: 'Numbers, 003 is imprinted.',
        exclusive: null,
    },
    {
        id: 'emptyBottle',
        name: 'Empty Bottle',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Item Interaction',
        imageSrc: thumbnailPaths.emptyBottle,
        description: "There's nothing inside.",
        exclusive: null,
    },
    {
        id: 'water',
        name: 'Water',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.water,
        description: "There's water inside the bottle.",
        exclusive: null,
    },
    {
        id: 'umbNo3',
        name: 'UMB No.3',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.umbNo3,
        description: 'You can synthesize V-JOLT using this chemical.',
        exclusive: null,
    },
    {
        id: 'np004',
        name: 'NP-004',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.np004,
        description: 'To complete the synthesis of V-JOLT, you need to combine another chemical.',
        exclusive: null,
    },
    {
        id: 'yellow6',
        name: 'Yellow-6',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.yellow6,
        description: 'To complete the synthesis of V-JOLT, you need to combine another chemical.',
        exclusive: null,
    },
    {
        id: 'umbNo7',
        name: 'UMB No.7',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.umbNo7,
        description: 'To complete the synthesis of V-JOLT, you need to combine another chemical.',
        exclusive: null,
    },
    {
        id: 'umbNo10',
        name: 'UMB No.10',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.umbNo10,
        description: 'To complete the synthesis of V-JOLT, you need to combine another chemical.',
        exclusive: null,
    },
    {
        id: 'vp017',
        name: 'VP-017',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.vp017,
        description: "You're almost done synthesizing V-JOLT.",
        exclusive: null,
    },
    {
        id: 'vJolt',
        name: 'V-JOLT',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Environment Interaction',
        imageSrc: thumbnailPaths.vJolt,
        description: "It's a distinctively brown liquid.",
        exclusive: null,
    },
    {
        id: 'helmetKey',
        name: 'Helmet Key',
        type: 'DoorKey',
        taxonomy: 'Key Items',
        function: 'Access Tool',
        imageSrc: thumbnailPaths.helmetKey,
        description: "There's an engraving of a helmet.",
        exclusive: null,
    },
    {
        id: 'metalObject',
        name: 'Metal Object',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.metalObject,
        description: "An object made from alloy. There's an emblem engraving.",
        exclusive: null,
    },
    {
        id: 'redGemstone',
        name: 'Red Gemstone',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.redGemstone,
        description: "It's beautifully cut and polished to a mirror-like surface.",
        exclusive: null,
    },
    {
        id: 'yellowGemstone',
        name: 'Yellow Gemstone',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.yellowGemstone,
        description: "It's beautifully cut and polished to a mirror-like surface.",
        exclusive: null,
    },
    {
        id: 'moDisk',
        name: 'MO Disk',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Item Interaction',
        imageSrc: thumbnailPaths.moDisk,
        description: 'It appears to be a disk for rebooting a system of some sort.',
        exclusive: null,
    },
    {
        id: 'jewelryBoxWithRecession',
        name: 'Jewelry Box (2)',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.jewelryBoxWithRecession,
        description: "There's a round recession approximately 4cm in diameter.",
        exclusive: null,
    },
    {
        id: 'broach',
        name: 'Broach',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.broach,
        description: 'It changed into a key.',
        exclusive: null,
    },
    {
        id: 'emblemKey',
        name: 'Emblem Key',
        type: 'DoorKey',
        taxonomy: 'Key Items',
        function: 'Access Tool',
        imageSrc: thumbnailPaths.emblemKey,
        description:
            "The key's designed with an emblem of the Spencer Family, whose history is as old as Raccoon City.",
        exclusive: null,
    },
    {
        id: 'lastBookVol1',
        name: 'Last Book Vol. 1',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.lastBookVol1,
        description:
            'The words on the cover, what can it mean? A medal was hidden inside the book.',
        exclusive: null,
    },
    {
        id: 'medalOfEagle',
        name: 'Medal of Eagle',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.medalOfEagle,
        description: 'Found inside the Last Book Vol 1. Is there a special way to use it?',
        exclusive: null,
    },
    {
        id: 'lastBookVol2',
        name: 'Last Book Vol. 2',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.lastBookVol2,
        description:
            'The words on the cover, what can it mean? A medal was hidden inside the book.',
        exclusive: null,
    },
    {
        id: 'medalOfWolf',
        name: 'Medal of Wolf',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.medalOfWolf,
        description: 'Found inside the Last Book Vol 2. Is there a special way to use it?',
        exclusive: null,
    },
    {
        id: 'battery',
        name: 'Battery',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Environment Interaction',
        imageSrc: thumbnailPaths.battery,
        description: 'With this, you can operate the elevator.',
        exclusive: null,
    },
    {
        id: 'hexagonCrank',
        name: 'Hexagon Crank',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.hexagonCrank,
        description: 'The end is shaped hexagonal.',
        exclusive: null,
    },
    {
        id: 'cylinder',
        name: 'Cylinder',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.cylinder,
        description:
            'A circular metal object with a hole in the center. Symbols are carved in its side.',
        exclusive: null,
    },
    {
        id: 'shaft',
        name: 'Shaft',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.shaft,
        description:
            'It appears to be some sort of key to start the power supply. Symbols are carved in its side.',
        exclusive: null,
    },
    {
        id: 'cylinderShaft',
        name: 'Cylinder Shaft',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.cylinderShaft,
        description: 'Symbols are carved in its side.',
        exclusive: null,
    },
    {
        id: 'brokenFlamethrower',
        name: 'Broken Flamethrower',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.brokenFlamethrower,
        description: "The muzzle is broken. It can't be fired.",
        exclusive: null,
    },
    {
        id: 'jewelryBoxStoneRing',
        name: 'Jewelry Box (3)',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.jewelryBoxStoneRing,
        description: 'You got the Stone Ring.',
        exclusive: null,
    },
    {
        id: 'stoneRing',
        name: 'Stone Ring',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.stoneRing,
        description: "It's an octagonal ring made from stone.",
        exclusive: null,
    },
    {
        id: 'xRayOfClark',
        name: 'X-Ray of CLARK',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.xRayOfClark,
        description: 'A name is on it. "CLARK DAVID"',
        exclusive: null,
    },
    {
        id: 'xRayOfGail',
        name: 'X-Ray of GAIL',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.xRayOfGail,
        description: 'A name is on it. "GAIL HOLLAND"',
        exclusive: null,
    },
    {
        id: 'slideFilter',
        name: 'Slide Filter',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Puzzle Interaction',
        imageSrc: thumbnailPaths.slideFilter,
        description: "There are red-colored slides inside. Nothing's on it.",
        exclusive: null,
    },
    {
        id: 'keyForPowerArea',
        name: 'Key for the Power Area',
        type: 'DoorKey',
        taxonomy: 'Key Items',
        function: 'Access Tool',
        imageSrc: thumbnailPaths.keyForPowerArea,
        description: 'An electrical symbol is printed.',
        exclusive: null,
    },
    {
        id: 'fuelSupplyCapsuleEmpty',
        name: 'Fuel Supply Capsule (Empty)',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Item Interaction',
        imageSrc: thumbnailPaths.fuelSupplyCapsuleEmpty,
        description: "It's empty.",
        exclusive: null,
    },
    {
        id: 'fuelSupplyCapsuleFull',
        name: 'Fuel Supply Capsule (Full)',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Environment Interaction',
        imageSrc: thumbnailPaths.fuelSupplyCapsuleFull,
        description:
            'The main ingredient of this fuel appears to be nitro compound. "Running" could result in a fatal explosion.',
        exclusive: null,
    },
    {
        id: 'masterKey',
        name: 'Master Key',
        type: 'DoorKey',
        taxonomy: 'Key Items',
        function: 'Access Tool',
        imageSrc: thumbnailPaths.masterKey,
        description: 'A key to unlock doors during emergency situations.',
        exclusive: null,
    },
    {
        id: 'fuseUnit',
        name: 'Fuse Unit',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Environment Interaction',
        imageSrc: thumbnailPaths.fuseUnit,
        description:
            "It's an assembly of many large fuses. It's rated for high currents of electricity.",
        exclusive: null,
    },
    {
        id: 'signalRockets',
        name: 'Signal Rockets',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Environment Interaction',
        imageSrc: thumbnailPaths.signalRockets,
        description: 'Pyrotechnic Signal Rockets. I can signal Brad with this.',
        exclusive: null,
    },
    {
        id: 'closetKey',
        name: 'Closet Key',
        type: 'DoorKey',
        taxonomy: 'Key Items',
        function: 'Access Tool',
        imageSrc: thumbnailPaths.closetKey,
        description: "There's a design of a female's side face beautifully embossed on the key.",
        exclusive: null,
    },
    {
        id: 'serum',
        name: 'Serum',
        type: 'ItemOfInterest',
        taxonomy: 'Key Items',
        function: 'Recovery',
        imageSrc: thumbnailPaths.serum,
        description: "There's just enough for one dose.",
        exclusive: null,
    },
    // Recovery Items
    {
        id: 'greenHerb',
        name: 'Green Herb',
        type: 'GreenHerb',
        taxonomy: 'Recovery Items',
        function: 'Recovery',
        imageSrc: thumbnailPaths.greenHerb,
        description: 'An herb that grows wild in this region.',
        exclusive: null,
    },
    {
        id: 'redHerb',
        name: 'Red Herb',
        type: 'RedHerb',
        taxonomy: 'Recovery Items',
        function: 'Recovery',
        imageSrc: thumbnailPaths.redHerb,
        description: 'An herb that grows wild in this region.',
        exclusive: null,
    },
    {
        id: 'blueHerb',
        name: 'Blue Herb',
        type: 'BlueHerb',
        taxonomy: 'Recovery Items',
        function: 'Recovery',
        imageSrc: thumbnailPaths.blueHerb,
        description: 'An herb that grows wild in this region.',
        exclusive: null,
    },
    {
        id: 'firstAidSpray',
        name: 'First Aid Spray',
        type: 'FirstAid',
        taxonomy: 'Recovery Items',
        function: 'Recovery',
        imageSrc: thumbnailPaths.firstAidSpray,
        description: 'A medicinal spray that can heal wounds completely.',
        exclusive: null,
    },
    {
        id: 'firstAidBox',
        name: 'First Aid Box',
        type: 'FirstAid',
        taxonomy: 'Recovery Items',
        function: 'Recovery',
        imageSrc: thumbnailPaths.firstAidBox,
        description: 'There was a Green Herb / Blue Herb / First Aid Spray inside.',
        exclusive: null,
    },
    {
        id: 'mixedHerbsGG',
        name: 'Mixed Herbs (G+G)',
        type: 'MixedHerbs',
        taxonomy: 'Recovery Items',
        function: 'Recovery',
        imageSrc: thumbnailPaths.mixedHerbsGG,
        description: 'A mixture of 2 Green Herbs.',
        exclusive: null,
    },
    {
        id: 'mixedHerbsGR',
        name: 'Mixed Herbs (G+R)',
        type: 'MixedHerbs',
        taxonomy: 'Recovery Items',
        function: 'Recovery',
        imageSrc: thumbnailPaths.mixedHerbsGR,
        description: 'A mixture of Green and Red Herbs.',
        exclusive: null,
    },
    {
        id: 'mixedHerbsGB',
        name: 'Mixed Herbs (G+B)',
        type: 'MixedHerbs',
        taxonomy: 'Recovery Items',
        function: 'Recovery',
        imageSrc: thumbnailPaths.mixedHerbsGB,
        description: 'A mixture of Green and Blue Herbs.',
        exclusive: null,
    },
    {
        id: 'mixedHerbsGGB',
        name: 'Mixed Herbs (G+G+B)',
        type: 'MixedHerbs',
        taxonomy: 'Recovery Items',
        function: 'Recovery',
        imageSrc: thumbnailPaths.mixedHerbsGGB,
        description: 'A mixture of 2 Green Herbs and Blue Herb.',
        exclusive: null,
    },
    {
        id: 'mixedHerbsGGG',
        name: 'Mixed Herbs (G+G+G)',
        type: 'MixedHerbs',
        taxonomy: 'Recovery Items',
        function: 'Recovery',
        imageSrc: thumbnailPaths.mixedHerbsGGG,
        description: 'A mixture of 3 Green Herbs.',
        exclusive: null,
    },
    {
        id: 'mixedHerbsGRB',
        name: 'Mixed Herbs (G+R+B)',
        type: 'MixedHerbs',
        taxonomy: 'Recovery Items',
        function: 'Recovery',
        imageSrc: thumbnailPaths.mixedHerbsGRB,
        description: 'A mixture of Green, Blue, and Red Herbs.',
        exclusive: null,
    },
    // Documents
    {
        id: 'starsManual',
        name: 'S.T.A.R.S. Manual',
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.starsManual,
        description:
            'Official S.T.A.R.S. tactical operations manual containing controller instructions, status screen navigation, map reading, combat techniques, and emergency defense item protocols.',
        exclusive: null,
    },
    {
        id: 'kennethsFilm',
        name: "Kenneth's Film",
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.kennethsFilm,
        description:
            'A film cartridge belonging to Kenneth J. Sullivan. Requires a video player to view its contents.',
        exclusive: null,
    },
    {
        id: 'trevorsDiaryVol1',
        name: "Trevor's Diary Vol. 1",
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.trevorsDiaryVol1,
        description:
            "George Trevor's journal entries from November 24-27, 1967, documenting his initial imprisonment and realization of betrayal.",
        exclusive: null,
    },
    {
        id: 'trevorsDiaryVol2',
        name: "Trevor's Diary Vol. 2",
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.trevorsDiaryVol2,
        description:
            'An undated handwritten note by George Trevor revealing his secret hiding place behind a painting in the art room.',
        exclusive: null,
    },
    {
        id: 'trevorsDiaryVol3',
        name: "Trevor's Diary Vol. 3",
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.trevorsDiaryVol3,
        description:
            "George Trevor's final journal entries from November 29-31, 1967, chronicling his desperation, discovery of Jessica's fate, and ultimate demise.",
        exclusive: null,
    },
    {
        id: 'crumpledMemo',
        name: 'Crumpled Memo',
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.crumpledMemo,
        description:
            'A crumpled note regarding a plan to hide an object in a dog collar, protected by a vicious canine on the west terrace balcony.',
        exclusive: null,
    },
    {
        id: 'botanyBook',
        name: 'Botany Book',
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.botanyBook,
        description:
            'A botanical reference detailing the medicinal properties of herbs native to the Arklay Mountains and their various mixing combinations.',
        exclusive: null,
    },
    {
        id: 'bodyDisposal',
        name: 'Body Disposal',
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.bodyDisposal,
        description:
            'Special instructions for preventing infected corpses from reanimating through incineration or head destruction.',
        exclusive: null,
    },
    {
        id: 'keepersDiary',
        name: "Keeper's Diary",
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.keepersDiary,
        description:
            "A keeper's journal chronicling the descent from mundane duties to T-Virus infection and eventual transformation.",
        exclusive: null,
    },
    {
        id: 'researchersWill',
        name: "Researcher's Will",
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.researchersWill,
        description:
            "Martin Crackhorn's final letter to his wife Alma, documenting the lab accident and his decision to end his life before transformation.",
        exclusive: null,
    },
    {
        id: 'mailToChiefOfSecurity',
        name: 'Mail to the Chief of Security',
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.mailToChiefOfSecurity,
        description:
            'Confidential orders from Umbrella Headquarters detailing X Day procedures: lure S.T.A.R.S., collect specimens, and eliminate all evidence.',
        exclusive: null,
    },
    {
        id: 'suicideNote',
        name: 'Suicide Note',
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.suicideNote,
        description:
            "A researcher's final message explaining the mercy killing of an infected colleague and the decision to die as a person rather than become infected.",
        exclusive: null,
    },
    {
        id: 'plant42Report',
        name: 'Plant 42 Report',
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.plant42Report,
        description:
            "Research report by Henry Sarton detailing Plant 42's rapid mutation, dual nutrient sources, and aggressive defensive behavior.",
        exclusive: null,
    },
    {
        id: 'organicChemistryLabExperiment',
        name: 'Organic Chemistry Lab Experiment',
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.organicChemistryLabExperiment,
        description:
            'Laboratory notes on creating V-JOLT from UMB chemicals, a compound lethal to T-Virus infected plant cells.',
        exclusive: null,
    },
    {
        id: 'familyPictureAndNotes',
        name: 'Family Picture & Notes',
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.familyPictureAndNotes,
        description:
            "The Trevor family photograph with virus administration records, Lisa's deteriorating journal entries, and Jessica's final letter.",
        exclusive: null,
    },
    {
        id: 'barrysPhotograph',
        name: "Barry's Photograph",
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.barrysPhotograph,
        description:
            "A family photograph that fell from Barry Burton's shirt, inscribed with loving messages from his daughters Moira and Polly.",
        exclusive: null,
    },
    {
        id: 'researchersLetter',
        name: "Researcher's Letter",
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.researchersLetter,
        description:
            "John's letter to Ada with system access instructions, X-ray encoded passwords, and a final plea for mercy if encountered as infected.",
        exclusive: null,
    },
    {
        id: 'vAct',
        name: 'V-ACT',
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.vAct,
        description:
            'Research notes on virus-activated hosts (V-ACTs or "Crimson Heads") documenting enhanced speed, aggression, and the decision to freeze the prototype specimen.',
        exclusive: null,
    },
    {
        id: 'fax',
        name: 'FAX',
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.fax,
        description:
            'Confidential fax from Raccoon Disaster Contingency Committee detailing T-Virus outbreak concerns and recommended countermeasures against S.T.A.R.S. intervention.',
        exclusive: null,
    },
    {
        id: 'securityProtocols',
        name: 'Security Protocols',
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.securityProtocols,
        description:
            'Comprehensive facility security protocols covering access restrictions for all basement levels, from heliport to Tyrant research.',
        exclusive: null,
    },
    {
        id: 'observationNote',
        name: 'Observation Note',
        type: 'Document',
        taxonomy: 'Documents',
        function: 'Documentation',
        imageSrc: thumbnailPaths.observationNote,
        description:
            "William Birkin's research notes on the G-Virus discovery, 21-year Prototype Parasite incubation, and breakthrough findings surpassing the T-Virus.",
        exclusive: null,
    },
    // Weaponry
    {
        id: 'stunGun',
        name: 'Stun Gun',
        type: 'SelfDefense',
        taxonomy: 'Weaponry',
        function: 'Defense',
        imageSrc: thumbnailPaths.stunGun,
        description: 'An electrical weapon that can stun enemies.',
        exclusive: 'JV',
    },
    {
        id: 'flashGrenade',
        name: 'Flash Grenade',
        type: 'SelfDefense',
        taxonomy: 'Weaponry',
        function: 'Defense',
        imageSrc: thumbnailPaths.flashGrenade,
        description: "A self defense item. Normally used to disturb the offender's vision.",
        exclusive: 'CR',
    },
    {
        id: 'dagger',
        name: 'Dagger',
        type: 'SelfDefense',
        taxonomy: 'Weaponry',
        function: 'Defense',
        imageSrc: thumbnailPaths.dagger,
        description: 'A self-defense weapon that can be used when grabbed by enemies.',
        exclusive: null,
    },
    {
        id: 'batteryPack',
        name: 'Battery Pack',
        type: 'Ammunition',
        taxonomy: 'Weaponry',
        function: 'Ammunition',
        imageSrc: thumbnailPaths.batteryPack,
        description:
            'An ordinary battery sold in stores. Looks like it could be used as spares for the stun gun.',
        exclusive: 'JV',
    },
    {
        id: 'handgunMagazine',
        name: 'Handgun Magazine',
        type: 'Ammunition',
        taxonomy: 'Weaponry',
        function: 'Ammunition',
        imageSrc: thumbnailPaths.handgunMagazine,
        description: 'A clip for the handgun. 15 rounds of 9mm Parabellum.',
        exclusive: null,
    },
    {
        id: 'shotgunShells',
        name: 'Shotgun Shells',
        type: 'Ammunition',
        taxonomy: 'Weaponry',
        function: 'Ammunition',
        imageSrc: thumbnailPaths.shotgunShells,
        description: 'Ammunition for the shotgun.',
        exclusive: null,
    },
    {
        id: 'grenadeShells',
        name: 'Grenade Shells',
        type: 'Ammunition',
        taxonomy: 'Weaponry',
        function: 'Ammunition',
        imageSrc: thumbnailPaths.grenadeShells,
        description: 'Explosive rounds for the grenade launcher.',
        exclusive: 'JV',
    },
    {
        id: 'acidShells',
        name: 'Acid Shells',
        type: 'Ammunition',
        taxonomy: 'Weaponry',
        function: 'Ammunition',
        imageSrc: thumbnailPaths.acidShells,
        description: 'Corrosive rounds for the grenade launcher.',
        exclusive: 'JV',
    },
    {
        id: 'incendiaryShells',
        name: 'Incendiary Shells',
        type: 'Ammunition',
        taxonomy: 'Weaponry',
        function: 'Ammunition',
        imageSrc: thumbnailPaths.incendiaryShells,
        description: 'Incendiary rounds for the grenade launcher.',
        exclusive: 'JV',
    },
    {
        id: 'magnumRounds',
        name: 'Magnum Rounds',
        type: 'Ammunition',
        taxonomy: 'Weaponry',
        function: 'Ammunition',
        imageSrc: thumbnailPaths.magnumRounds,
        description: 'Powerful ammunition for the magnum revolver.',
        exclusive: null,
    },
    {
        id: 'survivalKnifeChris',
        name: 'Survival Knife (Chris)',
        type: 'Weapon',
        taxonomy: 'Weaponry',
        function: 'Offense',
        imageSrc: thumbnailPaths.survivalKnifeChris,
        description: "Chris's combat knife for close-quarters combat.",
        exclusive: 'CR',
    },
    {
        id: 'survivalKnifeJill',
        name: 'Survival Knife (Jill)',
        type: 'Weapon',
        taxonomy: 'Weaponry',
        function: 'Offense',
        imageSrc: thumbnailPaths.survivalKnifeJill,
        description: "Jill's combat knife for close-quarters combat.",
        exclusive: 'JV',
    },
    {
        id: 'survivalKnife',
        name: 'Survival Knife',
        type: 'Weapon',
        taxonomy: 'Weaponry',
        function: 'Offense',
        imageSrc: thumbnailPaths.survivalKnife,
        description: 'A combat knife for close-quarters combat.',
        exclusive: null,
    },
    {
        id: 'handgun',
        name: 'Handgun',
        type: 'Weapon',
        taxonomy: 'Weaponry',
        function: 'Offense',
        imageSrc: thumbnailPaths.handgun,
        description: 'A standard 9mm handgun.',
        exclusive: null,
    },
    {
        id: 'samuraiEdge',
        name: 'Samurai Edge',
        type: 'Weapon',
        taxonomy: 'Weaponry',
        function: 'Offense',
        imageSrc: thumbnailPaths.samuraiEdge,
        description: 'A custom handgun issued to S.T.A.R.S. members.',
        exclusive: null,
    },
    {
        id: 'shotgun',
        name: 'Shotgun',
        type: 'Weapon',
        taxonomy: 'Weaponry',
        function: 'Offense',
        imageSrc: thumbnailPaths.shotgun,
        description: 'A powerful pump-action shotgun.',
        exclusive: null,
    },
    {
        id: 'assaultShotgun',
        name: 'Assault Shotgun',
        type: 'Weapon',
        taxonomy: 'Weaponry',
        function: 'Offense',
        imageSrc: thumbnailPaths.assaultShotgun,
        description: 'An automatic shotgun with rapid fire capability.',
        exclusive: null,
    },
    {
        id: 'grenadeLauncher',
        name: 'Grenade Launcher',
        type: 'Weapon',
        taxonomy: 'Weaponry',
        function: 'Offense',
        imageSrc: thumbnailPaths.grenadeLauncher,
        description: 'A powerful launcher that fires various types of explosive rounds.',
        exclusive: 'JV',
    },
    {
        id: 'selfDefenseGun',
        name: 'Self Defense Gun',
        type: 'SelfDefense',
        taxonomy: 'Weaponry',
        function: 'Defense',
        imageSrc: thumbnailPaths.selfDefenseGun,
        description: 'A small pistol designed for self-defense situations.',
        exclusive: null,
    },
    {
        id: 'magnumRevolver',
        name: 'Magnum Revolver',
        type: 'Weapon',
        taxonomy: 'Weaponry',
        function: 'Offense',
        imageSrc: thumbnailPaths.magnumRevolver,
        description: 'An extremely powerful revolver with devastating stopping power.',
        exclusive: null,
    },
    {
        id: 'flamethrower',
        name: 'Flamethrower',
        type: 'Weapon',
        taxonomy: 'Weaponry',
        function: 'Offense',
        imageSrc: thumbnailPaths.flamethrower,
        description: 'A powerful weapon that projects streams of fire.',
        exclusive: null,
    },
    {
        id: 'barrys44Magnum',
        name: "Barry's 44 Magnum",
        type: 'Weapon',
        taxonomy: 'Weaponry',
        function: 'Offense',
        imageSrc: thumbnailPaths.barrys44Magnum,
        description: "Barry's personal magnum revolver.",
        exclusive: 'JV',
    },
    {
        id: 'rocketLauncher',
        name: 'Rocket Launcher',
        type: 'Weapon',
        taxonomy: 'Weaponry',
        function: 'Offense',
        imageSrc: thumbnailPaths.rocketLauncher,
        description: 'An anti-tank weapon with unlimited ammunition.',
        exclusive: null,
    },
    {
        id: 'rocketLauncherSingleBarrel',
        name: 'Rocket Launcher (Single Barrel)',
        type: 'Weapon',
        taxonomy: 'Weaponry',
        function: 'Offense',
        imageSrc: thumbnailPaths.rocketLauncherSingleBarrel,
        description: 'A single-shot rocket launcher with limited ammunition.',
        exclusive: null,
    },
] as const;

export const personsData: ReadonlyArray<PersonData> = [
    // Persons
    {
        id: 'jillValentine',
        name: 'Jill Valentine',
        type: 'PersonOfInterest',
        taxonomy: 'Persons',
        imageSrc: thumbnailPaths.jillValentine,
        bio: 'to be added',
        exclusive: null,
    },
    {
        id: 'chrisRedfield',
        name: 'Chris Redfield',
        type: 'PersonOfInterest',
        taxonomy: 'Persons',
        imageSrc: thumbnailPaths.chrisRedfield,
        bio: 'to be added',
        exclusive: null,
    },
    {
        id: 'barryBurton',
        name: 'Barry Burton',
        type: 'PersonOfInterest',
        taxonomy: 'Persons',
        imageSrc: thumbnailPaths.barryBurton,
        bio: 'to be added',
        exclusive: 'JV',
    },
    {
        id: 'rebeccaChambers',
        name: 'Rebecca Chambers',
        type: 'PersonOfInterest',
        taxonomy: 'Persons',
        imageSrc: thumbnailPaths.rebeccaChambers,
        bio: 'to be added',
        exclusive: 'CR',
    },
    {
        id: 'kennethJSullivan',
        name: 'Kenneth J. Sullivan',
        type: 'PersonOfInterest',
        taxonomy: 'Persons',
        imageSrc: thumbnailPaths.kennethJSullivan,
        bio: 'to be added',
        exclusive: null,
    },
    {
        id: 'richardAiken',
        name: 'Richard Aiken',
        type: 'PersonOfInterest',
        taxonomy: 'Persons',
        imageSrc: thumbnailPaths.richardAiken,
        bio: 'to be added',
        exclusive: null,
    },
    {
        id: 'albertWesker',
        name: 'Albert Wesker',
        type: 'PersonOfInterest',
        taxonomy: 'Persons',
        imageSrc: thumbnailPaths.albertWesker,
        bio: 'to be added',
        exclusive: null,
    },
    {
        id: 'bradVickers',
        name: 'Brad Vickers',
        type: 'PersonOfInterest',
        taxonomy: 'Persons',
        imageSrc: thumbnailPaths.bradVickers,
        bio: 'to be added',
        exclusive: null,
    },
    {
        id: 'forestSpeyer',
        name: 'Forest Speyer',
        type: 'PersonOfInterest',
        taxonomy: 'Persons',
        imageSrc: thumbnailPaths.forestSpeyer,
        bio: 'to be added',
        exclusive: null,
    },
    {
        id: 'josephFrost',
        name: 'Joseph Frost',
        type: 'PersonOfInterest',
        taxonomy: 'Persons',
        imageSrc: thumbnailPaths.josephFrost,
        bio: 'to be added',
        exclusive: null,
    },
    {
        id: 'enricoMarini',
        name: 'Enrico Marini',
        type: 'PersonOfInterest',
        taxonomy: 'Persons',
        imageSrc: thumbnailPaths.enricoMarini,
        bio: 'to be added',
        exclusive: null,
    },
] as const;

export const itemsRoomData: ReadonlyArray<ItemRoomData> = [
    // Main Hall F1
    {
        id: 'personOfInterest-mainHallF1',
        itemId: 'barryBurton',
        map: {
            roomId: 'mainHallF1',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'JV-lvl-normal', 'JV-lvl-hard'],
        name: 'Barry Burton',
        type: 'PersonOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'weapon-mainHallF1',
        itemId: 'handgun',
        map: {
            roomId: 'mainHallF1',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['CR-lvl-very-easy', 'CR-lvl-easy', 'CR-lvl-normal', 'CR-lvl-hard'],
        name: 'Handgun',
        type: 'Weapon',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'doorKey-mainHallF1',
        itemId: 'lockpick',
        map: {
            roomId: 'mainHallF1',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'JV-lvl-normal', 'JV-lvl-hard'],
        name: 'Lockpick',
        type: 'DoorKey',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'dialogue',
    },
    {
        id: 'ammunition-mainHallF1',
        itemId: 'acidShells',
        map: {
            roomId: 'mainHallF1',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'JV-lvl-normal'],
        name: 'Acid Shells',
        type: 'Ammunition',
        qty: 1,
        qtyItems: 6,
        uses: null,
        isFeatured: false,
        requirement: 'dialogue',
    },
    // Dining Hall F1
    {
        id: 'personOfInterest-diningRoomF1',
        itemId: 'barryBurton',
        map: {
            roomId: 'diningRoomF1',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'JV-lvl-normal', 'JV-lvl-hard'],
        name: 'Barry Burton',
        type: 'PersonOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'typewriter-diningRoomF1',
        itemId: 'typewriter',
        map: {
            roomId: 'diningRoomF1',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Typewriter',
        type: 'Typewriter',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: true,
        requirement: 'none',
    },
    {
        id: 'itemOfInterest1-diningRoomF1',
        itemId: 'emblem',
        map: {
            roomId: 'diningRoomF1',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Emblem',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'itemOfInterest2-diningRoomF1',
        itemId: 'blueGemstone',
        map: {
            roomId: 'diningRoomF1',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Blue Gemstone',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'puzzleSolving',
    },
    {
        id: 'doorKey-diningRoomF1',
        itemId: 'shieldKey',
        map: {
            roomId: 'diningRoomF1',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Shield Key',
        type: 'DoorKey',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'puzzleSolving',
    },
    {
        id: 'inkRibbon-diningRoomF1',
        itemId: 'inkRibbon',
        map: {
            roomId: 'diningRoomF1',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Ink Ribbon',
        type: 'InkRibbon',
        qty: 1,
        qtyItems: [
            {
                qty: 6,
                difficultyLevel: ['JV-lvl-very-easy', 'CR-lvl-very-easy'],
            },
            {
                qty: 3,
                difficultyLevel: [
                    'JV-lvl-easy',
                    'JV-lvl-normal',
                    'JV-lvl-hard',
                    'CR-lvl-easy',
                    'CR-lvl-normal',
                    'CR-lvl-hard',
                ],
            },
        ],
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // Tea Room Corridor
    {
        id: 'personOfInterest-teaRoomCorridor',
        itemId: 'kennethJSullivan',
        map: {
            roomId: 'teaRoomCorridor',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Kenneth J. Sullivan',
        type: 'PersonOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'itemOfInterest-teaRoomCorridor',
        itemId: 'kennethsFilm',
        map: {
            roomId: 'teaRoomCorridor',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: "Kenneth's Film",
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // Bar
    {
        id: 'personOfInterest-bar',
        itemId: 'rebeccaChambers',
        map: {
            roomId: 'bar',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['CR-lvl-very-easy', 'CR-lvl-easy', 'CR-lvl-normal', 'CR-lvl-hard'],
        name: 'Rebecca Chambers',
        type: 'PersonOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'itemOfInterest1-bar',
        itemId: 'goldEmblem',
        map: {
            roomId: 'bar',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Gold Emblem',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'itemOfInterest2-bar',
        itemId: 'missingMusic',
        map: {
            roomId: 'bar',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Missing Music',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'examination',
    },
    {
        id: 'document-bar',
        itemId: 'trevorsDiaryVol1',
        map: {
            roomId: 'bar',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: "Trevor's Diary Vol. 1",
        type: 'Document',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'inkRibbon-bar',
        itemId: 'inkRibbon',
        map: {
            roomId: 'bar',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'CR-lvl-very-easy', 'CR-lvl-easy'],
        name: 'Ink Ribbon',
        type: 'InkRibbon',
        qty: 1,
        qtyItems: [
            {
                qty: 6,
                difficultyLevel: ['JV-lvl-very-easy', 'CR-lvl-very-easy'],
            },
            {
                qty: 3,
                difficultyLevel: ['JV-lvl-easy', 'CR-lvl-easy'],
            },
        ],
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // Keeper's Room
    {
        id: 'selfDefenseJV-keepersRoom',
        itemId: 'batteryPack',
        map: {
            roomId: 'keepersRoom',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'JV-lvl-normal', 'JV-lvl-hard'],
        name: 'Battery Pack',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'selfDefenseCR-keepersRoom',
        itemId: 'flashGrenade',
        map: {
            roomId: 'keepersRoom',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['CR-lvl-very-easy', 'CR-lvl-easy', 'CR-lvl-normal', 'CR-lvl-hard'],
        name: 'Flash Grenade',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'document-keepersRoom',
        itemId: 'keepersDiary',
        map: {
            roomId: 'keepersRoom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: "Keeper's Diary",
        type: 'Document',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'ammunition-keepersRoom',
        itemId: 'handgunMagazine',
        map: {
            roomId: 'keepersRoom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Handgun Magazine',
        type: 'Ammunition',
        qty: 1,
        qtyItems: 15,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // West Wing North West Corridor
    {
        id: 'ammunition-westWingNorthWestCorridor',
        itemId: 'handgunMagazine',
        map: {
            roomId: 'westWingNorthWestCorridor',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
        ],
        name: 'Handgun Magazine',
        type: 'Ammunition',
        qty: 1,
        qtyItems: 15,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'greenHerb1-westWingNorthWestCorridor',
        itemId: 'greenHerb',
        map: {
            roomId: 'westWingNorthWestCorridor',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Green Herb',
        type: 'GreenHerb',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'greenHerb2-westWingNorthWestCorridor',
        itemId: 'greenHerb',
        map: {
            roomId: 'westWingNorthWestCorridor',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
        ],
        name: 'Green Herb',
        type: 'GreenHerb',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // Clinic
    {
        id: 'personOfInterest1-clinic',
        itemId: 'rebeccaChambers',
        map: {
            roomId: 'clinic',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['CR-lvl-very-easy', 'CR-lvl-easy', 'CR-lvl-normal', 'CR-lvl-hard'],
        name: 'Rebecca Chambers',
        type: 'PersonOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'personOfInterest2-clinic',
        itemId: 'richardAiken',
        map: {
            roomId: 'clinic',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['CR-lvl-very-easy', 'CR-lvl-easy', 'CR-lvl-normal', 'CR-lvl-hard'],
        name: 'Richard Aiken',
        type: 'PersonOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'typewriter-clinic',
        itemId: 'typewriter',
        map: {
            roomId: 'clinic',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Typewriter',
        type: 'Typewriter',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: true,
        requirement: 'none',
    },
    {
        id: 'itemBox-clinic',
        itemId: 'itemBox',
        map: {
            roomId: 'clinic',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Item Box',
        type: 'ItemBox',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: true,
        requirement: 'none',
    },
    {
        id: 'document-clinic',
        itemId: 'bodyDisposal',
        map: {
            roomId: 'clinic',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Body Disposal',
        type: 'Document',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'itemOfInterest-clinic',
        itemId: 'serum',
        map: {
            roomId: 'clinic',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Serum',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // West Wing Storeroom
    {
        id: 'kerosene-westWingStoreroom',
        itemId: 'kerosene',
        map: {
            roomId: 'westWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Kerosene',
        type: 'Kerosene',
        qty: 1,
        qtyItems: null,
        uses: [
            {
                uses: 5,
                difficultyLevel: ['JV-lvl-very-easy', 'CR-lvl-very-easy'],
            },
            {
                uses: 4,
                difficultyLevel: [
                    'JV-lvl-easy',
                    'JV-lvl-normal',
                    'JV-lvl-hard',
                    'CR-lvl-easy',
                    'CR-lvl-normal',
                    'CR-lvl-hard',
                ],
            },
        ],
        isFeatured: true,
        requirement: 'none',
    },
    {
        id: 'inkRibbon-westWingStoreroom',
        itemId: 'inkRibbon',
        map: {
            roomId: 'westWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Ink Ribbon',
        type: 'InkRibbon',
        qty: 1,
        qtyItems: [
            {
                qty: 6,
                difficultyLevel: ['JV-lvl-very-easy', 'CR-lvl-very-easy'],
            },
            {
                qty: 3,
                difficultyLevel: [
                    'JV-lvl-easy',
                    'JV-lvl-normal',
                    'JV-lvl-hard',
                    'CR-lvl-easy',
                    'CR-lvl-normal',
                    'CR-lvl-hard',
                ],
            },
        ],
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'itemOfInterest-westWingStoreroom',
        itemId: 'brokenShotgun',
        map: {
            roomId: 'westWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Broken Shotgun',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'selfDefenseJV-westWingStoreroom',
        itemId: 'batteryPack',
        map: {
            roomId: 'westWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'JV-lvl-normal', 'JV-lvl-hard'],
        name: 'Battery Pack',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'selfDefenseCR-westWingStoreroom',
        itemId: 'flashGrenade',
        map: {
            roomId: 'westWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['CR-lvl-very-easy', 'CR-lvl-easy', 'CR-lvl-normal', 'CR-lvl-hard'],
        name: 'Flash Grenade',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // West Wing North Corridor
    {
        id: 'selfDefenseJV-westWingNorthCorridor',
        itemId: 'batteryPack',
        map: {
            roomId: 'westWingNorthCorridor',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'JV-lvl-normal', 'JV-lvl-hard'],
        name: 'Battery Pack',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'selfDefenseCR-westWingNorthCorridor',
        itemId: 'flashGrenade',
        map: {
            roomId: 'westWingNorthCorridor',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['CR-lvl-very-easy', 'CR-lvl-easy', 'CR-lvl-normal', 'CR-lvl-hard'],
        name: 'Flash Grenade',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'selfDefense-westWingNorthCorridor',
        itemId: 'dagger',
        map: {
            roomId: 'westWingNorthCorridor',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'CR-lvl-very-easy', 'CR-lvl-easy'],
        name: 'Dagger',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // Tiger Statue Room
    {
        id: 'itemOfInterest1-tigerStatueRoom',
        itemId: 'redGemstone',
        map: {
            roomId: 'tigerStatueRoom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Red Gemstone',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'puzzleSolving',
    },
    {
        id: 'itemOfInterest2-tigerStatueRoom',
        itemId: 'moDisk',
        map: {
            roomId: 'tigerStatueRoom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'MO Disk',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'puzzleSolving',
    },
    {
        id: 'ammunition-tigerStatueRoom',
        itemId: 'shotgunShells',
        map: {
            roomId: 'tigerStatueRoom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Shotgun Shells',
        type: 'Ammunition',
        qty: 1,
        qtyItems: 6,
        uses: null,
        isFeatured: false,
        requirement: 'puzzleSolving',
    },
    // Greenhouse
    {
        id: 'itemOfInterest-greenhouse',
        itemId: 'maskWithoutEyes',
        map: {
            roomId: 'greenhouse',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Mask without Eyes',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'puzzleSolving',
    },
    {
        id: 'greenHerb1-greenhouse',
        itemId: 'greenHerb',
        map: {
            roomId: 'greenhouse',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Green Herb',
        type: 'GreenHerb',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'greenHerb2-greenhouse',
        itemId: 'greenHerb',
        map: {
            roomId: 'greenhouse',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Green Herb',
        type: 'GreenHerb',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'greenHerb3-greenhouse',
        itemId: 'greenHerb',
        map: {
            roomId: 'greenhouse',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Green Herb',
        type: 'GreenHerb',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'greenHerb4-greenhouse',
        itemId: 'greenHerb',
        map: {
            roomId: 'greenhouse',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Green Herb',
        type: 'GreenHerb',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'greenHerb5-greenhouse',
        itemId: 'greenHerb',
        map: {
            roomId: 'greenhouse',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Green Herb',
        type: 'GreenHerb',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // Exhibition Room F1
    {
        id: 'selfDefense-exhibitionRoomF1',
        itemId: 'dagger',
        map: {
            roomId: 'exhibitionRoomF1',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Dagger',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'map-exhibitionRoomF1',
        itemId: 'map',
        map: {
            roomId: 'exhibitionRoomF1',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Map - Mansion F1',
        type: 'Map',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: true,
        requirement: 'examination',
    },
    // Drawing Room
    {
        id: 'inkRibbon-drawingRoom',
        itemId: 'inkRibbon',
        map: {
            roomId: 'drawingRoom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Ink Ribbon',
        type: 'InkRibbon',
        qty: 1,
        qtyItems: [
            {
                qty: 6,
                difficultyLevel: ['JV-lvl-very-easy', 'CR-lvl-very-easy'],
            },
            {
                qty: 3,
                difficultyLevel: [
                    'JV-lvl-easy',
                    'JV-lvl-normal',
                    'JV-lvl-hard',
                    'CR-lvl-easy',
                    'CR-lvl-normal',
                    'CR-lvl-hard',
                ],
            },
        ],
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'document-drawingRoom',
        itemId: 'trevorsDiaryVol2',
        map: {
            roomId: 'drawingRoom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: "Trevor's Diary Vol. 2",
        type: 'Document',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // Hidden Passage
    {
        id: 'document-hiddenPassage',
        itemId: 'trevorsDiaryVol3',
        map: {
            roomId: 'hiddenPassage',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: "Trevor's Diary Vol. 3",
        type: 'Document',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'itemOfInterest1-hiddenPassage',
        itemId: 'lastBookVol1',
        map: {
            roomId: 'hiddenPassage',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Last Book Vol. 1',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'itemOfInterest2-hiddenPassage',
        itemId: 'medalOfEagle',
        map: {
            roomId: 'hiddenPassage',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Medal of Eagle',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'examination',
    },
    // 'Mirror Room
    {
        id: 'selfDefense-mirrorRoom',
        itemId: 'dagger',
        map: {
            roomId: 'mirrorRoom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Dagger',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'itemOfInterest1-mirrorRoom',
        itemId: 'sunMoonJewelryBox',
        map: {
            roomId: 'mirrorRoom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Sun & Moon Jewelry Box',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'itemOfInterest2-mirrorRoom',
        itemId: 'broach',
        map: {
            roomId: 'mirrorRoom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Broach',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'puzzleSolving',
    },
    {
        id: 'doorKey-mirrorRoom',
        itemId: 'emblemKey',
        map: {
            roomId: 'mirrorRoom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Emblem Key',
        type: 'DoorKey',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'examination',
    },
    {
        id: 'greenHerb-mirrorRoom',
        itemId: 'emblemKey',
        map: {
            roomId: 'mirrorRoom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Green Herb',
        type: 'GreenHerb',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'blueHerb-mirrorRoom',
        itemId: 'emblemKey',
        map: {
            roomId: 'mirrorRoom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Blue Herb',
        type: 'BlueHerb',
        qty: 1,
        qtyItems: null,
        uses: [
            {
                uses: 3,
                difficultyLevel: [
                    'JV-lvl-very-easy',
                    'JV-lvl-easy',
                    'JV-lvl-normal',
                    'JV-lvl-hard',
                    'CR-lvl-very-easy',
                    'CR-lvl-easy',
                    'CR-lvl-normal',
                    'CR-lvl-hard',
                ],
            },
        ],
        isFeatured: false,
        requirement: 'none',
    },
    // East Wing East Corridor
    {
        id: 'selfDefense-eastWingEastCorridor',
        itemId: 'dagger',
        map: {
            roomId: 'eastWingEastCorridor',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Dagger',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'investigation',
    },
    {
        id: 'ammunition-eastWingEastCorridor',
        itemId: 'handgunMagazine',
        map: {
            roomId: 'eastWingEastCorridor',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
        ],
        name: 'Handgun Magazine',
        type: 'Ammunition',
        qty: 1,
        qtyItems: 15,
        uses: null,
        isFeatured: false,
        requirement: 'investigation',
    },
    // East Wing North East Corridor
    {
        id: 'personOfInterest-eastWingNorthEastCorridor',
        itemId: 'barryBurton',
        map: {
            roomId: 'eastWingNorthEastCorridor',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'JV-lvl-normal', 'JV-lvl-hard'],
        name: 'Barry Burton',
        type: 'PersonOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'event',
    },
    // Bathroom
    {
        id: 'selfDefense-bathroom',
        itemId: 'dagger',
        map: {
            roomId: 'bathroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'JV-lvl-normal', 'JV-lvl-hard'],
        name: 'Dagger',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'investigation',
    },
    {
        id: 'doorKey-bathroom',
        itemId: 'oldKey',
        map: {
            roomId: 'bathroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['CR-lvl-very-easy', 'CR-lvl-easy', 'CR-lvl-normal', 'CR-lvl-hard'],
        name: 'Old Key',
        type: 'DoorKey',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'investigation',
    },
    // Outdoor Boiler
    {
        id: 'kerosene-outdoorBoiler',
        itemId: 'kerosene',
        map: {
            roomId: 'outdoorBoiler',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Kerosene',
        type: 'Kerosene',
        qty: 1,
        qtyItems: null,
        uses: [
            {
                uses: 5,
                difficultyLevel: [
                    'JV-lvl-very-easy',
                    'JV-lvl-easy',
                    'CR-lvl-very-easy',
                    'CR-lvl-easy',
                ],
            },
            {
                uses: 4,
                difficultyLevel: ['JV-lvl-normal', 'JV-lvl-hard', 'CR-lvl-normal', 'CR-lvl-hard'],
            },
        ],
        isFeatured: true,
        requirement: 'none',
    },
    {
        id: 'itemOfInterest-outdoorBoiler',
        itemId: 'herbicide',
        map: {
            roomId: 'outdoorBoiler',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Herbicide',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'greenHerb1-outdoorBoiler',
        itemId: 'greenHerb',
        map: {
            roomId: 'outdoorBoiler',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Green Herb',
        type: 'GreenHerb',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'greenHerb2-outdoorBoiler',
        itemId: 'greenHerb',
        map: {
            roomId: 'outdoorBoiler',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Green Herb',
        type: 'GreenHerb',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'redHerb1-outdoorBoiler',
        itemId: 'redHerb',
        map: {
            roomId: 'outdoorBoiler',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Red Herb',
        type: 'RedHerb',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'redHerb2-outdoorBoiler',
        itemId: 'redHerb',
        map: {
            roomId: 'outdoorBoiler',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'CR-lvl-very-easy', 'CR-lvl-easy'],
        name: 'Red Herb',
        type: 'RedHerb',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'redHerb3-outdoorBoiler',
        itemId: 'redHerb',
        map: {
            roomId: 'outdoorBoiler',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'CR-lvl-very-easy', 'CR-lvl-easy'],
        name: 'Red Herb',
        type: 'RedHerb',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // Parlour
    {
        id: 'selfDefense-parlour',
        itemId: 'dagger',
        map: {
            roomId: 'parlour',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Dagger',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'inkRibbon-parlour',
        itemId: 'inkRibbon',
        map: {
            roomId: 'parlour',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
        ],
        name: 'Ink Ribbon',
        type: 'InkRibbon',
        qty: 1,
        qtyItems: [
            {
                qty: 6,
                difficultyLevel: ['JV-lvl-very-easy', 'CR-lvl-very-easy'],
            },
            {
                qty: 3,
                difficultyLevel: ['JV-lvl-easy', 'JV-lvl-normal', 'CR-lvl-easy', 'CR-lvl-normal'],
            },
        ],
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'weapon-parlour',
        itemId: 'shotgun',
        map: {
            roomId: 'parlour',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Shotgun',
        type: 'Weapon',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // Gallery
    {
        id: 'itemOfInterest-gallery',
        itemId: 'maskWithoutMouth',
        map: {
            roomId: 'gallery',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Mask without Mouth',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'puzzleSolving',
    },
    // Study
    {
        id: 'itemOfInterest-study',
        itemId: 'metalObject',
        map: {
            roomId: 'study',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Metal Object',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'investigation',
    },
    {
        id: 'selfDefense1-study',
        itemId: 'batteryPack',
        map: {
            roomId: 'study',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'JV-lvl-normal', 'JV-lvl-hard'],
        name: 'Battery Pack',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'investigation',
    },
    {
        id: 'selfDefense2-study',
        itemId: 'flashGrenade',
        map: {
            roomId: 'study',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['CR-lvl-very-easy', 'CR-lvl-easy', 'CR-lvl-normal', 'CR-lvl-hard'],
        name: 'Flash Grenade',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'investigation',
    },
    {
        id: 'ammunition-study',
        itemId: 'shotgunShells',
        map: {
            roomId: 'study',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Shotgun Shells',
        type: 'Ammunition',
        qty: 1,
        qtyItems: 6,
        uses: null,
        isFeatured: false,
        requirement: 'investigation',
    },
    // East Wing North Corridor F1
    {
        id: 'greenHerb-eastWingNorthCorridorF1',
        itemId: 'greenHerb',
        map: {
            roomId: 'eastWingNorthCorridorF1',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'CR-lvl-very-easy', 'CR-lvl-easy'],
        name: 'Green Herb',
        type: 'GreenHerb',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // East Wing Storeroom
    {
        id: 'typewriter-eastWingStoreroom',
        itemId: 'typewriter',
        map: {
            roomId: 'eastWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Typewriter',
        type: 'Typewriter',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: true,
        requirement: 'none',
    },
    {
        id: 'itemBox-eastWingStoreroom',
        itemId: 'itemBox',
        map: {
            roomId: 'eastWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Item Box',
        type: 'ItemBox',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: true,
        requirement: 'none',
    },
    {
        id: 'kerosene-eastWingStoreroom',
        itemId: 'kerosene',
        map: {
            roomId: 'eastWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Kerosene',
        type: 'Kerosene',
        qty: 1,
        qtyItems: null,
        uses: [
            {
                uses: 5,
                difficultyLevel: [
                    'JV-lvl-very-easy',
                    'JV-lvl-easy',
                    'CR-lvl-very-easy',
                    'CR-lvl-easy',
                ],
            },
            {
                uses: 4,
                difficultyLevel: ['JV-lvl-normal', 'JV-lvl-hard', 'CR-lvl-normal', 'CR-lvl-hard'],
            },
        ],
        isFeatured: true,
        requirement: 'none',
    },
    {
        id: 'itemOfInterest-eastWingStoreroom',
        itemId: 'fuelCanteen',
        map: {
            roomId: 'eastWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Fuel Canteen',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'document-eastWingStoreroom',
        itemId: 'bodyDisposal',
        map: {
            roomId: 'eastWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Body Disposal',
        type: 'Document',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'doorKey-eastWingStoreroom',
        itemId: 'oldKey',
        map: {
            roomId: 'eastWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['CR-lvl-very-easy', 'CR-lvl-easy', 'CR-lvl-normal', 'CR-lvl-hard'],
        name: 'Old Key',
        type: 'DoorKey',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'firstAidSpray1-eastWingStoreroom',
        itemId: 'firstAidSpray',
        map: {
            roomId: 'eastWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'First Aid Spray',
        type: 'FirstAid',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'firstAidSpray2-eastWingStoreroom',
        itemId: 'firstAidSpray',
        map: {
            roomId: 'eastWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'CR-lvl-very-easy', 'CR-lvl-easy'],
        name: 'First Aid Spray',
        type: 'FirstAid',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'ammunition1-eastWingStoreroom',
        itemId: 'handgunMagazine',
        map: {
            roomId: 'eastWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'CR-lvl-very-easy', 'CR-lvl-easy'],
        name: 'Handgun Magazine',
        type: 'Ammunition',
        qty: 1,
        qtyItems: 15,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'ammunition2-eastWingStoreroom',
        itemId: 'handgunMagazine',
        map: {
            roomId: 'eastWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'CR-lvl-very-easy', 'CR-lvl-easy'],
        name: 'Handgun Magazine',
        type: 'Ammunition',
        qty: 2,
        qtyItems: 30,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'ammunition3-eastWingStoreroom',
        itemId: 'handgunMagazine',
        map: {
            roomId: 'eastWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-normal', 'JV-lvl-hard', 'CR-lvl-normal', 'CR-lvl-hard'],
        name: 'Handgun Magazine',
        type: 'Ammunition',
        qty: 1,
        qtyItems: 15,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'ammunition4-eastWingStoreroom',
        itemId: 'incendiaryShells',
        map: {
            roomId: 'eastWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'JV-lvl-normal'],
        name: 'Incendiary Shells',
        type: 'Ammunition',
        qty: 1,
        qtyItems: 6,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'ammunition5-eastWingStoreroom',
        itemId: 'shotgunShells',
        map: {
            roomId: 'eastWingStoreroom',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['CR-lvl-very-easy', 'CR-lvl-easy', 'CR-lvl-normal'],
        name: 'Shotgun Shells',
        type: 'Ammunition',
        qty: 1,
        qtyItems: 6,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // Outdoor Corridor
    {
        id: 'itemOfInterest-outdoorCorridor',
        itemId: 'radio',
        map: {
            roomId: 'outdoorCorridor',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'JV-lvl-normal', 'JV-lvl-hard'],
        name: 'Radio',
        type: 'ItemOfInterest',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // Shed
    {
        id: 'ammunition1-shed',
        itemId: 'shotgunShells',
        map: {
            roomId: 'shed',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Shotgun Shells',
        type: 'Ammunition',
        qty: 1,
        qtyItems: 6,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'firstAidSpray1-shed',
        itemId: 'firstAidSpray',
        map: {
            roomId: 'shed',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'First Aid Spray',
        type: 'FirstAid',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'selfDefenseJV1-shed',
        itemId: 'batteryPack',
        map: {
            roomId: 'shed',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'JV-lvl-normal'],
        name: 'Battery Pack',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'selfDefenseCR1-shed',
        itemId: 'flashGrenade',
        map: {
            roomId: 'shed',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['CR-lvl-very-easy', 'CR-lvl-easy', 'CR-lvl-normal'],
        name: 'Flash Grenade',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'ammunition2-shed',
        itemId: 'shotgunShells',
        map: {
            roomId: 'shed',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Shotgun Shells',
        type: 'Ammunition',
        qty: 1,
        qtyItems: 6,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'ammunition3-shed',
        itemId: 'acidShells',
        map: {
            roomId: 'shed',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy'],
        name: 'Acid Shells',
        type: 'Ammunition',
        qty: 1,
        qtyItems: 6,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'ammunition4-shed',
        itemId: 'grenadeShells',
        map: {
            roomId: 'shed',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-normal'],
        name: 'Grenade Shells',
        type: 'Ammunition',
        qty: 1,
        qtyItems: 6,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'firstAidSpray2-shed',
        itemId: 'firstAidSpray',
        map: {
            roomId: 'shed',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
        ],
        name: 'First Aid Spray',
        type: 'FirstAid',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'firstAidSpray3-shed',
        itemId: 'firstAidSpray',
        map: {
            roomId: 'shed',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'CR-lvl-very-easy', 'CR-lvl-easy'],
        name: 'First Aid Spray',
        type: 'FirstAid',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'selfDefenseJV2-shed',
        itemId: 'batteryPack',
        map: {
            roomId: 'shed',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'JV-lvl-normal'],
        name: 'Battery Pack',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'selfDefenseCR2-shed',
        itemId: 'flashGrenade',
        map: {
            roomId: 'shed',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['CR-lvl-very-easy', 'CR-lvl-easy', 'CR-lvl-normal'],
        name: 'Flash Grenade',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    {
        id: 'selfDefense-shed',
        itemId: 'dagger',
        map: {
            roomId: 'shed',
            mapId: 'mansionF1',
        },
        difficultyLevel: ['JV-lvl-hard', 'CR-lvl-hard'],
        name: 'Dagger',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: null,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
    // Cemetery
    {
        id: 'ammunition-cemetery',
        itemId: 'shotgunShells',
        map: {
            roomId: 'cemetery',
            mapId: 'mansionF1',
        },
        difficultyLevel: [
            'JV-lvl-very-easy',
            'JV-lvl-easy',
            'JV-lvl-normal',
            'JV-lvl-hard',
            'CR-lvl-very-easy',
            'CR-lvl-easy',
            'CR-lvl-normal',
            'CR-lvl-hard',
        ],
        name: 'Shotgun Shells',
        type: 'Ammunition',
        qty: 1,
        qtyItems: 6,
        uses: null,
        isFeatured: false,
        requirement: 'none',
    },
] as const;

export const transcriptionData: ReadonlyArray<TranscriptionData> = [
    {
        itemId: 'starsManual',
        transcript: `S.T.A.R.S. Manual

If you have changed your controller type to TYPE-B or to TYPE-C, please keep in mind that the contents explained here correlates with controller TYPE-A.


-How to view your STATUS SCREEN-

Press the Y Button during the game. (You will not be able to view the STATUS SCREEN during Cut-Scenes or while being attacked.)

In the STATUS SCREEN you'll be able to do the following things.
Equip weapons
Use items
View maps
Read files


-How to VIEW MAP-

In the STATUS SCREEN select MAP from the menu bar or simply push the Z Button during the game. If you have not obtained a map, only the places you have explored will be displayed.


-How to READ MAPS-

uncolored room(s): Unexplored room(s).
orange room(s): Room(s) with still items left.
green room(s): Explored room(s) without any items left.

red door: Locked door.
white door: Unlocked door.
blue door: Door you've been through.


-How to PUSH THINGS-

When there is a movable object, face the object in the direction you want to push it and press the Control Stick (+ Control Pad) in the direction you are facing.


-CLIMBING ON & CLIMBING DOWN-

Walk up to an object that's waist high of the character, and then press the A Button. (You can climb on movable objects as well.) To CLIMB DOWN from an object, press the A Button while standing on the edge of the object.


-How to EQUIP WEAPONS-

In the STATUS SCREEN select the "weapon" you want to arm, then select the "EQUIP" command. (Even if you have a weapon you must EQUIP it in order for you to attack.)


-ATTACKING STANCE-

Hold down the R Button. (The player will take an attacking stance towards the closest enemy.)


-How to ATTACK-

While holding down the R Button, press the A Button. (You can attack the enemy with the weapon you have equipped.)


-180 DEGREE TURN-

While pressing down the Control Stick (or the + Control Pad), press the B Button. (This can also be done using the C Stick alone.)


-EXAMINE AN ITEM-

From the STATUS SCREEN select an ITEM and then select the EXAMINE command. (The details of the item will be displayed.)


-Emergency Evade-

Using DEFENSE ITEMS such as Daggers, will allow you to escape momentarily when grabbed by an enemy. (However, you will not be able to escape when the enemy grabs you from behind.)

To equip a DEFENSE ITEM, go to the STATUS SCREEN, and then select an ITEM from the DEFENSE ITEM menu. Then select the EQUIP command.

If your DEFENSE ITEM mode is set to MANUAL in the Controller Settings, you must press the L Button to use the DEFENSE ITEM.`,
    },
    {
        itemId: 'kennethsFilm',
        transcript: `It's the film that belonged to Kenneth. I need a video player to see what's recorded on it.`,
    },
    {
        itemId: 'trevorsDiaryVol1',
        transcript: `Trevor's Diary Vol. 1

Nov. 24, 1967

Eleven days have past since arriving on this estate. How did I end up like this? A guy in a lab coat came with a plate of skimpy meal and said to me, "Sorry to put you through this, but it's for security reasons." That's when it hit me. It all makes sense now.

There are only two people that know the secret of this mansion, Sir Spencer and myself. If they kill me, Sir Spencer will be the only person that knows the secret.

But for what purpose? It doesn't matter now. It's too dangerous here. My family... I hope they are all right.

I've decided to escape...
Jessica, Lisa, I pray you are safe.


Nov. 26, 1967

How could I be careless? I lost my favorite lighter - the one Jessica gave me for my birthday. Now it's going to be that much harder to get out this dark place.

Nov. 13th, the date when my fate was sealed. My aunt was hospitalized just three days before that. Jessica and Lisa said that they were going to visit her. I wish I could be there with them.

But wait, even as I'm writing my memory is coming back to me more vividly. Just before I passed out, I remember the men in the lab coats said something like, "Most likely your family is already..." I pray for their safety.


Nov. 27, 1967

Somehow I managed to get out that room. But getting out of this mansion won't be as easy. I have to get past all the booby-traps. Tiger Eyes, Gold Emblem... I have to try and remember for my own sake....`,
    },
    {
        itemId: 'trevorsDiaryVol2',
        transcript: `Trevor's Diary Vol. 2

There's something handwritten. It's not dated

Nothing's changed.
I never thought that this room I designed as an experiment would pay off like this.

I can hide here safely for a while, because nobody knows about the secret behind this painting.
Not even Sir Spencer.

Painting of a mansion... In the back of the art room.`,
    },
    {
        itemId: 'trevorsDiaryVol3',
        transcript: `Trevor's Diary Vol. 3

Nov. 29, 1967

I can't get out. I have tried every possible way to escape but only to be faced with the reality that I'm trapped.

I've been everywhere. The laboratory with the large glass tubes filled with formaldehyde and those dark, wet and eerie caves... What can I do?

At first I didn't want to believe my eyes. But that familiar high-heeled shoe in the corridor... It was like reflex. One name came to my mind, Jessica!

I don't want to believe they share the same fate as me.
No! I can't give up hope. I have to hope they're alive.


Nov. 30, 1967

I haven't had anything to eat or drink for the past few days. I feel like I'm going crazy.

Why is this happening to me? Why do I have to die like this?
I was too obsessed with designing this ghastly mansion. I should have known better.


Nov. 31, 1967

It was a dark and damp underground tunnel. And another dead end. But even in the darkness something caught my eye.

Carefully, I lit the last match, I had to see what it was.

A grave! But deeply engraved into the stone was my name!

"George Trevor"

At that instant, it all became clear to me. Those bastards knew from the beginning that I'd die here and I fell right into their trap.

But it's too late now. I'm losing it. Everything is becoming so far away. Jessica... Lisa... Forgive me.

Because of my ego, I got both of you involved in this whole damn conspiracy. Forgive me. May God justify my death in exchange for your safety.

George Trevor`,
    },
    {
        itemId: 'crumpledMemo',
        transcript: `A crumpled memo

Today, Sir Spencer told me to hide something where no one could find it.

Well, I had this idea. I figured if I could somehow have it protected by a dangerous animal like the vicious canine that lives here, no one would be able to get near it!

As far as I can tell, the mutt is always hanging around the second floor balcony on the west side of the terrace, and he ought to come running at the sound of a dog whistle.

This is where you come in. The thing is, I reckon you're the only person that can get near that damn dog without risking a serious mauling.

Which means only you can put this collar on him. The object that Sir Spencer wants hidden is concealed inside.

You're the only person I can trust with this. Of course, you'll get something out of it as well. Remember that certain item that you've always wanted to get hold of?

Well, in exchange for your services, I just might be able to get it for you. This could work out well for both of us...`,
    },
    {
        itemId: 'botanyBook',
        transcript: `BOTANY
-Uses of Medicinal Herbs-

It is a well-known fact that there exist many plants that are credited with medicinal healing powers. Since ancient times, mankind has been healing wounds and diseases using various plants.

In this book, we will sample three herbs that are native of the Arklay Mountains and briefly outline each of their medicinal qualities. Each herb has a distinct color and a distinct medicinal quality.

The green herb recovers physical strength. The blue herb neutralizes natural toxins. However, the red herb has no real effect by itself. We have found that mixing green and red herbs results in a magnified effect.

We will outline the effects of red herbs when mixed with other herbs when we have more data. Meanwhile feel free to experiment on your own, for true knowledge is best acquired through own experience.`,
    },
    {
        itemId: 'bodyDisposal',
        transcript: `Special instructions when disposing of dead bodies.

We have new information regarding those "beings". They may appear to be dead but in fact they are able to come back to life. However, there are ways to prevent them from becoming active again.

Currently there are two known methods to cease their resurrection.

INCINERATION
DESTRUCTION OF THE HEAD

If further methods are discovered, they will be notified immediately.

Meanwhile to those of you who still have the will to live, oil has been placed on the first floor of the mansion. Take as much as you need.

You'll need something to light it with, which you'll need to find by yourself.`,
    },
    {
        itemId: 'keepersDiary',
        transcript: `Keeper's Diary

May 9, 1998

Played poker tonight with Scott and Alias from Security, and Steve from Research. Steve was the big winner, but I think he was cheating. Scumbag.


May 10, 1998

One of the higher-ups assigned me to take care of a new creature. It looks like a skinned gorilla. Feeding instructions were to give it live animals.

When I threw in a pig, the creature seemed to play with it... tearing off the pig's legs and pulling out the guts before it actually started eating.


May 11, 1998

At around 5 A.M., Scott woke me up. Scared the shit out me, too. He was wearing a protective suit. He handed me another one and told me to put it on. Said there'd been an accident in the basement lab.

I just knew something like this would happen. Those bastards in Research never sleep, even on holiday.


May 12, 1998

I've been wearing the damn space suit since yesterday. My skin's getting grimy and feels itchy all over. The goddamn dogs have been looking at me funny, so I decided not to feed them today. Screw 'em.


May 13, 1998

Went to the Infirmary because my back is all swollen and feels itchy. They put a big bandage on it and told me I didn't need to wear the suit anymore. All I wanna do is sleep.


May 14, 1998

Found another big blister on my foot this morning. I ended up dragging my foot all the way to the dog's pen. They were quiet all day, which is weird.

Then I realized some of them had escaped. Maybe this is their way of getting back at me for not feeding them the last three days. If anybody finds out, I'll have my head handed to me.


May 16, 1998

Rumors going around that a researcher who tried to escape the estate last night was shot. My entire body feels hot and itchy and I'm sweating all the time now.

I scratched the swelling on my arm and a piece of rotten flesh just dropped off. What the hell's happening to me?


May 19, 1998

Fever gone but itchy. Today hungry and eat doggie food.


May 21, 1998

Itchy itchy Scott came ugly face so killed him. Tasty.


4 / / Itchy. Tasty.`,
    },
    {
        itemId: 'researchersWill',
        transcript: `Researcher's Will

A letter is slipped inside.

June 3, 1998

My dearest Alma,

Let me first apologize for not being able to call you. A man wearing sunglasses didn't permit any phone calls. Sorry Alma.

I sit here trying to think of where to begin, of how to explain in a few simple words all that's happened in my life since we last spoke, and already I fail. I hope this letter finds you well, and that you'll forgive the tangents of my pen; this isn't easy for me.

Even as I write, I can feel the simplest of concepts slipping away, lost to feelings of despair and confusion -- but I have to tell you what's in my heart before I can rest. Alma, please believe that what I'm telling you is the truth. The entire story would take hours for me to tell you, and time is short, so accept these things as fact: last month there was an accident in the lab and the virus we were studying leaked.

All my colleagues who were infected are dead or dying, and the nature of the disease is such that those still living have lost their senses. This virus robs its victims of their humanity, forcing them in their sickness to seek out and destroy life. Even as I write these words, I can hear them, pressing against my door like mindless, hungry animals.

Alma, I have tried to survive only to see you again. But my efforts only delayed the inevitable; I am infected, and there is no cure for what will follow - except to end my life before I lose the only thing that separates me from them.

My love for you.

In an hour I'll have entered my eternal sleep where there is peace. Please understand. Please know that I'm sorry.

Martin Crackhorn`,
    },
    {
        itemId: 'mailToChiefOfSecurity',
        transcript: `Mail to the Chief of Security

CONFIDENTIAL
Attn: Chief of Security
Date: July 22, 1998 2:13

X Day is drawing upon us. Execute the following procedures within one week. Prompt actions are demanded.

Lure S.T.A.R.S. to the estate, and obtain B.O.W.'s raw combat data against S.T.A.R.S.

Collect two embryos of each mutated specimens as samples, excluding the Tyrant. Dispose of the Tyrant.

Ensure complete disposal of the Arklay Laboratory including all personnel and test animals. Disguise their deaths as an accident.
When the above procedures are executed, report to headquarters for further instructions.

If for some reason you are unable to execute the procedure by the deadline, report immediately. In case of emergency situations, report directly to the extension number 5691.

Good luck.
Umbrella Headquarters,
Umbrella Inc.`,
    },
    {
        itemId: 'suicideNote',
        transcript: `Suicide Note

June 22, 1998

I had to do it. We ran from those things - helping each other to survive. But Robert started to show the symptoms. I had to do it. Those damn things are pure evil.

There was no other way. He would have done the same if it were the other way around. After I put him out of his misery I had to just put him in the bathroom. Now I'm probably the last one...

How could this happen? I'll never forgive myself for being part of this project. Eventually I'll get what's coming to me, though. There's no way to escape from this nut house, it's just a matter of time now.

Everything is set. All I need is a little courage to get it done. Knowing that I'll leave many things undone is regret beyond words.

But, this is better than just waiting to turn into one of them. Please understand and at least let me end my life as a person.

There's a message on the back.

Linda, please forgive me...`,
    },
    {
        itemId: 'plant42Report',
        transcript: `PLANT 42 REPORT

Four days have passed since the accident. The plant at Point 42 is growing at an amazing rate.

Although there are many unknown aspects about this plant, we know that in comparison with the other group of plants, the T-Virus has had a substantially stronger affect on this one.

The T-Virus has drastically morphed its host's anatomy as well as its size. Looking at its current state, it's difficult to imagine its original appearance. Nowhere on Earth will you find anything like it.

We've also found that PLANT 42 has two main sources of acquiring its necessary nutrients. One source is through its root. Somehow it has rooted itself down into the basement.

Immediately after the accident, a scientist went mad and destroyed the Aqua Ring. Ever since, the basement has been like a pool. There is a high possibility that it's one of the chemicals in the water that's promoting the PLANT 42's rapid growth.

However, we have yet to determine the specific chemical.

A bulb-like body of the PLANT 42 has been sighted hanging from the ceiling of the first floor. We are sure that it used the air ducts to reach the first floor. Numerous long tentacle-like vines are protruding from the bulb.

We believe the vines are the second means of acquiring its nutrients. When the PLANT 42 senses prey, it uses the tentacle-like vines to capture its prey. After doing so, suckers on the vine drain the prey of its blood.

We've also noticed that it has some intelligence. When it captures its prey or when it's inactive, the vines twine around the door to stop possible intruders.

Unfortunately, several of our scientists have already fallen victim to this PLANT 42. When we heard the stories from the survivors, they all observed one thing in common:

When the uniform petal-like flaps open and reveal its vital internals, it has a tendency to become more aggressive.

One witness reported that it was as if it was trying to protect itself. Why it behaves the way it does is still unknown.

May 21, 1998
Henry Sarton`,
    },
    {
        itemId: 'organicChemistryLabExperiment',
        transcript: `Organic Chemistry Lab Experiment

The similarities in the cellular characteristics of the rapidly growing plant infected by the Tyrant Virus have been reported in previous papers. However, while repeating these experiments, an interesting new fact became clear.

We learned that a chemical in the UMB family, UMB No. 20, contains a compound that is toxic to the cells of the plant.

We have given UMB No. 20 a new name: V-JOLT. If calculations prove correct, when V-JOLT is applied directly to the root of the plant, the entire plant should be dead within 5 seconds.

The V-JOLT can be made by simply mixing the VP and UMB chemicals in a specific ratio. However, extra care must be taken when handling these UMB chemicals. They have been known to generate toxic gases if mishandled.

The characteristics of each UMB chemical are as follows:

UMB	No. 3 red
Yellow-6	yellow
UMB No. 7	green
UMB No. 10	orange
VP-017	blue
V-JOLT	dark brown`,
    },
    {
        itemId: 'familyPictureAndNotes',
        transcript: `A family picture and notes



There's something written on the back.

Nov. 10, 1967
-Progenitor virus administered

Jessica
Administered virus: Type-A
Plasmolyzing of tissue during cell activation.

Virus fusion: Negative

Action: Disposed


Lisa

Administered virus: Type-B
Plasmolyzing of tissue during cell activation.

Virus fusion: Positive but delayed fusion.

Body modification: Observed constant results.

Status: Continue protective observation.


George
Action: Terminated (Nov. 30, 1967)


There's a journal left by someone.

Nov. 14, 1967

I feel dizzy after that shot they gave me. I don't see Mom. Where did they take her?
She promised that we would escape together. Did she escape alone and leave me behind?


Nov. 15, 1967

I found Mom. We ate together. I was very happy.

But she was a fake. Not my real Mom. Same face but different inside.

Have to find Mom. Have to give face back to mother.

I got Mom's face back.
Nobody can have my Mom except me. I attach her face to me so she doesn't go away.
Because Mom sad when I meet her without her face.


Nov. 17, 19 7

from inside box, scent of mommy. maybe true mother there.
stone box hard. It hurt. steel rope in the way.
can't see mother becuz 4 stones.


19

dadddy atached first
momm atached scond

iNside reD and sLimy
whiTe and haRd

not true moM wheRe

dunno dadd
found mum again

whne atachd momMy
she moved no more
she screaming

why?
Jst want to b with her


4

mom
where?

I mis yuo


It's a letter.

To my Lisa,

Day by day I can feel my consciousness drifting further and further away.
The shots given to me by men in white clothes made some of mommy's itching go away. Today they gave me another shot saying it was "nutrition".

When they give me the shots mommy can think straight, but mommy's shocked and sad because mommy's unable to think of you all the time.

Mommy's afraid. Afraid of forgetting everything, especially the memories of you and daddy... What your faces look like, how we used to be together... They're all starting to disappear into somewhere dark in my mind.

Oh Lisa, I wish I could touch your face and hold you in my arms right now, so that I can hold on to our wonderful memories of you and daddy.

Lisa we can't stay here any longer. We have to escape!

Listen to me Lisa. Our chance to escape is the next time we go to that lab together. We'll both pretend that we are both unconscious and when that man in white clothes is off guard that will be our chance.

When we're on the outside, let's look for daddy together. Okay sweetie? Be strong, Lisa.

Nov. 13, 1967
Jessica Trevor`,
    },
    {
        itemId: 'barrysPhotograph',
        transcript: `Barry's Photograph



This is the photograph that fell out of Barry's shirt just before he fell into the pit. There's something written on the back.

We love you daddy
From your sweet daughters,

Moira and Polly`,
    },
    {
        itemId: 'researchersLetter',
        transcript: `Researcher's letter

June 8th, 1998
My dearest Ada,

By the time you read this letter, I will no longer be the person you once knew. The results of my test came out today, and as I suspected, it came out positive.

I feel like I am teetering on the edge of reason just thinking about my impending doom. I would give anything not to have to become one of them.

As far as I know, you are not infected. I sincerely hope things do not reach such a desperate pass, but if it has turned out that you are now the last person remaining alive, I want you to get the material from the Visual Data Room.

Then, activate the Self-Destruct System in the Power Room, and escape from here. Please do everything in your power to make this whole accident public.

If everything is still running normally, you should be able to release all the locks using the Security System.

I have set up the terminal in the small security room so that you can log in to the system using my name and your name as the password.

You will need another password to release the lock of the door in Basement Level Two where the Visual Data Room is located.

As a safety measure I have coded that password into an X-ray picture; a roentgenogram. I know you, and I'm sure you will be able to work it out without any trouble.

There is just one more thing... and it is my last request. I hope you never have to lay eyes on me in this state, but if you do happen to run into me in my hideous form, I beg you to put me out of my misery. I hope you understand.

Thank you, Ada.
Yours truly,

John`,
    },
    {
        itemId: 'vAct',
        transcript: `V-ACT
Researcher's note

There is now evidence that when the host loses consciousness, the body goes into a dormant state. During this time the virus becomes active and rapidly transforms and reconstructs the basic composition of the body.

The host eventually mutated into a humanoid creature. (We call them V-ACTs)

Its speed and amazing muscular development are particularly noteworthy. After transformation, it becomes more agile and aggressive.

Already four of our researchers have died from trying to feed it, turning the place into an instant blood bath. (Ever since this tragic and barbaric accident, we have decided to call its kind "Crimson Heads")

That dangerous and precious prototype specimen can't be left there. We have to figure out a way to deal with it. Termination is definitely not an option.

We finally decided to freeze the specimen and confine the body inside the basement of the backyard cemetery.`,
    },
    {
        itemId: 'fax',
        transcript: `FAX

To: Sanitation Division
Attn: Manager of Sanitation
From: Raccoon Disaster Contingency Committee

The contents of this fax are confidential and intended for the named addressee only. Any copying, or disclosure of the contents of this fax to any third party is strictly forbidden by the sender.

After reading the contents of this fax, it must be destroyed immediately.

We expect significant increase in the damage done by the recent T-Virus' outbreak than initially estimated. There are several concerns.

First concern
More than half of the researchers have been infected by the T-Virus and died. It has also been reported that almost all of the survivors of this accident are starting to show symptoms of the T-Virus infection.

Second concern
Our Secret Security Patrol Team has also been completely eradicated. Therefore, our most secret research is in danger of public disclosure. Quick actions are demanded to prevent mass media coverage.

Third concern
There is a high possibility that most of the specimens are running loose inside the compound. We expect many casualties to follow.

However yet unfortunate, these casualties underscore the success of our research results. Actions must be taken to prevent our research results from being made public.

We suspect the first official intervention will come from the State Police and S.T.A.R.S. We strongly recommend taking measures against them first.`,
    },
    {
        itemId: 'securityProtocols',
        transcript: `SECURITY PROTOCOLS

LEVEL ONE

Heliport/ For executive use only. This restriction does not apply in the event of an emergency.


BASEMENT LEVEL ONE

Passage to Heliport/ Entry is prohibited unless accompanied by a Consultant Researcher or the Chief of Security. Unauthorized persons entering the heliport will be shot on site.

Elevator/ The elevator stops during emergencies.


BASEMENT LEVEL TWO

Visual Data Room/ For use by the Special Research Division only. All other access to the Visual Data Room must be cleared with Keith Arving, Room Manager.


BASEMENT LEVEL THREE

Prison/ Sanitation Division controls the use of the prison. At least one Consultant Researcher (E. Smith, S. Ross, A. Wesker) must be present if viral use is authorized.

Triple Lock Door/ Entry into the room is limited to the sole person who deactivates the lock with all of the Pass Codes. Accessing the exclusive Output Terminals located in each section of the Senior Researchers deactivates the lock.

Power Room/ In this room nitro compound is used as the primary fuel source of power. Access is limited to Headquarters Supervisors. This restriction may not apply to Consultant Researchers with special authorization.

Pass Code Output Terminals/ Use and access of the Output Terminals is limited to authorized Senior Researchers.


BASEMENT LEVEL FOUR

Regarding the progress of "Tyrant" after the administration of T- Virus...
(Illegible hereafter...)`,
    },
    {
        itemId: 'observationNote',
        transcript: `Observation Note

The discovery of the G-Virus was in fact 21 years after the administration of the progenitor virus.

The "Prototype Parasite" which we had delivered from a laboratory in France was administered to the sample specimen. The sample specimen took in the parasite without showing any signs of adverse reaction.

The lack of any reaction was an unsolved mystery. But now everything is clear to me now.

The "Prototype Parasite" was incubating in the sample specimen's body for 21 years. Then from that incubating state the prototype suddenly mutated. ("Evolved" may be a more appropriate word to describe it.)

This observation gave me more insight in my research. Through further modification and testing, I was able to derive a method to create the "G" that surpasses the performance of the "T".

This was the breakthrough that would change the future of the B.O.W.'s history.

I can't wait to see the look on Alexia's annoying face when I finally announce my research. But unfortunately I'll have to wait a few more years to completely verify my findings.

William Birkin`,
    },
] as const;
