package br.com.nsa.vo;

import java.io.Serializable;

public class HeaderPairVO implements Serializable {

	private static final long serialVersionUID = -8273127577181530851L;

	private String header;

	private String value;


	public HeaderPairVO(String header, String value) {
		this.header = header;
		this.value = value;
	}

	public String getHeader() {
		return header;
	}

	public void setHeader(String header) {
		this.header = header;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}