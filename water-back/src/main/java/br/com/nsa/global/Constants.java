package br.com.nsa.global;

public final class Constants {

	private Constants() {
	}

	public final class OAuth {
		public static final String REALM = "Resource Serve Java";
	}


	public final class Http {
		// headers values
		public static final String HEADER_ACCEPT = "Accept";
		public static final String HEADER_CONTENT_TYPE = "Content-Type";

		// content values
		public static final String CONTENT_TYPE_JSON = "application/json";
	}


	public final class Parameters {

		public static final String APPLICATION = "application";

		public static final String AUTHZ_ENDPOINT = "authz_endpoint";

		public static final String TOKEN_ENDPOINT = "token_endpoint";

		public static final String USER_INFO_ENDPOINT_URL = "user_info_endpoint_url";

		public static final String SCOPE = "scope";

		public static final String CLIENT_ID = "client_id";

		public static final String CLIENT_SECRET = "client_secret";

		public static final String REDIRECT_URI = "redirect_uri";
	}
}