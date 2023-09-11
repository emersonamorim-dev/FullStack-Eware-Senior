import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, of, switchMap, throwError } from 'rxjs';
import { FileType } from '../model/FileType';
import { PageResponse } from '../model/PageResponse';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  private baseUrl: string = 'https://royal-impulse-production.up.railway.app/api';

  private generateID(): number {
    // Gera um número aleatório entre 10000 e 99999
    return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  }

  constructor(private http: HttpClient) { }

  private files: File[] = [];

  public uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.baseUrl}/files/uploads` , formData);
  }

  public getDownloadUrl(fileName: string): string {
    return `${this.baseUrl}/files/uploads/${fileName}`;
  }


  public store(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return from(this.readFileAsDataURL(file)).pipe(
      switchMap(fileBytes => {
        const fileDetails = {
          "uploadId": this.generateID(),
          "uploadNome": file.name,
          "uploadTipo": file.type,
          "uploadByte": fileBytes,
          "uploadUrl": this.getDownloadUrl(file.name)
        };


        return this.http.post(`${this.baseUrl}/files/uploads`, formData).pipe(
          catchError(error => {
            console.error("Error storing file:", error);
            return throwError(() => error);
          })
        );
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
  return this.http.get<PageResponse<FileType>>(url);
}


  public updateFileName(uploadId: number, updatedData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put(`${this.baseUrl}/files/uploads/${uploadId}`, JSON.stringify(updatedData), httpOptions);
  }

  public delete(uploadId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/files/uploads/${uploadId}`);
  }


  public loadXmlDataFromFile(fileUrl: string): Observable<string> {
    return this.http.get(fileUrl, { responseType: 'text' });
  }


  getLastTableData(): Observable<any> {
    // O endpoint deve ser configurado para retornar o último arquivo cadastrado
    return this.http.get(`${this.baseUrl}/files/`);
  }

}
