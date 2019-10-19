package com.app.aza.serviceimpl;

public class EmailExistsException extends Exception {

	public EmailExistsException() {
		super("Email je već dodeljen nekom korisniku!");
	}
}
