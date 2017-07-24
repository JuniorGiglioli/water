package br.com.nsa.dao;

import javax.enterprise.context.RequestScoped;

import br.com.nsa.model.Credit;

@RequestScoped
public class CreditDAO extends GenericDAO<Credit, Long> {

}
