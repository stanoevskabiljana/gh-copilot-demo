import request from 'supertest';
import app from '../index';
import { AlbumRepository } from '../models/Album';

describe('Album API', () => {
  beforeEach(() => {
    // Reset the album repository before each test
    AlbumRepository.reset();
  });

  describe('GET /albums', () => {
    it('should return all albums', async () => {
      const response = await request(app)
        .get('/albums')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(6);
    });

    it('should return albums with artist data', async () => {
      const response = await request(app)
        .get('/albums')
        .expect(200);

      response.body.forEach((album: any) => {
        expect(album).toHaveProperty('id');
        expect(album).toHaveProperty('title');
        expect(album).toHaveProperty('artist');
        expect(album.artist).toHaveProperty('name');
        expect(album.artist).toHaveProperty('birthdate');
        expect(album.artist).toHaveProperty('birthPlace');
      });
    });
  });

  describe('GET /albums/:id', () => {
    it('should return an album by valid ID', async () => {
      const response = await request(app)
        .get('/albums/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('title', 'You, Me and an App Id');
    });

    it('should return 404 for non-existent album', async () => {
      const response = await request(app)
        .get('/albums/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Album not found');
    });

    it('should return 400 for invalid album ID', async () => {
      const response = await request(app)
        .get('/albums/invalid')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid album ID');
    });

    it('should return 400 for negative album ID', async () => {
      const response = await request(app)
        .get('/albums/-1')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid album ID');
    });
  });

  describe('GET /albums/search', () => {
    it('should return albums matching the year', async () => {
      const response = await request(app)
        .get('/albums/search?year=2020')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('year', 2020);
    });

    it('should return empty array for year with no matches', async () => {
      const response = await request(app)
        .get('/albums/search?year=1999')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(0);
    });

    it('should return 400 for invalid year', async () => {
      const response = await request(app)
        .get('/albums/search?year=invalid')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid year');
    });

    it('should return 400 for year out of range', async () => {
      const response = await request(app)
        .get('/albums/search?year=1800')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid year');
    });
  });

  describe('POST /albums', () => {
    it('should create a new album', async () => {
      const newAlbum = {
        title: 'Test Album',
        artist: {
          name: 'Test Artist',
          birthdate: '1990-01-01',
          birthPlace: 'Test City'
        },
        year: 2024,
        price: 15.99,
        image_url: 'https://example.com/image.jpg'
      };

      const response = await request(app)
        .post('/albums')
        .send(newAlbum)
        .expect(201);

      expect(response.body).toHaveProperty('id', 7);
      expect(response.body).toHaveProperty('title', 'Test Album');
      expect(response.body.artist).toHaveProperty('name', 'Test Artist');
    });

    it('should return 400 when title is missing', async () => {
      const invalidAlbum = {
        artist: {
          name: 'Test Artist',
          birthdate: '1990-01-01',
          birthPlace: 'Test City'
        },
        year: 2024,
        price: 15.99,
        image_url: 'https://example.com/image.jpg'
      };

      const response = await request(app)
        .post('/albums')
        .send(invalidAlbum)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Title and Artist are required');
    });

    it('should return 400 when artist is missing', async () => {
      const invalidAlbum = {
        title: 'Test Album',
        year: 2024,
        price: 15.99,
        image_url: 'https://example.com/image.jpg'
      };

      const response = await request(app)
        .post('/albums')
        .send(invalidAlbum)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Title and Artist are required');
    });
  });

  describe('PUT /albums/:id', () => {
    it('should update an existing album', async () => {
      const updatedAlbum = {
        title: 'Updated Album',
        artist: {
          name: 'Updated Artist',
          birthdate: '1995-06-15',
          birthPlace: 'Updated City'
        },
        year: 2023,
        price: 19.99,
        image_url: 'https://example.com/updated.jpg'
      };

      const response = await request(app)
        .put('/albums/1')
        .send(updatedAlbum)
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('title', 'Updated Album');
      expect(response.body.artist).toHaveProperty('name', 'Updated Artist');
    });

    it('should return 404 when updating non-existent album', async () => {
      const updatedAlbum = {
        title: 'Updated Album',
        artist: {
          name: 'Updated Artist',
          birthdate: '1995-06-15',
          birthPlace: 'Updated City'
        },
        year: 2023,
        price: 19.99,
        image_url: 'https://example.com/updated.jpg'
      };

      const response = await request(app)
        .put('/albums/999')
        .send(updatedAlbum)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Album not found');
    });

    it('should return 400 for invalid album ID', async () => {
      const updatedAlbum = {
        title: 'Updated Album',
        artist: {
          name: 'Updated Artist',
          birthdate: '1995-06-15',
          birthPlace: 'Updated City'
        },
        year: 2023,
        price: 19.99,
        image_url: 'https://example.com/updated.jpg'
      };

      const response = await request(app)
        .put('/albums/invalid')
        .send(updatedAlbum)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid album ID');
    });
  });

  describe('DELETE /albums/:id', () => {
    it('should delete an existing album', async () => {
      await request(app)
        .delete('/albums/1')
        .expect(204);

      // Verify album is deleted
      const response = await request(app)
        .get('/albums/1')
        .expect(404);
    });

    it('should return 404 when deleting non-existent album', async () => {
      const response = await request(app)
        .delete('/albums/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Album not found');
    });

    it('should return 400 for invalid album ID', async () => {
      const response = await request(app)
        .delete('/albums/invalid')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid album ID');
    });
  });

  describe('GET /', () => {
    it('should return API information', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('status', 'running');
      expect(response.body).toHaveProperty('endpoints');
    });
  });
});
