package org.example.booksharing.repository;

import org.example.booksharing.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByReviewed_StuId(Integer studentId);

    List<Review> findByReviewer_StuId(Integer studentId);
}