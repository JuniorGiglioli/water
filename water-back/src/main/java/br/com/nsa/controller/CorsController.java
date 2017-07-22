package br.com.nsa.controller;

import java.util.Set;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import br.com.caelum.vraptor.Controller;
import br.com.caelum.vraptor.Options;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.controller.HttpMethod;
import br.com.caelum.vraptor.http.route.Router;
import br.com.caelum.vraptor.view.Results;

@Controller
public class CorsController {

	@Inject
	private HttpServletRequest request;

	@Inject
	private Result result;

	@Inject
	private Router router;


	@Options("/*")
	public void options() {

		Set<HttpMethod> allowed = router.allowedMethodsFor(request.getRequestURI());
		String allow = allowed.toString().replaceAll("\\[|\\]", "");

		String allowMethod = request.getHeader("Access-Control-Request-Method");

		if (allowMethod == null) {
			allowMethod = "*";
		}

		result.use(Results.status()).header("Allow", allow);
		result.use(Results.status()).header("Access-Control-Allow-Methods", allowMethod);
		result.use(Results.status()).header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, accept, Authorization, origin");
	}
}