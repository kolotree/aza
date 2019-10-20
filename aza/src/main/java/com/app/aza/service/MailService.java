package com.app.aza.service;

import javax.mail.MessagingException;

import com.app.aza.model.Case;
import com.app.aza.model.Document;

public interface MailService {
	void newUser (String email, String password) throws MessagingException;
	void newCase (Case c) throws MessagingException;
	void caseChangeStatus (Case c) throws MessagingException;
	void newDocument (Document document) throws MessagingException;
}

