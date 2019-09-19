package com.app.aza.serviceimpl;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.aza.model.Case;
import com.app.aza.model.STATUS;
import com.app.aza.repository.CaseRepository;
import com.app.aza.repository.DocumentRepository;
import com.app.aza.repository.UserRepository;
import com.app.aza.service.CaseService;

@Service
public class CaseServiceImpl implements CaseService {

	@Autowired
	private CaseRepository caseRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private DocumentRepository documentRepository;
	
	public Case findOne(Long id) throws CaseNotFoundException {
		Case c = caseRepository.findById(id).orElseThrow(() -> new CaseNotFoundException(id.toString()));
		c.setDocuments(documentRepository.findByCaseId(id));
		return c;
	}
	
	public Collection<Case> clientCases(Long id){
		return caseRepository.clientCases(id).stream()
				.map(c-> {
					c.setDocuments(documentRepository.findByCaseId(c.getId())); 
					return c;
					}
				).collect(Collectors.toList());
	}
	
	public Case createOrUpdate(Case c) throws UserNotFoundException, CaseNotFoundException {
		if(c.getId() == null) {
			c.setUser(userRepository.findById(new Long(c.getUser().getId()))
					.orElseThrow(() -> new UserNotFoundException(c.getUser().getId().toString())));
			return caseRepository.save(c);
		}
		Case caseUpdate = caseRepository.findById(c.getId()).orElseThrow(() -> new CaseNotFoundException(c.getId().toString()));
		caseUpdate.update(c);
		return caseRepository.save(caseUpdate);
	}
	
	public Case updateStatus(Case c) throws CaseNotFoundException {
		Case caseUpdate = caseRepository.findById(c.getId()).orElseThrow(() -> new CaseNotFoundException(c.getId().toString()));
		caseUpdate.setStatus(c.getStatus());
		return caseRepository.save(caseUpdate);
	}
	
	public Collection<String> allStatus(){
		return Arrays.asList(STATUS.values()).stream()
				.map(s-> STATUS.fromEnum(s))
				.collect(Collectors.toList());
	}
}
