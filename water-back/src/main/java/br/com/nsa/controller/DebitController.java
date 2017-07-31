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
import br.com.nsa.model.Debit;
import br.com.nsa.service.DebitService;
import br.com.nsa.service.TableService;
import br.com.nsa.vo.BootstrapTableVO;
import br.com.nsa.vo.TableDebitVO;

@Public
@Controller
@Path("/debit")
public class DebitController implements Serializable {

	private static final long serialVersionUID = -2022892187025341477L;

	@Inject
	protected Result result;
	@Inject
	private DebitService service;
	@Inject
	private TableService<Debit> tableService;

	@Get("/{id}")
	public void find(Long id) {
		this.result.use(Results.json()).withoutRoot().from(service.findById(id)).include("registrant", "target")
				.serialize();
	}

	@Post("")
	@Consumes("application/json")
	public void save(Debit entity) {
		this.result.use(Results.json()).withoutRoot().from(service.register(entity)).serialize();
	}

	@Get("")
	public void list() {
		this.result.use(Results.json()).withoutRoot().from(service.findAll()).include("registrant", "target")
				.serialize();
	}

	@Put("")
	@Consumes("application/json")
	public void update(Debit entity) {
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
		@SuppressWarnings("unchecked")
		TableDebitVO tableDebitVO = new TableDebitVO((List<Debit>) table.getRows(), table.getTotal());
		this.result.use(Results.json()).withoutRoot().from(tableDebitVO)
				.include("rows", "rows.registrant", "rows.target").serialize();
	}
}
