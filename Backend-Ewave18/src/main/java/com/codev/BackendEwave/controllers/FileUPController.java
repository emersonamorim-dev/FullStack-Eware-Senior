package com.codev.BackendEwave.controllers;

import com.codev.BackendEwave.models.UploadedFile;
import com.codev.BackendEwave.models.DTO.UpdateFileDTO;
import com.codev.BackendEwave.services.FileService;


import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class FileUPController {

    @Autowired
    private FileService fileService;  
    

    @PostMapping(value = "/files/uploads", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = file.getOriginalFilename();
        try {
            UploadedFile savedFile = fileService.saveUploadedFile(file, fileName);
            return ResponseEntity.ok(savedFile);
        } catch (FileAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Falha ao salvar o arquivo devido a erro interno.");
        }
    }

@GetMapping("/files/listar")
public Page<UploadedFile> getAllUploads(
        @RequestParam(defaultValue = "0") int page, 
        @RequestParam(defaultValue = "5") int size) {

    Pageable pageable = PageRequest.of(page, size);
    return fileService.getAllUploads(pageable);
}


   @PutMapping("/files/uploads/{uploadId}")
   public ResponseEntity<?> editFile(@PathVariable Long uploadId, @RequestBody UpdateFileDTO updateFileDTO) {
       try {
           UploadedFile updatedFile = fileService.editFile(uploadId, updateFileDTO);
           return ResponseEntity.ok(updatedFile);
       } catch (RuntimeException e) {
           return ResponseEntity.status(500).body("Falha ao atualizar o arquivo devido a um erro interno: " + e.getMessage());
       }
   }
   
    
    
    @DeleteMapping("/files/uploads/{upload_id}")
    public ResponseEntity<?> deleteFile(@PathVariable("upload_id") Long uploadId) {
        try {
            fileService.deleteFile(uploadId);
            return ResponseEntity.ok("{\"message\": \"Arquivo deletado com sucesso.\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Falha ao deletar o arquivo devido a um erro interno.");
        }
    }

    
}


