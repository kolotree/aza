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

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor
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
		this.user = new User(c.getUser());
		this.status = STATUS.fromString(c.getStatus());
	}
	
	public void update(Case c) {
		this.date = c.getDate();
		this.name = c.getName();
		this.status = c.getStatus();
		
	}
	
}
