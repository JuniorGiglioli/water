package br.com.nsa.model;

import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Person extends AbstractModel<Long> {

	private String name;
	private String mail;
	private String password;
	private BigDecimal credit = BigDecimal.ZERO;
	private boolean active;
	private Role role = Role.BASIC;
	private Date dateRegister;
	private Date lastAcess;

	public Person() {
	}

	public Person(String name, String mail, String password, BigDecimal credit, boolean active, Role role,
			Date dateRegister, Date lastAcess) {
		super();
		this.name = name;
		this.mail = mail;
		this.password = password;
		this.credit = credit;
		this.active = active;
		this.role = role;
		this.dateRegister = dateRegister;
		this.lastAcess = lastAcess;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(unique = true, nullable = false)
	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public BigDecimal getCredit() {
		return credit;
	}

	public void setCredit(BigDecimal credit) {
		this.credit = credit;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_register", nullable = false)
	public Date getDateRegister() {
		return dateRegister;
	}

	public void setDateRegister(Date dateRegister) {
		this.dateRegister = dateRegister;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "last_acess", nullable = false)
	public Date getLastAcess() {
		return lastAcess;
	}

	public void setLastAcess(Date lastAcess) {
		this.lastAcess = lastAcess;
	}

}