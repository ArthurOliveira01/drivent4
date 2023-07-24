import { prisma } from '@/config';

async function findRoomById(roomId: number) {
  return prisma.room.findUnique({
    where: { id: roomId },
  });
}

async function deleteRoom(roomId: number) {
  return prisma.room.delete({
    where: {
      id: roomId,
    },
  });
}

const roomRepository = {
  findRoomById,
  deleteRoom,
};
export default roomRepository;
