package com.codev.BackendEwave.services;

import com.codev.BackendEwave.models.FileData;
import com.codev.BackendEwave.models.Agente;
import com.codev.BackendEwave.services.repository.FileDataRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Element;

@Service
public class FileDataService {

    @Autowired
    private FileDataRepository fileDataRepository;

    public List<FileData> getAllFilesWithoutSensitiveData() {
        return fileDataRepository.findAll().stream()
        // Aqui "limpando" o preço médio.
            .peek(file -> file.setPrecoMedio("")) 
            .collect(Collectors.toList());
    }

    public List<String> getAgentCodes() {
        return fileDataRepository.findAll().stream()
            .map(FileData::getCodigo)
            // Imprimindo código na saída padrão
            .peek(code -> System.out.println(code)) 
            .collect(Collectors.toList());
    }

    public FileData saveFileData(FileData fileData) {
        return fileDataRepository.save(fileData);
    }

    // Método para obter o conteúdo do arquivo XML de uma URL
    public String getXMLContentByUrl(Long uploadId) {

        Path path = Paths.get("./uploads/exemplo_01.xml");
        
        if (!Files.exists(path)) {
            return null;
        }
        
        try {
            return new String(Files.readAllBytes(path), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException("Falha ao ler o arquivo XML.", e);
        }
    }


    public Optional<Agente> getAgentByCode(String code) {
    try {
        File inputFile = new File("./uploads/exemplo_01.xml");
        DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
        Document doc = dBuilder.parse(inputFile);
        doc.getDocumentElement().normalize();

        NodeList nList = doc.getElementsByTagName("agente");
        for (int temp = 0; temp < nList.getLength(); temp++) {
            Node nNode = nList.item(temp);
            if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                Element eElement = (Element) nNode;
                if(eElement.getElementsByTagName("codigo").item(0).getTextContent().equals(code)){
                    // Aqui você pode criar e retornar uma instância do agente baseada nos elementos do XML
                    Agente agente = new Agente();
                    agente.setCodigo(eElement.getElementsByTagName("codigo").item(0).getTextContent());
                    // Adicione outros campos do XML conforme necessário
                    return Optional.of(agente);
                }
            }
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    return Optional.empty();
}

}

