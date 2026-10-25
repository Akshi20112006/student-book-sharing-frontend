package org.example.booksharing.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "request")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "req_id")
    private Integer reqId;

    @Column(name = "req_date")
    private LocalDate reqDate;

    private String status;

    @ManyToOne
    @JoinColumn(name = "list_id", nullable = false)
    private Listing listing;

    @ManyToOne
    @JoinColumn(name = "stu_id", nullable = false)
    private Student student;

    public Request() {
    }

    public Integer getReqId() {
        return reqId;
    }

    public void setReqId(Integer reqId) {
        this.reqId = reqId;
    }

    public LocalDate getReqDate() {
        return reqDate;
    }

    public void setReqDate(LocalDate reqDate) {
        this.reqDate = reqDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Listing getListing() {
        return listing;
    }

    public void setListing(Listing listing) {
        this.listing = listing;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}