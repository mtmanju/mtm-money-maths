import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cagrRoutes from './routes/cagr.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;
const isDevelopment = process.env.NODE_ENV === 'development';

// CORS configuration
const corsOptions = {
  origin: isDevelopment ? ['http://localhost:3000'] : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Money Maths API',
      version: '1.0.0',
      description: 'API documentation for Money Maths financial calculators',
    },
    servers: [
      {
        url: isDevelopment ? 'http://localhost:3001' : 'https://api.moneymaths.com',
        description: isDevelopment ? 'Development server' : 'Production server',
      },
    ],
  },
  apis: ['./server/routes/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/cagr', cagrRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: isDevelopment ? err.message : 'Internal Server Error',
    stack: isDevelopment ? err.stack : undefined,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API documentation available at http://localhost:${port}/api-docs`);
}); 