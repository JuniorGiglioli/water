package br.com.nsa.vo;

import java.io.Serializable;
import java.util.List;

public class BootstrapTableVO implements Serializable {

	private static final long serialVersionUID = -9185887854826757524L;

	private List<?> rows;

	private long total;

	public <T> BootstrapTableVO(List<?> rows, long total) {
		this.rows = rows;
		this.total = total;
	}

	public List<?> getRows() {
		return rows;
	}

	public void setRows(List<?> rows) {
		this.rows = rows;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}
}