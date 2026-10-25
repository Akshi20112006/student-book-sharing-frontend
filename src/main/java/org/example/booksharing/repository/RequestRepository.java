
package org.example.booksharing.repository;

import org.example.booksharing.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Integer> {

    List<Request> findByStudent_StuId(Integer stuId);

    List<Request> findByStatusIgnoreCase(String status);

    List<Request> findByListing_Student_StuId(Integer stuId);
}