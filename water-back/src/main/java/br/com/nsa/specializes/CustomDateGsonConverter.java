package br.com.nsa.specializes;

import java.lang.reflect.Type;
import java.util.Date;

import javax.enterprise.inject.Specializes;

import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.joda.time.format.DateTimeFormatterBuilder;
import org.joda.time.format.DateTimeParser;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonSerializer;

import br.com.caelum.vraptor.serialization.gson.DateGsonConverter;
import br.com.nsa.helper.FunctionsHelper;

@Specializes
public class CustomDateGsonConverter extends DateGsonConverter implements JsonDeserializer<Date>, JsonSerializer<Date> {

	private final DateTimeParser[] dateTimeParsers;

	public CustomDateGsonConverter() {
		super();
		this.dateTimeParsers = getDateTimeParsers();
	}

	@Override
	public Date deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
		String text = json.getAsString();

		if (FunctionsHelper.isNumberLong(text)) {
			return new Date(Long.parseLong(text));
		}

		DateTimeFormatterBuilder dataTimeFormatterBuilder = new DateTimeFormatterBuilder();
		dataTimeFormatterBuilder.append(null, this.dateTimeParsers);
		DateTimeFormatter formatter = dataTimeFormatterBuilder.toFormatter();
		return formatter.parseDateTime(text).toDate();
	}


	/**
	 * Retorna um array com todos os formatos de datas suportados pelo converter do projeto
	 *
	 * Obs.: Se necessário adicionar um novo formato, só adicionar ao array abaixo
	 *
	 * @author Jackson Castro
	 * @since 2015-11-12
	 *
	 * @version 1.0.0
	 */
	private DateTimeParser[] getDateTimeParsers() {
		return new DateTimeParser[] { 
			DateTimeFormat.forPattern("yyyy-MM-dd").getParser(),
			DateTimeFormat.forPattern("yyyy-MM-dd HH:mm").getParser(),
			DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss").getParser(),
	        DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss:SSS").getParser(),
	        DateTimeFormat.forPattern("dd/MM/yyyy").getParser(),
	        DateTimeFormat.forPattern("dd/MM/yyyy HH:mm").getParser(),
	        DateTimeFormat.forPattern("dd/MM/yyyy HH:mm:ss").getParser(),
	        DateTimeFormat.forPattern("dd/MM/yyyy HH:mm:ss:SSS").getParser(),
	        DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ssZ").getParser(),
	        DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ssSSSZ").getParser(),
	        DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ").getParser()
		};
	}
}