export type RunesTypes = {
  unit: {
    id: number;
    weight: number;
  };
  ba: {
    id: number;
    weight: number;
  };
  pa?: {
    id: number;
    weight: number;
  } | null;
  ra?: {
    id: number;
    weight: number;
  } | null;
};

type Rune = {
  name: string;
  runesTypes: RunesTypes;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const runes: Rune[] = [
  {
    name: 'Vi',
    runesTypes: {
      unit: {
        id: 0,
        weight: 0.25,
      },
      ba: {
        id: 1523,
        weight: 0.75,
      },
      pa: {
        id: 1548,
        weight: 2.5,
      },
      ra: {
        id: 1554,
        weight: 7.5,
      },
    },
  },
  {
    name: 'Fo',
    runesTypes: {
      unit: {
        id: 0,
        weight: 1,
      },
      ba: {
        id: 1519,
        weight: 1,
      },
      pa: {
        id: 1545,
        weight: 3,
      },
      ra: {
        id: 1551,
        weight: 10,
      },
    },
  },
  {
    name: 'Ine',
    runesTypes: {
      unit: {
        id: 0,
        weight: 1,
      },
      ba: {
        id: 1522,
        weight: 1,
      },
      pa: {
        id: 1547,
        weight: 3,
      },
      ra: {
        id: 1553,
        weight: 10,
      },
    },
  },
  {
    name: 'Cha',
    runesTypes: {
      unit: {
        id: 0,
        weight: 1,
      },
      ba: {
        id: 1525,
        weight: 1,
      },
      pa: {
        id: 1550,
        weight: 3,
      },
      ra: {
        id: 1556,
        weight: 10,
      },
    },
  },
  {
    name: 'Age',
    runesTypes: {
      unit: {
        id: 0,
        weight: 1,
      },
      ba: {
        id: 1524,
        weight: 1,
      },
      pa: {
        id: 1549,
        weight: 3,
      },
      ra: {
        id: 1555,
        weight: 10,
      },
    },
  },
  {
    name: 'Ini',
    runesTypes: {
      unit: {
        id: 0,
        weight: 0.1,
      },
      ba: {
        id: 7448,
        weight: 1,
      },
      pa: {
        id: 7449,
        weight: 3,
      },
      ra: {
        id: 7450,
        weight: 10,
      },
    },
  },
  {
    name: 'Sa',
    runesTypes: {
      unit: {
        id: 0,
        weight: 1,
      },
      ba: {
        id: 1521,
        weight: 3,
      },
      pa: {
        id: 1546,
        weight: 9,
      },
      ra: {
        id: 1552,
        weight: 30,
      },
    },
  },
  {
    name: 'Prospe',
    runesTypes: {
      unit: {
        id: 0,
        weight: 3,
      },
      ba: {
        id: 7451,
        weight: 3,
      },
      pa: {
        id: 10662,
        weight: 9,
      },
      ra: null,
    },
  },
  {
    name: 'Pui',
    runesTypes: {
      unit: {
        id: 0,
        weight: 3,
      },
      ba: {
        id: 7436,
        weight: 2,
      },
      pa: {
        id: 10618,
        weight: 6,
      },
      ra: {
        id: 10619,
        weight: 20,
      },
    },
  },
  {
    name: 'Ré Feu',
    runesTypes: {
      unit: {
        id: 0,
        weight: 2,
      },
      ba: {
        id: 7452,
        weight: 2,
      },
      pa: {
        id: 18723,
        weight: 6,
      },
    },
  },
  {
    name: 'Ré Terre',
    runesTypes: {
      unit: {
        id: 0,
        weight: 2,
      },
      ba: {
        id: 7455,
        weight: 2,
      },
      pa: {
        id: 18725,
        weight: 6,
      },
    },
  },
  {
    name: 'Ré Air',
    runesTypes: {
      unit: {
        id: 0,
        weight: 2,
      },
      ba: {
        id: 7453,
        weight: 2,
      },
      pa: {
        id: 18717,
        weight: 6,
      },
    },
  },
  {
    name: 'Ré Eau',
    runesTypes: {
      unit: {
        id: 0,
        weight: 2,
      },
      ba: {
        id: 7454,
        weight: 2,
      },
      pa: {
        id: 18719,
        weight: 6,
      },
    },
  },
  {
    name: 'Ré Neutre',
    runesTypes: {
      unit: {
        id: 0,
        weight: 2,
      },
      ba: {
        id: 7456,
        weight: 2,
      },
      pa: {
        id: 18721,
        weight: 6,
      },
    },
  },
  {
    name: 'Ré Per Feu',
    runesTypes: {
      unit: {
        id: 0,
        weight: 6,
      },
      ba: {
        id: 7457,
        weight: 6,
      },
    },
  },
  {
    name: 'Ré Per Air',
    runesTypes: {
      unit: {
        id: 0,
        weight: 6,
      },
      ba: {
        id: 7458,
        weight: 6,
      },
    },
  },
  {
    name: 'Ré Per Terre',
    runesTypes: {
      unit: {
        id: 0,
        weight: 6,
      },
      ba: {
        id: 7459,
        weight: 6,
      },
    },
  },
  {
    name: 'Ré Per Neutre',
    runesTypes: {
      unit: {
        id: 0,
        weight: 6,
      },
      ba: {
        id: 7460,
        weight: 6,
      },
    },
  },
  {
    name: 'Ré Per Eau',
    runesTypes: {
      unit: {
        id: 0,
        weight: 6,
      },
      ba: {
        id: 7560,
        weight: 6,
      },
    },
  },
  {
    name: 'Ré Pou',
    runesTypes: {
      unit: {
        id: 0,
        weight: 2,
      },
      ba: {
        id: 11651,
        weight: 2,
      },
      pa: {
        id: 11652,
        weight: 6,
      },
    },
  },
  {
    name: 'Ré Cri',
    runesTypes: {
      unit: {
        id: 0,
        weight: 2,
      },
      ba: {
        id: 11655,
        weight: 2,
      },
      pa: {
        id: 11656,
        weight: 6,
      },
    },
  },
  {
    name: 'Ré Pa',
    runesTypes: {
      unit: {
        id: 0,
        weight: 7,
      },
      ba: {
        id: 11641,
        weight: 7,
      },
      pa: {
        id: 11642,
        weight: 21,
      },
    },
  },
  {
    name: 'Ré Pmé',
    runesTypes: {
      unit: {
        id: 0,
        weight: 7,
      },
      ba: {
        id: 11643,
        weight: 7,
      },
      pa: {
        id: 11644,
        weight: 21,
      },
    },
  },
  {
    name: 'Rune de chasse',
    runesTypes: {
      unit: {
        id: 0,
        weight: 5,
      },
      ba: {
        id: 10057,
        weight: 5,
      },
    },
  },
  {
    name: 'Pod',
    runesTypes: {
      unit: {
        id: 0,
        weight: 0.25,
      },
      ba: {
        id: 7443,
        weight: 2.5,
      },
      pa: {
        id: 7444,
        weight: 7.5,
      },
      ra: {
        id: 7445,
        weight: 25,
      },
    },
  },
  {
    name: 'Pi Per',
    runesTypes: {
      unit: {
        id: 0,
        weight: 2,
      },
      ba: {
        id: 7447,
        weight: 2,
      },
      pa: {
        id: 10615,
        weight: 6,
      },
      ra: {
        id: 10616,
        weight: 9,
      },
    },
  },
  {
    name: 'Pi',
    runesTypes: {
      unit: {
        id: 0,
        weight: 15,
      },
      ba: {
        id: 7446,
        weight: 15,
      },
      pa: {
        id: 10613,
        weight: 45,
      },
    },
  },
  {
    name: 'Tac',
    runesTypes: {
      unit: {
        id: 0,
        weight: 4,
      },
      ba: {
        id: 11639,
        weight: 4,
      },
      pa: {
        id: 11640,
        weight: 12,
      },
    },
  },
  {
    name: 'Fui',
    runesTypes: {
      unit: {
        id: 0,
        weight: 4,
      },
      ba: {
        id: 11637,
        weight: 4,
      },
      pa: {
        id: 11638,
        weight: 12,
      },
    },
  },
  {
    name: 'Ret Pa',
    runesTypes: {
      unit: {
        id: 0,
        weight: 7,
      },
      ba: {
        id: 11645,
        weight: 7,
      },
      pa: {
        id: 11646,
        weight: 21,
      },
    },
  },
  {
    name: 'Ret Pme',
    runesTypes: {
      unit: {
        id: 0,
        weight: 7,
      },
      ba: {
        id: 11647,
        weight: 7,
      },
      pa: {
        id: 11648,
        weight: 21,
      },
    },
  },
  {
    name: 'So',
    runesTypes: {
      unit: {
        id: 0,
        weight: 10,
      },
      ba: {
        id: 7434,
        weight: 10,
      },
      pa: {
        id: 18715,
        weight: 30,
      },
    },
  },
  {
    name: 'Cri',
    runesTypes: {
      unit: {
        id: 0,
        weight: 30,
      },
      ba: {
        id: 7433,
        weight: 30,
      },
    },
  },
  {
    name: 'Invo',
    runesTypes: {
      unit: {
        id: 0,
        weight: 30,
      },
      ba: {
        id: 7442,
        weight: 30,
      },
    },
  },
  {
    name: 'Do Ren',
    runesTypes: {
      unit: {
        id: 0,
        weight: 30,
      },
      ba: {
        id: 7437,
        weight: 30,
      },
    },
  },
  {
    name: 'Po',
    runesTypes: {
      unit: {
        id: 0,
        weight: 51,
      },
      ba: {
        id: 7438,
        weight: 51,
      },
    },
  },
  {
    name: 'Ga Pme',
    runesTypes: {
      unit: {
        id: 0,
        weight: 90,
      },
      ba: {
        id: 1558,
        weight: 90,
      },
    },
  },
  {
    name: 'Ga Pa',
    runesTypes: {
      unit: {
        id: 0,
        weight: 100,
      },
      ba: {
        id: 1557,
        weight: 100,
      },
    },
  },
  {
    name: 'Do',
    runesTypes: {
      unit: {
        id: 0,
        weight: 5,
      },
      ba: {
        id: 7435,
        weight: 5,
      },
    },
  },
  {
    name: 'Do Terre',
    runesTypes: {
      unit: {
        id: 0,
        weight: 5,
      },
      ba: {
        id: 11657,
        weight: 5,
      },
      pa: {
        id: 11658,
        weight: 15,
      },
    },
  },
  {
    name: 'Do Neutre',
    runesTypes: {
      unit: {
        id: 0,
        weight: 5,
      },
      ba: {
        id: 11665,
        weight: 5,
      },
      pa: {
        id: 11666,
        weight: 15,
      },
    },
  },
  {
    name: 'Do Feu',
    runesTypes: {
      unit: {
        id: 0,
        weight: 5,
      },
      ba: {
        id: 11659,
        weight: 5,
      },
      pa: {
        id: 11660,
        weight: 15,
      },
    },
  },
  {
    name: 'Do Feu',
    runesTypes: {
      unit: {
        id: 0,
        weight: 5,
      },
      ba: {
        id: 11659,
        weight: 5,
      },
      pa: {
        id: 11660,
        weight: 15,
      },
    },
  },
  {
    name: 'Do Air',
    runesTypes: {
      unit: {
        id: 0,
        weight: 5,
      },
      ba: {
        id: 11663,
        weight: 5,
      },
      pa: {
        id: 11664,
        weight: 15,
      },
    },
  },
  {
    name: 'Do Eau',
    runesTypes: {
      unit: {
        id: 0,
        weight: 5,
      },
      ba: {
        id: 11661,
        weight: 5,
      },
      pa: {
        id: 11662,
        weight: 15,
      },
    },
  },
  {
    name: 'Do Pou',
    runesTypes: {
      unit: {
        id: 0,
        weight: 5,
      },
      ba: {
        id: 11649,
        weight: 5,
      },
      pa: {
        id: 11650,
        weight: 15,
      },
    },
  },
  {
    name: 'Do Cri',
    runesTypes: {
      unit: {
        id: 0,
        weight: 5,
      },
      ba: {
        id: 11653,
        weight: 5,
      },
      pa: {
        id: 11654,
        weight: 15,
      },
    },
  },
];
