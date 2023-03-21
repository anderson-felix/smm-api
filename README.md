<h1 align='center'>
    SOCIAL MEDIA MANAGEMENT - API
</h1>

## Instruções:

1 - Copie o **.env.example** e renomeie para **.env**

2 - Copie o **ormconfig.example.json** e renomeie para **ormconfig.json**

3 - Execute o seguinte comando para instalar as dependências

```bash
yarn
```

4 - Execute o seguinte comando para buildar e iniciar os contêineres docker

```bash
yarn image:build && yarn dev
```

5 - Execute o seguinte comando para rodar as migrations

```bash
yarn typeorm migration:run
```

## Indice:

<ol>
    <li>
        <a href='#user'>User:</a>
        <ul>
            <li>
              <a href='#cadastrando-um-usuario'>Cadastrando um usuário</a>
            </li>
            <li>
              <a href='#login-de-usuario'>Login de usuário</a>
            </li>
            <li>
              <a href='#listando-todos-os-usuarios'>Listando todos os usuários</a>
            </li>
            <li>
              <a href='#exibindo-o-perfil'>Exibindo o perfil</a>
            </li>
            <li>
              <a href='#atualizando-um-usuario'>Atualizando um usuário</a>
            </li>
            <li>
              <a href='#deletando-um-usuario'>Deletando um usuário</a>
            </li>
              </ul>
          </li>
    <li>
        <a href='#produto'>Produto:</a>
        <ul>
            <li>
              <a href='#cadastrando-um-filme'>Cadastrando um filme</a>
            </li>
            <li>
              <a href='#listando-todos-os-filmes'>Listando todos os filmes</a>
            </li>
            <li>
              <a href='#atualizando-um-filme'>Atualizando um filme</a>
            </li>
            <li>
              <a href='#deletando-um-filme'>Deletando um filme</a>
            </li>
            <li>
              <a href='#classificando-um-filme'>Classificando um filme</a>
            </li>
        </ul>
    </li>
</ol>

<br>
<br>

## Filtros e paginação:

Todos endpoints que exibem uma lista de items podem ser filtrados e paginados.

_Padrão:_ `/endpoint?field=value&limit=20&page=1`

_Exemplo:_ `/movie/list?name=matrix&limit=20&page=1`

<br/>

**Filtragens personalizadas**

| **url**  |  **method**   |   **case**    |
| :------: | :-----------: | :-----------: |
|  `has`   |   `Contém`    |  `Sensitive`  |
|  `ihas`  |   `Contém`    | `Insensitive` |
| `start`  | `Inicia com`  |  `Sensitive`  |
| `istart` | `Inicia com`  | `Insensitive` |
|  `end`   | `Termina com` |  `Sensitive`  |
|  `Iend`  | `Termina com` | `Insensitive` |

_Exemplo:_ `/movie/list?name.ihas=matrix`

---

<br>
<br>

## **USER**:

### **Cadastrando um usuario**

---

> POST - `/user/create`

**BODY**

```json
{
  "name": "Test Admin",
  "role": "admin", // OR "user" for user permissions
  "email": "test@admin.com",
  "password": "S&nh4F0rT3"
}
```

<br/>

### **Login de usuario**

---

> POST - `/user/session`

**BODY**

```json
{
  "email": "test@admin.com",
  "password": "S&nh4F0rT3"
}
```

<br/>

### **Listando todos os usuarios**

---

Authorization: Bearer {token}

> GET - `/user/list`

<br/>

### **Exibindo o perfil**

---

Authorization: Bearer {token}

> GET - `/user/profile`

<br/>

### **Atualizando um usuario**

---

Authorization: Bearer {token}

> PATCH - `/user/update`

```json
{
  "name": "Test Admin",
  "email": "test@admin.com",
  "password": "S&nh4F0rT3",
  "old_password": "S&nh4F0rT3"
}
```

<br/>

### **Deletando um usuario**

---

Authorization: Bearer {token}

> DELETE - `/user/delete`

<br/>
<br/>
<br/>

## **MOVIE**:

### **Cadastrando um filme**

---

Authorization: Bearer {token}

> POST - `/movie/create`

**BODY**

```json
{
  "name": "Matrix",
  "director": "Lana Wachowski",
  "genres": ["Ação", "Ficção científica"],
  "actors": [" Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
}
```

<br/>

### **Listando todos os filmes**

---

Authorization: Bearer {token}

> GET - `/movie/list`

<br/>

### **Atualizando um filme**

---

Authorization: Bearer {token}

> PATCH - `/movie/update/:movie_id`

```json
{
  "name": "Matrix",
  "director": "Lana Wachowski",
  "genres": ["Ação", "Ficção científica"],
  "actors": [" Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
}
```

<br/>

### **Deletando um filme**

---

Authorization: Bearer {token}

> DELETE - `/movie/delete/:movie_id`

<br/>

### **Classificando um filme**

---

Authorization: Bearer {token}

> POST - `/movie/rating/:movie_id`

**BODY**

```json
{
  "rating": 4
}
```
