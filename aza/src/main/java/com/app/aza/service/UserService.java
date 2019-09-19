package com.app.aza.service;

import java.util.Collection;

import com.app.aza.model.User;
import com.app.aza.serviceimpl.UserNotFoundException;

public interface UserService {
	Collection<User> findAll();
	User createOrUpdate(User user) throws UserNotFoundException;
	User findOne(Long id) throws UserNotFoundException;
}
