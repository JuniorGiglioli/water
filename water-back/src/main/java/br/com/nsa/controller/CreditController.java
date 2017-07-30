package br.com.nsa.controller;

import java.io.Serializable;
import java.util.List;

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
import br.com.nsa.annotations.Public;
import br.com.nsa.model.Credit;
import br.com.nsa.service.CreditService;
import br.com.nsa.service.TableService;
import br.com.nsa.vo.BootstrapTableVO;
import br.com.nsa.vo.TableCreditVO;

@Public
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
		this.result.use(Results.json()).withoutRoot().from(service.findById(id)).include("registrant", "benefited")
				.serialize();
	}

	@Post("")
	@Consumes("application/json")
	public void save(Credit entity) {
		this.result.use(Results.json()).withoutRoot().from(service.register(entity)).serialize();
	}

	@Get("")
	public void list() {
		this.result.use(Results.json()).withoutRoot().from(service.findAll()).include("registrant", "benefited")
				.serialize();
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
	@Path(value = "table")
	public void find(String search, int limit, int page, String sort, String order) {
		BootstrapTableVO table = this.tableService.getTable(search, limit, page, sort, order);
		TableCreditVO tableCreditVO = new TableCreditVO((List<Credit>) table.getRows(), table.getTotal());
		this.result.use(Results.json()).withoutRoot().from(tableCreditVO)
				.include("rows", "rows.registrant", "rows.benefited").serialize();
	}
}
