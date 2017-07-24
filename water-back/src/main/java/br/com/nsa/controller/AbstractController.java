package br.com.nsa.controller;

import java.io.Serializable;

import javax.inject.Inject;

import br.com.caelum.vraptor.Consumes;
import br.com.caelum.vraptor.Delete;
import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Put;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.view.Results;
import br.com.nsa.model.AbstractModel;
import br.com.nsa.service.AbstractService;

public abstract class AbstractController<T extends AbstractModel<Long>, Long extends Serializable> {
	@Inject
	protected Result result;

	protected abstract AbstractService<T, Long> getService();

	@Get("/{id}")
	public void find(Long id) {
		this.result.use(Results.json()).withoutRoot().from(getService().get(id)).serialize();
	}

	@Post("")
	@Consumes("application/json")
	public void save(T entity) {
		this.result.use(Results.json()).withoutRoot().from(getService().save(entity)).serialize();
	}

	@Get("")
	public void list() {
		this.result.use(Results.json()).withoutRoot().from(getService().listar()).serialize();
	}

	@Put("")
	@Consumes("application/json")
	public void update(T entity) {
		getService().update(entity);
		this.result.use(Results.json()).withoutRoot().from(entity).serialize();
	}

	@Delete("/{id}")
	public void delete(Long id) {
		getService().delete(id);
		this.result.use(Results.status()).ok();
	}

}
