# ng-challenge
Desafio para vaga de Back-end na empresa NG.CASH

## Instalação das dependências
### Back-end
Na pasta raíz do projeto utilize o comando npm install para instalar todas as dependências
Caminho:
```bash
ng-challenge\
```
Comando:
```bash
npm install
```

### Front-end
Acesse a pasta client do projeto utilize o comando npm install para instalar todas as dependências
Caminho:
```bash
ng-challenge\client
```
Comando:
```bash
npm install
```

## Utilização no projeto
### Back-End Dev
Na raíz do projeto, execute o script `dev` para iniciar o back-end do projeto em modo desenvolvedor. Ele recarrega com alterções no código.
```bash
npm start dev
```

### Back-End
Na raíz do projeto, execute o script `start` para iniciaro back-end do projeto.
```bash
npm start
```

### Front-End
Na pasta do client, execute o script `start` para iniciar o front-end do projeto
```bash
npm start
```

## Desafio
Estruturar uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.

### Back-End
#### Stack Base
- Um servidor em Node.js utilizando Typescript;
- Um ORM de sua preferência;
- Um bancos de dados PostgreSQL.
#### Arquitetura
##### Users 
- id —> *PK*
- username (o @ do usuário)
- password (*hasheada*)
- accountId —> *FK* Accounts[id]
##### Accounts 
- id —> *PK*
- balance
##### Transactions 
- id —> *PK*
- debitedAccountId —> *FK* Accounts[id]
- creditedAccountId —> *FK* Accounts[id]
- value
- createdAt
#### Regras de negócio
[X] Qualquer pessoa deverá poder fazer parte da NG. Para isso, basta realizar o cadastro informando username e password.

[X] Deve-se garantir que cada username seja único e composto por, pelo menos, 3 caracteres.

[X] Deve-se garantir que a password seja composta por pelo menos 8 caracteres, um número e uma letra maiúscula. Lembre-se que ela deverá ser hashada ao ser armazenada no banco.

[X] Durante o processo de cadastro de um novo usuário, sua respectiva conta deverá ser criada automaticamente na tabela Accounts com um balance de R$ 100,00. É importante ressaltar que caso ocorra algum problema e o usuário não seja criado, a tabela Accounts não deverá ser afetada.

[X] Todo usuário deverá conseguir logar na aplicação informando username e password. Caso o login seja bem-sucedido, um token JWT (com 24h de validade) deverá ser fornecido.

[X] Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar seu próprio balance*atual. Um usuário A não pode visualizar o balance de um usuário B, por exemplo.

[X] Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de realizar um cash-out informando o username do usuário que sofrerá o cash-in), caso apresente balance suficiente para isso. Atente-se ao fato de que um usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo.

[X] Toda nova transação bem-sucedida deverá ser registrada na tabela Transactions. Em casos de falhas transacionais, a tabela Transactions não deverá ser afetada.

[X] Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar as transações financeiras (cash-out e cash-in) que participou. Caso o usuário não tenha participado de uma determinada transação, ele nunca poderá ter acesso à ela.

[ ] Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de filtrar as transações financeiras que participou por:
    - Data de realização da transação e/ou
        - Transações de cash-out;
        - Transações de cash-in.

### Front-End
#### Stack Base
- React ou Next utilizando Typescript;
- CSS3 ou uma biblioteca de estilização de sua preferência;
#### Regras de negócio

[X] Página para realizar o cadastro na NG informando username e password.
[X] Página para realizar o login informando username* e *password.
[ ] Com o usuário logado, a página principal deve apresentar:
- [X] balance*atual do usuário;
- [X] Seção voltada à realização de transferências para outros usuários NG a partir do username de quem sofrerá o cash-in;
- [X] Tabela com os detalhes de todas as transações que o usuário participou;
- [ ] Mecanismo para filtrar a tabela por data de transação e/ou transações do tipo cash-in/cash-out;
- [X] Botão para realizar o log-out.