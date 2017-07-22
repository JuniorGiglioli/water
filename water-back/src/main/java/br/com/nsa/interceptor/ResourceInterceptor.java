package br.com.nsa.interceptor;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.oltu.oauth2.client.response.OAuthResourceResponse;
import org.apache.oltu.oauth2.common.OAuth;
import org.apache.oltu.oauth2.common.exception.OAuthProblemException;
import org.apache.oltu.oauth2.common.exception.OAuthSystemException;
import org.apache.oltu.oauth2.common.message.OAuthResponse;
import org.apache.oltu.oauth2.common.message.OAuthResponse.OAuthErrorResponseBuilder;
import org.apache.oltu.oauth2.common.message.types.ParameterStyle;
import org.apache.oltu.oauth2.rs.request.OAuthAccessResourceRequest;
import org.apache.oltu.oauth2.rs.response.OAuthRSResponse;

import br.com.caelum.vraptor.Accepts;
import br.com.caelum.vraptor.AroundCall;
import br.com.caelum.vraptor.Intercepts;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.controller.ControllerMethod;
import br.com.caelum.vraptor.controller.HttpMethod;
import br.com.caelum.vraptor.interceptor.SimpleInterceptorStack;
import br.com.nsa.annotations.Public;
import br.com.nsa.controller.OAuthController;
import br.com.nsa.enums.TypeErrorResponseOAuth;
import br.com.nsa.global.Constants;
import br.com.nsa.service.OAuthService;

@Intercepts(after=CORSInterceptor.class)
@RequestScoped
public class ResourceInterceptor {

	@Inject
	private HttpServletRequest request;

	@Inject
	private Result result;

	@Inject
	private OAuthService oAuthService;

	@Inject
	private Properties properties;


	@Accepts
	public boolean accepts(ControllerMethod method) {

		if (request.getMethod().equals(HttpMethod.OPTIONS.toString()) || method.getMethod().isAnnotationPresent(Public.class)
				|| method.getController().getType().isAnnotationPresent(Public.class)) {
			return false;
		}
		return true;
	}

	@AroundCall
	public void intercept(SimpleInterceptorStack stack) {
		try {
			// the token can be given by HEADER or QUERY
			OAuthAccessResourceRequest oauthRequest = new OAuthAccessResourceRequest(request, ParameterStyle.HEADER, ParameterStyle.QUERY);

			// get the access token
			String accessToken = oauthRequest.getAccessToken();

			OAuthResourceResponse userInfoEndpoint = getUserInfoEndpoint(accessToken);

			if (userInfoEndpoint.getResponseCode() == HttpServletResponse.SC_OK) {
				saveUserSession(userInfoEndpoint);
				stack.next();
			} else {
				result.forwardTo(OAuthController.class).error(userInfoEndpoint);
			}
		} catch (OAuthProblemException e) {
			OAuthErrorResponseBuilder errorResponse = OAuthRSResponse.errorResponse(HttpServletResponse.SC_UNAUTHORIZED);
			try {
				OAuthResponse headerMessage = errorResponse.setRealm(Constants.OAuth.REALM).setError(e.getError()).setErrorDescription(e.getDescription()).buildHeaderMessage();

				Map<String, List<String>> headers = new HashMap<>();
				headers.put(OAuth.HeaderType.WWW_AUTHENTICATE, Arrays.asList(headerMessage.getHeader(OAuth.HeaderType.WWW_AUTHENTICATE)));

				result.forwardTo(OAuthController.class).error(TypeErrorResponseOAuth.INVALID_REQUEST, e.getDescription(), headers);
			} catch (OAuthSystemException ex2) {
				ex2.printStackTrace();
			}
		} catch (OAuthSystemException e) {
			e.printStackTrace();
		}
	}


	private void saveUserSession(OAuthResourceResponse userInfoEndpoint) {
		// TODO Auto-generated method stub
	}


	private OAuthResourceResponse getUserInfoEndpoint(String accessToken) throws OAuthSystemException, OAuthProblemException {

		String userInfoEndpointUrl = properties.getProperty(Constants.Parameters.USER_INFO_ENDPOINT_URL);

		return oAuthService.getUserInfoEndpoint(userInfoEndpointUrl, accessToken);
	}
}