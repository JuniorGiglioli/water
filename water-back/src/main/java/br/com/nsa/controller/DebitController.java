package br.com.nsa.controller;

import javax.inject.Inject;

import br.com.caelum.vraptor.Controller;
import br.com.caelum.vraptor.Path;
import br.com.nsa.model.Debit;
import br.com.nsa.service.AbstractService;
import br.com.nsa.service.DebitService;

@Controller
@Path("/debit")
public class DebitController extends AbstractController<Debit, Long> {

	@Inject
	private DebitService service;

	@Override
	protected AbstractService<Debit, Long> getService() {
		return service;
	}

}
