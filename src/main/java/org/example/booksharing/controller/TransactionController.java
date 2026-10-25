package org.example.booksharing.controller;

import org.example.booksharing.entity.Transaction;
import org.example.booksharing.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(
            @PathVariable Integer id) {

        return transactionService.getTransactionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/student/{studentId}")
    public List<Transaction> getTransactionsForStudent(
            @PathVariable Integer studentId) {

        return transactionService
                .getTransactionsForStudent(studentId);
    }

    @PostMapping
    public Transaction createTransaction(
            @RequestBody Transaction transaction) {

        return transactionService.saveTransaction(transaction);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(
            @PathVariable Integer id,
            @RequestBody Transaction transaction) {

        if (transactionService.getTransactionById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                transactionService.updateTransaction(id, transaction)
        );
    }

    @PutMapping("/{id}/complete")
    public Transaction completeTransaction(
            @PathVariable Integer id) {

        return transactionService.completeTransaction(id);
    }

    @PutMapping("/{id}/cancel")
    public Transaction cancelTransaction(
            @PathVariable Integer id) {

        return transactionService.cancelTransaction(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(
            @PathVariable Integer id) {

        if (transactionService.getTransactionById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        transactionService.deleteTransaction(id);

        return ResponseEntity.noContent().build();
    }
}