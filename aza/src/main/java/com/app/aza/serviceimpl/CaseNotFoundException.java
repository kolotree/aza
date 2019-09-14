package com.app.aza.serviceimpl;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CaseNotFoundException extends Throwable{

	public CaseNotFoundException(Long caseId) {
		super(String.format("Nije pronadjen predmet sa id-jem %s", caseId));
	}

}
