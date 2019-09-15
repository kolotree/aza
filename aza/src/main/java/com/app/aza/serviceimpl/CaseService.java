package com.app.aza.serviceimpl;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.aza.dto.CaseDTO;
import com.app.aza.model.Case;
import com.app.aza.model.STATUS;
import com.app.aza.model.User;
import com.app.aza.repository.CaseRepository;
import com.app.aza.repository.UserRepository;
import com.app.aza.service.ICaseService;

@Service
public class CaseService implements ICaseService {

	@Autowired
	private CaseRepository caseRepository;
	@Autowired
	private UserRepository userRepository;
	
	public CaseDTO findOne(Long id) throws CaseNotFoundException {
		return new CaseDTO(caseRepository.findById(id).orElseThrow(() -> new CaseNotFoundException(id.toString())));
	}
	
	public Collection<CaseDTO> clientCases(Long id){
		return caseRepository.clientCases(id).stream()
				.map(c -> {
					return new CaseDTO(c);
				})
				.collect(Collectors.toList());
	}
	
	public CaseDTO createOrUpdate(CaseDTO caseDTO) throws UserNotFoundException, CaseNotFoundException {
		Case c;
		if(caseDTO.getId() == null) {
			User user = userRepository.findById(new Long(caseDTO.getUser().getId()))
					.orElseThrow(() -> new UserNotFoundException(caseDTO.getUser().getId().toString()));
			c = new Case(caseDTO);
			c.setUser(user);
		}else {
			c = caseRepository.findById(caseDTO.getId()).orElseThrow(() -> new CaseNotFoundException(caseDTO.getId().toString()));
			c.setDate(caseDTO.getDate());
			c.setName(caseDTO.getName());
			c.setStatus(STATUS.fromString(caseDTO.getStatus()));
		}
		return new CaseDTO(caseRepository.save(c));
	}
	
	public CaseDTO updateStatus(CaseDTO caseDTO) throws CaseNotFoundException {
		Case c = caseRepository.findById(caseDTO.getId()).orElseThrow(() -> new CaseNotFoundException(caseDTO.getId().toString()));
		c.setStatus(STATUS.fromString(caseDTO.getStatus()));
		return new CaseDTO(caseRepository.save(c));
	}
	
	public Collection<String> allStatus(){
		return Arrays.asList(STATUS.values()).stream().map(s-> {
			return STATUS.fromEnum(s);
		}).collect(Collectors.toList());
	}
}
