package com.app.aza.model;

public enum STATUS {
	IN_PROCESS, ACCEPTED, REJECTED;

	public static STATUS fromString(String status) {
		if(status.equals("U procesu")) {
			return STATUS.IN_PROCESS;
		}else if(status.equals("Prihvaćen")){
			return STATUS.ACCEPTED;
		}else {
			return STATUS.REJECTED;
		}
	}
	
	public static String fromEnum(STATUS status) {
		if(status.equals(STATUS.IN_PROCESS)) {
			return "U procesu";
		}else if(status.equals(STATUS.ACCEPTED)) {
			return "Prihvaćen";
		}else {
			return "Odbijen";
		}
	}
}

