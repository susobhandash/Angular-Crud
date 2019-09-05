import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  title = 'keep';
  result: any;

  errorMessage: string;
  errorMessageType: string;
  listView = false;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    // this.getMsg();
  }

  onNoteAdd(event) {
    this.errorMessage = event.msg;
    this.errorMessageType = event.type;
    this.openSnackBar(this.errorMessage, this.errorMessageType);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
