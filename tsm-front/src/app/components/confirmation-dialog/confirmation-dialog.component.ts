import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  randomTextChallenge: string; 
  userInput: string = '';
  isConfirmed: boolean = false; 

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  ngOnInit(): void {
    this.randomTextChallenge = this.generateRandomText(7);
  }

  onConfirmClick(): void {
    if (this.userInput === this.randomTextChallenge) {
      this.isConfirmed = true;
      this.dialogRef.close('confirmed');
    } else {
      this.dialogRef.close('canceled');
    }
  }

  generateRandomText(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let challenge = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      challenge += characters.charAt(randomIndex);
    }
    return challenge;
  }
}