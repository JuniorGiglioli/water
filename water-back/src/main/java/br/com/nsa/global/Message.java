package br.com.nsa.global;

public final class Message {

	public static final String CATEGORY_ID = "id";
	public static final String CATEGORY_ENTITY = "entity";

	public static final String EMPTY = "entity.empty";
	public static final String ID_CANNOT_BE_EMPTY = "entity.id_cannot_be_empty";
	public static final String ID_MUST_BE_EMPTY = "entity.id_must_be_empty";

	private Message() {
	}
	
	public static final class TipoFuncionario {
	
		public static final String HAS_SITUACOES = "tipo_funcionario.has_situacoes";

	}

	public static final class CategoriaCargo {
		
		public static final String HAS_CARGOS = "categoria_cargo.has_cargos";

	}

	public static final class Cargo {
		
		public static final String HAS_EMPRESAS= "cargo.has_empresas";

	}

	public static final class Lotacao {
		public static final String CATEGORY_SIGLA = "sigla";
		public static final String HAS_SETORES = "lotacao.has_setores";
		public static final String HAS_SIGLA = "lotacao.has_sigla";

	}
}
