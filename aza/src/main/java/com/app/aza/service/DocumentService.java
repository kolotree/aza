package com.app.aza.service;

import com.app.aza.model.Document;
import com.app.aza.serviceimpl.CaseNotFoundException;

public interface DocumentService {
	Document create(Document document) throws CaseNotFoundException;	
}
