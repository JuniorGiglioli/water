package br.com.nsa.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Debit extends AbstractModel<Long> {

	private BigDecimal value = BigDecimal.ZERO;
	private Person targetUser;
	private Person Registrant;
	private String description;
	private Date dateRegister;

	public Debit() {
	}

	public Debit(BigDecimal value, String description, Person targetUser, Person registrant, Date dateRegister) {
		super();
		this.value = value;
		this.description = description;
		this.targetUser = targetUser;
		Registrant = registrant;
		this.dateRegister = dateRegister;
	}

	public BigDecimal getValue() {
		return value;
	}

	public void setValue(BigDecimal value) {
		this.value = value;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "target_user", nullable = false)
	public Person getUserTarget() {
		return targetUser;
	}

	public void setRTargetUser(Person targetUser) {
		this.targetUser = targetUser;
	}

	public Person getRegistrant() {
		return Registrant;
	}

	public void setRegistrant(Person registrant) {
		Registrant = registrant;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_register", nullable = false)
	public Date getDateRegister() {
		return dateRegister;
	}

	public void setDateRegister(Date dateRegister) {
		this.dateRegister = dateRegister;
	}

}
