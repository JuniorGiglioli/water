package br.com.nsa.model;

public enum Role {
	ADMINISTRATOR("Administrator"), MANAGER("Manager"), STANDARD("Standard");

	private String description;

	Role(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}
}
