import {
    getTodosOsDepartamentos,
    getTodosDepartamentosDeUmaEmpresa,
    listarEmpresas,


} from "./request.js";


const sectionDepartamneto = document.querySelector(".section-departamento")

const btnLogoutAdmPage = document.getElementById("btn-logout-user-admin")
btnLogoutAdmPage.addEventListener('click', (evento) => {
    evento.preventDefault()
    localStorage.removeItem('user')
    window.location.href = "/index.html"
})

const renderizandoDepart = document.querySelector(".ul-render-departamento")
const depart = await getTodosOsDepartamentos();

const renderDepartamento = async (depart) => {
    try {
        renderizandoDepart.innerHTML = ``;
        depart.forEach((elemento) => {
            const departamentoCompany = elemento.companies

            const tagLi = document.createElement("li")
            const divDepart = document.createElement("div")
            const nomeDepartamneto = document.createElement("h4")
            const descricaoDepartamento = document.createElement("p")
            const nomeCompany = document.createElement("p")
            const divBtnsIcon = document.createElement("div")
            const btnolho = document.createElement("button")
            const btneditar = document.createElement("button")
            const btnExcluir = document.createElement("button")
            const divLinha = document.createElement("div")


            nomeDepartamneto.innerText = elemento.name
            descricaoDepartamento.innerText = elemento.description
            nomeCompany.innerText = departamentoCompany.name


            divDepart.className = "div-depart"
            nomeDepartamneto.className = "nome-departamento"
            descricaoDepartamento.className = "descricao-departamento"
            nomeCompany.className = "nome-company"
            divBtnsIcon.className = "div-btns-icons"
            btnolho.className = "btn-olho"
            btneditar.className = "btn-editar"
            btnExcluir.className = "btn-excluir"
            divLinha.className = "linha-div"
            tagLi.className = "tag-li"

            tagLi.appendChild(divDepart)
            divDepart.appendChild(nomeDepartamneto)
            divDepart.appendChild(descricaoDepartamento)
            divDepart.appendChild(nomeCompany)
            divDepart.appendChild(divBtnsIcon)
            divBtnsIcon.appendChild(btnolho)
            divBtnsIcon.appendChild(btneditar)
            divBtnsIcon.appendChild(btnExcluir)
            divDepart.appendChild(divLinha)

            renderizandoDepart.appendChild(tagLi)


        })
    } catch (error) {

    }
};
await renderDepartamento(depart);


const sectionEmpresaAdmin = document.querySelector(".div-section-select-empresa")
const selectSelecionarEmpresa = document.querySelector(".box-empresa")

const empresaDepartamento = await getTodosDepartamentosDeUmaEmpresa()
const divDepartSelectBtn = document.createElement("div")
const tagH1NomeDepart = document.createElement("h3")
const divBtnCriar = document.createElement("div")
const btnCriarEmpresa = document.createElement("button")


tagH1NomeDepart.innerText = "Departamentos"
btnCriarEmpresa.innerText = " + Criar"
const criarDepartModal = document.getElementById("div-modal-user-criar-depart")

btnCriarEmpresa.addEventListener('click', (evento) => {
    criarDepartModal.innerHTML = ``;
    evento.preventDefault()
    const body = document.querySelector('body')
    body.classList.add('transparencia')

    const divBtnXDep = document.createElement("div")
    const btnXDep = document.createElement("button")
    const divModalUserDep = document.createElement("div")
    const editarPerfilDep = document.createElement("h1")
    const formInputsDep = document.createElement("form")
    const divInputNomeDep = document.createElement("div")
    const inputNomeDep = document.createElement("input")
    const divInputDescricao = document.createElement("div")
    const InputDescriDep = document.createElement("input")
    const divBtnCriarDepartamento = document.createElement("div")
    const btnCriarDepart = document.createElement("button")
    const divSelectModal = document.createElement("div")


    btnXDep.innerText = "X"
    editarPerfilDep.innerText = "Criar Departamento"
    inputNomeDep.placeholder = "Nome do departamento"
    InputDescriDep.placeholder = "Descrição"
    btnCriarDepart.innerText = "Criar o departamento"
    btnCriarDepart.type = "submit"

    divBtnXDep.className = "div-btn-dep"
    btnXDep.className = "btn-dep"
    divModalUserDep.className = "div-modal-user-Dep"
    editarPerfilDep.className = "editar-perfil-dep"
    formInputsDep.className = "form-inputs"
    divInputNomeDep.className = "div-input-nome-dep"
    inputNomeDep.className = "input-nome-dep"
    divInputDescricao.className = "div-input-descricao"
    InputDescriDep.className = "input-descricao-dep"
    divBtnCriarDepartamento.className = "div-btn-criar-depart"
    btnCriarDepart.className = "btn-criar-depart"

    btnXDep.addEventListener('click', (evento) => {
        evento.preventDefault()
        criarDepartModal.remove()
        body.classList.remove('transparencia')

    })
    btnCriarDepart.addEventListener('click', (event) => {
        evento.preventDefault()
        console.log("renata")
    })



    criarDepartModal.appendChild(divModalUserDep)
    divModalUserDep.appendChild(divBtnXDep)
    divBtnXDep.appendChild(btnXDep)
    divModalUserDep.appendChild(editarPerfilDep)
    divModalUserDep.appendChild(formInputsDep)
    formInputsDep.appendChild(divInputNomeDep)
    divInputNomeDep.appendChild(inputNomeDep)

    formInputsDep.appendChild(divInputDescricao)
    divInputDescricao.appendChild(InputDescriDep)
    formInputsDep.appendChild(divBtnCriarDepartamento)
    divBtnCriarDepartamento.appendChild(btnCriarDepart)

    document.getElementsByTagName('body')[0].appendChild(criarDepartModal)



})


tagH1NomeDepart.className = "tag-H1-Nome-Depart"
btnCriarEmpresa.className = "btn-criar-empresa"
divBtnCriar.className = "div-btn-criar"
divDepartSelectBtn.className = "div-depart-select-btn"

divDepartSelectBtn.appendChild(tagH1NomeDepart)
divDepartSelectBtn.appendChild(selectSelecionarEmpresa)
divDepartSelectBtn.appendChild(divBtnCriar)
divBtnCriar.appendChild(btnCriarEmpresa)

sectionEmpresaAdmin.appendChild(divDepartSelectBtn)

const setorSelecionadoEmpresa = document.getElementById("setor-select-empresa")

setorSelecionadoEmpresa.addEventListener('change', (event) => {
    const opcaoValorEmpresa = setorSelecionadoEmpresa.options[setorSelecionadoEmpresa.selectedIndex].value;
    filtrarDepartamentosAPartirDeEmpresa(opcaoValorEmpresa)
})

const filtrarDepartamentosAPartirDeEmpresa = async (empresaID) => {
    try {
        const depEmpresa = await getTodosDepartamentosDeUmaEmpresa(empresaID);
        renderDepartamento(depEmpresa);
    } catch (error) {

    }
};

const mostrarEmpresa = async () => {
    try {
        const seletorEmpresa = await listarEmpresas();
        seletorEmpresa.forEach((elemento) => {
            const empresaNome = elemento.name
            const empresaID = elemento.uuid;

            setorSelecionadoEmpresa.appendChild(new Option(empresaNome, empresaID))
        })
    } catch (error) {

    }
};
await mostrarEmpresa();