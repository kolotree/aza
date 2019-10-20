package com.app.aza.controller;

import java.util.Collection;
import java.util.HashMap;
import java.util.stream.Collectors;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.app.aza.dto.UserDTO;
import com.app.aza.model.User;
import com.app.aza.service.MailService;
import com.app.aza.service.UserService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class UserController extends BaseController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private MailService mailService;
	
	@RequestMapping(
			value = "/login",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> login(@RequestBody HashMap<String, String> password) throws Exception {
		return new ResponseEntity<>(new UserDTO(userService.login(password)), HttpStatus.OK);
		
	}
	
	@RequestMapping(
			value = "/user",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<UserDTO>> getUsers() {
		return new ResponseEntity<>(userService.findAll().stream()
									.map(u -> new UserDTO(u))
									.collect(Collectors.toList()), HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/user/{id}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getUser(@PathVariable("id") Long id) throws Exception {
		return new ResponseEntity<>(new UserDTO(userService.findOne(id)), HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/user",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createUser(@RequestBody UserDTO user) throws Exception, MessagingException {
		User newUser = userService.createOrUpdate(new User(user));
		mailService.newUser(newUser.getEmail(), user.getPassword());
		return new ResponseEntity<>(new UserDTO(newUser), HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/user/search",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<UserDTO>> getUsersSearch(@RequestBody HashMap<String, String> search) {
		return new ResponseEntity<>(userService.userSearch(search).stream()
									.map(u ->  new UserDTO(u))
									.collect(Collectors.toList()), HttpStatus.OK);
	}
	
}
