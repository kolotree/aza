package com.app.aza.repository;

import java.util.Collection;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.aza.model.Case;
import com.app.aza.model.STATUS;

@Repository
public interface CaseRepository extends JpaRepository<Case, Long> {

	@Query("select c from Case c left join User u on c.user = u.id where u.id = ?1")
	Set<Case> clientCases(Long id);

	@Query("select c from Case c left join User u on c.user = u.id where u.id = ?1 "
			+ "and c.name like concat('%',?2,'%') and (c.status=?3 or ?3=null) "
			+ "and c.date like concat('%',?4,'%')")
	Collection<Case> clientCasesSearch(Long id, String name, STATUS status, String date);
}
