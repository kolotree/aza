package com.app.aza.dto;

import java.util.HashSet;
import java.util.Set;

import com.app.aza.model.Case;
import com.app.aza.model.STATUS;

public class CaseDTO {

	private Long id;
	private UserDTO user;
	private String name;
	private String date;
	private String status;
	private Set<String> documents;
	
	public CaseDTO(Long id, UserDTO user, String name, String date, String status, Set<String> documents) {
		super();
		this.id = id;
		this.user = user;
		this.name = name;
		this.date = date;
		this.status = status;
		this.documents = documents;
	}
	
	public CaseDTO(Case c) {
		super();
		this.id = c.getId();
		this.user = new UserDTO(c.getUser());
		this.name = c.getName();
		this.date = c.getDate();
		this.status = STATUS.fromEnum(c.getStatus());
		this.documents = new HashSet<>();
	}

	public CaseDTO() {
		super();
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
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

	public Set<String> getDocuments() {
		return documents;
	}

	public void setDocuments(Set<String> documents) {
		this.documents = documents;
	}
	
}
