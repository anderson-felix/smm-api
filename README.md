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

5 - Execute o script de populate para criar um usuário owner. _(As credenciais estão em `src/config/populate.ts` )_

```bash
yarn typeorm migration:run
```

## Filtros e paginação:

Todos endpoints que exibem uma lista de items podem ser filtrados e paginados.

_Padrão:_ `/endpoint?field=value&limit=20&page=1`

_Exemplo:_ `/order/list?display_name=SocialMedia&limit=20&page=1`

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

_Exemplo:_ `/order/list?display_name.ihas=media`

---

<br>
