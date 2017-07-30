package br.com.nsa.dao;

import javax.enterprise.context.RequestScoped;
import br.com.nsa.model.Person;

@RequestScoped
public class PersonDAO extends GenericDAO<Person> {
	private static final long serialVersionUID = -7629612532801880619L;

}
