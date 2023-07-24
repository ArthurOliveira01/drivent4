import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { listReservations, changeReservation, makeReservation } from '@/controllers';
import { createReserveSchema } from '@/schemas';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(createReserveSchema), makeReservation)
  .get('/', listReservations)
  .put('/:bookingId', validateBody(createReserveSchema), changeReservation);

export { bookingRouter };