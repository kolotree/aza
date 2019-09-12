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
import com.app.aza.service.CaseService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class CaseController {
	
	@Autowired
	private CaseService caseService;
	
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
	public ResponseEntity<CaseDTO> getCase(@PathVariable("id") Long id){
			CaseDTO c = caseService.findOne(id);
			return new ResponseEntity<>(c, HttpStatus.OK);
	}

	@RequestMapping(
			value = "/case",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CaseDTO> create(@RequestBody CaseDTO caseDTO){
			CaseDTO crCase = caseService.create(caseDTO);
			return new ResponseEntity<>(crCase, HttpStatus.OK);
	}
}
