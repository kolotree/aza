package com.app.aza.serviceimpl;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.app.aza.model.Case;
import com.app.aza.model.Document;
import com.app.aza.model.STATUS;
import com.app.aza.model.User;
import com.app.aza.service.MailService;

@Service
public class MailServiceImpl implements MailService {
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Async
	public void newUser (User user) throws MessagingException {
		MimeMessage mimeMessage= mailSender.createMimeMessage();
		MimeMessageHelper mmHelper = new MimeMessageHelper(mimeMessage, true, "utf-8");
		String message = "<html><head><meta charset=\"UTF-8\"></head>"
				+ "<body><h3>Aplikacija za advokate - Dobordošli!</h3><br>"
				+ "<div><p>Poštovani korisniče možete pristupati Vašim predmetima na našem "
				+ "<a target=\"_blank\" href = \"http://localhost:4200/login\"><u>sajtu</u></a> "
				+ " pomoću šifre: <b>" + user.getPassword() + "<b>.</p></div></body></html>";
        mmHelper.setText(message, true);
		mmHelper.setTo(user.getEmail());
		mmHelper.setSubject("Aplikacija za advokate - dodela šifre");
		mailSender.send(mimeMessage);
	}
	
	@Async
	public void newCase (Case c) throws MessagingException {
		MimeMessage mimeMessage= mailSender.createMimeMessage();
		MimeMessageHelper mmHelper = new MimeMessageHelper(mimeMessage, true, "utf-8");
		String message = "<html><head><meta charset=\"UTF-8\"></head>"
				+ "<body><h3>Aplikacija za advokate - Novi predmet!</h3><br>"
				+ "<div><p>Poštovani korisniče dodat je novi predmet <i>" + c.getName() 
				+ "</i> sa statusom " + STATUS.fromEnum(c.getStatus()) + ", možete mu pirstupiti pomoću našeg "
				+ "<a target=\"_blank\" href = \"http://localhost:4200/login\"><u>sajta</u></a>.</p></div></body></html>";
        mmHelper.setText(message, true);
		mmHelper.setTo(c.getUser().getEmail());
		mmHelper.setSubject("Aplikacija za advokate - novi predmet");
		mailSender.send(mimeMessage);
	}
	
	@Async
	public void caseChangeStatus (Case c) throws MessagingException {
		MimeMessage mimeMessage= mailSender.createMimeMessage();
		MimeMessageHelper mmHelper = new MimeMessageHelper(mimeMessage, true, "utf-8");
		String message = "<html><head><meta charset=\"UTF-8\"></head>"
				+ "<body><h3>Aplikacija za advokate - Promenjen statu predmetu!</h3><br>"
				+ "<div><p>Poštovani korisniče izmenjen je status predmeta <i>" + c.getName() 
				+ "</i> u <b>" + STATUS.fromEnum(c.getStatus()) + "</b>, predmetu možete pirstupiti pomoću našeg "
				+ "<a target=\"_blank\" href = \"http://localhost:4200/login\"><u>sajta</u></a>.</p></div></body></html>";
        mmHelper.setText(message, true);
		mmHelper.setTo(c.getUser().getEmail());
		mmHelper.setSubject("Aplikacija za advokate - promenjen status predmetu");
		mailSender.send(mimeMessage);
	}
	
	@Async
	public void newDocument (Document document) throws MessagingException {
		MimeMessage mimeMessage= mailSender.createMimeMessage();
		MimeMessageHelper mmHelper = new MimeMessageHelper(mimeMessage, true, "utf-8");
		String message = "<html><head><meta charset=\"UTF-8\"></head>"
				+ "<body><h3>Aplikacija za advokate - Novi dokument u predmetu!</h3><br>"
				+ "<div><p>Poštovani korisniče dodat je novi dokument predmetu <i>" + document.getCase().getName() 
				+ "</i>, možete mu pirstupiti pomoću našeg "
				+ "<a target=\"_blank\" href = \"http://localhost:4200/login\"><u>sajta</u></a>.</p></div></body></html>";
        mmHelper.setText(message, true);
		mmHelper.setTo(document.getCase().getUser().getEmail());
		mmHelper.setSubject("Aplikacija za advokate - dodat je dokument predmetu");
		mailSender.send(mimeMessage);
	}
}
