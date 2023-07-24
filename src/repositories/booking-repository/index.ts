import { prisma } from '@/config';


async function findReserveByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: { Room: true },
  });
}

async function getBookingByRoomId(roomId: number) {
  return prisma.booking.count({
    where: { roomId },
  });
}

async function create(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
      updatedAt: new Date(),
    },
  });
}

async function editBooking(bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: { id: bookingId },
    data: { roomId: roomId },
  });
}

async function findBookById(bookingId: number) {
  return prisma.booking.findUnique({
    where: { id: bookingId },
  });
}

const bookingRepository = {
  getBookingByRoomId,
  findBookById,
  findReserveByUserId,
  create,
  editBooking,
};

export default bookingRepository;