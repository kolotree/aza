package com.app.aza.serviceimpl;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends Throwable {

	public UserNotFoundException(String userId) {
		super(String.format("Nije pronadjen korisnik sa id-jem %s", userId));
	}
	
}
