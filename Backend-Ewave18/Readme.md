## Aplicação Backend Eware - Java e SpringBoot 🚀 🔄 🌐

Codificação de um Backend para Teste Eware desenvolvido em Java utilizando o framework Spring Boot com usso de Banco de dados MySQL para cadastrar os dados e com tabela já criada pronta para subir para gerenciador de Banco de dados. A aplicação é projetada para fornecer uma API RESTful para seus consumidores.

## Tabela de Conteúdos

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar](#como-executar)
- [Endpoints](#endpoints)
- [Dockerização](#dockerização)
- [Contribuição](#contribuição)

## Tecnologias Utilizadas

- **Java**: Linguagem de programação usada para desenvolver a aplicação.
- **Spring Boot**: Framework utilizado para facilitar o desenvolvimento da aplicação.
- **Maven**: Ferramenta de automação de compilação utilizada.
- **Docker**: Usado para containerizar a aplicação.

## Como Executar

1. Clone este repositório:
```
git clone <url_do_repositório>
```

2. Navegue até o diretório do projeto:
```
cd <nome_do_diretorio>
```

3. Compile e execute a aplicação usando Maven:
```
mvn spring-boot:run

```

 ####  A aplicação estará rodando na porta 8081.

## Rode aplicação através da Dockerização
Este projeto vem com um Dockerfile que permite que ele seja executado dentro de um container. Para construir e executar o container, use:

```
docker build -t nome_da_imagem .
```
```
docker run -p 8080:8080 nome_da_imagem
```


## FileDownController Descrição

O `FileDownController` é responsável por lidar com as operações relacionadas ao download de arquivos e obtenção de informações associadas.

## Endpoints

### **Buscar todos os arquivos sem dados sensíveis**
- **Endpoint**: `/api/download/submercado/precoMedio`
- **Método HTTP**: `GET`
- **Descrição**: Retorna uma lista de todos os arquivos sem dados sensíveis.

### **Buscar agente por código**
- **Endpoint**: `/api/download/codigo/{code}`
- **Método HTTP**: `GET`
- **Descrição**: Retorna os detalhes do agente com base no código fornecido.

### **Obter conteúdo XML por ID de upload**
- **Endpoint**: `/api/download/verxml/{upload_id}`
- **Método HTTP**: `GET`
- **Descrição**: Retorna o conteúdo XML do arquivo associado ao ID de upload fornecido.

### **Salvar dados do arquivo**
- **Endpoint**: `/api/download/salvar`
- **Método HTTP**: `POST`
- **Descrição**: Salva os detalhes do arquivo fornecidos no corpo da solicitação.

### **Baixar arquivo pelo nome**
- **Endpoint**: `/api/download/uploads/{fileName:.+}`
- **Método HTTP**: `GET`
- **Descrição**: Fornece o arquivo para download com base no nome fornecido.


## FileUPController Descrição

O `FileUPController` é responsável por lidar com as operações associadas ao upload, edição e deleção de arquivos.

## Endpoints

### **Upload de arquivo**
- **Endpoint**: `/api/files/uploads`
- **Método HTTP**: `POST`
- **Descrição**: Realiza o upload de um arquivo para o servidor. Em caso de sucesso, retorna os detalhes do arquivo salvo.

### **Listar todos os uploads**
- **Endpoint**: `/api/files/listar`
- **Método HTTP**: `GET`
- **Descrição**: Lista todos os arquivos uploadados, com paginação. Os parâmetros `page` e `size` podem ser usados para controlar o número da página e a quantidade de registros por página, respectivamente.

### **Editar detalhes do arquivo**
- **Endpoint**: `/api/files/uploads/{uploadId}`
- **Método HTTP**: `PUT`
- **Descrição**: Edita os detalhes de um arquivo previamente carregado com base no ID de upload fornecido.

### **Deletar arquivo pelo ID**
- **Endpoint**: `/api/files/uploads/{upload_id}`
- **Método HTTP**: `DELETE`
- **Descrição**: Deleta o arquivo com base no ID de upload fornecido.



## AgenteController Descrição

O `AgenteController` é responsável por lidar com as operações CRUD relacionadas aos `Agentes` na aplicação.

## Endpoints

### **Buscar todos os agentes**
- **Endpoint**: `/api`
- **Método HTTP**: `GET`
- **Descrição**: Retorna uma lista de todos os agentes disponíveis.
  
### **Buscar agente por ID**
- **Endpoint**: `/api/agentes/{id}`
- **Método HTTP**: `GET`
- **Descrição**: Retorna os detalhes do agente com base no ID fornecido.
  
### **Criar novo agente**
- **Endpoint**: `/api`
- **Método HTTP**: `POST`
- **Descrição**: Cria um novo agente com os detalhes fornecidos no corpo da solicitação.
  
### **Atualizar agente**
- **Endpoint**: `/api/agentes/{id}`
- **Método HTTP**: `PUT`
- **Descrição**: Atualiza o agente com o ID fornecido com os detalhes fornecidos no corpo da solicitação.
  
### **Deletar agente**
- **Endpoint**: `/api/agentes/{id}`
- **Método HTTP**: `DELETE`
- **Descrição**: Deleta o agente com o ID fornecido.


## FileDataService Descrição

O `FileDataService` é um serviço no Spring que lida com operações relacionadas a dados de arquivos, incluindo manipulações XML.

## Métodos

### **getAllFilesWithoutSensitiveData()**
- **Retorno**: `List<FileData>`
- **Descrição**: Recupera todos os registros de arquivos do repositório, "limpando" o campo `precoMedio` de cada registro.

### **getAgentCodes()**
- **Retorno**: `List<String>`
- **Descrição**: Obtém uma lista de códigos de agentes de todos os registros de arquivos. Durante a recuperação, imprime cada código na saída padrão.

### **saveFileData(FileData fileData)**
- **Parâmetros**: `FileData fileData`
- **Retorno**: `FileData`
- **Descrição**: Salva os dados do arquivo fornecido no repositório e retorna o registro salvo.

### **getXMLContentByUrl(Long uploadId)**
- **Parâmetros**: `Long uploadId`
- **Retorno**: `String`
- **Descrição**: Lê o conteúdo do arquivo XML do caminho especificado e retorna sua representação em String.

### **getAgentByCode(String code)**
- **Parâmetros**: `String code`
- **Retorno**: `Optional<Agente>`
- **Descrição**: Este método tenta encontrar um agente com o código fornecido a partir de um arquivo XML especificado e retorna uma instância opcional do agente.



## FileService Descrição

O `FileService` é um serviço Spring que lida com operações relacionadas a arquivos enviados.

## Métodos

### **saveUploadedFile(MultipartFile file, String UploadNome)**
- **Parâmetros**:
  - `MultipartFile file`
  - `String UploadNome`
- **Retorno**: `UploadedFile`
- **Descrição**: Este método processa o arquivo fornecido, valida o tipo, verifica se já existe um arquivo com o mesmo nome e salva o arquivo no sistema de arquivos. Em seguida, salva os detalhes no banco de dados.

### **getAllUploads(Pageable pageable)**
- **Parâmetros**: `Pageable pageable`
- **Retorno**: `Page<UploadedFile>`
- **Descrição**: Retorna uma página contendo todos os arquivos enviados, usando o objeto pageable fornecido para paginação.

### **editFile(Long uploadId, UpdateFileDTO updateFileDTO)**
- **Parâmetros**:
  - `Long uploadId`
  - `UpdateFileDTO updateFileDTO`
- **Retorno**: `UploadedFile`
- **Descrição**: Atualiza os detalhes do arquivo existente no banco de dados. Se o arquivo especificado não for encontrado, uma exceção será lançada.

### **deleteFile(Long uploadId)**
- **Parâmetros**: `Long uploadId`
- **Retorno**: `void`
- **Descrição**: Deleta o arquivo com o ID fornecido do banco de dados. Se o arquivo não for encontrado, imprime uma mensagem de erro na saída padrão.



## Tecnologias Utilizadas 🛠️

- ![Java](https://img.shields.io/badge/-Java-007396?style=flat-square&logo=java&logoColor=white) - Linguagem de programação principal.
- ![SpringBoot](https://img.shields.io/badge/-SpringBoot-6DB33F?style=flat-square&logo=spring&logoColor=white) - Framework de desenvolvimento para Java.
- ![MySql](https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white) - Sistema de gerenciamento de banco de dados.
- ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white) - Para containerização.



###Sequence Diagram
                    
```seq
Emerson->Brazil: Says Hello 
Note right of Brazil: Brazil thinks\nabout it 
Brazil-->Emerson: How are you? 
Emerson->>Emerson: I am good thanks!
```



Desenvolvido por [Emerson Amorim](link_do_seu_perfil_no_GitHub)

