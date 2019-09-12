package com.app.aza.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.aza.model.Case;

@Repository
public interface CaseRepository extends JpaRepository<Case, Long> {

	@Query("select c from Case c left join User u on c.user = u.id where u.id = ?1")
	Set<Case> clientCases(Long id);
}
