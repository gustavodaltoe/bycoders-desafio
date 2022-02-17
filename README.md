# 💻 O desafio

O teste consiste em parsear [este arquivo de texto(CNAB)](https://github.com/ByCodersTec/desafio-ruby-on-rails/blob/master/CNAB.txt) e salvar suas informações(transações financeiras) em uma base de dados.

Você recebeu um arquivo CNAB com os dados das movimentações financeira de várias lojas.
Precisamos criar uma maneira para que estes dados sejam importados para um banco de dados.

Criar uma interface web que aceite upload do [arquivo CNAB](https://github.com/ByCodersTec/desafio-ruby-on-rails/blob/master/CNAB.txt), normalize os dados e armazene-os em um banco de dados relacional e exiba essas informações em tela.

**Sua aplicação web DEVE:**

1. Ter uma tela (via um formulário) para fazer o upload do arquivo(pontos extras se não usar um popular CSS Framework )
2. Interpretar ("parsear") o arquivo recebido, normalizar os dados, e salvar corretamente a informação em um banco de dados relacional, **se atente as documentações** que estão logo abaixo.
3. Exibir uma lista das operações importadas por lojas, e nesta lista deve conter um totalizador do saldo em conta
4. Ser escrita na sua linguagem de programação de preferência
5. Ser simples de configurar e rodar, funcionando em ambiente compatível com Unix (Linux ou Mac OS X). Ela deve utilizar apenas linguagens e bibliotecas livres ou gratuitas.
6. Git com commits atomicos e bem descritos
7. PostgreSQL, MySQL ou SQL Server
8. Ter testes automatizados
9. Docker compose (Pontos extras se utilizar)
10. Readme file descrevendo bem o projeto e seu setup
11. Incluir informação descrevendo como consumir o endpoint da API

**Sua aplicação web não precisa:**

1. Lidar com autenticação ou autorização (pontos extras se ela fizer, mais pontos extras se a autenticação for feita via OAuth).
2. Ser escrita usando algum framework específico (mas não há nada errado em usá-los também, use o que achar melhor).
3. Documentação da api.(Será um diferencial e pontos extras se fizer)

# ✨ Tecnologias escolhidas

- Express
- React
- Postgresql
- Lerna / Yarn workspaces (monorepo)
- Docker
- Typescript
- Prisma
- Jest
- Stitches (css in js)

# Rodando o ambiente

Configure as variáveis de ambiente

    $ cp ./packages/server/.env.example ./packages/server/.env

### Utilizando Docker

Para rodar a aplicação dentro de containers no Docker:

    $ docker-compose up

Para rodar os testes unitários (precisa estar rodando a aplicação):

```bash
# acessar a instancia
$ docker-compose exec server bash
$ yarn server:test 
# ou para ter o coverage
$ yarn server:test --coverage
```

### Rodando sem Docker

Caso prefira rodar sem Docker ou esteja tendo problemas para rodar com ele:

1. É necessário ter um banco postgres rodando
2. Altere a `./packages/server/.env` com a string de conexão para o seu banco

```bash
$ yarn # instalar as dependencias
$ yarn server:dev
$ yarn web:dev
```

Para rodar os testes unitários

```bash
$ yarn server:test
# ou para ter o coverage
$ yarn server:test --coverage
```

# Documentação da API

url local padrão: http://localhost:3333/

---

### Envio de um arquivo CNAB

Envie um arquivo CNAB para ser processado e persistido.

**Endpoint**: POST:/cnab/upload

**Content-Type**: multipart/form-data

**body**: 
```
{ 
  textFile: File // Text/plain (.txt file)
}
```

**Response**: Body vazio com status 201 (created)

---

### Listagem de lojas e suas transações

Liste todas as transações separados por lojas com seus saldos

**Endpoint**: GET:/cnab

**Response**: Array de lojas no formato abaixo
```ts
[
  {
    id: uuidv4
    name: string
    owner: {
      cpf: string
      name: string
    }
    balance: number // int, needs to be divided by 100
    transactions: Array<{
      id: uuidv4
      type: string
      amount: number // int, needs to be divided by 100
      card: string
      dateTime: Date
    }>
  }
]
```

**Exemplo de response**:
```json
[
	{
		"id": "71507a31-3611-4b94-ad67-aac7d0a85d81",
		"name": "BAR DO JOÃO",
		"owner": {
			"cpf": "09620676017",
			"name": "JOÃO MACEDO"
		},
		"balance": -20400,
		"transactions": [
			{
				"id": "1b31ce6e-2a49-432c-af07-954bc1937286",
				"type": "Financiamento",
				"amount": -14200,
				"card": "4753****3153",
				"dateTime": "2019-03-01T18:34:53.000Z"
			},
			{
				"id": "2a1eaf33-6cae-4915-82c6-81dc7b2c7c15",
				"type": "Financiamento",
				"amount": -14200,
				"card": "4753****3153",
				"dateTime": "2019-03-01T18:34:53.000Z"
			},
			{
				"id": "113c2383-5b8b-45e8-ad6d-58b4195ee26b",
				"type": "Débito",
				"amount": 15200,
				"card": "1234****7890",
				"dateTime": "2019-03-02T02:30:00.000Z"
			},
			{
				"id": "dbfa5994-5f83-44fd-8055-83d81c5c1980",
				"type": "Débito",
				"amount": 15200,
				"card": "1234****7890",
				"dateTime": "2019-03-02T02:30:00.000Z"
			},
			{
				"id": "06187fb0-36c7-4ebf-a042-84ea857073d1",
				"type": "Boleto",
				"amount": -11200,
				"card": "3648****0099",
				"dateTime": "2019-03-02T02:42:34.000Z"
			},
			{
				"id": "19b51499-0f3e-4309-8477-c7d0c2750656",
				"type": "Boleto",
				"amount": -11200,
				"card": "3648****0099",
				"dateTime": "2019-03-02T02:42:34.000Z"
			}
		]
	},
	{
		"id": "8d142014-9ff2-44f2-a666-732d8fd62bec",
		"name": "LOJA DO Ó - FILIAL",
		"owner": {
			"cpf": "55641815063",
			"name": "MARIA JOSEFINA"
		},
		"balance": 30464,
		"transactions": [
			{
				"id": "649452df-2c84-4a21-bb46-dbcb3b05b1eb",
				"type": "Crédito",
				"amount": 15232,
				"card": "1234****6678",
				"dateTime": "2019-03-01T13:00:00.000Z"
			},
			{
				"id": "363fa03a-1d00-411d-a787-f3a8342baf76",
				"type": "Crédito",
				"amount": 15232,
				"card": "1234****6678",
				"dateTime": "2019-03-01T13:00:00.000Z"
			}
		]
	},
]
```

# Cobertura de testes

Optei por criar testes unitários apenas para o backend para as partes que dizem respeito ao upload, processamento e persistência dos dados, utilizando a metodologia TDD (Test Driven Development) obtive 100% de cobertura para esse modulo.

Não realizei testes e2e, integração e nem unitários para as funcionalidades de listagem, comunicação http e repositories.

Para mais detalhes: `yarn server:test --coverage`

# Estrutura do banco de dados

**Entidades:** Store, StoreOwner, Transaction

![database](docs/assets/database.png)

# Documentação do CNAB

| Descrição do campo  | Inicio | Fim | Tamanho | Comentário
| ------------- | ------------- | -----| ---- | ------
| Tipo  | 1  | 1 | 1 | Tipo da transação
| Data  | 2  | 9 | 8 | Data da ocorrência
| Valor | 10 | 19 | 10 | Valor da movimentação. *Obs.* O valor encontrado no arquivo precisa ser divido por cem(valor / 100.00) para normalizá-lo.
| CPF | 20 | 30 | 11 | CPF do beneficiário
| Cartão | 31 | 42 | 12 | Cartão utilizado na transação 
| Hora  | 43 | 48 | 6 | Hora da ocorrência atendendo ao fuso de UTC-3
| Dono da loja | 49 | 62 | 14 | Nome do representante da loja
| Nome loja | 63 | 81 | 19 | Nome da loja

# Documentação sobre os tipos das transações

| Tipo | Descrição | Natureza | Sinal |
| ---- | -------- | --------- | ----- |
| 1 | Débito | Entrada | + |
| 2 | Boleto | Saída | - |
| 3 | Financiamento | Saída | - |
| 4 | Crédito | Entrada | + |
| 5 | Recebimento Empréstimo | Entrada | + |
| 6 | Vendas | Entrada | + |
| 7 | Recebimento TED | Entrada | + |
| 8 | Recebimento DOC | Entrada | + |
| 9 | Aluguel | Saída | - |

