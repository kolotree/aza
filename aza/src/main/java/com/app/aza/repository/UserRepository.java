package com.app.aza.repository;

import java.util.Collection;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.aza.model.ROLE;
import com.app.aza.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{


	@Query("select u from User u where u.role = ?1")
	Collection<User> getUsers(ROLE role);
	
	@Query("select u from User u where u.name like concat('%',?1,'%') "
			+ "and u.surname like concat('%',?2,'%') and u.role = ?3")
	Collection<User> userSearch(String name, String surname, ROLE role);

	@Query("select u from User u where u.email = ?1")
	Optional<User> login(String email);

	@Query("select count(u)>0 from User u where u.email=?1")
	boolean existsEmail(String email);

}
