package com.app.aza.service;

import java.util.Collection;

import com.app.aza.dto.UserDTO;
import com.app.aza.serviceimpl.UserNotFoundException;

public interface IUserService {
	public Collection<UserDTO> findAll();
	public UserDTO createOrUpdate(UserDTO userDTO) throws UserNotFoundException;
	public UserDTO findOne(Long id) throws UserNotFoundException;
}
