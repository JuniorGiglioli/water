package br.com.nsa.dao;

import javax.enterprise.context.RequestScoped;

import br.com.nsa.model.Person;

@RequestScoped
public class PersonDAO extends GenericDAO<Person, Long> {

}
