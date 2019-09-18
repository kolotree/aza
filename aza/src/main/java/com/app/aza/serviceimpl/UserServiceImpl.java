package com.app.aza.serviceimpl;

import java.util.ArrayList;
import java.util.Collection;import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.aza.dto.UserDTO;
import com.app.aza.model.ROLE;
import com.app.aza.model.User;
import com.app.aza.repository.UserRepository;
import com.app.aza.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	public Collection<UserDTO> findAll(){
		return userRepository.findAll().stream()
				.filter(u-> u.getRole().equals(ROLE.USER))
				.map(u-> new UserDTO(u))
				.collect(Collectors.toList());
	}
	
	public UserDTO createOrUpdate(UserDTO userDTO) throws UserNotFoundException {
		User user;
		if(userDTO.getId() == null) {
			user = new User(userDTO);
			user.setRole(ROLE.USER);
		}else {
			user = userRepository.findById(userDTO.getId()).orElseThrow(() -> new UserNotFoundException(userDTO.getId().toString()));
			user.setName(userDTO.getName());
			user.setSurname(userDTO.getSurname());
			user.setEmail(userDTO.getEmail());
		}
		return new UserDTO(userRepository.save(user));
	}
	
	public UserDTO findOne(Long id) throws UserNotFoundException {
		return new UserDTO(userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id.toString())));
	}
}
