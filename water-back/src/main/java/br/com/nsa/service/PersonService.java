package br.com.nsa.service;

import java.util.Date;

import javax.inject.Inject;

import br.com.nsa.dao.GenericDAO;
import br.com.nsa.dao.PersonDAO;
import br.com.nsa.model.Person;

public class PersonService extends AbstractService<Person, Long> {
	@Inject
	private PersonDAO dao;

	@Override
	protected GenericDAO<Person, Long> getGenericDAO() {
		return dao;
	}

	public Person register(Person person) {
		return save(person);
	}

	public Person alter(Person person) {
		person.setUpdateDate(new Date());
		return update(person);
	}

}
