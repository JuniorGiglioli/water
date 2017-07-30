package br.com.nsa.dao;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

public class TableDAO<T> implements Serializable {

	private static final long serialVersionUID = -7244129516865833827L;

	@Inject
	private EntityManager entityManager;

	/**
	 * Return the registers from a Generic Class based in your search and filters
	 *
	 * @author Jackson Castro
	 * @since 2017-04-05
	 *
	 * @version 1.0.0
	 */
	public List<T> getRowsTable(Class<T> clazz, String search, int limit, int firstResult, String filters, String sort,
			String order) {

		StringBuffer queryBuffer = new StringBuffer();
		queryBuffer.append("SELECT g FROM ").append(clazz.getSimpleName()).append(" g WHERE ").append(filters)
				.append(String.format(" ORDER BY %s %s", sort, order));

		TypedQuery<T> query = entityManager.createQuery(queryBuffer.toString(), clazz);
		query.setParameter("search", search).setFirstResult(firstResult).setMaxResults(limit);

		return getResulList(query);
	}

	/**
	 * Return the total of rows for a table based in your search and filters
	 *
	 * @author Jackson Castro
	 * @since 2017-04-05
	 *
	 * @version 1.0.0
	 */
	public long getTotalTable(Class<T> clazz, String search, String filters) {
		StringBuffer queryBuffer = new StringBuffer();
		queryBuffer.append("SELECT COUNT(g) AS total FROM ").append(clazz.getSimpleName()).append(" g WHERE ")
				.append(filters);

		TypedQuery<Long> query = entityManager.createQuery(queryBuffer.toString(), Long.class);
		query.setParameter("search", search);

		return query.getSingleResult();
	}

	/**
	 * Return the SessionFactory from EntityManager
	 *
	 * @author Jackson Castro
	 * @since 2017-04-05
	 *
	 * @version 1.0.0
	 */
	public SessionFactory getSessionFactory() {
		Session session = this.entityManager.unwrap(Session.class);
		return session.getSessionFactory();
	}

	/**
	 * Return a list from a query
	 *
	 * @author Jackson Castro
	 * @since 2017-04-05
	 *
	 * @version 1.0.0
	 */
	private List<T> getResulList(TypedQuery<T> query) {
		try {
			return query.getResultList();
		} catch (Exception e) {
			return null;
		}
	}
}