#  Deploy do aplicativo em ambiente de desenvolvimento. Requisitos:
* Vamos usar o servidor de autenticação Aoth2 (Login cidadão)
* Apache Tomcat 8.5 com HTTP/HTTPS habilitado
* PostgreSQL 9.5

# Configurando o apache tomcat
> Para habilitar HTTPS você deve adicionar o código abaixo em (**server.xml**) no config do Tomca.
`
<Connector SSLEnabled="true" acceptCount="100" clientAuth="false" disableUploadTimeout="true" enableLookups="false" maxThreads="25" port="8443" keystoreFile="conf/key.keystore" keystorePass="qwe123" protocol="org.apache.coyote.http11.Http11NioProtocol" scheme="https" secure="true" sslProtocol="TLS" />
`

agora adicione a seguinte [key.keystore](/Documentation/configuration/key.keystore) no config do Apache Tomcat.

> Para habilitar o recurso de banco de dados você deve adicionar o código abaixo em (**server.xml**) no config do Tomcat.
`
<Resource name="jdbc/water" auth="Container" type="javax.sql.DataSource" driverClassName="org.postgresql.Driver" url="jdbc:postgresql://localhost:5432/water" username="postgres" password="postgres" maxTotal="20" maxIdle="10" maxWaitMillis="-1" />
`

# Configurando Autenticação **Cliente / Resource** (Login Cidadão):
> No backend (resource server) , edite o arquivo **parameters.templete.properties** em (**src/main/resources**).

```
# tipo de aplicação que o Apache Oltu utilizar
application=generic

# endereço para fazer a autenticação
authz_endpoint=https://localhost/oauth/v2/auth

# endereço para obter a Access Token
token_endpoint=https://localhost/oauth/v2/token

# endereço para obter os dados do usuário (user info endpoint)
user_info_endpoint_url=https://localhost/api/v1/person

# escopos desejados
scope=public_profile email

# chave pública
client_id=

# chave privada
client_secret=

# endereço para onde o gerenciador de identidades irá retornar dados
redirect_uri=https://localhost:8443/water/oauth/callback
```

Preencha o arquivo e salve com o nome **(parameters.properties)**.

> Agora no frontend, edite o arquivo **(oauth-config.templete.json)** em (**src/assets/config**).

```
{
    "callbackUrl": "http://localhost:4200/oauth2/callback",
    "userInfoUrl": "https://localhost/api/v1/person",
    "userInfoNameField": "full_name",
    "authorizationEndpoint": "https://localhost/openid/connect/authorize",
    "clientId": "",
    "scopes": "public_profile email",
    "logoutUrl": "https://localhost/api/v1/person/__userId__/logout-key.json",
    "resourceServer": "https://localhost:8443/water/",
    "profileUrl": "https://localhost/profile/edit"
}
```
Preencha o arquivo e salve com o nome: **(oauth-config.json)**.