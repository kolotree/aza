package com.app.aza.model;

public enum ROLE {
	ADMIN, USER;

	public static ROLE fromString(String role) {
		for(ROLE r: ROLE.values()) {
			if(r.toString().equals(role)) {
				return r;
			}
		}
		return null;
	}
	
	public static String fromEnum(ROLE role) {
		if(role.equals(ROLE.ADMIN)) {
			return "admin";
		}else {
			return "user";
		}
	}
}
