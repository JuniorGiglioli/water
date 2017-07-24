package br.com.nsa.controller;

import javax.inject.Inject;

import br.com.caelum.vraptor.Controller;
import br.com.caelum.vraptor.Path;
import br.com.nsa.model.Person;
import br.com.nsa.service.AbstractService;
import br.com.nsa.service.PersonService;

@Controller
@Path("/person")
public class PersonController extends AbstractController<Person, Long> {

	@Inject
	private PersonService service;

	@Override
	protected AbstractService<Person, Long> getService() {
		return service;
	}

}
