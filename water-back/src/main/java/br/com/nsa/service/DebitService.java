package br.com.nsa.service;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import br.com.nsa.dao.DebitDAO;
import br.com.nsa.model.Debit;

public class DebitService implements Serializable {
	private static final long serialVersionUID = -3809696822689456968L;
	@Inject
	private DebitDAO dao;

	public Debit register(Debit entity) {
		return this.dao.insert(entity);
	}

	public Debit update(Debit entity) {
		entity.setUpdateDate(new Date());
		return this.dao.update(entity);
	}

	public Debit findById(Long id) {
		return dao.findById(id);
	}

	public List<Debit> findAll() {
		return dao.findAll();
	}

	public void remove(Long id) {
		dao.remove(id);
	}

}
