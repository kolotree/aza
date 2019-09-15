package com.app.aza.service;

import java.util.Collection;

import com.app.aza.dto.CaseDTO;
import com.app.aza.serviceimpl.CaseNotFoundException;
import com.app.aza.serviceimpl.UserNotFoundException;

public interface ICaseService {
	public CaseDTO findOne(Long id) throws CaseNotFoundException;
	public Collection<CaseDTO> clientCases(Long id);
	public CaseDTO createOrUpdate(CaseDTO caseDTO) throws UserNotFoundException, CaseNotFoundException;
	public CaseDTO updateStatus(CaseDTO caseDTO) throws CaseNotFoundException;
}
