package com.codev.BackendEwave.services;

import com.codev.BackendEwave.models.UploadedFile;
import com.codev.BackendEwave.models.DTO.UpdateFileDTO;
import com.codev.BackendEwave.services.repository.FileRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class FileService {

    private static final Logger logger = LoggerFactory.getLogger(FileService.class);
    // Aqui, eu mudei para um caminho absoluto para clareza, mas você pode ajustar de acordo com sua necessidade.
    private static final String UPLOADED_FOLDER = "./uploads/";

    @Autowired
    private FileRepository fileRepository;

    public UploadedFile saveUploadedFile(MultipartFile file, String UploadNome) throws IOException {
        String contentType = file.getContentType();
        String fileName = file.getOriginalFilename();

        if (file.isEmpty()) {
            throw new IllegalArgumentException("Selecione um arquivo para fazer upload");
        }

        if (!fileName.endsWith(".xml") || !(contentType.equals("application/xml") || contentType.equals("text/xml"))) {
            throw new IllegalArgumentException("Somente arquivos XML permitidos!");
        }

        // Verifique se o arquivo com o mesmo nome já existe no banco de dados
        Optional<UploadedFile> existingFile = fileRepository.findByUploadNome(UploadNome);
        if (existingFile.isPresent()) {
            throw new IllegalArgumentException("Ja existe um arquivo com o mesmo nome. Renomeie seu arquivo e tente novamente.");
        }

        byte[] bytes = file.getBytes();
        Path directory = Paths.get(UPLOADED_FOLDER);
        Path path = directory.resolve(fileName);

        // Verifique e crie o diretório se não existir
        if (!Files.exists(directory)) {
            try {
                Files.createDirectories(directory);
            } catch (IOException e) {
                logger.error("Erro ao criar o diretório", e);
                throw new RuntimeException("Não foi possível criar o diretório de uploads", e);
            }
        }

        // Log the full path where you're trying to save the file
        logger.info("Tentando salvar o arquivo no caminho: " + path.toAbsolutePath().toString());

        try {
            Files.write(path, bytes);
        } catch (IOException e) {
            logger.error("Erro ao salvar o arquivo", e);
            throw e;
        }

        String uploadUrl = "http://localhost:8081/uploads/" + fileName;

        UploadedFile dbFile = new UploadedFile(fileName, contentType, bytes, uploadUrl);
        // definindo a URL
        dbFile.setUploadUrl(uploadUrl); 
        return fileRepository.save(dbFile);
    }


    public Page<UploadedFile> getAllUploads(Pageable pageable) {
        return fileRepository.findAll(pageable);
    }
    
    
    @Transactional
    public UploadedFile editFile(Long uploadId, UpdateFileDTO updateFileDTO) {
        Optional<UploadedFile> existingFileOpt = fileRepository.findById(uploadId);
        if (!existingFileOpt.isPresent()) {
            throw new RuntimeException("Arquivo não encontrado com o upload_id: " + uploadId);
        }
        UploadedFile existingFile = existingFileOpt.get();
    
        // Verificando se o nome do arquivo é nulo
        if(updateFileDTO.getUploadNome() != null) {
            existingFile.setUploadNome(updateFileDTO.getUploadNome());
        }
        if(updateFileDTO.getUploadTipo() != null) {
            existingFile.setUploadTipo(updateFileDTO.getUploadTipo());
        }
        
        return fileRepository.save(existingFile);
    }
    

    public void deleteFile(Long uploadId) {
        if (fileRepository.existsById(uploadId)) {
            fileRepository.deleteById(uploadId);
        } else {

            System.out.println("Arquivo não encontrado com o upload_id: " + uploadId);
        }
    }
    
}
