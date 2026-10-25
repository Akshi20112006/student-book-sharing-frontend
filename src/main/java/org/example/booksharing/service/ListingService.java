package org.example.booksharing.service;

import org.example.booksharing.entity.Listing;
import org.example.booksharing.repository.ListingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ListingService {

    private final ListingRepository listingRepository;

    public ListingService(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    public List<Listing> getAllListings() {
        return listingRepository.findAll();
    }

    public Optional<Listing> getListingById(Integer id) {
        return listingRepository.findById(id);
    }
    public Listing saveListing(Listing listing) {

        if (listing.getListingDate() == null) {
            listing.setListingDate(java.time.LocalDate.now());
        }

        if (listing.getListingStatus() == null ||
                listing.getListingStatus().isBlank()) {

            listing.setListingStatus("AVAILABLE");
        }

        return listingRepository.save(listing);
    }


    public Listing updateListing(Integer id, Listing listing) {
        listing.setListId(id);
        return listingRepository.save(listing);
    }

    public void deleteListing(Integer id) {
        listingRepository.deleteById(id);
    }
    public List<Listing> getAvailableListings() {
        return listingRepository.findByListingStatusIgnoreCase("AVAILABLE");
    }

    public List<Listing> getListingsByStudent(Integer studentId) {
        return listingRepository.findByStudent_StuId(studentId);
    }

}
