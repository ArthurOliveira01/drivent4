import { AuthenticatedRequest } from "@/middlewares";
import { Response } from 'express';
import httpStatus from 'http-status';
import bookingService from '@/services/booking-service';

export async function makeReservation(req: AuthenticatedRequest, res: Response) {
  try {
    const { roomId } = req.body;
    const { userId } = req;
    const bookingId = await bookingService.reserveRoom(userId, Number(roomId));
    return res.send({ bookingId });
  } catch (error) {
    if (error.name === 'NoVacancyError') return res.sendStatus(httpStatus.FORBIDDEN);
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function changeReservation(req: AuthenticatedRequest, res: Response) {
  try {
    const { roomId } = req.body;
    const { bookingId } = req.params;
    const { userId } = req;
    const room = await bookingService.changeReservation(userId, Number(bookingId), Number(roomId));
    res.send(room);
  } catch (error) {
    if (error.name === 'NoVacancyError') return res.sendStatus(httpStatus.FORBIDDEN);
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'CannotListHotelsError') return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}

export async function listReservations(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const intrisicInfo = await bookingService.getRoomsByUserId(userId);
    return res.send(intrisicInfo);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
  }
}