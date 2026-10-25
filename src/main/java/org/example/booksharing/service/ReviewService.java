package org.example.booksharing.service;

import org.example.booksharing.entity.Review;
import org.example.booksharing.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Optional<Review> getReviewById(Integer id) {
        return reviewRepository.findById(id);
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    public Review updateReview(Integer id, Review review) {
        review.setReviewId(id);
        return reviewRepository.save(review);
    }

    public void deleteReview(Integer id) {
        reviewRepository.deleteById(id);
    }
    public List<Review> getReviewsForStudent(Integer studentId) {
        return reviewRepository.findByReviewed_StuId(studentId);
    }

    public List<Review> getReviewsByReviewer(Integer studentId) {
        return reviewRepository.findByReviewer_StuId(studentId);
    }
}