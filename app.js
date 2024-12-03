import express from 'express';
import routesJuegos from './routes/routesJuegos.js';

const app = express();
app.use(express.json());
app.use('/api', routesJuegos);

app.listen(3000, () => {
  console.log('Servidor funcionando en el puerto 3000');
});

export default app;
