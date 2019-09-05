import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Note } from '../note';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.less']
})
export class AddNoteComponent implements OnInit {

  note: Note;
  errMessage = {};
  @Output() noteAdd = new EventEmitter();

  constructor( private messageService: MessageService ) {
    this.note = new Note();
  }

  ngOnInit() {

  }

  postMsg() {
    if (this.note.title && this.note.body) {
      this.messageService.pushMessage(this.note).subscribe(data => {
        console.log(data);
        this.errMessage = {
          msg: 'Saved Successfully',
          type: 'success'
        };
        this.noteAdd.emit(this.errMessage);
        this.note = new Note();
        this.messageService.updateNotes.next(data);
      },
      error => {
        this.errMessage = {
          msg: error.message,
          type: 'error'
        };
        this.noteAdd.emit(this.errMessage);
      });
    } else {
      this.errMessage = {
        msg: 'Title and Message are mandatory',
        type: 'error'
      };
      this.noteAdd.emit(this.errMessage);
    }
  }

}
