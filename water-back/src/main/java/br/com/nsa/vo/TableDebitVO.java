package br.com.nsa.vo;

import java.io.Serializable;
import java.util.List;

import br.com.nsa.model.Debit;

public class TableDebitVO implements Serializable {

	private static final long serialVersionUID = 9011693797049579983L;

	private List<Debit> rows;

	private long total;

	public TableDebitVO(List<Debit> rows, long total) {
		this.rows = rows;
		this.total = total;
	}

	public List<Debit> getRows() {
		return rows;
	}

	public void setRows(List<Debit> rows) {
		this.rows = rows;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}
}