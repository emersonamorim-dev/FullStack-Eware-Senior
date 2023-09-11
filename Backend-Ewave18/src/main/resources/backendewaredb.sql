CREATE DATABASE backendewaredb;

USE backendewaredb;

CREATE TABLE agentes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(255) NOT NULL,
    data VARCHAR(255) NOT NULL,
    regiao VARCHAR(255) NOT NULL,
    geracao INT NOT NULL,
    compra INT NOT NULL
);


CREATE TABLE upload_table (
    upload_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    upload_nome VARCHAR(255) NOT NULL,
    upload_tipo VARCHAR(255) NOT NULL,
    upload_byte LONGBLOB NOT NULL,
    upload_URL VARCHAR(255) NOT NULL
);

CREATE TABLE file_data (
    file_data_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    file_data_codigo VARCHAR(255) NOT NULL,
    file_data_url VARCHAR(255) NOT NULL,
    file_data_precomedio VARCHAR(255) NOT NULL
);
