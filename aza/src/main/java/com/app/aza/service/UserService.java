package com.app.aza.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.aza.dto.UserDTO;
import com.app.aza.model.User;
import com.app.aza.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public Collection<UserDTO> findAll(){
		Collection<User> users = userRepository.findAll();
		Collection<UserDTO> usersDTO = new ArrayList<>();
		for (User user : users) {
			if(user.getRole().equalsIgnoreCase("admin")) {
				continue;
			}
			usersDTO.add(new UserDTO(user));
		}
		return usersDTO;
	}
	
	public UserDTO create(UserDTO userDTO) {
		User user = new User(userDTO);
		if(user.getId() != null) {
			return null;
		}
		User crUser = userRepository.save(user);
		return new UserDTO(crUser);
	}
	
	public UserDTO findOne(Long id) {
		return new UserDTO(userRepository.findById(id).get());
	}
}
