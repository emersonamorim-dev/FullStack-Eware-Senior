package com.codev.BackendEwave.services.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codev.BackendEwave.models.UploadedFile;


public interface FileRepository extends JpaRepository<UploadedFile, Long> {
    Optional<UploadedFile> findByUploadNome(String uploadNome);
}
