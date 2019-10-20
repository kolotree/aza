package com.app.aza.controller;

import javax.mail.MessagingException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

public abstract class BaseController {

	@ExceptionHandler
	public ResponseEntity<String> handlException(Exception e) {
		return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(MessagingException.class)
	public ResponseEntity<String> handlMessagingException(Exception e) {
		return new ResponseEntity<>("Došlo je do greške prilikom slanja mejla!", HttpStatus.NOT_FOUND);
	}
}
