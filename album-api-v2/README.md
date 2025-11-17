# Album API v2

A Node.js/TypeScript RESTful API for managing music albums. This is a rewrite of the original .NET albums-api.

## Features

- ✅ Full CRUD operations for albums
- ✅ Search albums by year
- ✅ In-memory data storage
- ✅ TypeScript for type safety
- ✅ Comprehensive unit tests
- ✅ CORS enabled for frontend integration

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Installation

```bash
cd album-api-v2
npm install
```

## Running the API

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

The API will start on `http://localhost:3000`

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## API Endpoints

### Get All Albums
```
GET /albums
```

### Get Album by ID
```
GET /albums/:id
```

### Search Albums by Year
```
GET /albums/search?year=2020
```

### Create Album
```
POST /albums
Content-Type: application/json

{
  "title": "Album Title",
  "artist": {
    "name": "Artist Name",
    "birthdate": "1990-01-01",
    "birthPlace": "City, State"
  },
  "year": 2024,
  "price": 15.99,
  "image_url": "https://example.com/image.jpg"
}
```

### Update Album
```
PUT /albums/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "artist": {
    "name": "Artist Name",
    "birthdate": "1990-01-01",
    "birthPlace": "City, State"
  },
  "year": 2024,
  "price": 15.99,
  "image_url": "https://example.com/image.jpg"
}
```

### Delete Album
```
DELETE /albums/:id
```

## Sample Data

The API comes pre-loaded with 6 albums:

1. "You, Me and an App Id" by Daprize (2020)
2. "Seven Revision Army" by The Blue-Green Stripes (2021)
3. "Scale It Up" by KEDA Club (2022)
4. "Lost in Translation" by MegaDNS (2023)
5. "Lock Down Your Love" by V is for VNET (2024)
6. "Sweet Container O' Mine" by Guns N Probeses (2025)

## Integration with Vue.js Frontend

This API is compatible with the existing Vue.js album-viewer application. The Vue app is configured to proxy requests to `http://localhost:3000` for the `/albums` route.

## Project Structure

```
album-api-v2/
├── src/
│   ├── models/
│   │   ├── Album.ts          # Album model and repository
│   │   └── Artist.ts         # Artist model
│   ├── routes/
│   │   ├── albums.ts         # Album routes/controllers
│   │   └── albums.test.ts    # Unit tests
│   └── index.ts              # Main application entry point
├── dist/                     # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## Technology Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Jest** - Testing framework
- **Supertest** - HTTP assertions

## License

MIT
