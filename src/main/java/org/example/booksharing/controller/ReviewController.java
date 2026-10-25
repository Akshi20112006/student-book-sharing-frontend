package org.example.booksharing.controller;

import org.example.booksharing.entity.Review;
import org.example.booksharing.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Integer id) {
        return reviewService.getReviewById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Review createReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(
            @PathVariable Integer id,
            @RequestBody Review review) {

        if (reviewService.getReviewById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                reviewService.updateReview(id, review)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Integer id) {

        if (reviewService.getReviewById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }@GetMapping("/student/{studentId}")
    public List<Review> getReviewsForStudent(
            @PathVariable Integer studentId) {

        return reviewService.getReviewsForStudent(studentId);
    }
    @GetMapping("/reviewer/{studentId}")
    public List<Review> getReviewsByReviewer(
            @PathVariable Integer studentId) {

        return reviewService.getReviewsByReviewer(studentId);
    }

}