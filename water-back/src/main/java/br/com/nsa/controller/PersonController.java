package br.com.nsa.controller;

import javax.inject.Inject;

import br.com.caelum.vraptor.Consumes;
import br.com.caelum.vraptor.Controller;
import br.com.caelum.vraptor.Path;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Put;
import br.com.caelum.vraptor.view.Results;
import br.com.nsa.annotations.Public;
import br.com.nsa.model.Person;
import br.com.nsa.service.AbstractService;
import br.com.nsa.service.PersonService;

@Public
@Controller
@Path("/person")
public class PersonController extends AbstractController<Person, Long> {

	@Inject
	private PersonService service;

	@Override
	protected AbstractService<Person, Long> getService() {
		return service;
	}

	@Post("")
	@Consumes("application/json")
	public void save(Person entity) {
		this.result.use(Results.json()).withoutRoot().from(this.service.register(entity)).serialize();
	}

	@Put("")
	@Consumes("application/json")
	public void update(Person entity) {
		this.result.use(Results.json()).withoutRoot().from(this.service.alter(entity)).serialize();
	}
}
