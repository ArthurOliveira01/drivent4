import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

async function findCapacityByRoomId(roomId: number){
  return prisma.room.findFirst({
    where: {
      id: roomId
    }, select: {
      capacity: true,
      Booking: true
    }
  })
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
  findCapacityByRoomId
};

export default hotelRepository;
