package br.com.nsa.service;

import java.io.Serializable;
import java.util.List;

import br.com.nsa.dao.GenericDAO;
import br.com.nsa.model.AbstractModel;

public abstract class AbstractService<T extends AbstractModel<Long>, Long extends Serializable> {

	protected abstract GenericDAO<T, Long> getGenericDAO();

	public T get(Long id) {
		return getGenericDAO().findById(id);
	}

	public List<T> listar() {
		return getGenericDAO().findAll();
	}

	public T save(T entity) {
		return getGenericDAO().insert(entity);
	}

	public void update(T entity) {
		getGenericDAO().update(entity);
	}

	public void delete(Long id) {
		try {
			getGenericDAO().remove(id);
		} catch (Exception e) {
		}
	}

}