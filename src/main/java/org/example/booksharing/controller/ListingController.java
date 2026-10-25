package org.example.booksharing.controller;

import org.example.booksharing.entity.Listing;
import org.example.booksharing.service.ListingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "*")
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @GetMapping
    public List<Listing> getAllListings() {
        return listingService.getAllListings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Listing> getListingById(@PathVariable Integer id) {
        return listingService.getListingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Listing createListing(@RequestBody Listing listing) {
        return listingService.saveListing(listing);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Listing> updateListing(
            @PathVariable Integer id,
            @RequestBody Listing listing) {

        if (listingService.getListingById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                listingService.updateListing(id, listing)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteListing(@PathVariable Integer id) {

        if (listingService.getListingById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        listingService.deleteListing(id);
        return ResponseEntity.noContent().build();
    }@GetMapping("/available")
    public List<Listing> getAvailableListings() {
        return listingService.getAvailableListings();
    }
    @GetMapping("/student/{studentId}")
    public List<Listing> getListingsByStudent(
            @PathVariable Integer studentId) {

        return listingService.getListingsByStudent(studentId);
    }

}
