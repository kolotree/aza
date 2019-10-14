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

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor
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

	public Case getCase() {
		return this.c;
	}

	public void setCase(Case c) {
		this.c = c;
	}
	
}
