package org.example.booksharing.service;

import org.example.booksharing.entity.Transaction;
import org.example.booksharing.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransactionById(Integer id) {
        return transactionRepository.findById(id);
    }

    public Transaction saveTransaction(Transaction transaction) {

        if (transaction.getTransDate() == null) {
            transaction.setTransDate(LocalDate.now());
        }

        if (transaction.getStatus() == null ||
                transaction.getStatus().isBlank()) {
            transaction.setStatus("PENDING");
        }

        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(
            Integer id,
            Transaction transaction) {

        transaction.setTransId(id);
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Integer id) {
        transactionRepository.deleteById(id);
    }

    public List<Transaction> getTransactionsForStudent(Integer studentId) {
        return transactionRepository.findTransactionsForStudent(studentId);
    }

    public Transaction completeTransaction(Integer id) {

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Transaction not found"));

        transaction.setStatus("COMPLETED");

        return transactionRepository.save(transaction);
    }

    public Transaction cancelTransaction(Integer id) {

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Transaction not found"));

        transaction.setStatus("CANCELLED");

        return transactionRepository.save(transaction);
    }
}