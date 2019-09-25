package com.app.aza.service;

import java.util.Collection;
import java.util.HashMap;

import com.app.aza.model.User;
import com.app.aza.serviceimpl.IncorrectPasswordException;
import com.app.aza.serviceimpl.UserNotFoundException;

public interface UserService {
	User login(HashMap<String, String> password) throws IncorrectPasswordException;
	Collection<User> findAll();
	User createOrUpdate(User user) throws UserNotFoundException;
	User findOne(Long id) throws UserNotFoundException;
	Collection<User> userSearch(HashMap<String, String> search);
}
