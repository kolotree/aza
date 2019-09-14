package com.app.aza.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
	
	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private STATUS status;
	
	@ManyToOne
	@JoinColumn(name="user", referencedColumnName="id")
	private User user;
	
	@OneToMany(mappedBy = "id", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Document> documents;
	
	public Case(Long id, String name, String date, STATUS status, Set<Document> documents, User user) {
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
		this.status = STATUS.fromString(c.getStatus());
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

	public STATUS getStatus() {
		return status;
	}

	public void setStatus(STATUS status) {
		this.status = status;
	}

	public Set<Document> getDocuments() {
		return documents;
	}

	public void setDocuments(Set<Document> documents) {
		this.documents = documents;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
