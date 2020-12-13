package edu.sa.web;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import edu.sa.web.dto.SentenceDto;
import edu.sa.web.dto.SentimentDto;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@CrossOrigin(origins = "*")
@RestController
public class SentimentController {
	
	//@Value("${sa.logic.api.url}")
	private String saLogicApiUrl = "http://sa-logic-lb";
	
	
	@PostMapping("/sentiment")
	public SentimentDto sentimentAnalysis(@RequestBody SentenceDto sentenceDto) {
		// System.out.println("Received !!");
		// System.out.println("Received !!");
		// System.out.println("Received !!");
		System.out.println(sentenceDto);
		RestTemplate restTemplate = new RestTemplate();
		// System.out.println("restTemp finished!");
		SentimentDto sDto = restTemplate.postForEntity(saLogicApiUrl + "/analyse/sentiment", sentenceDto, SentimentDto.class)
				.getBody();
		// System.out.println("------Result: sDto");
		return sDto;
	}

	@GetMapping("/testHealth")
	public String testHealth() {
		return "hello from springboot webapp!";
	}
	
	//from springboot to py
	@GetMapping("/testComms") 
	public String testComms() { 
		RestTemplate restTemplate = new RestTemplate();
		// System.out.println("code: 001");
		ResponseEntity<String> result = restTemplate.getForEntity(saLogicApiUrl + "/testHealth", String.class); 
		//assertEquals(HttpStatus.OK, result.getStatusCode());
		// System.out.println("code: 003");
		return result.getBody();
	}

	@GetMapping("/testSentiment") 
	public String testSentimentGet() { 
		RestTemplate restTemplate = new RestTemplate();

		ResponseEntity<String> result = restTemplate.getForEntity(saLogicApiUrl + "/analyse?sentence=i+am+so+happy!", String.class); 
		//assertEquals(HttpStatus.OK, result.getStatusCode());
		return result.getBody();
	}
}