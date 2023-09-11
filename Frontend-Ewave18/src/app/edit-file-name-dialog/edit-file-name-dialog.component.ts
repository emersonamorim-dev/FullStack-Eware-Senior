import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-file-name-dialog',
  templateUrl: './edit-file-name-dialog.component.html',
  styleUrls: ['./edit-file-name-dialog.component.scss']
})
export class EditFileNameDialogComponent {

  data: any = {};

  constructor(
    public dialogRef: MatDialogRef<EditFileNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingData: any
  ) {
    this.data = incomingData || {};
  }

  public onCancel(): void {
    this.dialogRef.close();
  }


 public onSave(): void {
    this.dialogRef.close(this.data.uploadNome);
  }

}

