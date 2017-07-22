package br.com.nsa.controller;

import javax.inject.Inject;
import br.com.caelum.vraptor.Controller;
import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Patch;
import br.com.caelum.vraptor.view.Results;
import br.com.nsa.annotations.Public;
import br.com.nsa.model.Person;
import br.com.nsa.service.AbstractService;
import br.com.nsa.service.PersonService;

@Public
@Controller
@Patch("/person")
public class PersonController extends AbstractController<Person, Long> {

	@Inject
	private PersonService userService;

	@Override
	protected AbstractService<Person, Long> getService() {
		return userService;
	}

	@Get("/person/{id}")
	public void find(Long id) {
		this.result.use(Results.json()).withoutRoot().from(getService().get(id)).serialize();
	}
}
