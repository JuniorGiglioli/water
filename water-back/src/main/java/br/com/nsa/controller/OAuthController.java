package br.com.nsa.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.oltu.oauth2.client.response.OAuthResourceResponse;
import org.apache.oltu.oauth2.common.OAuth;

import br.com.caelum.vraptor.Controller;
import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.view.Results;
import br.com.nsa.enums.TypeErrorResponseOAuth;
import br.com.nsa.global.Constants;
import br.com.nsa.vo.OAuthJsonResponseVO;

@Controller
public class OAuthController {

	@Inject
	private Result result;

	@Inject
	private HttpServletRequest request;

	@Inject
	private HttpServletResponse response;


	@Get("/error")
	public void error(OAuthResourceResponse userInfoEndpoint) {

		List<String> authenticate = userInfoEndpoint.getHeaders().get(OAuth.HeaderType.WWW_AUTHENTICATE);

		Map<String, List<String>> headers = new HashMap<>();
		headers.put(OAuth.HeaderType.WWW_AUTHENTICATE, authenticate);

		addHeaders(headers);

		this.result.use(Results.http()).setStatusCode(userInfoEndpoint.getResponseCode());

		String acceptHeader = request.getHeader(Constants.Http.HEADER_ACCEPT);

		if (acceptHeader != null && acceptHeader.contains(Constants.Http.CONTENT_TYPE_JSON)) {
			try {
				this.response.setContentType(acceptHeader);
				this.response.getWriter().write(userInfoEndpoint.getBody());
				this.response.getWriter().flush();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			// TODO change message
			this.result.include("errorDescription", userInfoEndpoint.getBody());
		}
	}


	@Get("/error")
	public void error(TypeErrorResponseOAuth typeErrorResponseOAuth, String errorDescription, Map<String, List<String>> heardes) {

		addHeaders(heardes);

		this.result.use(Results.http()).setStatusCode(typeErrorResponseOAuth.getStatusCode());

		String acceptHeader= request.getHeader(Constants.Http.HEADER_ACCEPT);

		if (acceptHeader != null && acceptHeader.contains(Constants.Http.CONTENT_TYPE_JSON)) {
			OAuthJsonResponseVO oAuthJsonResponse = new OAuthJsonResponseVO(typeErrorResponseOAuth, errorDescription);
			this.result.use(Results.json()).withoutRoot().from(oAuthJsonResponse).serialize();
		} else {
			this.result.include("errorDescription", errorDescription);
		}
	}


	/**
	 * Add headers in response
	 *
	 * @author Jackson Castro
	 * @since 2017-01-28
	 *
	 * @version 1.0.0
	 */
	private void addHeaders(Map<String, List<String>> heardes) {
		if (heardes != null) {
			for (Entry<String, List<String>> headerPair : heardes.entrySet()) {
				if (headerPair != null && headerPair.getValue() != null) {
					for (String value : headerPair.getValue()) {
						result.use(Results.http()).addHeader(headerPair.getKey(), value);
					}
				}
			}
		}
	}
}