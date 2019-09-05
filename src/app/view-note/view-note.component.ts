import { Component, OnInit, Input, TemplateRef, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../note';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.less']
})

export class ViewNoteComponent implements OnInit, OnChanges {

  notes: any;
  public data: any;
  public dialogRef: MatDialogRef<{}, any>;
  errMessage = {};
  @Output() noteUpdate = new EventEmitter();
  @Input() listView;
  showList = this.listView;
  displayedColumns = ['id', 'title', 'body'];

  constructor(public dialog: MatDialog, private messageService: MessageService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.showList = changes && changes.listView ? changes.listView.currentValue : this.showList;
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.messageService.getMessage().subscribe(data => {
      this.notes = data;
      this.getUpdatedNotes();
    });
  }

  getUpdatedNotes() {
    this.messageService.updatedNotes$.subscribe(val => {
      // this.notes.push(val);
      let index;
      this.notes.forEach((element, i, a) => {
        if (element.id === val.id) {
          index = i + 1;
        }
      });

      if (index) {
        this.notes[index - 1] = val;
      } else {
        this.notes.push(val);
      }

      this.errMessage = {
        msg: 'Data updated successfully',
        type: 'success'
      };
      this.noteUpdate.emit(this.errMessage);
    });
  }

  openEditModal(modalRef: TemplateRef<any>, noteData): void {
    this.data = {...noteData};
    this.dialogRef = this.dialog.open(modalRef, {
      width: '400px'
    });
  }

  updateNote(note) {
    this.messageService.patchMessage(note).subscribe(data => {
      this.messageService.updateNotes.next(data);
    });
    this.dialogRef.close();
  }

}
