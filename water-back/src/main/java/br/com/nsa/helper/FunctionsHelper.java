package br.com.nsa.helper;

import java.io.Closeable;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public final class FunctionsHelper {

	// regex para saber se é um número longo válido
	private static final String REGEX_IS_NUMBER_LONG = "\\d{1,19}";

	private FunctionsHelper() {
	}


	/**
	 * Verifica se uma String é um número válido e
	 * a quantidade de caracteres precisa maior que 0 e menor que 20
	 *
	 * @author Jackson Castro
	 * @since 2015-11-03
	 *
	 * @version 1.0.0
	 */
	public static boolean isNumberLong(String texto) {
		if (texto != null) {
			return texto.matches(REGEX_IS_NUMBER_LONG);
		}
		return false;
	}


	public static Properties readPropertier(String fileName) {

		Properties properties = new Properties();
		if (fileName != null) {
			try {
			    InputStream inputStream = FunctionsHelper.class.getResourceAsStream("/" + fileName);

				try {
					properties.load(inputStream);
					return properties;
				} finally {
					closeQuietly(inputStream);
				}
			} 
			catch (IOException ex) {
			    ex.printStackTrace();
			}
		}
		return properties;
	}
	
	public static void closeQuietly(Closeable closeable) {
		try {
			if (closeable != null) {
				closeable.close();
			}
		} catch (Exception e) {				
		}
	}
}