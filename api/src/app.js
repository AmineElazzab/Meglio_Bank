import 'dotenv/config';
import { json, urlencoded } from 'express';
import cors from 'cors';
import { app, startServer } from './config';
import { errorHandler, notFound } from './middleware';
import {
  AdminRoutes,
  UsersRoutes,
} from './routes';

export const init = () => {
  //global middlewares
  app.use(cors({ origin: '*' }));
  app.use(json());
  app.use(urlencoded({ extended: true }));

  //routes

  app.use('/api/auth', UsersRoutes);
  app.use('/api/admin', AdminRoutes);
  app.get('/', (req, res) => {
    console.log('health check');
    res.json({
      healthCheck: 'system is ready',
    });
  });

  // 404
  app.use(notFound);

  // Error handler
  app.use(errorHandler);

  //init db with server
  startServer();
};

//initialize server
init();
