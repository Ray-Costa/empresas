import {
    cadastro,

} from "./request.js";

const btnHomeCadastro = document.getElementById("btn-cadastro-home")
btnHomeCadastro.addEventListener('click', (evento) => {
    evento.preventDefault()

    window.location.href = "/index.html"
})

const btnLoginCadastro = document.getElementById("btn-cadastro-cadastro")
btnLoginCadastro.addEventListener('click', (evento) => {
    evento.preventDefault()

    window.location.href = "/pages/login/login.html"
})

const btnRetornarCadastro = document.getElementById("cadastra-se-pag-login")
btnRetornarCadastro.addEventListener('click', (evento) => {
    evento.preventDefault()

    window.location.href = "/pages/login/login.html"
})

const form = document.getElementById("form-cadastro")

form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const elements = [...form.elements]

    const body = {}

    elements.forEach((element) => {
        if (element.tagName == "INPUT" && element.value !== " ") {
            body[element.id] = element.value
        }
    })

    const selectNivelProfissional = document.getElementById('select-nivel-profissional');
    const nivelProfissional = selectNivelProfissional.options[selectNivelProfissional.selectedIndex].value;


    try {
        await cadastro({
            username: body.username,
            password: body.password,
            email: body.email,
            profissional_level: nivelProfissional,
        });

        alert('Usuario cadastrado com sucesso')

        window.location.href = '/pages/login/login.html';


    } catch (error) {
        console.error(error);

    }
})