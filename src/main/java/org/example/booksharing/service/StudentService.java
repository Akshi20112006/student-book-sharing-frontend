package org.example.booksharing.service;

import org.example.booksharing.entity.Student;
import org.example.booksharing.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Integer id) {
        return studentRepository.findById(id);
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudent(Integer id, Student student) {
        student.setStuId(id);
        return studentRepository.save(student);
    }
    public ResponseEntity<?> login(String email, String password) {

        Optional<Student> student = studentRepository.findByEmail(email);

        if (student.isEmpty()) {
            return ResponseEntity.status(401)
                    .body("Invalid email or password");
        }

        if (!student.get().getPassword().equals(password)) {
            return ResponseEntity.status(401)
                    .body("Invalid email or password");
        }

        return ResponseEntity.ok(student.get());
    }

    public void deleteStudent(Integer id) {
        studentRepository.deleteById(id);
    }
}
