//URL base para acesso ao serviço
const baseURL = "https://behappy-api.herokuapp.com";

//URL para acesso de rotas não-autenticadas
const axios = require("axios").create({
    baseURL: baseURL
});

//URL para acesso de rotas não-autenticadas
const api = require("axios").create({
    baseURL: baseURL
});

//Token que vai ser recuperado
var token = undefined;

//Primeira rota da API/Página Principal
axios.get("/")
    .then(response => {
        console.log("API Status")
        console.log(response.data)
    })
    .catch(error => console.log(error.message));

//Rota "what" - recupera as gentilezas
axios.get("/what")
.then(response => {
    console.log("API What");
    console.log(response.data)
})
.catch(error => {
    console.log("API What");
    console.log(error.message)
});

//Rota "who" - recupera as pessoas
axios.get("/who")
.then(response => {
    console.log("API Who");
    console.log(response.data)
})
.catch(error => {
    console.log("API Who");
    console.log(error.message)
});

//Rota autenticada - realiza o login de usuário e armazena o token da resposta
axios.get("/auth", {auth: {username: "testador", password: "secret"}})
.then(response => {
    console.log("API Auth");
    console.log(response.data)
    token = response.data.token;
})
.catch(error => {
    console.log("API Auth");
    console.log(error.message)
});

//Rota autenticada  - realiza login de usuário para adicionar o token no header de request(pra acessar as tarefas)
api.interceptors.request.use(async config => {
    if (token == undefined) {
        const response = await axios.get("/auth", {auth: {username: "testador", password: "secret"}});
        token = response.data.token;
    }
    config.headers.Authorization = token;
    return config;
});

//Rota para acessar tarefas pelo token gerado pelo login do usuário
api.get("/tasks", {headers: {Authorization: token}})
.then(response => {
    console.log("API Tasks by Token");
    console.log(response.data)
})
.catch(error => {
    console.log("API Tasks by Token");
    console.log(error.message)
});
