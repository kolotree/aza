package com.app.aza.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.aza.model.User;
import com.app.aza.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public Collection<User> findAll(){
		Collection<User> users = userRepository.findAll();
		User user = null;
		for (User u : users) {
			if(u.getRole().equalsIgnoreCase("admin")) {
				user = u;
				break;
			}
		}
		users.remove(user);
		return users;
	}
	
	public User create(User user) {
		if(user.getId() != null) {
			return null;
		}
		User crUser = userRepository.save(user);
		return crUser;
	}
	
	public User findOne(Long id) {
		return userRepository.findById(id).get();
	}
}
