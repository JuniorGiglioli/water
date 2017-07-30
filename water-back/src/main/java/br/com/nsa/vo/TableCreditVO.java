package br.com.nsa.vo;

import java.io.Serializable;
import java.util.List;
import br.com.nsa.model.Credit;

public class BootstrapTableCargoVO implements Serializable {

	private static final long serialVersionUID = 9011693797049579983L;

	private List<Credit> rows;

	private long total;

	public BootstrapTableCargoVO(List<Credit> rows, long total) {
		this.rows = rows;
		this.total = total;
	}

	public List<Credit> getRows() {
		return rows;
	}

	public void setRows(List<Credit> rows) {
		this.rows = rows;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}
}