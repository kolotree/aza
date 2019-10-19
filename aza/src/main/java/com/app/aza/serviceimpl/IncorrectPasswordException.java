package com.app.aza.serviceimpl;

public class IncorrectPasswordException extends Exception {

	public IncorrectPasswordException() {
		super("Pogrešna šifra.");
	}
	
}
