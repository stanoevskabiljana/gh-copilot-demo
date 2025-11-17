import { Artist } from './Artist';

export interface Album {
  id: number;
  title: string;
  artist: Artist;
  year: number;
  price: number;
  image_url: string;
}

export class AlbumRepository {
  private static albums: Album[] = [
    {
      id: 1,
      title: "You, Me and an App Id",
      artist: {
        name: "Daprize",
        birthdate: new Date(1990, 4, 15), // Month is 0-indexed in JS
        birthPlace: "Seattle, WA"
      },
      year: 2020,
      price: 10.99,
      image_url: "https://aka.ms/albums-daprlogo"
    },
    {
      id: 2,
      title: "Seven Revision Army",
      artist: {
        name: "The Blue-Green Stripes",
        birthdate: new Date(1985, 2, 20),
        birthPlace: "Detroit, MI"
      },
      year: 2021,
      price: 13.99,
      image_url: "https://aka.ms/albums-containerappslogo"
    },
    {
      id: 3,
      title: "Scale It Up",
      artist: {
        name: "KEDA Club",
        birthdate: new Date(1992, 7, 10),
        birthPlace: "Austin, TX"
      },
      year: 2022,
      price: 13.99,
      image_url: "https://aka.ms/albums-kedalogo"
    },
    {
      id: 4,
      title: "Lost in Translation",
      artist: {
        name: "MegaDNS",
        birthdate: new Date(1988, 10, 25),
        birthPlace: "Portland, OR"
      },
      year: 2023,
      price: 12.99,
      image_url: "https://aka.ms/albums-envoylogo"
    },
    {
      id: 5,
      title: "Lock Down Your Love",
      artist: {
        name: "V is for VNET",
        birthdate: new Date(1995, 1, 14),
        birthPlace: "San Francisco, CA"
      },
      year: 2024,
      price: 12.99,
      image_url: "https://aka.ms/albums-vnetlogo"
    },
    {
      id: 6,
      title: "Sweet Container O' Mine",
      artist: {
        name: "Guns N Probeses",
        birthdate: new Date(1987, 6, 6),
        birthPlace: "Los Angeles, CA"
      },
      year: 2025,
      price: 14.99,
      image_url: "https://aka.ms/albums-containerappslogo"
    }
  ];

  private static nextId: number = 7;

  static getAll(): Album[] {
    return [...this.albums];
  }

  static getById(id: number): Album | undefined {
    return this.albums.find(album => album.id === id);
  }

  static searchByYear(year: number): Album[] {
    return this.albums.filter(album => album.year === year);
  }

  static create(album: Omit<Album, 'id'>): Album {
    const newAlbum: Album = {
      ...album,
      id: this.nextId++
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  static update(id: number, album: Omit<Album, 'id'>): Album | undefined {
    const index = this.albums.findIndex(a => a.id === id);
    if (index === -1) {
      return undefined;
    }
    
    const updatedAlbum: Album = {
      ...album,
      id
    };
    this.albums[index] = updatedAlbum;
    return updatedAlbum;
  }

  static delete(id: number): boolean {
    const index = this.albums.findIndex(a => a.id === id);
    if (index === -1) {
      return false;
    }
    this.albums.splice(index, 1);
    return true;
  }

  // For testing purposes
  static reset(): void {
    this.albums = [
      {
        id: 1,
        title: "You, Me and an App Id",
        artist: {
          name: "Daprize",
          birthdate: new Date(1990, 4, 15),
          birthPlace: "Seattle, WA"
        },
        year: 2020,
        price: 10.99,
        image_url: "https://aka.ms/albums-daprlogo"
      },
      {
        id: 2,
        title: "Seven Revision Army",
        artist: {
          name: "The Blue-Green Stripes",
          birthdate: new Date(1985, 2, 20),
          birthPlace: "Detroit, MI"
        },
        year: 2021,
        price: 13.99,
        image_url: "https://aka.ms/albums-containerappslogo"
      },
      {
        id: 3,
        title: "Scale It Up",
        artist: {
          name: "KEDA Club",
          birthdate: new Date(1992, 7, 10),
          birthPlace: "Austin, TX"
        },
        year: 2022,
        price: 13.99,
        image_url: "https://aka.ms/albums-kedalogo"
      },
      {
        id: 4,
        title: "Lost in Translation",
        artist: {
          name: "MegaDNS",
          birthdate: new Date(1988, 10, 25),
          birthPlace: "Portland, OR"
        },
        year: 2023,
        price: 12.99,
        image_url: "https://aka.ms/albums-envoylogo"
      },
      {
        id: 5,
        title: "Lock Down Your Love",
        artist: {
          name: "V is for VNET",
          birthdate: new Date(1995, 1, 14),
          birthPlace: "San Francisco, CA"
        },
        year: 2024,
        price: 12.99,
        image_url: "https://aka.ms/albums-vnetlogo"
      },
      {
        id: 6,
        title: "Sweet Container O' Mine",
        artist: {
          name: "Guns N Probeses",
          birthdate: new Date(1987, 6, 6),
          birthPlace: "Los Angeles, CA"
        },
        year: 2025,
        price: 14.99,
        image_url: "https://aka.ms/albums-containerappslogo"
      }
    ];
    this.nextId = 7;
  }
}
