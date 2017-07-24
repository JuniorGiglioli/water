package br.com.nsa.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "debit_shared")
public class DebitShared extends AbstractModel<Long> {

	@Column(name = "amount_value", nullable = false)
	private BigDecimal amountValue = BigDecimal.ZERO;

	@Column(name = "divided_value", nullable = false)
	private BigDecimal dividedValue = BigDecimal.ZERO;

	private Person Registrant;

	private String description;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_date", columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP", nullable = false, insertable = false, updatable = false)
	private Date createDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "update_date", columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP", nullable = false)
	private Date updateDate;

	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinTable(name = "Payings", joinColumns = { @JoinColumn(name = "debit_shared_id") }, inverseJoinColumns = {
			@JoinColumn(name = "person_id") })
	private List<Person> Payings = new ArrayList<>();

	public DebitShared() {
	}

	public BigDecimal getAmountValue() {
		return amountValue;
	}

	public void setAmountValue(BigDecimal amountValue) {
		this.amountValue = amountValue;
	}

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

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public List<Person> getPayings() {
		return Payings;
	}

	public void setPayings(List<Person> payings) {
		Payings = payings;
	}

}
