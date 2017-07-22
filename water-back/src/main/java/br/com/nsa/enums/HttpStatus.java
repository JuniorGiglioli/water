package br.com.nsa.enums;

public enum HttpStatus {

	INTERNAL_ERROR(500), SUCCESS(200), NOT_ALLOWER(403), ALERT(402), BAD_REQUEST(400);

	private int code;

	HttpStatus(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}
}