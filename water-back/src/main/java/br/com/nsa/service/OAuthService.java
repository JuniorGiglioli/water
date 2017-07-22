package br.com.nsa.service;

import org.apache.oltu.oauth2.client.OAuthClient;
import org.apache.oltu.oauth2.client.URLConnectionClient;
import org.apache.oltu.oauth2.client.request.OAuthBearerClientRequest;
import org.apache.oltu.oauth2.client.request.OAuthClientRequest;
import org.apache.oltu.oauth2.client.response.OAuthResourceResponse;
import org.apache.oltu.oauth2.common.OAuth;
import org.apache.oltu.oauth2.common.exception.OAuthProblemException;
import org.apache.oltu.oauth2.common.exception.OAuthSystemException;

public class OAuthService {


	/**
	 * Getting the information about a user of authorization server
	 *
	 * @author Jackson Castro
	 * @since 2017-01-29
	 *
	 * @version 1.0.0
	 *
	 * @throws OAuthSystemException
	 * @throws OAuthProblemException
	 */
	public OAuthResourceResponse getUserInfoEndpoint(String userInfoEndpointUrl, String accessToken) throws OAuthSystemException, OAuthProblemException {
		OAuthClient oAuthClient = new OAuthClient(new URLConnectionClient());

		OAuthClientRequest bearerClientRequest = new OAuthBearerClientRequest(userInfoEndpointUrl)
		         .setAccessToken(accessToken).buildQueryMessage();

		return oAuthClient.resource(bearerClientRequest, OAuth.HttpMethod.GET, OAuthResourceResponse.class);
	}
}