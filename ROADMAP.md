# ROADMAP
## Estruturas base da URL
> `http://localhost:3333/api/`\
> `/api/v1/` -> Versionamento da API\
> `/api/v1/user/` -> Endpoints de gerenciamento de dados\
> `/api/v1/auth/` -> Endpoints de autenticação 
## Dados do usuário
```ts
interface UserData {
  id: string; // SnowflakeID
  username: string; // Maximo de 64 caracteres e minimo de 8 caracteres
  password: string; // Criptografada, e não retorna fora de verificações (Max. de 128 caracteres e minimo de 8 caracteres)
  createdAt: number; // Timestamp da criação da conta
  deleted: boolean; // Soft delete
}
```
> **NOTA:** Este _schema_ é como os dados do usuário ficam salvos no banco de dados. 

## Codigos de erro geral
> - **Parametro inválido ou ausente `{ code: 500 }`**
> - **Dados de entrada inválidos ou ausentes `{ code: 501 }`**

## Rotas de gerenciamento de dados
> ### **POST `/user`**
> - Cria um novo usuário
> - Recebe `username`, `email` e `senha`
> - Retorna um objeto.
> ```ts
> // Os dados que precisam ser enviados na requisição
> {
>   username: "Davi",
>   email: "davi@gmail.com",
>   password: "123"
> }
> ```
> ```ts
> // Codigos de retorno (3XX)
> // 301 - Usuário criado com sucesso
> // 302 - Falha ao criar novo usuário (Usuário já existe)
> // 303 - Falha ao criar novo usuário (Tamanho da string do 'username')
> // 304 - Falha ao criar novo usuário (Tamanho da string da 'password')
> 
> // Codigos de retorno (4XX)
> // 401 - Falha interna (Erro no servidor)
> 
> // Exemplo de retorno em caso de sucesso
> {
>   code: 301, // Usuário criado com sucesso
>   data: {
>       id: "123456789101112",
>       username: "Davi",
>       email: "davi@gmail.com",
>       createdAt: 123456789, // Timestamp
>   }
> }
>
> // Exemplo de retorno em caso de falha
> {
>   code: 302, // Falha ao criar novo usuário (Usuário já existe)
>   message: "User exists.",
> }
> ```

> ### GET `/user/:identifier`
> - Retorna os dados de um usuário
> - Recebe o `ID` ou `username` do usuário como parametro na URL
> - Se nenhum `ID/username` for passado, retorna uma array com a lista de todos os usuários

> ### PATCH `/user/:{userID}`
> - Atualiza os dados de um usuário, e retorna um objeto com os dados atualizados
> - Recebe um JSON com cada propriedade que precisa ser alterada
> ```ts
> // Exemplo:
> {
>   username: "Novo username",
>   email: "novoemail@gmail.com"
>   password: "Nova senha",
> }
> ```

> ### DELETE `/user/:{userID}`
> - Deleta um usuário
> - Um dos metodos de remoção deve ser passado, `soft` ou `hard`
> - O metodo `soft` apenas marca aquele usuário como deletado
> - O metodo `hard` deleta o documento do usuário do banco de dados permanentemente
> ```ts
> {
>   method: "soft" | "hard"  
> }
> ```

## Rotas de autenticação
> ### GET `/auth/`
> - Autentica o usuário e retorna um objeto com as propriedades `code` e `message`.
> - Recebe `username`, `email` e `senha`
> - A propriedade `code` representa o código de status da resposta.
> ```ts
> /* ### 1XX codes ### */
>
> // Os códigos são
> // 101 - Usuário autenticado e autorizado
> // 102 - Falha na autenticação (Usuário inexistente, 
> //                             email não encontrado)
> // 103 - Falha na autenticação (Senha incorreta)
> 
> /* ### 2XX codes ### */
> 
> // 201 - Tipagem incorreta em qualquer dos campos
> // 202 - Faltando campos (Caso enviar uma requisição vazia, ou faltando a propriedade password, username ou email)
> // 203 - 
>
> // Exemplo de retorno
> {
>   code: 102,
>   message: 'User not exists.',
> }
> ```