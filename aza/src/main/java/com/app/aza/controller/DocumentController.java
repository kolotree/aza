package com.app.aza.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.app.aza.dto.DocumentDTO;
import com.app.aza.model.Document;
import com.app.aza.serviceimpl.CaseNotFoundException;
import com.app.aza.serviceimpl.DocumentServiceImpl;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class DocumentController {

	@Autowired
	private DocumentServiceImpl documentService;
	
	@RequestMapping(
			value = "/document",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> create(@RequestBody DocumentDTO documentDTO){
			try {
				return new ResponseEntity<>(new DocumentDTO(documentService.create(new Document(documentDTO))), HttpStatus.OK);
			} catch (CaseNotFoundException e) {	
				return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
			}
	}
}
