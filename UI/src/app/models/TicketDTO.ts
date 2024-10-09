export interface TicketDTO {
    ticketId: number;
    numberOfSeats: number;
    bookingDate: Date;
    userId: number;
    showId: number;
    movieName?: string;
    showTime?: number;
    screenNumber?: number;
  }