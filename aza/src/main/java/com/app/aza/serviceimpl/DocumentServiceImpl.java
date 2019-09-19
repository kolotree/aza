package com.app.aza.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.aza.model.Document;
import com.app.aza.repository.CaseRepository;
import com.app.aza.repository.DocumentRepository;
import com.app.aza.service.DocumentService;

@Service
public class DocumentServiceImpl implements DocumentService{
	
	@Autowired
	private DocumentRepository documentRepository;
	@Autowired
	private CaseRepository caseRepository;
	
	public Document create(Document document) throws CaseNotFoundException {
		document.setCase(caseRepository.findById(document.getCase().getId())
				.orElseThrow(() -> new CaseNotFoundException(document.getCase().getId().toString())));
		return documentRepository.save(document);
	}
	
}
