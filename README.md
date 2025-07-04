# Aplicação Web de Clima

Este projeto é uma aplicação web simples que exibe informações meteorológicas, incluindo clima atual, previsão do tempo e coordenadas de cidades, utilizando a API OpenWeatherMap. A aplicação é dividida em um backend (Node.js) e um frontend (React).

## Sumário

* Pré-requisitos

* Configuração do Backend

* Configuração do Frontend

* Como Rodar a Aplicação

* Uso da Aplicação

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte software instalado em sua máquina:

* **Node.js**: Versão 18 ou superior (inclui o npm). Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

* **npm** (Node Package Manager) ou **Yarn**: Geralmente vem junto com a instalação do Node.js.

## Configuração do Backend

O backend é construído com Node.js e Express.js.

1. **Crie a pasta do backend:**

```
mkdir backend
cd backend
```

2. **Inicialize o projeto Node.js:**

```
npm init -y
```

3. **Instale as dependências:**

```
npm install express cors
```


4. **Crie o arquivo `server.js`:**
   
Crie um arquivo chamado `server.js` dentro da pasta `backend` e cole o código do backend fornecido anteriormente. Certifique-se de que a chave da API OpenWeatherMap esteja configurada corretamente no arquivo `server.js`.

## Configuração do Frontend

O frontend é construído com React.

1. **Retorne ao diretório raiz do seu projeto (se você estiver na pasta do backend):**

```
cd ..
```

2. **Crie a pasta do frontend e inicialize o projeto React:**

```
npx create-react-app frontend
cd frontend
```

3. **Atualize o arquivo `App.js`:**
Substitua o conteúdo do arquivo `src/App.js` e o `src/App.css` pelo código do frontend React fornecido anteriormente.

## Como Rodar a Aplicação

Para que a aplicação funcione corretamente, você precisará rodar o backend e o frontend separadamente.

### 1. Rodar o Backend

Abra um terminal e navegue até a pasta `backend`:

```
cd path/to/your/project/backend
node server.js
````

Você deverá ver a mensagem: `Backend rodando em http://localhost:3001`. Mantenha este terminal aberto e o servidor rodando.

### 2. Rodar o Frontend

Abra *outro* terminal e navegue até a pasta `frontend`:

```
cd path/to/your/project/frontend
npm start
```

Isso iniciará o servidor de desenvolvimento do React. O navegador deve abrir automaticamente em `http://localhost:3000` (ou outra porta disponível).

## Uso da Aplicação

1. Com ambos os servidores (backend e frontend) rodando, acesse a aplicação no seu navegador (geralmente `http://localhost:3000`).

2. No campo de entrada, digite o nome de uma cidade (ex: "São Paulo", "London", "Tokyo").

3. Clique em um dos botões:

   * **"Clima Atual"**: Para obter as condições climáticas atuais da cidade.

   * **"Previsão"**: Para ver a previsão do tempo para os próximos dias.

   * **"Coordenadas"**: Para obter a latitude e longitude da cidade.

4. As informações serão exibidas na tela. Se houver algum erro (por exemplo, cidade não encontrada), uma mensagem de erro será exibida.

---

**Observações:**

* Certifique-se de que as portas `3001` (backend) e `3000` (frontend) não estejam sendo usadas por outras aplicações.

* A comunicação entre frontend e backend é feita via HTTP.

* A chave da API OpenWeatherMap está diretamente no código do backend para simplificação. Em um ambiente de produção, é recomendável usar variáveis de ambiente para chaves de API.
