package org.example.booksharing.controller;

import org.example.booksharing.entity.Request;
import org.example.booksharing.service.RequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @GetMapping
    public List<Request> getAllRequests() {
        return requestService.getAllRequests();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable Integer id) {
        return requestService.getRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Request createRequest(@RequestBody Request request) {
        return requestService.saveRequest(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Request> updateRequest(
            @PathVariable Integer id,
            @RequestBody Request request) {

        if (requestService.getRequestById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                requestService.updateRequest(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Integer id) {

        if (requestService.getRequestById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        requestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }@GetMapping("/student/{studentId}")
    public List<Request> getRequestsByStudent(
            @PathVariable Integer studentId) {

        return requestService.getRequestsByStudent(studentId);
    }
    @GetMapping("/pending")
    public List<Request> getPendingRequests() {
        return requestService.getPendingRequests();
    }
    @GetMapping("/owner/{studentId}")
    public List<Request> getRequestsForOwner(
            @PathVariable Integer studentId) {

        return requestService.getRequestsForOwner(studentId);
    }@PutMapping("/{id}/approve")
    public Request approveRequest(@PathVariable Integer id) {
        return requestService.approveRequest(id);
    }@PutMapping("/{id}/reject")
    public Request rejectRequest(@PathVariable Integer id) {
        return requestService.rejectRequest(id);
    }


}