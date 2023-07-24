import faker from '@faker-js/faker';
import ticketsRepository from '@/repositories/tickets-repository';
import bookingService from '@/services/booking-service/index';
import bookingRepository from '@/repositories/booking-repository/index';
//import { Ticket, TicketType } from "@prisma/client"
import hotelRepository from '@/repositories/hotel-repository';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET /booking error cases', () => {
  it('should return 404 when booking not found', async () => {
    const user = faker.datatype.number({ min: 1, max: 100 });
    const bookingMocks = jest.spyOn(bookingRepository, 'findReserveByUserId').mockImplementationOnce((): any => {
      return undefined;
    });

    const result = bookingService.getRooms(user);
    expect(bookingMocks).toBeCalledTimes(1);
    expect(result).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });
});
/*
describe("POST /booking errors cases", () => {
    it("should return 404 if the room does not exist", async () => {
        const roomMock = jest.spyOn(hotelRepository, "findCapacityByRoomId").mockImplementationOnce((): any => {
            return undefined
        })

        const result = bookingService.makeReseve(1, 1)
        expect(roomMock).toBeCalledTimes(1)
        expect(result).rejects.toEqual({
            name: 'NotFoundError',
            message: 'No result for this search!',
        })
    })

    it("should return 403 when event is remote", () => {
        jest.spyOn(hotelRepository, "findCapacityByRoomId").mockImplementationOnce((): any => {
            return true
        })

        const ticketMock = jest.spyOn(ticketsRepository, "findTicketByUserId")
        ticketMock.mockImplementationOnce((): any => {
            return {
                status: "PAID",
                TicketType: {
                    includesHotel: true,
                    isRemote: true
                }
            }
        })

        const result = bookingService.makeReseve(1, 1)
        expect(result).rejects.toEqual({
            name: 'ForBiddenBooking',
            message: 'You cannot make reservations',
        })
    })
    it("should return 403 when event has no hotel", () => {
        jest.spyOn(hotelRepository, "findCapacityByRoomId").mockImplementationOnce((): any => {
            return true
        })

        const ticketMock = jest.spyOn(ticketsRepository, "findTicketByUserId")
        ticketMock.mockImplementationOnce((): any => {
            return {
                status: "PAID",
                TicketType: {
                    includesHotel: false,
                    isRemote: false
                }
            }
        })

        const result = bookingService.makeReseve(1, 1)
        expect(result).rejects.toEqual({
            name: 'ForBiddenBooking',
            message: 'You cannot make reservations',
        })
    })
    it("Returns status 403 if the user's ticket has not been paid", () => {
        jest.spyOn(hotelRepository, "findCapacityByRoomId").mockImplementationOnce((): any => {
            return true
        })

        const ticketMock = jest.spyOn(ticketsRepository, "findTicketByUserId")
        ticketMock.mockImplementationOnce((): any => {
            return {
                status: "RESERVED",
                TicketType: {
                    includesHotel: true,
                    isRemote: false
                }
            }
        })

        const result = bookingService.makeReseve(1, 1)
        expect(result).rejects.toEqual({
            name: 'ForBiddenBooking',
            message: 'You cannot make reservations',
        })
    })

    it("should return 403 when room is full", () => {
        jest.spyOn(hotelRepository, "findCapacityByRoomId").mockImplementationOnce((): any => {
            return {
                capacity: 3,
                Booking: [1, 2, 3, 4]
            }
        })

        const ticketMock = jest.spyOn(ticketsRepository, "findTicketByUserId")
        ticketMock.mockImplementationOnce((): any => {
            return {
                status: "PAID",
                TicketType: {
                    includesHotel: true,
                    isRemote: false
                }
            }
        })

        const result = bookingService.makeReseve(1, 1)
        expect(result).rejects.toEqual({
            name: 'ForBiddenBooking',
            message: 'You cannot make reservations',
        })
    })

})
*/
describe('PUT /booking/:bookingId cases erros and sucess', () => {
  it('should returns 403 when not have booking', async () => {
    const bookingMock = jest.spyOn(bookingRepository, 'findReserveByUserId');
    bookingMock.mockImplementationOnce((): any => {
      return undefined;
    });

    const result = bookingService.changeRoom(1, 1, 1);
    await expect(result).rejects.toEqual({
      name: 'ForBiddenBooking',
      message: 'You cannot make reservations',
    });
    expect(bookingMock).toBeCalledTimes(1);
  });
  it('should returns 404 when not have room', async () => {
    const bookingMock = jest.spyOn(bookingRepository, 'findReserveByUserId');
    bookingMock.mockImplementationOnce((): any => {
      return true;
    });

    const roomMock = jest.spyOn(hotelRepository, 'findCapacityByRoomId');
    roomMock.mockImplementationOnce((): any => {
      return undefined;
    });

    const result = bookingService.changeRoom(1, 1, 1);
    await expect(result).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
    expect(bookingMock).toBeCalledTimes(1);
    expect(roomMock).toBeCalledTimes(1);
  });
  it('should returns 403 when not have more capacity in room', async () => {
    const bookingMock = jest.spyOn(bookingRepository, 'findReserveByUserId');
    bookingMock.mockImplementationOnce((): any => {
      return true;
    });

    const roomMock = jest.spyOn(hotelRepository, 'findCapacityByRoomId');
    roomMock.mockImplementationOnce((): any => {
      return {
        capacity: 1,
        Booking: [1, 2],
      };
    });

    const result = bookingService.changeRoom(1, 1, 1);
    await expect(result).rejects.toEqual({
      name: 'ForBiddenBooking',
      message: 'You cannot make reservations',
    });
    expect(bookingMock).toBeCalledTimes(1);
    expect(roomMock).toBeCalledTimes(1);
  });
});
