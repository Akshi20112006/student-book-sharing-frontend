package org.example.booksharing.repository;
import java.util.List;
import org.example.booksharing.entity.Listing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingRepository extends JpaRepository<Listing, Integer> {
List<Listing> findByListingStatusIgnoreCase(String status);
List<Listing> findByStudent_StuId(Integer stuId);
}