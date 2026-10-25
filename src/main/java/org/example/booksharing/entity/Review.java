package org.example.booksharing.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Integer reviewId;

    private Integer rating;

    private String comment;

    @Column(name = "review_date")
    private LocalDate reviewDate;

    @ManyToOne
    @JoinColumn(name = "reviewer_id", nullable = false)
    private Student reviewer;

    @ManyToOne
    @JoinColumn(name = "reviewed_id", nullable = false)
    private Student reviewed;

    @ManyToOne
    @JoinColumn(name = "trans_id", nullable = false)
    private Transaction transaction;

    public Review() {
    }

    public Integer getReviewId() {
        return reviewId;
    }

    public void setReviewId(Integer reviewId) {
        this.reviewId = reviewId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDate getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(LocalDate reviewDate) {
        this.reviewDate = reviewDate;
    }

    public Student getReviewer() {
        return reviewer;
    }

    public void setReviewer(Student reviewer) {
        this.reviewer = reviewer;
    }

    public Student getReviewed() {
        return reviewed;
    }

    public void setReviewed(Student reviewed) {
        this.reviewed = reviewed;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }
}