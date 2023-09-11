package com.codev.BackendEwave.models.DTO;

public class UpdateFileDTO {
    private String uploadNome;
    private String uploadTipo;

    
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


}