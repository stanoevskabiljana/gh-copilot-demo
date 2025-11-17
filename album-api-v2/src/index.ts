import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import albumRoutes from './routes/albums';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/albums', albumRoutes);

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Album API v2 - Node.js/TypeScript',
    status: 'running',
    endpoints: {
      getAll: 'GET /albums',
      getById: 'GET /albums/:id',
      search: 'GET /albums/search?year=YYYY',
      create: 'POST /albums',
      update: 'PUT /albums/:id',
      delete: 'DELETE /albums/:id'
    }
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🎵 Album API v2 is running on http://localhost:${PORT}`);
  });
}

export default app;
