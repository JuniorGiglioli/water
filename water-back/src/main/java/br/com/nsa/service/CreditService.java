package br.com.nsa.service;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import br.com.nsa.dao.CreditDAO;
import br.com.nsa.model.Credit;

public class CreditService implements Serializable {
	private static final long serialVersionUID = 7382225304060321030L;
	@Inject
	private CreditDAO dao;

	public Credit register(Credit entity) {
		return this.dao.insert(entity);
	}

	public Credit update(Credit entity) {
		entity.setUpdateDate(new Date());
		return this.dao.update(entity);
	}

	public Credit findById(Long id) {
		return dao.findById(id);
	}

	public List<Credit> findAll() {
		return dao.findAll();
	}

	public void remove(Long id) {
		dao.remove(id);
	}
}
