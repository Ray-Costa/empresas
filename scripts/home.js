import {
    listarTodosSetores,
    listarEmpresas,
    listarEmpresasPorSetor,
    

} from "./request.js";



const setorSelecionado = document.getElementById("setor-select")

setorSelecionado.addEventListener('change', (event) => {
    const opcaoValor = setorSelecionado.options[setorSelecionado.selectedIndex].value;
    if (opcaoValor) {
        filtrarEmpresaPorSetor(opcaoValor);
    }
})

const renderSetor = async () => {
    try {
        const setor = await listarTodosSetores();
        setor.forEach((elemento) => {
            const setores = elemento.description
            setorSelecionado.appendChild(new Option(setores))
        })
    } catch (error) {

    }
};
await renderSetor();

const renderizandoEmpresa = document.querySelector(".ul-render-empresa")
const empresa = await listarEmpresas();
const renderEmpresa = async (empresa) => {
    try {
        renderizandoEmpresa.innerHTML = ``;
        empresa.forEach((elemento) => {
            const setores = elemento.sectors
            const descricaoSetor = setores.description

            const tagLi = document.createElement("li")
            const tagDivSetor = document.createElement("div")
            const tagNomeEmpresa = document.createElement("h5")
            const tagHorario = document.createElement("p")
            const tagSetor = document.createElement("p")
            const linha = document.createElement("p")

            tagNomeEmpresa.innerText = elemento.name
            tagHorario.innerText = elemento.opening_hours
            tagSetor.innerText = setores.description


            tagLi.className = "tagLi"
            tagDivSetor.className = "div-setor"
            tagNomeEmpresa.className = "nome-setor-empresa"
            tagHorario.className = "tag-horario"
            tagSetor.className = "tag-setor"
            linha.className = "linha-empresa"


            tagLi.appendChild(tagDivSetor)
            tagDivSetor.appendChild(tagNomeEmpresa)
            tagDivSetor.appendChild(tagHorario)
            tagDivSetor.appendChild(tagSetor)
            tagDivSetor.appendChild(linha)

            renderizandoEmpresa.appendChild(tagLi)

            return tagLi
        })
    } catch (error) {

    }
};
await renderEmpresa(empresa);

const Btnlogin = document.getElementById("btn-login")
Btnlogin.addEventListener('click', (evento) => {
    evento.preventDefault()
    window.location.href = "/pages/login/login.html"
})

const btnCadastrarHeaderHome = document.getElementById("btn-cadastro-header-home")
btnCadastrarHeaderHome.addEventListener('click', (evento) => {
    evento.preventDefault()
    window.location.href = "/pages/cadastro/cadastro.html"
})


const filtrarEmpresaPorSetor = async (setor) => {
    try {
        const empresa = await listarEmpresasPorSetor(setor);
        renderEmpresa(empresa);
    } catch (error) {

    }
};
