package com.app.aza.serviceimpl;

public class UserNotFoundException extends Exception {

	public UserNotFoundException(String userId) {
		super(String.format("Nije pronadjen korisnik sa id-jem %s", userId));
	}
	
}
