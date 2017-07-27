package br.com.nsa.controller;

import javax.inject.Inject;

import br.com.caelum.vraptor.Consumes;
import br.com.caelum.vraptor.Controller;
import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Path;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Put;
import br.com.caelum.vraptor.view.Results;
import br.com.nsa.annotations.Public;
import br.com.nsa.model.Person;
import br.com.nsa.service.AbstractService;
import br.com.nsa.service.PersonService;
import br.com.nsa.service.TableService;
import br.com.nsa.vo.BootstrapTableVO;

@Public
@Controller
@Path("/person")
public class PersonController extends AbstractController<Person, Long> {

	@Inject
	private PersonService service;
	@Inject
	private TableService<Person> tableService;

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

	@Get
	@Path(value = "table", priority = Path.HIGH)
	public void find(String search, int limit, int page, String sort, String order) {
		BootstrapTableVO table = this.tableService.getTable(search, limit, page, sort, order);
		this.result.use(Results.json()).withoutRoot().from(table).include("rows").serialize();
	}
}
