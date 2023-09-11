import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FileStorageService } from '../service/file-storage.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { XmlViewerModalComponent } from '../xml-viewer-modal/xml-viewer-modal.component';
import { Observable, catchError, of, throwError, throwIfEmpty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EditFileNameDialogComponent } from '../edit-file-name-dialog/edit-file-name-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FileType } from '../model/FileType';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  files: any[] = [];

  isLoading = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private fileStorageService: FileStorageService, private router: Router, private dialog: MatDialog) {}

  public file: { content: FileType[], totalElements: number } = { content: [], totalElements: 0 };

  public displayedColumns: string[] = ['fileName', 'download', 'edit', 'view', 'delete'];

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  public dataSource = new MatTableDataSource<FileType>();


  public ngOnInit(): void {
    this.fileStorageService.getAll().subscribe({
        next: response => {
            this.files = response.content;
            this.loadFiles();
        },
        error: error => {
            console.error('Erro ao carregar arquivos:', error);
        }
    });
}

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
        this.dataSource.paginator.pageSize = 5;
    }
}

   public loadFiles() {
       this.dataSource.data = this.files;

}


  public getDownloadLink(file: any): string {
    return file.uploadUrl;
}


  public editFile(uploadId: number, uploadNome: string): void {
  const dialogRef = this.dialog.open(EditFileNameDialogComponent, {
    width: '350px',
    data: { uploadNome: uploadNome }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const updatedData = {
        uploadNome: result
      };

      this.fileStorageService.updateFileName(uploadId, updatedData).subscribe({
        next: (response) => {
          console.log('Nome do arquivo atualizado com sucesso!', response);
        },
        error: (error) => {
          console.error('Erro ao atualizar o nome do arquivo', error);
        }
      });
    }
  });
}


  public viewFile(file: any): void {
   this.loadXmlDataFromFile(file).subscribe({
    next: (xmlData) => {
      const regioes = this.parseXml(xmlData);

      // Abra o modal:
      this.dialog.open(XmlViewerModalComponent, {
        data: { regioes: regioes },
        width: '90vw',
        height: '85vh'
      });
      console.log("Visualizar arquivo:", file.uploadNome);
    },
    error: (error) => {
      console.error('Erro ao carregar o arquivo XML:', error);
    }

  });
}


private parseXml(xmlString: string): { codigo: string; data: string; regiao: string; geracao: number[]; compra: number[]; precoMedio: number[]; }[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");

  const agentes = xmlDoc.getElementsByTagName('agente');
  const result: { codigo: string; data: string; regiao: string; geracao: number[]; compra: number[]; precoMedio: number[]; }[] = [];

  for (let i = 0; i < agentes.length; i++) {
    const agente = agentes[i];

    const regioes = agente.getElementsByTagName('regiao');
    for (let j = 0; j < regioes.length; j++) {
      const regiao = regioes[j];

      result.push({
        codigo: agente.getElementsByTagName('codigo')[0].textContent || "",
        data: agente.getElementsByTagName('data')[0].textContent || "",
        regiao: regiao.getAttribute('sigla') || "",
        geracao: Array.from(regiao.getElementsByTagName('geracao')[0].children).map(e => parseFloat(e.textContent || "0")),
        compra: Array.from(regiao.getElementsByTagName('compra')[0].children).map(e => parseFloat(e.textContent || "0")),
        precoMedio: new Array(Array.from(regiao.getElementsByTagName('geracao')[0].children).length).fill(0) // Este array será sempre preenchido com zeros
      });
    }
  }

  return result;
}


private loadXmlDataFromFile(file: any): Observable<string> {
  const fileUrl = file.uploadUrl;

  return this.http.get(fileUrl, { responseType: 'text' }).pipe(
    catchError(error => {
      console.error('Erro específico ao carregar o arquivo XML:', error);

      // Transformar a mensagem de erro, se necessário
      const errorMsg = `Erro ao carregar o arquivo: ${file.uploadNome}`;

      return of(errorMsg).pipe(throwIfEmpty(() => new Error(errorMsg)));
    })
  );
}


  public deleteFile(file: any): void {
    if (confirm(`Você tem certeza que deseja deletar o arquivo: ${file.uploadNome}?`)) {
        this.isLoading = true;

        this.fileStorageService.delete(file.uploadId).subscribe({
            next: () => {
                const index = this.files.indexOf(file);
                if (index > -1) {
                    this.files.splice(index, 1);
                }

                this.isLoading = false;
                alert('Arquivo deletado com sucesso!');

                // Adiciona um redirecionamento após a deleção
                setTimeout(() => {
                    this.router.navigate(['/list']);
                }, 1000);
            },
            error: (error) => {
                console.error('Erro ao deletar o arquivo:', error);
                this.isLoading = false;
                alert('Erro ao deletar o arquivo. Por favor, tente novamente mais tarde.');
            }
        });
    }
  }

}
