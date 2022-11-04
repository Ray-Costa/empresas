import {
    login,
    getTipoDeUsuario
} from "./request.js";

console.log('login')
const btnHome = document.getElementById("btn-login-home")
btnHome.addEventListener('click', (evento) => {
    evento.preventDefault()

    window.location.href = "/index.html"
})
const statusSenhaIncorreta = document.querySelector(".span-input")
const inputEmail = document.querySelector('input[type="email"]')
const inputPassword = document.querySelector('input[type="password"]')
const btnLoginSubmit = document.getElementById("btn-login-redirecionar")
const form = document.getElementById("form-login")

form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const elements = [...form.elements]

    const body = {}

    elements.forEach((element) => {
        if (element.tagName == "INPUT" && element.value !== " ") {
            body[element.id] = element.value
        }
    })

    try {
        await login({
            email: body.email,
            password: body.password

        });
        const responseTipoDeUsuario = await getTipoDeUsuario();

        if (responseTipoDeUsuario.is_admin) {
            window.location.href = "/pages/admPage/admPage.html"
        } else {
            window.location.href = "/pages/userPage/userPage.html"
        }



    } catch (error) {
        console.error(error);
        statusSenhaIncorreta.classList.remove('display-none')
    }
})


const btnCadastroPagLogin = document.getElementById("pag-login-cadastro")
btnCadastroPagLogin.addEventListener('click', () => {
    window.location.href = '/pages/cadastro/cadastro.html'
})

const btnCadastrase = document.getElementById("cadastra-se-pag-login")
btnCadastrase.addEventListener('click', () => {
    window.location.href = '/pages/cadastro/cadastro.html'

})