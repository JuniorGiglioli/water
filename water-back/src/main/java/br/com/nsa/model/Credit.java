package br.com.nsa.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Credit extends AbstractModel<Long> {

	private BigDecimal value = BigDecimal.ZERO;
	private Person benefited;
	private Person Registrant;
	private String description;
	private Date dateRegister;

	public Credit() {
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

	public Person getBenefited() {
		return benefited;
	}

	public void setBenefited(Person benefited) {
		this.benefited = benefited;
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
