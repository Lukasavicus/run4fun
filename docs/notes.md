Aula 00
	Geradores de MEAN sites:
		http://meanjs.org/
		https://github.com/linnovate/mean
	Instalações e Configurações:
		NodeJS: sudo apt-get install -y nodejs
		MongoDB: https://docs.mongodb.org/manual/administration/install-on-linux/

Aula 01
	No mundo Node a aplicação também é o servidor (em contraste com outros mundos como o PHP ou o Java)
	Um módulo é uma unidade de código isolada das demais partes do sistema que pode ou não exportar alguma funcionalidade para quem quer utilizá-lo.
	Todo arquivo js do node é um módulo
	O Servidor (criado através da função createServer), tem acesso ao fluxo de requisição/resposta http.
	Nesse fluxo, através da requisição, temos acesso à Url, Método da Requisição, parâmetros e etc.
	E através da resposta, podemos enviar, um status de resposta, corpo da resposta e etc.
	O Package Json é um arquivo muito importante por conter diversas configurações do projeto Node
	Todo pacote json vai ter uma pasta em node_modules correspondente (e somente uma pasta)
	O Express funciona como uma série de middlewares aplicadas de forma encadeada para o tratamento do fluxo requisição/resposta
	Todo módulo que exporta algo para poder ser importado por outro módulo o faz da seguinte maneira: module.exports = <objeto_a_ser_exportado>
	A pasta a ser passada para a função express.static(<pasta_a_ser_passada>) deve levar em consideração a raiz do projeto e não o camihno relativo.
	Referência para o ExpressJS: http://expressjs.com/

Aula 02
	Ao requisitar algum recurso estático, o navegador faz uma requisição do tipo GET
	A resposta a ser enviado para o front deverá ser do tipo string ou json
	De modo geral, rotas são funções que tomam como parâmetro um aplicativo (app) e observam padrões de url, realizando ações de acordo com cada tipo e rota das requisições
	O módulo consign permite passar uma instância configurada de aplicativo (app) para cada módulo que ele carrega (como os módulos de rotas)

Aula 04
	As propriedades send e json do objeto de resposta (res), tem a mesma função basicamente (quando o objeto enviado já está num formato compatível com json), porém quando a resposta for undefined send irá enviar undefined enquanto json irá enviar um array vazio ([]).
	Relembrando: uma maneira de fazer com que um módulo receba um parâmetro é encapsular o módulo (o código de um determinado script js) em uma função que é exportada e recebe o parâmetro desejado.
O módulo consign "tira a responsabilidade" do programador de lembrar quais arquivos importar via require (via include), além de demais funções úteis (como carregar todas as configurações importadas via require em um único objeto (via into)).
	Outra função interessante do consign é fornecer acesso ao módulos carregados via propriedade.
	Ex.: Imagine que você quer carregar os módulos dentro do diretório api no objeto app:
		|- app
			| - api
				| -- + shoping.js
				| -- + client.js
				| -- + product.js
	Ex.: linha de código: consign().include('app/api').into(app)
	O Consign irá fornecer o objeto como segue: app.app.api.shoping; app.app.api.client; app.app.api.product;
	* Note que o primeiro app é como se fosse o namespace do projeto, logo para navegar na estrutura de arquivos desde a raiz precisamos usar duas vezes o 'app'.
	Para eliminarmos esse problema podemos apontar para o consign o nosso "Diretório Atual de Trabalho" ou current work directory (cwd) em: consign({ cwd : 'app' }).include('api').into(app)
	
Aula 05
	O Express encapsula as requisições transformando-as para facilitar a manipulação de dados. Uma dessas tranformações é a associação de "coringas" das rotas à parâmetros das requisições.
	Ex.:
	app.get(users/:id, function(req, res){ console.log(req.params.id) });
	app.get(groups/:name, function(req, res){ console.log(req.params.name) });

Aula 10
	O cliente do mongodb (mongo) permite a sintaxe de JavaScript para manipulação de dados.
	O formato dos dados no MongoDB é conhecido como BSON (binary json, que é quase igual ao json, porém com mais tipos nativos)
	O MongoDB é schemaless (sem esquema), logo ele não valida a entrada de dados (não se preocupa em determinar se um registro que será inserido segue ou não um padrão pré-definido. Logo essa responsabilidade de validação dos dados (se um registro possui ou não um atributo, se esse atributo é do tipo correto e etc) passa a ser da aplicação.
	Schema dentro do Mongoose é usado para criar modelos (regras de validação de entrada de registros).
	*! Ao requerer novamente um módulo, o Node interpreta essa chamada e devolve o objeto que está em memória, logo se você requere um módulo pela primeira vez, altera o objeto desse módulo (por exemplo, configurando esse objeto) e depois requere o mesmo módulo novamente, o objeto retornado já está configurado, não é um objeto "em branco". !*
	O Mongoose por padrão grava os registros representados por um modelo numa coleção cujo nome é o plural do nome daquele modelo. Ex.: modelo: User, coleção: Users.
	





	
