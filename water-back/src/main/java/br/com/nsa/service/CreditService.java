package br.com.nsa.service;

import javax.inject.Inject;

import br.com.nsa.dao.CreditDAO;
import br.com.nsa.dao.GenericDAO;
import br.com.nsa.model.Credit;

public class CreditService extends AbstractService<Credit, Long> {
	@Inject
	private CreditDAO dao;

	@Override
	protected GenericDAO<Credit, Long> getGenericDAO() {
		return dao;
	}

}
