import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Regiao } from '../model/Regiao';


@Component({
  selector: 'app-xml-viewer-modal',
  templateUrl: './xml-viewer-modal.component.html',
  styleUrls: ['./xml-viewer-modal.component.scss']
})
export class XmlViewerModalComponent {

  columns = [
    { id: 'codigo', label: 'Código' },
    { id: 'data', label: 'Data' },
    { id: 'regiao', label: 'Região' },
    { id: 'geracao', label: 'Geração' },
    { id: 'compra', label: 'Compra' },
    { id: 'precoMedio', label: 'Preço Médio' }
  ];

  displayedColumns: string[] = this.columns.map(column => column.id);

  dataSource: any[] = [];  // Adicione a estrutura de dados aqui.


  private formatValues(values: number | number[]): string {
    if (Array.isArray(values)) {
        return values.map(val => this.decimalPipe.transform(val, '1.2-2') || '').join('\n');
    } else {
        return this.decimalPipe.transform(values, '1.2-2') || '';
    }
}


constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private datePipe: DatePipe, private decimalPipe: DecimalPipe) {
    this.dataSource = data.regioes.map((regiao: Regiao) =>  ({
        ...regiao,
        data: this.datePipe.transform(regiao.data, 'dd/MM/yyyy'),
        geracao: this.formatValues(regiao.geracao),
        compra: this.formatValues(regiao.compra),
        precoMedio: this.formatValues(regiao.precoMedio)
    }));
}


}
