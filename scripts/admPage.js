import {
    renderDepartamento
} from "./listarDepartamento.js";
import {
    getTodosOsDepartamentos,
    getTodosDepartamentosDeUmaEmpresa,
    listarEmpresas,
    criarDepartamento,
   
} from "./request.js";

const btnLogoutAdmPage = document.getElementById("btn-logout-user-admin")
btnLogoutAdmPage.addEventListener('click', (evento) => {
    evento.preventDefault()
    localStorage.removeItem('user')
    window.location.href = "/index.html"
})

const depart = await getTodosOsDepartamentos();
await renderDepartamento(depart);

const sectionEmpresaAdmin = document.querySelector(".div-section-select-empresa")
const selectSelecionarEmpresa = document.querySelector(".box-empresa")
const divDepartSelectBtn = document.createElement("div")
const tagH1NomeDepart = document.createElement("h3")
const divBtnCriar = document.createElement("div")
const btnCriarDepartamento = document.createElement("button")

tagH1NomeDepart.innerText = "Departamentos"
btnCriarDepartamento.innerText = " + Criar"

const criarDepartModal = document.getElementById("div-modal-user-criar-depart")
btnCriarDepartamento.addEventListener('click', async (evento) => {
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
    const inputDescricaoDep = document.createElement("input")
    const divBtnCriarDepartamento = document.createElement("div")
    const btnCriarDepart = document.createElement("button")
    const divSelectModal = document.createElement("div")
    divSelectModal.innerHTML = `
    <div class="box-empresa">
        <select class="select-criar-departamento" id="select-criar-departamento">
            <option class="option-select-empresa" value="" disabled selected>Selecionar Empresa</option>
        </select>  
    </div>
    `

    btnXDep.innerText = "X"
    editarPerfilDep.innerText = "Criar Departamento"
    inputNomeDep.placeholder = "Nome do departamento"
    inputDescricaoDep.placeholder = "Descrição"
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
    inputDescricaoDep.className = "input-descricao-dep"
    divBtnCriarDepartamento.className = "div-btn-criar-depart"
    btnCriarDepart.className = "btn-criar-depart"

    btnXDep.addEventListener('click', (evento) => {
        evento.preventDefault()
        criarDepartModal.remove()
        body.classList.remove('transparencia')
    })

    btnCriarDepart.addEventListener('click', async (event) => {
        evento.preventDefault()
        const opcaoValorEmpresa = setorSelecionadoEmpresa.options[setorSelecionadoEmpresa.selectedIndex].value;
        await criarDepartamento({
            name: inputNomeDep.value,
            description: inputDescricaoDep.value,
            company_uuid: opcaoValorEmpresa
        })
        criarDepartModal.remove()
        body.classList.remove('transparencia')
    })

    criarDepartModal.appendChild(divModalUserDep)
    divModalUserDep.appendChild(divBtnXDep)
    divBtnXDep.appendChild(btnXDep)
    divModalUserDep.appendChild(editarPerfilDep)
    divModalUserDep.appendChild(formInputsDep)
    formInputsDep.appendChild(divInputNomeDep)
    divInputNomeDep.appendChild(inputNomeDep)
    formInputsDep.appendChild(divInputDescricao)
    divInputDescricao.appendChild(inputDescricaoDep)
    formInputsDep.appendChild(divSelectModal)
    formInputsDep.appendChild(divBtnCriarDepartamento)
    divBtnCriarDepartamento.appendChild(btnCriarDepart)

    document.getElementsByTagName('body')[0].appendChild(criarDepartModal)

    const setorSelecionadoEmpresa = document.getElementById("select-criar-departamento");
    await adicionarEmpresasNoSelect(setorSelecionadoEmpresa);
})


tagH1NomeDepart.className = "tag-H1-Nome-Depart"
btnCriarDepartamento.className = "btn-criar-empresa"
divBtnCriar.className = "div-btn-criar"
divDepartSelectBtn.className = "div-depart-select-btn"

divDepartSelectBtn.appendChild(tagH1NomeDepart)
divDepartSelectBtn.appendChild(selectSelecionarEmpresa)
divDepartSelectBtn.appendChild(divBtnCriar)
divBtnCriar.appendChild(btnCriarDepartamento)

sectionEmpresaAdmin.appendChild(divDepartSelectBtn)


const filtrarDepartamentosAPartirDeEmpresa = async (empresaID) => {
    try {
        const depEmpresa = await getTodosDepartamentosDeUmaEmpresa(empresaID);
        renderDepartamento(depEmpresa);
    } catch (error) {

    }
};

const mostrarEmpresa = async () => {
    try {
        const setorSelecionadoEmpresa = document.getElementById("setor-select-empresa");
        listenerParaFiltrarDepartamentosPorEmpresa(setorSelecionadoEmpresa);
        await adicionarEmpresasNoSelect(setorSelecionadoEmpresa);
    } catch (error) {
        console.error(error);
    }
};
await mostrarEmpresa();

async function adicionarEmpresasNoSelect(setorSelecionadoEmpresa) {
    const empresas = await listarEmpresas();
    empresas.forEach((elemento) => {
        const empresaNome = elemento.name;
        const empresaID = elemento.uuid;
        setorSelecionadoEmpresa.appendChild(new Option(empresaNome, empresaID));
    });
}

function listenerParaFiltrarDepartamentosPorEmpresa(setorSelecionadoEmpresa) {
    setorSelecionadoEmpresa.addEventListener('change', (event) => {
        const opcaoValorEmpresa = setorSelecionadoEmpresa.options[setorSelecionadoEmpresa.selectedIndex].value;
        filtrarDepartamentosAPartirDeEmpresa(opcaoValorEmpresa);
    });
    return setorSelecionadoEmpresa;
}

