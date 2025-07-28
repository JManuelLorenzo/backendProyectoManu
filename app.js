import express from 'express';
import bodyParser from 'body-parser';
import { swaggerUi, swaggerSpec } from './swagger.js';
import userRoutes from './routes/users.js';
import './db.js'; // Solo se importa para inicializarla

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => res.send('Hello, API!'));

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Swagger en: http://localhost:${port}/api-docs`);
});
