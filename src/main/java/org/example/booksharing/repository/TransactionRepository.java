package org.example.booksharing.repository;

import org.example.booksharing.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    @Query("""
        SELECT t FROM Transaction t
        WHERE t.request.student.stuId = :studentId
           OR t.request.listing.student.stuId = :studentId
    """)
    List<Transaction> findTransactionsForStudent(Integer studentId);
}