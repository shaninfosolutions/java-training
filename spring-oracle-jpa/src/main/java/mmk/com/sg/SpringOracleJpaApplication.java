package mmk.com.sg;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import mmk.com.sg.jpa.entity.Student;
import mmk.com.sg.jpa.repository.StudentRepository;

@SpringBootApplication
public class SpringOracleJpaApplication implements CommandLineRunner{

	@Autowired
	private StudentRepository repo;
	
	public static void main(String[] args) {
		SpringApplication.run(SpringOracleJpaApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		List<Student> list=repo.findAll();
		list.forEach(System.out::println);
		
	}

}
