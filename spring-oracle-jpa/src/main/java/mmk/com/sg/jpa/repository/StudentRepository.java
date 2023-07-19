package mmk.com.sg.jpa.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import mmk.com.sg.jpa.entity.Student;

public interface  StudentRepository extends JpaRepository<Student, Long>{

}
