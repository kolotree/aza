package com.app.aza.serviceimpl;

public class PasswordExistsException extends Exception {

	public PasswordExistsException() {
		super("Šifra je već dodeljena nekom korisniku!");
	}
}
