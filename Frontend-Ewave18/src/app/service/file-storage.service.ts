import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FileType } from '../model/FileType';
import { PageResponse } from '../model/PageResponse';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  // Pode ser movido para um arquivo de configuração ou variáveis de ambiente.
  private baseUrl: string = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  private files: File[] = [];

  public uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.baseUrl}/files/uploads`, formData)
      .pipe(catchError(error => this.handleError("Error uploading file:", error)));
  }

  public getDownloadUrl(fileName: string): string {
    return `${this.baseUrl}/files/uploads/${fileName}`;
  }

  public store(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return from(this.readFileAsDataURL(file))
      .pipe(
        switchMap(fileBytes => {
          // Removi o uploadId já que ele pode não ser único
          const fileDetails = {
            "uploadNome": file.name,
            "uploadTipo": file.type,
            "uploadByte": fileBytes,
            "uploadUrl": this.getDownloadUrl(file.name)
          };

          return this.http.post(`${this.baseUrl}/files/uploads`, formData)
            .pipe(catchError(error => this.handleError("Error storing file:", error)));
        })
      );
  }

  private readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        resolve(String(fileReader.result).split(',')[1]);
      };

      fileReader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(error);
      };

      fileReader.readAsDataURL(file);
    });
  }

  public getAll(page: number = 0, size: number = 10): Observable<PageResponse<FileType>> {
    const url = `${this.baseUrl}/files/listar?page=${page}&size=${size}`;
    return this.http.get<PageResponse<FileType>>(url)
      .pipe(catchError(error => this.handleError("Error fetching files:", error)));
  }

  public updateFileName(uploadId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/files/uploads/${uploadId}`, updatedData)
      .pipe(catchError(error => this.handleError("Error updating file name:", error)));
  }

  public delete(uploadId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/files/uploads/${uploadId}`)
      .pipe(catchError(error => this.handleError("Error deleting file:", error)));
  }

  public loadXmlDataFromFile(fileUrl: string): Observable<string> {
    return this.http.get(fileUrl, { responseType: 'text' })
      .pipe(catchError(error => this.handleError("Error loading XML data:", error)));
  }

  public getLastTableData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files/`)
      .pipe(catchError(error => this.handleError("Error fetching last table data:", error)));
  }

  private handleError(errorMessage: string, error: any): Observable<never> {
    console.error(errorMessage, error);
    return throwError(() => error);
  }
}
