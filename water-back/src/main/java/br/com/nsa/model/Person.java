package br.com.nsa.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Person {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(columnDefinition = "numeric", precision = 16, scale = 4, nullable = false)
	private BigDecimal credit = BigDecimal.ZERO;

	private boolean active;

	@Column(unique = true, nullable = false)
	private String mail;

	@Enumerated(EnumType.STRING)
	private Role role = Role.STANDARD;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "last_acess")
	private Date lastAcess;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_date", columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP", nullable = false, insertable = false, updatable = false)
	private Date createDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "update_date", columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP")
	private Date updateDate;

	@OneToMany(mappedBy = "registrant")
	private List<Credit> creditRegistrants = new ArrayList<>();

	@OneToMany(mappedBy = "benefited")
	private List<Credit> creditBenefiteds = new ArrayList<>();

	public Person() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
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

	public Date getLastAcess() {
		return lastAcess;
	}

	public void setLastAcess(Date lastAcess) {
		this.lastAcess = lastAcess;
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

	public List<Credit> getCreditRegistrants() {
		return creditRegistrants;
	}

	public void setCreditRegistrants(List<Credit> creditRegistrants) {
		this.creditRegistrants = creditRegistrants;
	}

	public List<Credit> getCreditBenefiteds() {
		return creditBenefiteds;
	}

	public void setCreditBenefiteds(List<Credit> creditBenefiteds) {
		this.creditBenefiteds = creditBenefiteds;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Person other = (Person) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}