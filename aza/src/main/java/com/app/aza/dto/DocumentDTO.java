package com.app.aza.dto;

import com.app.aza.model.Document;

public class DocumentDTO {
	
	private Long id;
	private String name;
	private String reference;
	private Long caseId;
	
	public DocumentDTO(Document document) {
		super();
		this.id = document.getId();
		this.name = document.getName();
		this.reference = document.getReference();
	}

	public DocumentDTO() {
		super();
	}

	public DocumentDTO(Long id, String name, String reference, Long caseId) {
		super();
		this.id = id;
		this.name = name;
		this.reference = reference;
		this.caseId = caseId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public Long getCaseId() {
		return caseId;
	}

	public void setCaseId(Long caseId) {
		this.caseId = caseId;
	}
	
	
}
