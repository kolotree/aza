package com.app.aza.service;

import java.util.Collection;

import com.app.aza.dto.CaseDTO;
import com.app.aza.serviceimpl.CaseNotFoundException;
import com.app.aza.serviceimpl.UserNotFoundException;

public interface CaseService {
	CaseDTO findOne(Long id) throws CaseNotFoundException;
	Collection<CaseDTO> clientCases(Long id);
	CaseDTO createOrUpdate(CaseDTO caseDTO) throws UserNotFoundException, CaseNotFoundException;
	CaseDTO updateStatus(CaseDTO caseDTO) throws CaseNotFoundException;
}
