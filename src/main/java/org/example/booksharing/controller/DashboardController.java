package org.example.booksharing.controller;

import org.example.booksharing.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final StudentRepository studentRepository;
    private final BookRepository bookRepository;
    private final ListingRepository listingRepository;
    private final RequestRepository requestRepository;
    private final TransactionRepository transactionRepository;
    private final ReviewRepository reviewRepository;

    public DashboardController(
            StudentRepository studentRepository,
            BookRepository bookRepository,
            ListingRepository listingRepository,
            RequestRepository requestRepository,
            TransactionRepository transactionRepository,
            ReviewRepository reviewRepository) {

        this.studentRepository = studentRepository;
        this.bookRepository = bookRepository;
        this.listingRepository = listingRepository;
        this.requestRepository = requestRepository;
        this.transactionRepository = transactionRepository;
        this.reviewRepository = reviewRepository;
    }

    @GetMapping
    public Map<String, Long> getDashboardStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put("students", studentRepository.count());
        stats.put("books", bookRepository.count());
        stats.put("listings", listingRepository.count());
        stats.put("requests", requestRepository.count());
        stats.put("transactions", transactionRepository.count());
        stats.put("reviews", reviewRepository.count());

        return stats;
    }
}