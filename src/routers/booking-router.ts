import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { changeReserve, listRoomsReserves, reserveRoom } from '@/controllers';
import { createReserveSchema } from '@/schemas';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', listRoomsReserves)
  .post('/', validateBody(createReserveSchema), reserveRoom)
  .put('/:bookingId', validateBody(createReserveSchema), changeReserve);

export { bookingRouter };
