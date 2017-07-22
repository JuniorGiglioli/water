package br.com.nsa.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "debit_shared")
public class DebitShared extends AbstractModel<Long> {
	
	private BigDecimal amountValue = BigDecimal.ZERO;
	private BigDecimal dividedValue = BigDecimal.ZERO;
	private Person Registrant;
	private String description;
	private Date dateRegister;
	// TODO: terminar de mapear
	// private List<User> Paying;

	public DebitShared() {
	}

	@Column(name = "amount_value", nullable = false)
	public BigDecimal getAmountValue() {
		return amountValue;
	}

	public void setAmountValue(BigDecimal amountValue) {
		this.amountValue = amountValue;
	}

	@Column(name = "divided_value", nullable = false)
	public BigDecimal getDividedValue() {
		return dividedValue;
	}

	public void setDividedValue(BigDecimal dividedValue) {
		this.dividedValue = dividedValue;
	}

	public Person getRegistrant() {
		return Registrant;
	}

	public void setRegistrant(Person registrant) {
		Registrant = registrant;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_register", nullable = false)
	public Date getDateRegister() {
		return dateRegister;
	}

	public void setDateRegister(Date dateRegister) {
		this.dateRegister = dateRegister;
	}

	// public List<User> getPaying() {
	// return Paying;
	// }
	//
	// public void setPaying(List<User> paying) {
	// Paying = paying;
	// }

}
