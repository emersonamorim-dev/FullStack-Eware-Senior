package com.codev.BackendEwave.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "file_data")
public class FileData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_data_id")
    private Long id;

    @Column(name = "file_data_codigo", nullable = false)
    private String codigo;

    @Column(name = "file_data_url", nullable = false)
    private String url;

    @Column(name = "file_data_precomedio", nullable = false)
    private String precomedio;

    // Construtores, getters, setters e outros métodos relevantes


    public FileData() {
    }

    public FileData(String codigo, String url, String precomedio) {
        this.codigo = codigo;
        this.url = url;
        this.precomedio = precomedio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPrecoMedio() {
        return precomedio;
    }

    public void setPrecoMedio(String precomedio) {
        this.precomedio = precomedio;
    }


}
