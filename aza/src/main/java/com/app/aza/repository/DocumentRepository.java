package com.app.aza.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.aza.model.Document;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long>{

	@Query("select d from Document d left join Case c on d.c = c.id where c.id=?1 ")
	Set<Document> findByCaseId(Long id);

}
