package com.app.aza.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.app.aza.dto.DocumentDTO;

@Entity
@Table(name="document")
public class Document {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "refernce")
	private String reference;
	
	@ManyToOne
	@JoinColumn(name="case_doc", referencedColumnName="id")
	private Case c;

	public Document(Long id, String name, String reference, Case c) {
		super();
		this.id = id;
		this.name = name;
		this.reference = reference;
		this.c = c;
	}
	
	public Document(DocumentDTO document) {
		super();
		this.id = document.getId();
		this.name = document.getName();
		this.reference = document.getReference();
		this.c = new Case();
		c.setId(document.getCaseId());
	}

	public Document() {
		super();
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

	public Case getCase() {
		return c;
	}

	public void setCase(Case c) {
		this.c = c;
	}
	
}
