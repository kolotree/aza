package com.app.aza.serviceimpl;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.aza.model.ROLE;
import com.app.aza.model.User;
import com.app.aza.repository.UserRepository;
import com.app.aza.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	public Collection<User> findAll(){
		return userRepository.findAll().stream()
				.filter(u-> u.getRole().equals(ROLE.USER))
				.collect(Collectors.toList());
	}
	
	public User createOrUpdate(User user) throws UserNotFoundException {
		if(user.getId() == null) {
			user.setRole(ROLE.USER);
			return userRepository.save(user);
		}
		User userUpdate = userRepository.findById(user.getId()).orElseThrow(() -> new UserNotFoundException(user.getId().toString()));
		userUpdate.update(user);
		return userRepository.save(user);
	}
	
	public User findOne(Long id) throws UserNotFoundException {
		return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id.toString()));
	}
}
