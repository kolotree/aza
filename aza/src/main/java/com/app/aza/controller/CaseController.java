package com.app.aza.controller;

import java.util.Collection;

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
import com.app.aza.serviceimpl.CaseNotFoundException;
import com.app.aza.serviceimpl.CaseServiceImpl;
import com.app.aza.serviceimpl.UserNotFoundException;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class CaseController {
	
	@Autowired
	private CaseServiceImpl caseService;
	
	@RequestMapping(
			value = "/client/case/{id}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<CaseDTO>> getClietnCases(@PathVariable("id") Long id){
			Collection<CaseDTO> cases = caseService.clientCases(id);
			return new ResponseEntity<>(cases, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/case/{id}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getCase(@PathVariable("id") Long id){
			CaseDTO c;
			try {
				c = caseService.findOne(id);
			} catch (CaseNotFoundException e) {	
				return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<>(c, HttpStatus.OK);
	}

	@RequestMapping(
			value = "/case",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> create(@RequestBody CaseDTO caseDTO){
			CaseDTO crCase;
			try {
				crCase = caseService.createOrUpdate(caseDTO);
			} catch (UserNotFoundException | CaseNotFoundException e) {	
				return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<>(crCase, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/case",
			method = RequestMethod.PUT,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> updateStatus(@RequestBody CaseDTO caseDTO){
			CaseDTO crCase;
			try {
				crCase = caseService.updateStatus(caseDTO);
			} catch (CaseNotFoundException e) {		
				return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<>(crCase, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/status",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<String>> getStatus(){
			Collection<String> s = caseService.allStatus();
			return new ResponseEntity<>(s, HttpStatus.OK);
	}
}
