import { Component, ElementRef, ViewChild } from '@angular/core';
import { FileStorageService } from '../service/file-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-xml-upload',
  templateUrl: './xml-upload.component.html',
  styleUrls: ['./xml-upload.component.scss']
})
export class XmlUploadComponent {
  @ViewChild('fileInput', { static: true })
  fileInput!: ElementRef;
  isLoading = false;
  file: any;

  uploadedFiles: File[] = [];
  xmlData: string | undefined;


  constructor(private fileStorage: FileStorageService, private router: Router) {}

  public onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.isLoading = true;

    this.fileStorage.store(input.files[0]).subscribe(
      response => {
        console.log('File stored:', response);
        this.isLoading = false;

        // Introduzindo um atraso antes de navegar
        setTimeout(() => {
          this.router.navigate(['/list']); // Navega para a lista após o atraso
        }, 2000);
      },
      error => {
        console.error('Error storing file:', error);
        this.isLoading = false;
      }
    );
}

   public getDownloadLink(file: File) {
    return '/download/' + file.name;
  }


  onViewXML() {
    this.fileStorage.getLastTableData().subscribe(data => {
      this.xmlData = this.convertToXML(data);
    });
  }

  convertToXML(data: any): string {
    let xml = '<root>';

    for (let key in data) {
      xml += `<${key}>${data[key]}</${key}>`;
    }

    xml += '</root>';
    return xml;
  }
}
