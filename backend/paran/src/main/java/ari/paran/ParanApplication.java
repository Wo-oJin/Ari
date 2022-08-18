package ari.paran;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class ParanApplication {

	public static void main(String[] args) {
		SpringApplication.run(ParanApplication.class, args);
	}

}