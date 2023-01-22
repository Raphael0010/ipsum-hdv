export type RunesTypes = {
  unit: {
    id: number;
    weight: number;
  };
  ba: {
    id: number;
    weight: number;
  };
  pa: {
    id: number;
    weight: number;
  } | null;
  ra: {
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
];
