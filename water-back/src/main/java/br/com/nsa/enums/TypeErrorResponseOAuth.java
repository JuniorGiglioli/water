package br.com.nsa.enums;

import javax.servlet.http.HttpServletResponse;

import com.google.gson.annotations.SerializedName;

public enum TypeErrorResponseOAuth {

	// See more in https://tools.ietf.org/html/rfc6749#section-5.2

	@SerializedName("invalid_request")
	INVALID_REQUEST(HttpServletResponse.SC_BAD_REQUEST),

	@SerializedName("invalid_client")
	INVALID_CLIENT(HttpServletResponse.SC_UNAUTHORIZED),

	@SerializedName("invalid_grant")
	INVALID_GRANT(HttpServletResponse.SC_BAD_REQUEST),

	@SerializedName("unauthorized_client")
	UNAUTHORIZED_CLIENT(HttpServletResponse.SC_BAD_REQUEST),

	@SerializedName("unsupported_grant_type")
	UNSUPPORTED_GRANT_TYPE(HttpServletResponse.SC_BAD_REQUEST),

	@SerializedName("invalid_scope")
	INVALID_SCOPE(HttpServletResponse.SC_BAD_REQUEST);

	private int statusCode;

	TypeErrorResponseOAuth(int statusCode) {
		this.statusCode = statusCode;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
}