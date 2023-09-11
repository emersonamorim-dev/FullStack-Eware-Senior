import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileListComponent } from './file-list/file-list.component';
import { XmlUploadComponent } from './xml-upload/xml-upload.component';

const routes: Routes = [
  { path: '', component: XmlUploadComponent },
  { path: 'list', component: FileListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
