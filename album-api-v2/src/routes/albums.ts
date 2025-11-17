import { Router, Request, Response } from 'express';
import { AlbumRepository, Album } from '../models/Album';

const router = Router();

// GET /albums - Get all albums
router.get('/', (req: Request, res: Response) => {
  const albums = AlbumRepository.getAll();
  res.json(albums);
});

// GET /albums/search?year=2020 - Search albums by year (must be before /:id)
router.get('/search', (req: Request, res: Response) => {
  const year = parseInt(req.query.year as string);

  if (isNaN(year) || year < 1900 || year > 2100) {
    return res.status(400).json({ error: 'Invalid year' });
  }

  const albums = AlbumRepository.searchByYear(year);
  res.json(albums);
});

// GET /albums/:id - Get album by ID
router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid album ID' });
  }

  const album = AlbumRepository.getById(id);
  if (!album) {
    return res.status(404).json({ error: 'Album not found' });
  }

  res.json(album);
});

// POST /albums - Create a new album
router.post('/', (req: Request, res: Response) => {
  const albumData = req.body;

  if (!albumData) {
    return res.status(400).json({ error: 'Album data is required' });
  }

  if (!albumData.title || !albumData.artist) {
    return res.status(400).json({ error: 'Title and Artist are required' });
  }

  // Convert birthdate string to Date if needed
  if (albumData.artist.birthdate && typeof albumData.artist.birthdate === 'string') {
    albumData.artist.birthdate = new Date(albumData.artist.birthdate);
  }

  const newAlbum = AlbumRepository.create(albumData);
  res.status(201).json(newAlbum);
});

// PUT /albums/:id - Update an album
router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const albumData = req.body;

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid album ID' });
  }

  if (!albumData) {
    return res.status(400).json({ error: 'Album data is required' });
  }

  // Convert birthdate string to Date if needed
  if (albumData.artist && albumData.artist.birthdate && typeof albumData.artist.birthdate === 'string') {
    albumData.artist.birthdate = new Date(albumData.artist.birthdate);
  }

  const updatedAlbum = AlbumRepository.update(id, albumData);
  if (!updatedAlbum) {
    return res.status(404).json({ error: 'Album not found' });
  }

  res.json(updatedAlbum);
});

// DELETE /albums/:id - Delete an album
router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid album ID' });
  }

  const deleted = AlbumRepository.delete(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Album not found' });
  }

  res.status(204).send();
});

export default router;
