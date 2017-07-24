package br.com.nsa.controller;

import javax.inject.Inject;

import br.com.caelum.vraptor.Controller;
import br.com.caelum.vraptor.Path;
import br.com.nsa.model.Credit;
import br.com.nsa.service.AbstractService;
import br.com.nsa.service.CreditService;

@Controller
@Path("/credit")
public class CreditController extends AbstractController<Credit, Long> {

	@Inject
	private CreditService service;

	@Override
	protected AbstractService<Credit, Long> getService() {
		return service;
	}
}
