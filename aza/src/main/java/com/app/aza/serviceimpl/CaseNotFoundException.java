package com.app.aza.serviceimpl;

public class CaseNotFoundException extends Exception {

	public CaseNotFoundException(String caseId) {
		super(String.format("Nije pronadjen predmet sa id-jem %s", caseId));
	}

}
