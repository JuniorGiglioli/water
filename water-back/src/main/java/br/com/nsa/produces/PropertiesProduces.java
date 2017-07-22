package br.com.nsa.produces;

import java.util.Properties;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;

import br.com.nsa.helper.FunctionsHelper;

@ApplicationScoped
public class PropertiesProduces {

    private final Properties properties;

    private final String fileName = "parameters.properties";

    public PropertiesProduces() {
		this.properties = FunctionsHelper.readPropertier(fileName);
    }

    @Produces
    public Properties getSession() {
        return properties;
    }
}