package com.codev.BackendEwave.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "upload_table")
public class UploadedFile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "upload_id")
    private Long uploadId;

    @Column(name = "upload_nome")
    private String uploadNome;

    @Column(name = "upload_tipo")
    private String uploadTipo;

    @Lob
    @Column(name = "upload_byte", columnDefinition = "LONGBLOB")
    private byte[] uploadByte;

    @Column(name = "upload_url")
    private String uploadUrl;


    public UploadedFile() {
    }

    public UploadedFile(String uploadNome, String uploadTipo, byte[] uploadByte, String uploadUrl) {
        this.uploadNome = uploadNome;
        this.uploadTipo = uploadTipo;
        this.uploadByte = uploadByte;
        this.uploadUrl = uploadUrl;
    }

    public Long getUploadId() {
        return uploadId;
    }

    public void setUploadId(Long uploadId) {
        this.uploadId = uploadId;
    }

    public String getUploadNome() {
        return uploadNome;
    }

    public void setUploadNome(String uploadNome) {
        this.uploadNome = uploadNome;
    }

    public String getUploadTipo() {
        return uploadTipo;
    }

    public void setUploadTipo(String uploadTipo) {
        this.uploadTipo = uploadTipo;
    }

    public byte[] getUploadByte() {
        return uploadByte;
    }

    public void setUploadByte(byte[] uploadByte) {
        this.uploadByte = uploadByte;
    }

    public String getUploadUrl() {
        return uploadUrl;
    }

    public void setUploadUrl(String uploadUrl) {
        this.uploadUrl = uploadUrl;
    }
}
