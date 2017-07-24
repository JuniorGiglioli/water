package br.com.nsa.service;

import javax.inject.Inject;

import br.com.nsa.dao.DebitDAO;
import br.com.nsa.dao.GenericDAO;
import br.com.nsa.model.Debit;

public class DebitService extends AbstractService<Debit, Long> {
	@Inject
	private DebitDAO dao;

	@Override
	protected GenericDAO<Debit, Long> getGenericDAO() {
		return dao;
	}
}
