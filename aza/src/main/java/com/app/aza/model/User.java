package com.app.aza.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.app.aza.dto.UserDTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor
@Table(name = "user")
public class User {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "surname")
	private String surname;

	@Column(name = "email")
	private String email;
	
	@Column(name = "password", unique=true, nullable=false, length=60)
	private String password;
	
	@Column(name = "role")
	private ROLE role;

	@OneToMany(mappedBy = "id", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Case> cases;

	public User(Long id, String name, String surname, String email, String password, ROLE role, Set<Case> cases) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.password = password;
		this.role = role;
		this.cases = cases;
	}
	
	public User(UserDTO user) {
		super();
		this.id = user.getId();
		this.name = user.getName();
		this.surname = user.getSurname();
		this.email = user.getEmail();
		this.password = user.getPassword();
		this.role = ROLE.fromString(user.getRole());
		this.cases = new HashSet<>();
	}

	public void update(User user) {
		this.name = user.getName();
		this.surname = user.getSurname();
		this.email = user.getEmail();
	}
	
}
