package com.app.aza.service;

import java.util.Collection;

import com.app.aza.model.Case;
import com.app.aza.serviceimpl.CaseNotFoundException;
import com.app.aza.serviceimpl.UserNotFoundException;

public interface CaseService {
	Case findOne(Long id) throws CaseNotFoundException;
	Collection<Case> clientCases(Long id);
	Case createOrUpdate(Case c) throws UserNotFoundException, CaseNotFoundException;
	Case updateStatus(Case c) throws CaseNotFoundException;
	Collection<String> allStatus();
}
