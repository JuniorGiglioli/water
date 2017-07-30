package br.com.nsa.service;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import br.com.nsa.dao.PersonDAO;
import br.com.nsa.model.Person;

public class PersonService implements Serializable {
	private static final long serialVersionUID = 2959058295145315242L;
	@Inject
	private PersonDAO dao;

	public Person register(Person entity) {
		return dao.insert(entity);
	}

	public Person update(Person entity) {
		entity.setUpdateDate(new Date());
		return dao.update(entity);
	}

	public Person findById(Long id) {
		return dao.findById(id);
	}

	public List<Person> findAll() {
		return dao.findAll();
	}

	public void remove(Long id) {
		dao.remove(id);
	}
}
