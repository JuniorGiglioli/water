package br.com.nsa.vo;

import java.io.Serializable;
import java.util.List;

import br.com.caelum.vraptor.validator.Message;

public class Response implements Serializable {

	private static final long serialVersionUID = -7420060370108016065L;

	private String message;

	private List<Message> errors;

	public Response(String message) {
		this.message = message;
	}

	public Response(List<Message> errors) {
		this.errors = errors;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<Message> getErrors() {
		return errors;
	}

	public void setErrors(List<Message> errors) {
		this.errors = errors;
	}
}
