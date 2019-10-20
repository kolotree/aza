package com.app.aza.controller;

import java.util.Collection;
import java.util.HashMap;
import java.util.stream.Collectors;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.app.aza.dto.CaseDTO;
import com.app.aza.model.Case;
import com.app.aza.service.CaseService;
import com.app.aza.service.MailService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class CaseController extends BaseController {
	
	@Autowired
	private CaseService caseService;
	
	@Autowired 
	private MailService mailService;
	
	@RequestMapping(
			value = "/client/case/{id}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<CaseDTO>> getClietnCases(@PathVariable("id") Long id) {
		return new ResponseEntity<>(caseService.clientCases(id).stream()
									.map(c ->  new CaseDTO(c))
									.collect(Collectors.toList()), HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/case/{id}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getCase(@PathVariable("id") Long id) throws Exception {
		return new ResponseEntity<>(new CaseDTO(caseService.findOne(id)), HttpStatus.OK);
	}
	
	

	@RequestMapping(
			value = "/case",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> create(@RequestBody CaseDTO caseDTO) throws Exception, MessagingException {
		Case c = caseService.createOrUpdate(new Case(caseDTO));
		mailService.newCase(c);
		return new ResponseEntity<>(new CaseDTO(c), HttpStatus.OK);
		
	}
	
	@RequestMapping(
			value = "/case",
			method = RequestMethod.PUT,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> updateStatus(@RequestBody CaseDTO caseDTO) throws Exception, MessagingException {
		Case c = caseService.updateStatus(new Case(caseDTO));
		mailService.caseChangeStatus(c);
		return new ResponseEntity<>(new CaseDTO(c), HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/status",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<String>> getStatus() {
		return new ResponseEntity<>(caseService.allStatus(), HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/client/case/search",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<CaseDTO>> getClietnCasesSearch(@RequestBody HashMap<String, String> search) {
		return new ResponseEntity<>(caseService.clientCasesSearch(search).stream()
									.map(c ->  new CaseDTO(c))
									.collect(Collectors.toList()), HttpStatus.OK);
	}
}
