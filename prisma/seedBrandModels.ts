import { PrismaClient, Prisma } from "../src/generated/prisma";

const prisma = new PrismaClient();

const brandModelData: Prisma.BrandModelCreateInput[] = [
  {
    "name": "A3",
    "brand": {
      "connect": {
        "name": "Audi"
      }
    }
  },
  {
    "name": "A4",
    "brand": {
      "connect": {
        "name": "Audi"
      }
    }
  },
  {
    "name": "A5",
    "brand": {
      "connect": {
        "name": "Audi"
      }
    }
  },
  {
    "name": "Q3",
    "brand": {
      "connect": {
        "name": "Audi"
      }
    }
  },
  {
    "name": "Q5",
    "brand": {
      "connect": {
        "name": "Audi"
      }
    }
  },
  {
    "name": "Q7",
    "brand": {
      "connect": {
        "name": "Audi"
      }
    }
  },
  {
    "name": "TT",
    "brand": {
      "connect": {
        "name": "Audi"
      }
    }
  },
  {
    "name": "e-tron",
    "brand": {
      "connect": {
        "name": "Audi"
      }
    }
  },
  {
    "name": "RS3",
    "brand": {
      "connect": {
        "name": "Audi"
      }
    }
  },
  {
    "name": "S5",
    "brand": {
      "connect": {
        "name": "Audi"
      }
    }
  },
  {
    "name": "3 Series",
    "brand": {
      "connect": {
        "name": "BMW"
      }
    }
  },
  {
    "name": "5 Series",
    "brand": {
      "connect": {
        "name": "BMW"
      }
    }
  },
  {
    "name": "X1",
    "brand": {
      "connect": {
        "name": "BMW"
      }
    }
  },
  {
    "name": "X3",
    "brand": {
      "connect": {
        "name": "BMW"
      }
    }
  },
  {
    "name": "X5",
    "brand": {
      "connect": {
        "name": "BMW"
      }
    }
  },
  {
    "name": "X6",
    "brand": {
      "connect": {
        "name": "BMW"
      }
    }
  },
  {
    "name": "Z4",
    "brand": {
      "connect": {
        "name": "BMW"
      }
    }
  },
  {
    "name": "i3",
    "brand": {
      "connect": {
        "name": "BMW"
      }
    }
  },
  {
    "name": "i8",
    "brand": {
      "connect": {
        "name": "BMW"
      }
    }
  },
  {
    "name": "7 Series",
    "brand": {
      "connect": {
        "name": "BMW"
      }
    }
  },
  {
    "name": "Atto 3",
    "brand": {
      "connect": {
        "name": "BYD"
      }
    }
  },
  {
    "name": "Dolphin",
    "brand": {
      "connect": {
        "name": "BYD"
      }
    }
  },
  {
    "name": "Seal",
    "brand": {
      "connect": {
        "name": "BYD"
      }
    }
  },
  {
    "name": "Tang",
    "brand": {
      "connect": {
        "name": "BYD"
      }
    }
  },
  {
    "name": "Han",
    "brand": {
      "connect": {
        "name": "BYD"
      }
    }
  },
  {
    "name": "Yuan Plus",
    "brand": {
      "connect": {
        "name": "BYD"
      }
    }
  },
  {
    "name": "Song Pro",
    "brand": {
      "connect": {
        "name": "BYD"
      }
    }
  },
  {
    "name": "Qin",
    "brand": {
      "connect": {
        "name": "BYD"
      }
    }
  },
  {
    "name": "e6",
    "brand": {
      "connect": {
        "name": "BYD"
      }
    }
  },
  {
    "name": "Destroyer 05",
    "brand": {
      "connect": {
        "name": "BYD"
      }
    }
  },
  {
    "name": "C3",
    "brand": {
      "connect": {
        "name": "Citroen"
      }
    }
  },
  {
    "name": "C4",
    "brand": {
      "connect": {
        "name": "Citroen"
      }
    }
  },
  {
    "name": "C5 Aircross",
    "brand": {
      "connect": {
        "name": "Citroen"
      }
    }
  },
  {
    "name": "Berlingo",
    "brand": {
      "connect": {
        "name": "Citroen"
      }
    }
  },
  {
    "name": "C1",
    "brand": {
      "connect": {
        "name": "Citroen"
      }
    }
  },
  {
    "name": "DS3",
    "brand": {
      "connect": {
        "name": "Citroen"
      }
    }
  },
  {
    "name": "DS4",
    "brand": {
      "connect": {
        "name": "Citroen"
      }
    }
  },
  {
    "name": "C6",
    "brand": {
      "connect": {
        "name": "Citroen"
      }
    }
  },
  {
    "name": "C-Elysee",
    "brand": {
      "connect": {
        "name": "Citroen"
      }
    }
  },
  {
    "name": "Grand C4 Picasso",
    "brand": {
      "connect": {
        "name": "Citroen"
      }
    }
  },
  {
    "name": "Focus",
    "brand": {
      "connect": {
        "name": "Ford"
      }
    }
  },
  {
    "name": "Fiesta",
    "brand": {
      "connect": {
        "name": "Ford"
      }
    }
  },
  {
    "name": "Ranger",
    "brand": {
      "connect": {
        "name": "Ford"
      }
    }
  },
  {
    "name": "Everest",
    "brand": {
      "connect": {
        "name": "Ford"
      }
    }
  },
  {
    "name": "Escape",
    "brand": {
      "connect": {
        "name": "Ford"
      }
    }
  },
  {
    "name": "Mustang",
    "brand": {
      "connect": {
        "name": "Ford"
      }
    }
  },
  {
    "name": "Edge",
    "brand": {
      "connect": {
        "name": "Ford"
      }
    }
  },
  {
    "name": "Explorer",
    "brand": {
      "connect": {
        "name": "Ford"
      }
    }
  },
  {
    "name": "EcoSport",
    "brand": {
      "connect": {
        "name": "Ford"
      }
    }
  },
  {
    "name": "Transit",
    "brand": {
      "connect": {
        "name": "Ford"
      }
    }
  },
  {
    "name": "G70",
    "brand": {
      "connect": {
        "name": "Genesis"
      }
    }
  },
  {
    "name": "G80",
    "brand": {
      "connect": {
        "name": "Genesis"
      }
    }
  },
  {
    "name": "G90",
    "brand": {
      "connect": {
        "name": "Genesis"
      }
    }
  },
  {
    "name": "GV60",
    "brand": {
      "connect": {
        "name": "Genesis"
      }
    }
  },
  {
    "name": "GV70",
    "brand": {
      "connect": {
        "name": "Genesis"
      }
    }
  },
  {
    "name": "GV80",
    "brand": {
      "connect": {
        "name": "Genesis"
      }
    }
  },
  {
    "name": "Essentia",
    "brand": {
      "connect": {
        "name": "Genesis"
      }
    }
  },
  {
    "name": "Mint",
    "brand": {
      "connect": {
        "name": "Genesis"
      }
    }
  },
  {
    "name": "New York",
    "brand": {
      "connect": {
        "name": "Genesis"
      }
    }
  },
  {
    "name": "X Concept",
    "brand": {
      "connect": {
        "name": "Genesis"
      }
    }
  },
  {
    "name": "Tank 300",
    "brand": {
      "connect": {
        "name": "GWM"
      }
    }
  },
  {
    "name": "Ute",
    "brand": {
      "connect": {
        "name": "GWM"
      }
    }
  },
  {
    "name": "Cannon",
    "brand": {
      "connect": {
        "name": "GWM"
      }
    }
  },
  {
    "name": "Ora",
    "brand": {
      "connect": {
        "name": "GWM"
      }
    }
  },
  {
    "name": "Poer",
    "brand": {
      "connect": {
        "name": "GWM"
      }
    }
  },
  {
    "name": "Wingle 5",
    "brand": {
      "connect": {
        "name": "GWM"
      }
    }
  },
  {
    "name": "Wingle 7",
    "brand": {
      "connect": {
        "name": "GWM"
      }
    }
  },
  {
    "name": "Hover H6",
    "brand": {
      "connect": {
        "name": "GWM"
      }
    }
  },
  {
    "name": "F7",
    "brand": {
      "connect": {
        "name": "GWM"
      }
    }
  },
  {
    "name": "Haval H9",
    "brand": {
      "connect": {
        "name": "GWM"
      }
    }
  },
  {
    "name": "H2",
    "brand": {
      "connect": {
        "name": "Haval"
      }
    }
  },
  {
    "name": "H6",
    "brand": {
      "connect": {
        "name": "Haval"
      }
    }
  },
  {
    "name": "H9",
    "brand": {
      "connect": {
        "name": "Haval"
      }
    }
  },
  {
    "name": "Jolion",
    "brand": {
      "connect": {
        "name": "Haval"
      }
    }
  },
  {
    "name": "F5",
    "brand": {
      "connect": {
        "name": "Haval"
      }
    }
  },
  {
    "name": "F7",
    "brand": {
      "connect": {
        "name": "Haval"
      }
    }
  },
  {
    "name": "Big Dog",
    "brand": {
      "connect": {
        "name": "Haval"
      }
    }
  },
  {
    "name": "Chitu",
    "brand": {
      "connect": {
        "name": "Haval"
      }
    }
  },
  {
    "name": "Cool Dog",
    "brand": {
      "connect": {
        "name": "Haval"
      }
    }
  },
  {
    "name": "Dargo",
    "brand": {
      "connect": {
        "name": "Haval"
      }
    }
  },
  {
    "name": "Civic",
    "brand": {
      "connect": {
        "name": "Honda"
      }
    }
  },
  {
    "name": "Accord",
    "brand": {
      "connect": {
        "name": "Honda"
      }
    }
  },
  {
    "name": "CR-V",
    "brand": {
      "connect": {
        "name": "Honda"
      }
    }
  },
  {
    "name": "HR-V",
    "brand": {
      "connect": {
        "name": "Honda"
      }
    }
  },
  {
    "name": "Jazz",
    "brand": {
      "connect": {
        "name": "Honda"
      }
    }
  },
  {
    "name": "Odyssey",
    "brand": {
      "connect": {
        "name": "Honda"
      }
    }
  },
  {
    "name": "City",
    "brand": {
      "connect": {
        "name": "Honda"
      }
    }
  },
  {
    "name": "Fit",
    "brand": {
      "connect": {
        "name": "Honda"
      }
    }
  },
  {
    "name": "Pilot",
    "brand": {
      "connect": {
        "name": "Honda"
      }
    }
  },
  {
    "name": "Insight",
    "brand": {
      "connect": {
        "name": "Honda"
      }
    }
  },
  {
    "name": "Commodore",
    "brand": {
      "connect": {
        "name": "Holden"
      }
    }
  },
  {
    "name": "Astra",
    "brand": {
      "connect": {
        "name": "Holden"
      }
    }
  },
  {
    "name": "Cruze",
    "brand": {
      "connect": {
        "name": "Holden"
      }
    }
  },
  {
    "name": "Captiva",
    "brand": {
      "connect": {
        "name": "Holden"
      }
    }
  },
  {
    "name": "Colorado",
    "brand": {
      "connect": {
        "name": "Holden"
      }
    }
  },
  {
    "name": "Barina",
    "brand": {
      "connect": {
        "name": "Holden"
      }
    }
  },
  {
    "name": "Trax",
    "brand": {
      "connect": {
        "name": "Holden"
      }
    }
  },
  {
    "name": "Equinox",
    "brand": {
      "connect": {
        "name": "Holden"
      }
    }
  },
  {
    "name": "Spark",
    "brand": {
      "connect": {
        "name": "Holden"
      }
    }
  },
  {
    "name": "Statesman",
    "brand": {
      "connect": {
        "name": "Holden"
      }
    }
  },
  {
    "name": "i30",
    "brand": {
      "connect": {
        "name": "Hyundai"
      }
    }
  },
  {
    "name": "Elantra",
    "brand": {
      "connect": {
        "name": "Hyundai"
      }
    }
  },
  {
    "name": "Tucson",
    "brand": {
      "connect": {
        "name": "Hyundai"
      }
    }
  },
  {
    "name": "Santa Fe",
    "brand": {
      "connect": {
        "name": "Hyundai"
      }
    }
  },
  {
    "name": "Kona",
    "brand": {
      "connect": {
        "name": "Hyundai"
      }
    }
  },
  {
    "name": "Venue",
    "brand": {
      "connect": {
        "name": "Hyundai"
      }
    }
  },
  {
    "name": "Palisade",
    "brand": {
      "connect": {
        "name": "Hyundai"
      }
    }
  },
  {
    "name": "Accent",
    "brand": {
      "connect": {
        "name": "Hyundai"
      }
    }
  },
  {
    "name": "Ioniq",
    "brand": {
      "connect": {
        "name": "Hyundai"
      }
    }
  },
  {
    "name": "Nexo",
    "brand": {
      "connect": {
        "name": "Hyundai"
      }
    }
  },
  {
    "name": "Q50",
    "brand": {
      "connect": {
        "name": "Infiniti"
      }
    }
  },
  {
    "name": "Q60",
    "brand": {
      "connect": {
        "name": "Infiniti"
      }
    }
  },
  {
    "name": "Q70",
    "brand": {
      "connect": {
        "name": "Infiniti"
      }
    }
  },
  {
    "name": "QX30",
    "brand": {
      "connect": {
        "name": "Infiniti"
      }
    }
  },
  {
    "name": "QX50",
    "brand": {
      "connect": {
        "name": "Infiniti"
      }
    }
  },
  {
    "name": "QX60",
    "brand": {
      "connect": {
        "name": "Infiniti"
      }
    }
  },
  {
    "name": "QX70",
    "brand": {
      "connect": {
        "name": "Infiniti"
      }
    }
  },
  {
    "name": "QX80",
    "brand": {
      "connect": {
        "name": "Infiniti"
      }
    }
  },
  {
    "name": "EX35",
    "brand": {
      "connect": {
        "name": "Infiniti"
      }
    }
  },
  {
    "name": "FX37",
    "brand": {
      "connect": {
        "name": "Infiniti"
      }
    }
  },
  {
    "name": "D-MAX",
    "brand": {
      "connect": {
        "name": "Isuzu"
      }
    }
  },
  {
    "name": "MU-X",
    "brand": {
      "connect": {
        "name": "Isuzu"
      }
    }
  },
  {
    "name": "Rodeo",
    "brand": {
      "connect": {
        "name": "Isuzu"
      }
    }
  },
  {
    "name": "F Series",
    "brand": {
      "connect": {
        "name": "Isuzu"
      }
    }
  },
  {
    "name": "N Series",
    "brand": {
      "connect": {
        "name": "Isuzu"
      }
    }
  },
  {
    "name": "Elf",
    "brand": {
      "connect": {
        "name": "Isuzu"
      }
    }
  },
  {
    "name": "Giga",
    "brand": {
      "connect": {
        "name": "Isuzu"
      }
    }
  },
  {
    "name": "Forward",
    "brand": {
      "connect": {
        "name": "Isuzu"
      }
    }
  },
  {
    "name": "Trooper",
    "brand": {
      "connect": {
        "name": "Isuzu"
      }
    }
  },
  {
    "name": "Amigo",
    "brand": {
      "connect": {
        "name": "Isuzu"
      }
    }
  },
  {
    "name": "Sportage",
    "brand": {
      "connect": {
        "name": "Kia"
      }
    }
  },
  {
    "name": "Seltos",
    "brand": {
      "connect": {
        "name": "Kia"
      }
    }
  },
  {
    "name": "Sorento",
    "brand": {
      "connect": {
        "name": "Kia"
      }
    }
  },
  {
    "name": "Carnival",
    "brand": {
      "connect": {
        "name": "Kia"
      }
    }
  },
  {
    "name": "Picanto",
    "brand": {
      "connect": {
        "name": "Kia"
      }
    }
  },
  {
    "name": "Rio",
    "brand": {
      "connect": {
        "name": "Kia"
      }
    }
  },
  {
    "name": "Stinger",
    "brand": {
      "connect": {
        "name": "Kia"
      }
    }
  },
  {
    "name": "Cerato",
    "brand": {
      "connect": {
        "name": "Kia"
      }
    }
  },
  {
    "name": "EV6",
    "brand": {
      "connect": {
        "name": "Kia"
      }
    }
  },
  {
    "name": "Telluride",
    "brand": {
      "connect": {
        "name": "Kia"
      }
    }
  },
  {
    "name": "RX",
    "brand": {
      "connect": {
        "name": "Lexus"
      }
    }
  },
  {
    "name": "NX",
    "brand": {
      "connect": {
        "name": "Lexus"
      }
    }
  },
  {
    "name": "UX",
    "brand": {
      "connect": {
        "name": "Lexus"
      }
    }
  },
  {
    "name": "ES",
    "brand": {
      "connect": {
        "name": "Lexus"
      }
    }
  },
  {
    "name": "IS",
    "brand": {
      "connect": {
        "name": "Lexus"
      }
    }
  },
  {
    "name": "GS",
    "brand": {
      "connect": {
        "name": "Lexus"
      }
    }
  },
  {
    "name": "LC",
    "brand": {
      "connect": {
        "name": "Lexus"
      }
    }
  },
  {
    "name": "LS",
    "brand": {
      "connect": {
        "name": "Lexus"
      }
    }
  },
  {
    "name": "RC",
    "brand": {
      "connect": {
        "name": "Lexus"
      }
    }
  },
  {
    "name": "LX",
    "brand": {
      "connect": {
        "name": "Lexus"
      }
    }
  },
  {
    "name": "CX-3",
    "brand": {
      "connect": {
        "name": "Mazda"
      }
    }
  },
  {
    "name": "CX-5",
    "brand": {
      "connect": {
        "name": "Mazda"
      }
    }
  },
  {
    "name": "CX-9",
    "brand": {
      "connect": {
        "name": "Mazda"
      }
    }
  },
  {
    "name": "Mazda3",
    "brand": {
      "connect": {
        "name": "Mazda"
      }
    }
  },
  {
    "name": "Mazda6",
    "brand": {
      "connect": {
        "name": "Mazda"
      }
    }
  },
  {
    "name": "BT-50",
    "brand": {
      "connect": {
        "name": "Mazda"
      }
    }
  },
  {
    "name": "MX-5",
    "brand": {
      "connect": {
        "name": "Mazda"
      }
    }
  },
  {
    "name": "CX-30",
    "brand": {
      "connect": {
        "name": "Mazda"
      }
    }
  },
  {
    "name": "RX-8",
    "brand": {
      "connect": {
        "name": "Mazda"
      }
    }
  },
  {
    "name": "Mazda2",
    "brand": {
      "connect": {
        "name": "Mazda"
      }
    }
  },
  {
    "name": "A-Class",
    "brand": {
      "connect": {
        "name": "Mercedes-Benz"
      }
    }
  },
  {
    "name": "C-Class",
    "brand": {
      "connect": {
        "name": "Mercedes-Benz"
      }
    }
  },
  {
    "name": "E-Class",
    "brand": {
      "connect": {
        "name": "Mercedes-Benz"
      }
    }
  },
  {
    "name": "S-Class",
    "brand": {
      "connect": {
        "name": "Mercedes-Benz"
      }
    }
  },
  {
    "name": "GLA",
    "brand": {
      "connect": {
        "name": "Mercedes-Benz"
      }
    }
  },
  {
    "name": "GLC",
    "brand": {
      "connect": {
        "name": "Mercedes-Benz"
      }
    }
  },
  {
    "name": "GLE",
    "brand": {
      "connect": {
        "name": "Mercedes-Benz"
      }
    }
  },
  {
    "name": "GLS",
    "brand": {
      "connect": {
        "name": "Mercedes-Benz"
      }
    }
  },
  {
    "name": "CLA",
    "brand": {
      "connect": {
        "name": "Mercedes-Benz"
      }
    }
  },
  {
    "name": "EQC",
    "brand": {
      "connect": {
        "name": "Mercedes-Benz"
      }
    }
  },
  {
    "name": "Lancer",
    "brand": {
      "connect": {
        "name": "Mitsubishi"
      }
    }
  },
  {
    "name": "Outlander",
    "brand": {
      "connect": {
        "name": "Mitsubishi"
      }
    }
  },
  {
    "name": "ASX",
    "brand": {
      "connect": {
        "name": "Mitsubishi"
      }
    }
  },
  {
    "name": "Eclipse Cross",
    "brand": {
      "connect": {
        "name": "Mitsubishi"
      }
    }
  },
  {
    "name": "Pajero",
    "brand": {
      "connect": {
        "name": "Mitsubishi"
      }
    }
  },
  {
    "name": "Triton",
    "brand": {
      "connect": {
        "name": "Mitsubishi"
      }
    }
  },
  {
    "name": "Mirage",
    "brand": {
      "connect": {
        "name": "Mitsubishi"
      }
    }
  },
  {
    "name": "Grandis",
    "brand": {
      "connect": {
        "name": "Mitsubishi"
      }
    }
  },
  {
    "name": "i-MiEV",
    "brand": {
      "connect": {
        "name": "Mitsubishi"
      }
    }
  },
  {
    "name": "Express",
    "brand": {
      "connect": {
        "name": "Mitsubishi"
      }
    }
  },
  {
    "name": "ZS",
    "brand": {
      "connect": {
        "name": "MG"
      }
    }
  },
  {
    "name": "HS",
    "brand": {
      "connect": {
        "name": "MG"
      }
    }
  },
  {
    "name": "MG3",
    "brand": {
      "connect": {
        "name": "MG"
      }
    }
  },
  {
    "name": "MG5",
    "brand": {
      "connect": {
        "name": "MG"
      }
    }
  },
  {
    "name": "MG6",
    "brand": {
      "connect": {
        "name": "MG"
      }
    }
  },
  {
    "name": "Marvel R",
    "brand": {
      "connect": {
        "name": "MG"
      }
    }
  },
  {
    "name": "eHS",
    "brand": {
      "connect": {
        "name": "MG"
      }
    }
  },
  {
    "name": "Mulan",
    "brand": {
      "connect": {
        "name": "MG"
      }
    }
  },
  {
    "name": "RX5",
    "brand": {
      "connect": {
        "name": "MG"
      }
    }
  },
  {
    "name": "ZS EV",
    "brand": {
      "connect": {
        "name": "MG"
      }
    }
  },
  {
    "name": "X-Trail",
    "brand": {
      "connect": {
        "name": "Nissan"
      }
    }
  },
  {
    "name": "Qashqai",
    "brand": {
      "connect": {
        "name": "Nissan"
      }
    }
  },
  {
    "name": "Navara",
    "brand": {
      "connect": {
        "name": "Nissan"
      }
    }
  },
  {
    "name": "Pulsar",
    "brand": {
      "connect": {
        "name": "Nissan"
      }
    }
  },
  {
    "name": "Leaf",
    "brand": {
      "connect": {
        "name": "Nissan"
      }
    }
  },
  {
    "name": "Patrol",
    "brand": {
      "connect": {
        "name": "Nissan"
      }
    }
  },
  {
    "name": "Juke",
    "brand": {
      "connect": {
        "name": "Nissan"
      }
    }
  },
  {
    "name": "Murano",
    "brand": {
      "connect": {
        "name": "Nissan"
      }
    }
  },
  {
    "name": "370Z",
    "brand": {
      "connect": {
        "name": "Nissan"
      }
    }
  },
  {
    "name": "GT-R",
    "brand": {
      "connect": {
        "name": "Nissan"
      }
    }
  },
  {
    "name": "208",
    "brand": {
      "connect": {
        "name": "Peugeot"
      }
    }
  },
  {
    "name": "308",
    "brand": {
      "connect": {
        "name": "Peugeot"
      }
    }
  },
  {
    "name": "508",
    "brand": {
      "connect": {
        "name": "Peugeot"
      }
    }
  },
  {
    "name": "2008",
    "brand": {
      "connect": {
        "name": "Peugeot"
      }
    }
  },
  {
    "name": "3008",
    "brand": {
      "connect": {
        "name": "Peugeot"
      }
    }
  },
  {
    "name": "5008",
    "brand": {
      "connect": {
        "name": "Peugeot"
      }
    }
  },
  {
    "name": "Traveller",
    "brand": {
      "connect": {
        "name": "Peugeot"
      }
    }
  },
  {
    "name": "Rifter",
    "brand": {
      "connect": {
        "name": "Peugeot"
      }
    }
  },
  {
    "name": "Partner",
    "brand": {
      "connect": {
        "name": "Peugeot"
      }
    }
  },
  {
    "name": "Expert",
    "brand": {
      "connect": {
        "name": "Peugeot"
      }
    }
  },
  {
    "name": "911",
    "brand": {
      "connect": {
        "name": "Porsche"
      }
    }
  },
  {
    "name": "Cayenne",
    "brand": {
      "connect": {
        "name": "Porsche"
      }
    }
  },
  {
    "name": "Panamera",
    "brand": {
      "connect": {
        "name": "Porsche"
      }
    }
  },
  {
    "name": "Macan",
    "brand": {
      "connect": {
        "name": "Porsche"
      }
    }
  },
  {
    "name": "Taycan",
    "brand": {
      "connect": {
        "name": "Porsche"
      }
    }
  },
  {
    "name": "718 Boxster",
    "brand": {
      "connect": {
        "name": "Porsche"
      }
    }
  },
  {
    "name": "718 Cayman",
    "brand": {
      "connect": {
        "name": "Porsche"
      }
    }
  },
  {
    "name": "Carrera GT",
    "brand": {
      "connect": {
        "name": "Porsche"
      }
    }
  },
  {
    "name": "Mission E",
    "brand": {
      "connect": {
        "name": "Porsche"
      }
    }
  },
  {
    "name": "Spyder",
    "brand": {
      "connect": {
        "name": "Porsche"
      }
    }
  },
  {
    "name": "Clio",
    "brand": {
      "connect": {
        "name": "Renault"
      }
    }
  },
  {
    "name": "Captur",
    "brand": {
      "connect": {
        "name": "Renault"
      }
    }
  },
  {
    "name": "Megane",
    "brand": {
      "connect": {
        "name": "Renault"
      }
    }
  },
  {
    "name": "Kadjar",
    "brand": {
      "connect": {
        "name": "Renault"
      }
    }
  },
  {
    "name": "Koleos",
    "brand": {
      "connect": {
        "name": "Renault"
      }
    }
  },
  {
    "name": "Trafic",
    "brand": {
      "connect": {
        "name": "Renault"
      }
    }
  },
  {
    "name": "Master",
    "brand": {
      "connect": {
        "name": "Renault"
      }
    }
  },
  {
    "name": "Scenic",
    "brand": {
      "connect": {
        "name": "Renault"
      }
    }
  },
  {
    "name": "Talisman",
    "brand": {
      "connect": {
        "name": "Renault"
      }
    }
  },
  {
    "name": "Zoe",
    "brand": {
      "connect": {
        "name": "Renault"
      }
    }
  },
  {
    "name": "Forester",
    "brand": {
      "connect": {
        "name": "Subaru"
      }
    }
  },
  {
    "name": "Outback",
    "brand": {
      "connect": {
        "name": "Subaru"
      }
    }
  },
  {
    "name": "XV",
    "brand": {
      "connect": {
        "name": "Subaru"
      }
    }
  },
  {
    "name": "Impreza",
    "brand": {
      "connect": {
        "name": "Subaru"
      }
    }
  },
  {
    "name": "WRX",
    "brand": {
      "connect": {
        "name": "Subaru"
      }
    }
  },
  {
    "name": "BRZ",
    "brand": {
      "connect": {
        "name": "Subaru"
      }
    }
  },
  {
    "name": "Liberty",
    "brand": {
      "connect": {
        "name": "Subaru"
      }
    }
  },
  {
    "name": "Ascent",
    "brand": {
      "connect": {
        "name": "Subaru"
      }
    }
  },
  {
    "name": "Levorg",
    "brand": {
      "connect": {
        "name": "Subaru"
      }
    }
  },
  {
    "name": "Crosstrek",
    "brand": {
      "connect": {
        "name": "Subaru"
      }
    }
  },
  {
    "name": "Model S",
    "brand": {
      "connect": {
        "name": "Tesla"
      }
    }
  },
  {
    "name": "Model 3",
    "brand": {
      "connect": {
        "name": "Tesla"
      }
    }
  },
  {
    "name": "Model X",
    "brand": {
      "connect": {
        "name": "Tesla"
      }
    }
  },
  {
    "name": "Model Y",
    "brand": {
      "connect": {
        "name": "Tesla"
      }
    }
  },
  {
    "name": "Cybertruck",
    "brand": {
      "connect": {
        "name": "Tesla"
      }
    }
  },
  {
    "name": "Roadster",
    "brand": {
      "connect": {
        "name": "Tesla"
      }
    }
  },
  {
    "name": "Semi",
    "brand": {
      "connect": {
        "name": "Tesla"
      }
    }
  },
  {
    "name": "Model 2",
    "brand": {
      "connect": {
        "name": "Tesla"
      }
    }
  },
  {
    "name": "Plaid",
    "brand": {
      "connect": {
        "name": "Tesla"
      }
    }
  },
  {
    "name": "Powerwall",
    "brand": {
      "connect": {
        "name": "Tesla"
      }
    }
  },
  {
    "name": "Corolla",
    "brand": {
      "connect": {
        "name": "Toyota"
      }
    }
  },
  {
    "name": "Camry",
    "brand": {
      "connect": {
        "name": "Toyota"
      }
    }
  },
  {
    "name": "Hilux",
    "brand": {
      "connect": {
        "name": "Toyota"
      }
    }
  },
  {
    "name": "RAV4",
    "brand": {
      "connect": {
        "name": "Toyota"
      }
    }
  },
  {
    "name": "Yaris",
    "brand": {
      "connect": {
        "name": "Toyota"
      }
    }
  },
  {
    "name": "LandCruiser",
    "brand": {
      "connect": {
        "name": "Toyota"
      }
    }
  },
  {
    "name": "Prado",
    "brand": {
      "connect": {
        "name": "Toyota"
      }
    }
  },
  {
    "name": "HiAce",
    "brand": {
      "connect": {
        "name": "Toyota"
      }
    }
  },
  {
    "name": "C-HR",
    "brand": {
      "connect": {
        "name": "Toyota"
      }
    }
  },
  {
    "name": "Fortuner",
    "brand": {
      "connect": {
        "name": "Toyota"
      }
    }
  },
  {
    "name": "XC40",
    "brand": {
      "connect": {
        "name": "Volvo"
      }
    }
  },
  {
    "name": "XC60",
    "brand": {
      "connect": {
        "name": "Volvo"
      }
    }
  },
  {
    "name": "XC90",
    "brand": {
      "connect": {
        "name": "Volvo"
      }
    }
  },
  {
    "name": "S60",
    "brand": {
      "connect": {
        "name": "Volvo"
      }
    }
  },
  {
    "name": "S90",
    "brand": {
      "connect": {
        "name": "Volvo"
      }
    }
  },
  {
    "name": "V40",
    "brand": {
      "connect": {
        "name": "Volvo"
      }
    }
  },
  {
    "name": "V60",
    "brand": {
      "connect": {
        "name": "Volvo"
      }
    }
  },
  {
    "name": "V90",
    "brand": {
      "connect": {
        "name": "Volvo"
      }
    }
  },
  {
    "name": "C30",
    "brand": {
      "connect": {
        "name": "Volvo"
      }
    }
  },
  {
    "name": "EX30",
    "brand": {
      "connect": {
        "name": "Volvo"
      }
    }
  },
  {
    "name": "Golf",
    "brand": {
      "connect": {
        "name": "VW"
      }
    }
  },
  {
    "name": "Polo",
    "brand": {
      "connect": {
        "name": "VW"
      }
    }
  },
  {
    "name": "Passat",
    "brand": {
      "connect": {
        "name": "VW"
      }
    }
  },
  {
    "name": "Tiguan",
    "brand": {
      "connect": {
        "name": "VW"
      }
    }
  },
  {
    "name": "Touareg",
    "brand": {
      "connect": {
        "name": "VW"
      }
    }
  },
  {
    "name": "Jetta",
    "brand": {
      "connect": {
        "name": "VW"
      }
    }
  },
  {
    "name": "Arteon",
    "brand": {
      "connect": {
        "name": "VW"
      }
    }
  },
  {
    "name": "T-Roc",
    "brand": {
      "connect": {
        "name": "VW"
      }
    }
  },
  {
    "name": "ID.4",
    "brand": {
      "connect": {
        "name": "VW"
      }
    }
  },
  {
    "name": "Beetle",
    "brand": {
      "connect": {
        "name": "VW"
      }
    }
  }
]

async function main() {
  for (const brandModel of brandModelData) {
    await prisma.brandModel.create({ data: brandModel });
  }
}

main();
