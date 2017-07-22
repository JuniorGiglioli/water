package br.com.nsa.vo;

import java.io.Serializable;

import com.google.gson.annotations.SerializedName;

import br.com.nsa.enums.TypeErrorResponseOAuth;

public class OAuthJsonResponseVO implements Serializable {

	private static final long serialVersionUID = 4226070169519840515L;

	@SerializedName("error")
	private TypeErrorResponseOAuth typesErrorsResponseOAuth;

	@SerializedName("error_description")
	private String errorDescription;

	@SerializedName("error_uri")
	private String errorUri;//optional

	private String scope;


	public OAuthJsonResponseVO() {
	}

	public OAuthJsonResponseVO(TypeErrorResponseOAuth typesErrorsResponseOAuth, String errorDescription) {
		this.typesErrorsResponseOAuth = typesErrorsResponseOAuth;
		this.errorDescription = errorDescription;
	}

	public OAuthJsonResponseVO(TypeErrorResponseOAuth typesErrorsResponseOAuth, String errorDescription, String errorUri) {
		this.typesErrorsResponseOAuth = typesErrorsResponseOAuth;
		this.errorDescription = errorDescription;
		this.errorUri = errorUri;
	}

	public OAuthJsonResponseVO(TypeErrorResponseOAuth typesErrorsResponseOAuth, String errorDescription, String errorUri, String scope) {
		this.typesErrorsResponseOAuth = typesErrorsResponseOAuth;
		this.errorDescription = errorDescription;
		this.errorUri = errorUri;
		this.scope = scope;
	}

	public TypeErrorResponseOAuth getTypesErrorsResponseOAuth() {
		return typesErrorsResponseOAuth;
	}

	public void setTypesErrorsResponseOAuth(TypeErrorResponseOAuth typesErrorsResponseOAuth) {
		this.typesErrorsResponseOAuth = typesErrorsResponseOAuth;
	}

	public String getErrorDescription() {
		return errorDescription;
	}

	public void setErrorDescription(String errorDescription) {
		this.errorDescription = errorDescription;
	}

	public String getErrorUri() {
		return errorUri;
	}

	public void setErrorUri(String errorUri) {
		this.errorUri = errorUri;
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}
}