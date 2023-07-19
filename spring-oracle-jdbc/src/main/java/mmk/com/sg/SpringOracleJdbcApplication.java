package mmk.com.sg;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class SpringOracleJdbcApplication implements CommandLineRunner{

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	public static void main(String[] args) {
		SpringApplication.run(SpringOracleJdbcApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		String sql="SELECT * FROM Student";
		List<Student> list=jdbcTemplate.query(sql, 
				BeanPropertyRowMapper.newInstance(Student.class));
		list.forEach(System.out:: println);
	 
	}
	
	

}
