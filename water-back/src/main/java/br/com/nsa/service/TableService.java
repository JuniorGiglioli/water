package br.com.nsa.service;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.Arrays;
import java.util.List;
import java.util.StringJoiner;

import javax.enterprise.inject.spi.InjectionPoint;
import javax.inject.Inject;

import org.hibernate.metadata.ClassMetadata;
import org.hibernate.type.BagType;
import org.hibernate.type.ManyToOneType;
import org.hibernate.type.Type;

import br.com.nsa.dao.TableDAO;
import br.com.nsa.vo.BootstrapTableVO;

public class TableService<T> implements Serializable {

	private static final long serialVersionUID = -9188364226414689932L;

	private final String TABLE_CLAUSULE_OR = " OR ";
	private final String TABLE_SEARCH = "COALESCE(LOWER(CAST(g.%s AS string)), '') LIKE :search";
	private final String[] ORDER_TYPES = { "ASC", "DESC" };

	private final String DEFAULT_SEARCH = "%%";
	private final String DEFAULT_ORDER = "ASC";
	private final int DEFAULT_LIMIT = 10;
	private final int DEFAULT_PAGE = 0;

	@Inject
	private TableDAO<T> tableDAO;

	@Inject
	private InjectionPoint injectionPoint;

	/**
	 * Return a object BootstrapTable from a class generic
	 *
	 * @author Jackson Castro
	 * @since 2017-04-05
	 *
	 * @version 1.0.0
	 */
	public BootstrapTableVO getTable(String search, int limit, int page, String sort, String order) {

		Class<T> genericClass = getGenericClass();

		ClassMetadata classMetadata = this.tableDAO.getSessionFactory().getClassMetadata(genericClass);

		String[] propertyNames = classMetadata.getPropertyNames();
		String identifier = classMetadata.getIdentifierPropertyName();

		search = (search == null) ? DEFAULT_SEARCH : "%" + search.toLowerCase() + "%";
		page = (page < 0) ? DEFAULT_PAGE : page;
		limit = (limit < 1) ? DEFAULT_LIMIT : limit;

		int pagination = page * limit;

		if (sort == null || Arrays.binarySearch(propertyNames, sort) < 0) {
			sort = identifier;
		}

		if (order == null || Arrays.binarySearch(ORDER_TYPES, order.toUpperCase()) < 0) {
			order = DEFAULT_ORDER;
		}

		StringJoiner filters = getFilters(classMetadata);

		List<T> rows = this.tableDAO.getRowsTable(genericClass, search, limit, pagination, filters.toString(), sort,
				order);
		long total = this.tableDAO.getTotalTable(genericClass, search, filters.toString());

		return new BootstrapTableVO(rows, total);
	}

	/**
	 * Gets the generic class injected in parent class
	 *
	 * @author Jackson Castro
	 * @since 2017-04-05
	 *
	 * @version 1.0.0
	 */
	@SuppressWarnings("unchecked")
	private Class<T> getGenericClass() {
		ParameterizedType parameterizedType = (ParameterizedType) injectionPoint.getType();
		return (Class<T>) parameterizedType.getActualTypeArguments()[0];
	}

	/**
	 * Creates the generic filter for all columns of table
	 *
	 * @author Jackson Castro
	 * @since 2017-04-05
	 *
	 * @version 1.0.0
	 */
	private StringJoiner getFilters(ClassMetadata classMetadata) {

		StringJoiner filters = new StringJoiner(TABLE_CLAUSULE_OR);

		for (String name : classMetadata.getPropertyNames()) {
			Type propertyType = classMetadata.getPropertyType(name);
			if (!(propertyType instanceof BagType) && !(propertyType instanceof ManyToOneType)) {
				filters.add(String.format(TABLE_SEARCH, name));
			}
		}
		return filters;
	}
}