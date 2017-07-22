package br.com.nsa.controller;

import br.com.caelum.vraptor.Controller;
import br.com.caelum.vraptor.Get;
import br.com.nsa.annotations.Public;

@Controller
public class IndexController {

	@Public
	@Get("/")
	public void index() {
	}
}