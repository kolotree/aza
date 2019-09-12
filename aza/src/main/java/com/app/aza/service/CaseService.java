package com.app.aza.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.aza.dto.CaseDTO;
import com.app.aza.model.Case;
import com.app.aza.model.User;
import com.app.aza.repository.CaseRepository;
import com.app.aza.repository.UserRepository;

@Service
public class CaseService {

	@Autowired
	private CaseRepository caseRepository;
	@Autowired
	private UserRepository userRepository;
	
	public CaseDTO findOne(Long id) {
		return new CaseDTO(caseRepository.findById(id).get());
	}
	
	public Collection<CaseDTO> clientCases(Long id){
		Collection<Case> cases = caseRepository.clientCases(id);
		Collection<CaseDTO> casesDTO = new ArrayList<CaseDTO>();
		for (Case c : cases) {
			casesDTO.add(new CaseDTO(c));
		}
		return casesDTO;
	}
	
	public CaseDTO create(CaseDTO caseDTO) {
		User user = userRepository.findById(new Long(caseDTO.getUser())).get();
		Case c = new Case(caseDTO);
		if(c.getId() != null) {
			return null;
		}
		c.setUser(user);
		return new CaseDTO(caseRepository.save(c));
	}
	
	public CaseDTO updateStatus(CaseDTO caseDTO) {
		Case c = caseRepository.findById(caseDTO.getId()).get();
		if(c == null) {
			return null;
		}
		c.setStatus(caseDTO.getStatus());
		return new CaseDTO(caseRepository.save(c));
	}
}
