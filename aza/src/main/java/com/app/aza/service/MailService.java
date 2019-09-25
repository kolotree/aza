package com.app.aza.service;

import javax.mail.MessagingException;

import com.app.aza.model.Case;
import com.app.aza.model.Document;
import com.app.aza.model.User;

public interface MailService {
	void newUser (User user) throws MessagingException;
	void newCase (Case c) throws MessagingException;
	void caseChangeStatus (Case c) throws MessagingException;
	void newDocument (Document document) throws MessagingException;
}

