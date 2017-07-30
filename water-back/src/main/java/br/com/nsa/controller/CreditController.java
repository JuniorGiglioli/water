package br.com.nsa.controller;

import java.io.Serializable;

import javax.inject.Inject;

import br.com.caelum.vraptor.Consumes;
import br.com.caelum.vraptor.Controller;
import br.com.caelum.vraptor.Delete;
import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Path;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Put;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.view.Results;
import br.com.nsa.model.Credit;
import br.com.nsa.service.CreditService;
import br.com.nsa.service.TableService;
import br.com.nsa.vo.BootstrapTableVO;

@Controller
@Path("/credit")
public class CreditController implements Serializable {
	private static final long serialVersionUID = 8542544867334514553L;

	@Inject
	protected Result result;
	@Inject
	private CreditService service;
	@Inject
	private TableService<Credit> tableService;

	@Get("/{id}")
	public void find(Long id) {
		this.result.use(Results.json()).withoutRoot().from(service.findById(id)).serialize();
	}

	@Post("")
	@Consumes("application/json")
	public void save(Credit entity) {
		this.result.use(Results.json()).withoutRoot().from(service.register(entity)).serialize();
	}

	@Get("")
	public void list() {
		this.result.use(Results.json()).withoutRoot().from(service.findAll()).serialize();
	}

	@Put("")
	@Consumes("application/json")
	public void update(Credit entity) {
		service.update(entity);
		this.result.use(Results.json()).withoutRoot().from(entity).serialize();
	}

	@Delete("/{id}")
	public void delete(Long id) {
		service.remove(id);
		this.result.use(Results.status()).ok();
	}

	@Get
	@Path(value = "table", priority = Path.HIGH)
	public void find(String search, int limit, int page, String sort, String order) {
		BootstrapTableVO table = this.tableService.getTable(search, limit, page, sort, order);
		this.result.use(Results.json()).withoutRoot().from(table).include("rows").serialize();
	}
}
