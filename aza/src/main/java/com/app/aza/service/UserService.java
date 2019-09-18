package com.app.aza.service;

import java.util.Collection;

import com.app.aza.dto.UserDTO;
import com.app.aza.serviceimpl.UserNotFoundException;

public interface UserService {
	Collection<UserDTO> findAll();
	UserDTO createOrUpdate(UserDTO userDTO) throws UserNotFoundException;
	UserDTO findOne(Long id) throws UserNotFoundException;
}
