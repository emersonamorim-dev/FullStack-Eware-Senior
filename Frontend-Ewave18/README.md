## SUPERXML - Aplicação Frontend Angular 🚀 🔄 🌐

Codificação de Frontend para Teste EWare de aplicação  que se chama SUPERXML é uma aplicação frontend desenvolvida com Angular e Typescript para gerenciamento e visualização, edição e delação de dados XML. Já está integrada ao Backend que foi imppelementado em Java com SpringBoot.


## Service: FileStorageService
Responsável por manipular ações relacionadas ao armazenamento de arquivos.

### Métodos:
- uploadFile(file: File): Faz o upload de um arquivo.
- getDownloadUrl(fileName: string): Retorna o URL de download de um arquivo específico.
- store(file: File): Armazena um arquivo no backend.
- getAll(page: number, size: number): Retorna todos os arquivos paginados.
- updateFileName(uploadId: number, updatedData: any): Atualiza o nome do arquivo.
- delete(uploadId: number): Exclui um arquivo.
- loadXmlDataFromFile(fileUrl: string): Carrega dados de um arquivo XML.
- getLastTableData(): Retorna os dados do último arquivo cadastrado.
- Componente: XmlUploadComponent
- Permite aos usuários fazerem upload de arquivos e visualizar os conteúdos XML carregados.

### Funções principais:
- onFilesSelected(event: Event): Manipula o evento de seleção de arquivos para upload.
- getDownloadLink(file: File): Retorna o link de download para um arquivo específico.
- onViewXML(): Carrega e visualiza os dados do último arquivo XML cadastrado.
- Componente: XmlViewerModalComponent
- Exibe um modal com detalhes de um arquivo XML.

### Funções principais:
Formatação de dados para exibição.
- Componente: FileListComponent
Lista todos os arquivos carregados e fornece funcionalidades para download, edição, visualização e exclusão de arquivos.

### Funções principais:
- loadFiles(): Carrega todos os arquivos.
- getDownloadLink(file: any): Retorna o link de download para um arquivo.
- editFile(uploadId: number, uploadNome: string): Permite a edição do nome de um arquivo.
- viewFile(file: any): Abre um modal para visualizar os detalhes do arquivo XML.
- deleteFile(file: any): Exclui um arquivo.
- Componente: [Nome do último componente]
- Como o texto foi cortado, você pode continuar a partir daqui, descrevendo as funcionalidades do último componente mencionado.

Instalação
Para instalar e executar o projeto, siga os passos abaixo:


### Clone o repositório
```
git clone [link-do-repositório]
```

### Navegue até o diretório do projeto
```
cd [nome-do-diretório]
```

### Instale as dependências
```
npm install
```

### Execute a aplicação
```
ng serve
```

Acesse a aplicação em 
```
http://localhost:4200.
```

🚀 Recursos
Menu Hamburger: Facilita a navegação em dispositivos móveis.
Notificações: Exibe notificações para o usuário.
Perfil de Usuário: Área para gerenciar as informações do usuário.
Visualização de XML: Analisa e exibe dados XML de uma maneira amigável ao usuário.

Instalação
Para instalar e executar o projeto, siga os passos abaixo:

bash
Copy code
### Clone o repositório
git clone [link-do-repositório]

### Navegue até o diretório do projeto
cd [nome-do-diretório]

### Instale as dependências
npm install

### Execute a aplicação
ng serve
Acesse a aplicação em http://localhost:4200.




### Tecnologias Utilizadas 🛠️

- ![Angular](https://img.shields.io/badge/-Angular-DD0031?style=flat-square&logo=angular&logoColor=white) - Framework de desenvolvimento frontend.
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) - Linguagem de programação.
- ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) - Ambiente de execução JavaScript do lado do servidor.
- ![SCSS](https://img.shields.io/badge/-SCSS-CC6699?style=flat-square&logo=sass&logoColor=white) - Pré-processador CSS.


###Sequence Diagram
                    
```seq
Emerson->Brazil: Says Hello 
Note right of Brazil: Brazil thinks\nabout it 
Brazil-->Emerson: How are you? 
Emerson->>Emerson: I am good thanks!
```



### Desenvolvido por:
Emerson Amorim
