import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { XmlUploadComponent } from './xml-upload/xml-upload.component';
import { FileListComponent } from './file-list/file-list.component';

import { AppRoutingModule } from './app-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { XmlViewerModalComponent } from './xml-viewer-modal/xml-viewer-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe, DecimalPipe } from '@angular/common';
import { EditFileNameDialogComponent } from './edit-file-name-dialog/edit-file-name-dialog.component';
import { FormsModule } from '@angular/forms';
import { FileStorageService } from './service/file-storage.service';
import { HeaderComponent } from './header/header.component';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [AppComponent, XmlUploadComponent, FileListComponent, XmlViewerModalComponent, EditFileNameDialogComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,


  ],
  providers: [FileStorageService, DatePipe, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
