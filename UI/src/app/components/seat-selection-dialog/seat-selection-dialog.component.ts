// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { ShowDTO } from '../../models/ShowDTO';
// import { TicketDTO } from '../../models/TicketDTO';
// import { CustomerService } from '../../services/customer.service';

// @Component({
//   selector: 'app-seat-selection-dialog',
//   templateUrl: './seat-selection-dialog.component.html',
//   styleUrl: './seat-selection-dialog.component.css'
// })
// export class SeatSelectionDialogComponent {
//   userId: number = 0;
//   seats: number = 1;
//   totalAmount: number = 0;
//   availableSeats: number;
//   errorMessage: string = '';
//   constructor(
//     public dialogRef: MatDialogRef<SeatSelectionDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { show: ShowDTO }, private customerService: CustomerService,
//   ) {
//     this.availableSeats = data.show.numberOfSeats; // Total seats in the show
//     this.totalAmount = this.seats * this.data.show.price;
//     this.userId= parseInt(localStorage.getItem('user_id')!, 10) 
//   }

  
//   onCancel(): void {
//     this.dialogRef.close();
//   }
//   ngOnChanges(): void {
//     this.updateTotalAmount();
//   }

//   updateTotalAmount(): void {
//     this.totalAmount = this.seats * this.data.show.price;
//   }
//   onConfirm(): void 
//   {
//     const newTicket: TicketDTO = {
//             numberOfSeats:  this.availableSeats,
//             bookingDate: new Date(),
//             userId: this.userId,
//             showId: this.data.show.showId,
//             ticketId: 0
//           };
//       this.customerService.bookTicket(newTicket).subscribe({
//         next: (ticket) => {
//           this.dialogRef.close({ seats: this.seats, totalAmount: this.totalAmount });
//         },
//         error: (err) => {
//           if (err.status === 400) {
//                       this.errorMessage = err.error; // This will display the exact backend error message
//                     } else {
//                       this.errorMessage = 'Failed to book ticket. Please try again.';
//                     }
//           console.error(err);
//         }
//       });
   
// }
// }
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShowDTO } from '../../models/ShowDTO';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-seat-selection-dialog',
  templateUrl: './seat-selection-dialog.component.html',
  styleUrls: ['./seat-selection-dialog.component.css']
})
export class SeatSelectionDialogComponent {
  userId: number = 0;
  private _seats: number = 1; // backing field for seats
  totalAmount: number = 0;
  availableSeats: number;
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<SeatSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { show: ShowDTO },
    private customerService: CustomerService
  ) {
    this.availableSeats = data.show.numberOfSeats;
    this.updateTotalAmount();  // initialize total amount
    this.userId = parseInt(localStorage.getItem('user_id')!, 10);
  }

  // Setter for seats to update totalAmount when seats change
  set seats(value: number) {
    this._seats = value;
    this.updateTotalAmount();
  }

  get seats(): number {
    return this._seats;
  }

  // Method to update total price
  updateTotalAmount(): void {
    this.totalAmount = this._seats * this.data.show.price;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    const newTicket = {
      numberOfSeats: this._seats,
      bookingDate: new Date(),
      userId: this.userId,
      showId: this.data.show.showId,
      ticketId: 0
    };

    this.customerService.bookTicket(newTicket).subscribe({
      next: () => {
        this.dialogRef.close({ seats: this._seats, totalAmount: this.totalAmount });
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMessage = err.error;
        } else {
          this.errorMessage = 'Failed to book ticket. Please try again.';
        }
        console.error(err);
      }
    });
  }
}
