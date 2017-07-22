package br.com.nsa.dao;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceUnitUtil;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.hibernate.Session;

import br.com.caelum.vraptor.util.StringUtils;

public class GenericDAO<T, Long extends Serializable> implements Serializable {

	private static final long serialVersionUID = -184370010116685871L;

	@Inject
	private EntityManager entity;

	/**
	 * Busca um objeto genérico pela chave primária
	 * 
	 * @param objeto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public T find(T objeto) {
		PersistenceUnitUtil util = entity.getEntityManagerFactory().getPersistenceUnitUtil();
		Object idPrimaryKey = util.getIdentifier(objeto);

		if (idPrimaryKey != null) {
			return (T) entity.find(objeto.getClass(), idPrimaryKey);
		}
		return null;
	}

	/**
	 * Busca um objeto genérico pela chave campo
	 * 
	 * @param campo
	 * @param objeto
	 * @return
	 */
	public T findBy(String campo, T objeto) {

		String campoGet = "get" + StringUtils.capitalize(campo);
		try {
			Object valor = objeto.getClass().getMethod(campoGet).invoke(objeto);
			String hql = "select g FROM " + objeto.getClass().getName() + " g where g." + campo + " = :campo";
			Query query = entity.createQuery(hql);
			query.setParameter("campo", valor);

			return getSingleResult(query);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * Busca todos os elementos do tipo do objeto
	 * 
	 * @param objeto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<T> findAll() {
		String hql = "select g FROM " + getTypeClass().getSimpleName() + " g";
		Query query = entity.createQuery(hql);
		return query.getResultList();
	}

	/**
	 * Busca todos os elementos do tipo do objeto ordernados
	 * 
	 * @param objeto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<T> findAllOrdenados() {
		String hql = "select g FROM " + getTypeClass().getName() + " g order by g.id asc";
		Query query = entity.createQuery(hql);
		return query.getResultList();
	}

	/**
	 * Insere um elemento ao banco
	 * 
	 * @param objeto
	 * @return
	 */
	public T insert(T objeto) {
		entity.persist(objeto);
		return objeto;
	}

	/**
	 * Faz o update de um elemento no banco
	 * 
	 * @param objeto
	 * @return
	 */
	public T update(T objeto) {
		entity.merge(objeto);
		entity.flush();
		return objeto;
	}

	/**
	 * Exclui um elemento do banco
	 * 
	 * @param objeto
	 * @return
	 */
	public T remove(T objeto) {
		entity.remove(objeto);
		entity.flush();
		return objeto;
	}

	/**
	 * Exclui um elemento pelo id
	 */
	public void remove(Long id) {
		String hql = "DELETE FROM " + getTypeClass().getSimpleName() + " g where g.id = :id";
		Query query = entity.createQuery(hql);
		query.setParameter("id", id);
		query.executeUpdate();
	}

	/**
	 * Busca um objeto por seu Id
	 */
	@SuppressWarnings("unchecked")
	public T findById(Long id) {
		String hql = "SELECT g FROM " + getTypeClass().getSimpleName() + " g where g.id = :id";
		TypedQuery<?> query = entity.createQuery(hql, getTypeClass());
		query.setParameter("id", id);
		return (T) getSingleResult(query);
	}

	public Class<?> getTypeClass() {
		ParameterizedType parameterizedType = ((ParameterizedType) this.getClass().getGenericSuperclass());
		return (Class<?>) parameterizedType.getActualTypeArguments()[0];
	}

	public Session getSession() {
		return entity.unwrap(Session.class);
	}

	/**
	 * Return instance of EntityManager
	 *
	 * @author Jackson Castro
	 * @since 2015-05-03
	 */
	public EntityManager getEntity() {
		return entity;
	}

	/**
	 * Dealing case the query has returned null because in to run the method
	 * getSingle may generate a exception
	 *
	 * @author Jackson Castro
	 * @since 2014-06-16
	 */
	public static <T> T getSingleResult(TypedQuery<T> query) {
		try {
			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	/**
	 * Dealing case the query has returned null because in to run the method
	 * getSingle may generate a exception
	 *
	 * Force a cast for a object defined on parameter
	 *
	 * @author Jackson Castro
	 * @since 2014-06-16
	 */
	@SuppressWarnings("unchecked")
	public static <E> E getSingleResult(Query query) {
		try {
			return (E) query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	/**
	 * Dealing case the query has returned null because in to run the method
	 * getResult may generate a exception
	 *
	 * Force a cast for a object defined on parameter
	 *
	 * @author Rodrigo Anderson
	 * @since 2015-12-02
	 */
	@SuppressWarnings("unchecked")
	public static <E> List<E> getResultList(Query query) {
		try {
			return (List<E>) query.getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}
}