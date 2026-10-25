package org.example.booksharing.service;

import org.example.booksharing.entity.Request;
import org.example.booksharing.entity.Transaction;
import org.example.booksharing.repository.RequestRepository;
import org.example.booksharing.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RequestService {

    private final RequestRepository requestRepository;
    private final TransactionRepository transactionRepository;

    public RequestService(
            RequestRepository requestRepository,
            TransactionRepository transactionRepository) {

        this.requestRepository = requestRepository;
        this.transactionRepository = transactionRepository;
    }

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public Optional<Request> getRequestById(Integer id) {
        return requestRepository.findById(id);
    }

    public Request saveRequest(Request request) {

        if (request.getReqDate() == null) {
            request.setReqDate(LocalDate.now());
        }

        if (request.getStatus() == null ||
                request.getStatus().isBlank()) {

            request.setStatus("PENDING");
        }

        return requestRepository.save(request);
    }

    public Request updateRequest(
            Integer id,
            Request request) {

        request.setReqId(id);

        return requestRepository.save(request);
    }

    public void deleteRequest(Integer id) {
        requestRepository.deleteById(id);
    }

    public List<Request> getRequestsByStudent(Integer studentId) {
        return requestRepository.findByStudent_StuId(studentId);
    }

    public List<Request> getPendingRequests() {
        return requestRepository
                .findByStatusIgnoreCase("PENDING");
    }

    public List<Request> getRequestsForOwner(Integer studentId) {
        return requestRepository
                .findByListing_Student_StuId(studentId);
    }

    public Request approveRequest(Integer id) {

        Request request = requestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Request not found"));

        request.setStatus("APPROVED");

        Request savedRequest = requestRepository.save(request);

        Transaction transaction = new Transaction();

        transaction.setRequest(savedRequest);
        transaction.setTransDate(LocalDate.now());
        transaction.setAmount(
                savedRequest.getListing().getPrice()
        );
        transaction.setType("BOOK");
        transaction.setStatus("PENDING");

        transactionRepository.save(transaction);

        return savedRequest;
    }

    public Request rejectRequest(Integer id) {

        Request request = requestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Request not found"));

        request.setStatus("REJECTED");

        return requestRepository.save(request);
    }
}