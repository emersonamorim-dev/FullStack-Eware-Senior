package com.codev.BackendEwave.controllers;

import com.codev.BackendEwave.models.Agente;
import com.codev.BackendEwave.models.FileData;
import com.codev.BackendEwave.services.FileDataService;

import jakarta.annotation.Resource;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.AbstractFileResolvingResource;
import org.springframework.core.io.AbstractResource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.net.MalformedURLException;
import java.net.URI;
import java.nio.file.Path;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")   
public class FileDownController {

    @Autowired
    private FileDataService fileDataService;
    private URI UPLOADED_FOLDER;

    @GetMapping("/download/submercado/precoMedio")
    public List<FileData> getFilesWithoutSensitiveData() {
        return fileDataService.getAllFilesWithoutSensitiveData();
    }

    @GetMapping("/download/codigo/{code}")
    public ResponseEntity<Agente> getAgentByCode(@PathVariable String code) {
        Optional<Agente> agent = fileDataService.getAgentByCode(code);
        if (agent.isPresent()) {
            return ResponseEntity.ok(agent.get());
        } else {
            return ResponseEntity.notFound().build();
        }
}

    @GetMapping("/download/verxml/{upload_id}")
    public ResponseEntity<String> getXMLContent(@PathVariable Long upload_id) {
        String content = fileDataService.getXMLContentByUrl(upload_id);
        if (content == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(content);
    }

    @PostMapping("/download/salvar")
    public ResponseEntity<FileData> uploadFileData(@RequestBody FileData fileData) {
        FileData savedFile = fileDataService.saveFileData(fileData);
        if (savedFile == null) {
            return ResponseEntity.badRequest().build(); 
        }
        return ResponseEntity.ok(savedFile);
    }


    @GetMapping("/download/uploads/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        Path path = Paths.get(UPLOADED_FOLDER + fileName);
        Resource resource;
        try {
            resource = (Resource) new UrlResource(path.toUri());
            if (((AbstractFileResolvingResource) resource).exists()) {
                return ResponseEntity.ok()
                        .header("Content-Disposition", "attachment; filename=\"" + ((AbstractResource) resource).getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

