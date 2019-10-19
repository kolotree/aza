package com.app.aza.serviceimpl;

import java.util.Collection;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.aza.model.ROLE;
import com.app.aza.model.User;
import com.app.aza.repository.UserRepository;
import com.app.aza.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;

	public User login(HashMap<String, String> login) throws IncorrectPasswordException, IncorrectEmailException {
		User user = userRepository.login(login.get("email")).orElseThrow(()-> new IncorrectEmailException());
		if(!new BCryptPasswordEncoder().matches(login.get("password"), user.getPassword()))
			throw new IncorrectPasswordException();
		return user;
	}
	
	public Collection<User> findAll(){
		return userRepository.getUsers(ROLE.USER);
	}
	
	public User createOrUpdate(User user) throws UserNotFoundException, EmailExistsException {
		if(user.getId() == null) {
			user.setRole(ROLE.USER);
			user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
			if(userRepository.existsEmail(user.getEmail()))
				throw new EmailExistsException();
			return userRepository.save(user);
		}
		User userUpdate = userRepository.findById(user.getId()).orElseThrow(() -> new UserNotFoundException(user.getId().toString()));
		userUpdate.update(user);
		return userRepository.save(user);
	}
	
	public User findOne(Long id) throws UserNotFoundException {
		return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id.toString()));
	}

	public Collection<User> userSearch(HashMap<String, String> search) {
		try {
			return userRepository.userSearch(search.get("name"), search.get("surname"), ROLE.USER);
		}catch (Exception e) {
			throw e;
		}
	}

}
