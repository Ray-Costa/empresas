import {
    getInformacoesUsuario,
    atualizarInformacoesFuncionario,
    listaDeFuncionariosDoMesmoDepartamento,
    listarEmpresas,

} from "./request.js";


const btnLogoutUserP = document.getElementById("btn-logout-userP")
btnLogoutUserP.addEventListener('click', (evento) => {
    evento.preventDefault()
    localStorage.removeItem('user')
    window.location.href = "/index.html"
})

const tagDiv = document.getElementById("div-userP")
const usuario = await getInformacoesUsuario();
const renderInformUsuarioLogado = async (usuario) => {
    try {

        const tagDivUser = document.createElement("div")
        const tagEmail = document.createElement("p")
        const tagProfissao = document.createElement("p")
        const tagTipo = document.createElement("p")
        const tagDivBtnEditor = document.createElement("div")
        const tagBtnEditor = document.createElement("button")
        // console.log(usuario.department_uuid)

        tagEmail.innerText = `Email: ${usuario.email}`
        tagProfissao.innerText = usuario.professional_level
        tagTipo.innerText = usuario.kind_of_work
        tagBtnEditor.src = "src/Vector.png"

        tagDivUser.className = "tag-div-user"
        tagEmail.className = "tag-email-user"
        tagProfissao.className = "tag-profissao-user"
        tagTipo.className = "tag-tipo-user"
        tagBtnEditor.className = "tag-btn-editor"
        tagDivBtnEditor.className = "tag-div-btn-editor"

        const divModal = document.getElementById("div-modal-user")
        tagBtnEditor.addEventListener('click', (evento) => {
            divModal.innerHTML = ``;
            evento.preventDefault()

            const body = document.querySelector('body')
            body.classList.add('transparencia')

            const divBtnX = document.createElement("div")
            const btnX = document.createElement("button")
            const divModalUser = document.createElement("div")
            const editarPerfil = document.createElement("h1")
            const formInputs = document.createElement("form")
            const divInputNome = document.createElement("div")
            const inputNome = document.createElement("input")
            const divInputEmail = document.createElement("div")
            const inputEmail = document.createElement("input")
            const divInputSenha = document.createElement("div")
            const inputSenha = document.createElement("input")
            const divBtnEditarPefil = document.createElement("div")
            const btnEditarPerfil = document.createElement("button")

            btnX.innerText = "X"
            editarPerfil.innerText = "Editar Perfil"
            inputNome.placeholder = "Seu nome"
            inputEmail.placeholder = "Seu e-mail"
            inputSenha.placeholder = "Sua senha"
            btnEditarPerfil.innerText = "Editar Perfil"
            btnEditarPerfil.type = "submit"

            formInputs.addEventListener('submit', async (evento) => {
                evento.preventDefault()
                const inputNomeV = inputNome.value
                const inputEmailV = inputEmail.value
                const inputSenhaV = inputSenha.value

                const response = await atualizarInformacoesFuncionario({
                    username: inputNomeV,
                    email: inputEmailV,
                    password: inputSenhaV
                })
                window.location.reload()
            })

            btnX.addEventListener('click', (evento) => {
                evento.preventDefault()
                divModal.remove()
                body.classList.remove('transparencia')

            })

            divBtnX.className = "div-btnX"
            btnX.className = "btnX"
            editarPerfil.className = "editar-Perfil"
            divModalUser.className = "div-modal-userP"
            formInputs.className = "form-inputs"
            divInputNome.className = "div-input-nome"
            inputNome.className = "input-nome-user"
            divInputEmail.className = "div-input-email"
            inputEmail.className = "input-email-user"
            divInputSenha.className = "div-input-senha"
            inputSenha.className = "input-senha-user"
            divBtnEditarPefil.className = "div-btn-editar-perfil"
            btnEditarPerfil.className = "btn-editar-perfil"


            divModal.appendChild(divBtnX)
            divBtnX.appendChild(btnX)
            divModal.appendChild(divModalUser)
            divModalUser.appendChild(editarPerfil)
            divModalUser.appendChild(formInputs)
            formInputs.appendChild(divInputNome)
            divInputNome.appendChild(inputNome)
            formInputs.appendChild(divInputEmail)
            divInputEmail.appendChild(inputEmail)
            formInputs.appendChild(divInputSenha)
            divInputSenha.appendChild(inputSenha)
            formInputs.appendChild(divBtnEditarPefil)
            divBtnEditarPefil.appendChild(btnEditarPerfil)

            document.getElementsByTagName('body')[0].appendChild(divModal)

        })

        tagDivUser.appendChild(tagEmail)
        tagDivUser.appendChild(tagProfissao)
        tagDivUser.appendChild(tagTipo)
        tagDivUser.appendChild(tagDivBtnEditor)
        tagDivBtnEditor.appendChild(tagBtnEditor)
        tagDiv.appendChild(tagDivUser)



    } catch (error) {
        console.log(error)

    }
};
await renderInformUsuarioLogado(usuario);

const divNaoCon = document.getElementById("div-page-nao-contratado")

const componenteListaDeColegasDoDepartamento = async () => {
    const [funcionarios] = await listaDeFuncionariosDoMesmoDepartamento();
    const empresas = await listarEmpresas();
    const empresa = empresas.find(empresa => empresa.uuid = funcionarios.company_uuid);
    let lis = ``;

    funcionarios.users.forEach(funcionario => {
        lis += `
        <li class="li-funcionarios" id="li-funcionario-${funcionario.uuid}">
                <div class="div-funcionario">
                    <h4 class="nome-funcionario">${funcionario.username}</h4>
                    <p class="descricao-funcionario">${funcionario.professional_level}</p>
                </div>
            </li>
        `
    })

    const component = ` 
    <div class="div-empresa-departamento">
        <h2 class="h2-empresa-departamento">${empresa.name} - ${funcionarios.name}</h2>
    </div>
    <div class="div-lista-colegas-departamento">
        <ul id="ul-colegas-departamento">
            ${lis}
        </ul>
    </div>`

    return component;

}

async function departamentoOuNaoContratado(usuario) {
    if (usuario.department_uuid == null) {

        const divNaoContratado = document.createElement("div")
        const nomeNaoContratado = document.createElement("h1")

        nomeNaoContratado.innerText = "Você ainda não foi contratado"

        divNaoContratado.className = "div-descricao-nao-contratado"
        nomeNaoContratado.className = "nome-nao-contratado"

        divNaoContratado.appendChild(nomeNaoContratado)
        divNaoCon.appendChild(divNaoContratado)
    } else {
        let funcionariosComponente = await componenteListaDeColegasDoDepartamento();
        divNaoCon.insertAdjacentHTML('beforeend', funcionariosComponente);
    }
}
departamentoOuNaoContratado(usuario)