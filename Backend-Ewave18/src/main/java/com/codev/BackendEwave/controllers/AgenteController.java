package com.codev.BackendEwave.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.codev.BackendEwave.models.Agente;
import com.codev.BackendEwave.services.repository.AgenteRepository;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")    
public class AgenteController {

    @Autowired
    private AgenteRepository agenteRepository;

    // Buscar todos os agentes
    @GetMapping
    public List<Agente> getAllAgentes() {
        return agenteRepository.findAll();
    }

    // Buscar agente por ID
    @GetMapping("/agentes/{id}")
    public ResponseEntity<Agente> getAgenteById(@PathVariable Long id) {
        Optional<Agente> agente = agenteRepository.findById(id);
        if (agente.isPresent()) {
            return ResponseEntity.ok(agente.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Criar novo agente
    @PostMapping
    public Agente createAgente(@RequestBody Agente agente) {
        return agenteRepository.save(agente);
    }

    // Atualizar agente
    @PutMapping("/agentes/{id}")
    public ResponseEntity<Agente> updateAgente(@PathVariable Long id, @RequestBody Agente agenteDetails) {
        Optional<Agente> agente = agenteRepository.findById(id);
        if (agente.isPresent()) {
            Agente existingAgente = agente.get();
            existingAgente.setCodigo(agenteDetails.getCodigo());
            existingAgente.setCompra(agenteDetails.getCompra());
            agenteRepository.save(existingAgente);
            return ResponseEntity.ok(existingAgente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Deletar agente
    @DeleteMapping("/agentes/{id}")
    public ResponseEntity<Void> deleteAgente(@PathVariable Long id) {
        Optional<Agente> agente = agenteRepository.findById(id);
        if (agente.isPresent()) {
            agenteRepository.delete(agente.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
