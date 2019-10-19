package com.app.aza.serviceimpl;

public class IncorrectEmailException extends Exception {

	public IncorrectEmailException() {
		super("Nepostojeći email.");
	}

}
