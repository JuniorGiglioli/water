package br.com.nsa.interceptor;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.caelum.vraptor.BeforeCall;
import br.com.caelum.vraptor.InterceptionException;
import br.com.caelum.vraptor.Intercepts;

@Intercepts
public class CORSInterceptor {

	@Inject
	private HttpServletRequest request;

	@Inject
	private HttpServletResponse response;


	@BeforeCall
	public void intercept() throws InterceptionException {

		String origin = request.getHeader("origin");

		if (origin == null) {
			origin = "*";
		}

		response.addHeader("Access-Control-Allow-Origin", origin);
		response.addHeader("Access-Control-Allow-Credentials", "true");
		response.addHeader("Access-Control-Expose-Headers", "Content-Type, Location");
	}
}