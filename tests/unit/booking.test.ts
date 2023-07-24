import ticketsRepository from "@/repositories/tickets-repository"
import  bookingService from "@/services/booking-service/index";
import  bookingRepository  from "@/repositories/booking-repository/index"
import faker from "@faker-js/faker"
import { Ticket, TicketType } from "@prisma/client"
import hotelRepository from "@/repositories/hotel-repository"

beforeEach(() => {
    jest.clearAllMocks()
})

describe("GET /booking - in case of fail", () => {
    it("should return 404 when booking is not found!", async () => {
        const user = faker.datatype.number({ min: 1, max: 100 })
        const bookingMocks = jest.spyOn(bookingRepository, "findReserveByUserId").mockImplementationOnce((): any => {
            return undefined
        })

        const result = bookingService.getRoomsByUserId(user)
        expect(bookingMocks).toBeCalledTimes(1);
        expect(result).rejects.toEqual({
            name: "NotFoundError",
            message: "No result for this search!"
        })
    })
})

describe("PUT /booking/:bookingId in case of fail and success", () => {
    it("should return 403 when the user doest not have a booking", async () => {
        const bookingMock = jest.spyOn(bookingRepository, "findReserveByUserId")
        bookingMock.mockImplementationOnce((): any => {
            return undefined
        })

        const result = bookingService.changeReservation(1, 1, 1)
        await expect(result).rejects.toEqual({
            name: 'NoVacancyError',
            message: 'This room is not available'
        })
        expect(bookingMock).toBeCalledTimes(1)
    })

    it("should returns 403 when the room does not have more capacity", async () => {
        const bookingMock = jest.spyOn(bookingRepository, "findReserveByUserId")
        bookingMock.mockImplementationOnce((): any => {
            return true
        })

        const roomMock = jest.spyOn(hotelRepository, "findCapacityByRoomId")
        roomMock.mockImplementationOnce((): any => {
            return {
                capacity: 1,
                Booking: [1, 2]
            }
        })

        const result = bookingService.changeReservation(1, 1, 1)
        await expect(result).rejects.toEqual({
            name: 'NoVacancyError',
            message: 'This room is not available'
        })
        expect(bookingMock).toBeCalledTimes(1)
        expect(roomMock).toBeCalledTimes(1)
    })

    it("should return 404 when the room does not exist", async () => {
        const bookingMock = jest.spyOn(bookingRepository, "findReserveByUserId")
        bookingMock.mockImplementationOnce((): any => {
            return true
        })

        const roomMock = jest.spyOn(hotelRepository, "findCapacityByRoomId")
        roomMock.mockImplementationOnce((): any => {
            return undefined
        })

        const result = bookingService.changeReservation(1, 1, 1)
        await expect(result).rejects.toEqual({
            name: 'NotFoundError',
            message: 'No result for this search!'
        })
        expect(bookingMock).toBeCalledTimes(1)
        expect(roomMock).toBeCalledTimes(1)
    })

})