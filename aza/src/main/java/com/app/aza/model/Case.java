package com.app.aza.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.app.aza.dto.CaseDTO;

@Entity
@Table(name = "case_table")
public class Case {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "documents")
	private String documents;
	
	@ManyToOne
	@JoinColumn(name="user", referencedColumnName="id")
	private User user;
	
	public Case(Long id, String name, String date, String status, String documents, User user) {
		super();
		this.id = id;
		this.name = name;
		this.date = date;
		this.status = status;
		this.documents = documents;
		this.user = user;
	}

	public Case(CaseDTO c) {
		super();
		this.id = c.getId();
		this.name = c.getName();
		this.date = c.getDate();
		this.status = c.getStatus();
	}
	public Case() {
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDocuments() {
		return documents;
	}

	public void setDocuments(String documents) {
		this.documents = documents;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
