import {
    removerDepartamento,
    getTodosOsDepartamentos,
    atualizarDepartamento,
    getUsuarioSemDepartamento,
    contratarFuncionario,
    listarTodosFuncionariosDoMesmoDepartamento,
    desligarFuncionario,
    listaDeUsuarios,
    excluirUsuario
} from "./request.js";

export const renderDepartamento = async (depart) => {
    try {
        const renderizandoDepart = document.querySelector(".ul-render-departamento")
        renderizandoDepart.innerHTML = ``;
        depart.forEach((elemento) => {
            const departamentoCompany = elemento.companies

            const tagLi = document.createElement("li")
            const divDepart = document.createElement("div")
            const nomeDepartamneto = document.createElement("h4")
            const descricaoDepartamento = document.createElement("p")
            const nomeCompany = document.createElement("p")
            const divBtnsIcon = document.createElement("div")
            const btnOlho = document.createElement("button")
            const btnEditar = document.createElement("button")
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
            btnOlho.className = "btn-olho"
            btnEditar.className = "btn-editar"
            btnExcluir.className = "btn-excluir"
            divLinha.className = "linha-div"
            tagLi.className = "tag-li"

            tagLi.appendChild(divDepart)
            divDepart.appendChild(nomeDepartamneto)
            divDepart.appendChild(descricaoDepartamento)
            divDepart.appendChild(nomeCompany)
            divDepart.appendChild(divBtnsIcon)
            divBtnsIcon.appendChild(btnOlho)
            divBtnsIcon.appendChild(btnEditar)
            divBtnsIcon.appendChild(btnExcluir)
            divDepart.appendChild(divLinha)

            renderizandoDepart.appendChild(tagLi)

            btnOlho.addEventListener('click', async (evento) => {
                const visualizarDepart = document.querySelector(".div-modal-user-visualizar-depart")
                visualizarDepart.innerHTML = ``;
                evento.preventDefault()
                const body = document.querySelector('body')
                body.classList.add('transparencia')

                const section = document.createElement('section');
                section.className = 'section-funcionarios'

                const div = document.createElement('div');
                div.className = 'div-lista-funcionarios'
                section.appendChild(div);

                const ul = document.createElement("ul")
                ul.className = 'ul-render-funcionarios';
                div.appendChild(ul);

                const tagDiv = document.createElement("div")
                const tagDivBtnX = document.createElement("div")
                const tagBtnX = document.createElement("button")
                const divNomeDepart = document.createElement("div")
                const nomeDepart = document.createElement("h3")
                const divDescric = document.createElement("div")
                const divDescricaoInput = document.createElement("div")
                const tagDescricaoDepart = document.createElement("h5")
                const tagH5 = document.createElement("h5")
                const nomeEmpresaPerten = document.createElement("p")
                const divBtnContratar = document.createElement("div")
                const btnContratar = document.createElement("button")
                const divSelectModal = document.createElement("div")
                divSelectModal.innerHTML = `
                <div class="box-empresa">
                   <select class="select-visualizar-departamento" id="select-criar-usuario">
                       <option class="option-select-empresa" value="" disabled selected>Selecionar usuário</option>
                   </select>  
                </div>
                `

                tagBtnX.innerText = "X"
                nomeDepart.innerText = elemento.name
                tagH5.innerText = "Descrição do departamento"
                tagDescricaoDepart.innerText = elemento.description

                nomeEmpresaPerten.innerText = departamentoCompany.name
                btnContratar.innerText = "Contratar"

                tagDescricaoDepart.className = "tag-descricai-depart"
                tagDiv.className = "tag-div"
                tagDivBtnX.className = "tag-div-BtnX"
                tagBtnX.className = "tag-btnX"
                divNomeDepart.className = "div-nome-depart"
                nomeDepart.className = "nome-depart"
                divDescric.className = "div-desc"
                tagH5.className = "tag-H5"
                nomeEmpresaPerten.className = "nome-empresa-pert"
                divBtnContratar.className = "div-Btn-Contratar"
                btnContratar.className = "btn-contratar"


                divDescricaoInput.className = "div-descricao-input"

                tagBtnX.addEventListener('click', (evento) => {
                    evento.preventDefault()
                    tagDiv.remove()
                    body.classList.remove('transparencia')
                })

                tagDiv.appendChild(tagDivBtnX)
                tagDivBtnX.appendChild(tagBtnX)
                tagDiv.appendChild(divNomeDepart)
                divNomeDepart.appendChild(nomeDepart)
                tagDiv.appendChild(divDescricaoInput)
                divDescricaoInput.appendChild(tagDescricaoDepart)
                divDescricaoInput.appendChild(divSelectModal)
                tagDiv.appendChild(divDescric)
                divDescric.appendChild(nomeEmpresaPerten)
                tagDiv.appendChild(divBtnContratar)
                divBtnContratar.appendChild(btnContratar)
                tagDiv.appendChild(section);

                visualizarDepart.appendChild(tagDiv)

                btnContratar.addEventListener('click', async (event) => {
                    event.preventDefault();
                    const idDoUsuarioSelecionado = selectDeUsuarios.options[selectDeUsuarios.selectedIndex].value;

                    await contratarFuncionario({
                        department_uuid: elemento.uuid,
                        user_uuid: idDoUsuarioSelecionado
                    });

                    const funcionarios = await listarTodosFuncionariosDoMesmoDepartamento();
                    renderFuncionarioDepart(funcionarios, elemento, ul)
                });


                const funcionarios = await listarTodosFuncionariosDoMesmoDepartamento();
                renderFuncionarioDepart(funcionarios, elemento, ul)

                const selectDeUsuarios = document.getElementById('select-criar-usuario');
                await adicionarUsuariosNoSelect(selectDeUsuarios)
            })

            btnEditar.addEventListener('click', editarDepartamentCallback(elemento))
            btnExcluir.addEventListener('click', (evento) => {
                evento.preventDefault()
                const body = document.querySelector('body')
                body.classList.add('transparencia')

                const excluirDepartModal = excluirModalComponente(`Realmente deseja deletar o Departamento Skina Lanches - IT e demitir seus funcionários?`, elemento.uuid);
                document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', excluirDepartModal);

                document.getElementById(`btn-fechar-modal-${elemento.uuid}`).addEventListener('click', (evento) => {
                    document.getElementById(`modal-${elemento.uuid}`).remove()
                    body.classList.remove('transparencia')
                })
                document.getElementById(`btn-confirmar-modal-${elemento.uuid}`).addEventListener('click', removerDepartamentoCallback(elemento))
            })

        })
    } catch (error) {

    }
};

function editarDepartamentCallback(elemento) {
    return async (event) => {
        const editarDepartModal = document.getElementById("div-modal-user-editar-depart")
        const body = document.querySelector('body')
        body.classList.add('transparencia')

        const divBtnXDep = document.createElement("div")
        const btnXDep = document.createElement("button")
        const divModalUserDep = document.createElement("div")
        const editarDep = document.createElement("h1")
        const formInputsDep = document.createElement("form")
        const divInputEditarDep = document.createElement("div")
        const inputDescricaoDep = document.createElement("input")
        const divBtnSalvar = document.createElement("div")
        const btnSalvar = document.createElement("button")

        btnXDep.innerText = "X"
        editarDep.innerText = "Editar Departamento"
        inputDescricaoDep.placeholder = elemento.description
        btnSalvar.innerText = "Salvar alterações"

        divBtnXDep.className = " div-btn-dep"
        btnXDep.className = "btn-dep"
        divModalUserDep.className = "div-modal-editar-dep"
        editarDep.className = " editar-dep"
        formInputsDep.className = "form-input-dep-editar"
        divInputEditarDep.className = " div-input-editar-dep"
        inputDescricaoDep.className = "input-nome-dep-editar"
        divBtnSalvar.className = "div-btn-salvar"
        btnSalvar.className = "btn-salvar"

        btnSalvar.addEventListener('click', async (evento) => {
            evento.preventDefault()
            await atualizarDepartamento({
                idDoDepartamento: elemento.uuid,
                description: inputDescricaoDep.value
            })
            divModalUserDep.remove()
            body.classList.remove('transparencia')
            const depart = await getTodosOsDepartamentos();
            renderDepartamento(depart);
        })

        btnXDep.addEventListener('click', (evento) => {
            evento.preventDefault()
            divModalUserDep.remove()
            body.classList.remove('transparencia')
        })

        editarDepartModal.appendChild(divModalUserDep)
        divModalUserDep.appendChild(divBtnXDep)
        divBtnXDep.appendChild(btnXDep)
        divModalUserDep.appendChild(editarDep)
        divModalUserDep.appendChild(editarDep)
        divModalUserDep.appendChild(formInputsDep)
        formInputsDep.appendChild(divInputEditarDep)
        divInputEditarDep.appendChild(inputDescricaoDep)
        divModalUserDep.appendChild(divBtnSalvar)
        divBtnSalvar.appendChild(btnSalvar)

        document.getElementsByTagName('body')[0].appendChild(editarDepartModal)
    };
}

function removerDepartamentoCallback(elemento) {
    return async (event) => {
        event.preventDefault();
        await removerDepartamento({
            idDoDepartamento: elemento.uuid

        });
        document.getElementById(`modal-${elemento.uuid}`).remove()
        const depart = await getTodosOsDepartamentos();
        renderDepartamento(depart);
        document.getElementsByTagName('body')[0].classList.remove('transparencia')
    };
}

async function adicionarUsuariosNoSelect(selectDeUsuario) {
    const usuarios = await getUsuarioSemDepartamento();
    usuarios.forEach((usuario) => {
        const usuarioNome = usuario.username;
        const usuarioId = usuario.uuid;
        selectDeUsuario.appendChild(new Option(usuarioNome, usuarioId));
    });
}

const componenteCard = (nome, descricao, nomeEmpresa, btnsHTML, idFuncionario) => {
    return `
        <li class="li-funcionarios" id="li-funcionario-${idFuncionario}">
            <div class="div-funcionario">
                <h4 class="nome-funcionario">${nome}</h4>
                <p class="descricao-funcionario">${descricao}</p>
                <p class="nome-company">${nomeEmpresa}</p>
                ${btnsHTML}
                <div class="linha-div"></div>
            </div>
        </li>
    `;

}

const renderFuncionarioDepart = async (funcionarios, departamento, ul) => {
    ul.innerHTML = ``;
    try {
        funcionarios.forEach((funcionario) => {
            if (funcionario.department_uuid === departamento.uuid) {
                const btnDesligarFuncionario = `<button id='desligar-${funcionario.uuid}' class="btn-desligar-funcionario">Desligar</button>`;
                ul.insertAdjacentHTML('beforeend', componenteCard(funcionario.username, funcionario.professional_level, departamento.companies.name, btnDesligarFuncionario, funcionario.uuid))
            }
        })

        funcionarios.forEach((funcionario, index) => {
            let btnDesligar = document.getElementById(`desligar-${funcionario.uuid}`);
            if (btnDesligar) {
                btnDesligar.addEventListener('click', async (event) => {
                    event.preventDefault();
                    await desligarFuncionario({
                        user_uuid: funcionario.uuid
                    });
                    document.getElementById(`li-funcionario-${funcionario.uuid}`).remove();
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const usuarios = await listaDeUsuarios();

function renderUsuarios(usuarios) {
    const ulUsuariosCadastrados = document.querySelector('.ul-render-departamento-usuarios-cadastrados');
    ulUsuariosCadastrados.innerHTML = ``;
    usuarios.forEach(usuario => {
        if (!usuario.is_admin) {
            const btns = `
        <div class="div-btns-icons"></button><button class="btn-editar"></button><button id="btn-excluir-${usuario.uuid}" class="btn-excluir"></button></div>
        `
            ulUsuariosCadastrados.insertAdjacentHTML('beforeend', componenteCard(usuario.username, usuario.professional_level, ``, btns, usuario.uuid))
        }
    })
}



function addListenerParaExcluirUsuario(usuarios) {
    usuarios.forEach(usuario => {
        const btnExcluir = document.getElementById(`btn-excluir-${usuario.uuid}`);
        if (btnExcluir) {
            btnExcluir.addEventListener('click', async (event) => {
                event.preventDefault();
                document.getElementsByTagName('body')[0].classList.add('transparencia')
                const excluirFuncionarioModal = excluirModalComponente(`Realmente deseja deletar o usuário ${usuario.username}?`, usuario.uuid);
                document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', excluirFuncionarioModal);

                document.getElementById(`btn-fechar-modal-${usuario.uuid}`).addEventListener('click', (evento) => {
                    document.getElementById(`modal-${usuario.uuid}`).remove()
                    document.getElementsByTagName('body')[0].classList.remove('transparencia')
                })
                document.getElementById(`btn-confirmar-modal-${usuario.uuid}`).addEventListener('click', logicaParaRemoverUsuario(usuario))
            })
        }
    })
}

const excluirModalComponente = (textoDescricao, id) => {
    return `
    <div class="div-modal-excluir-dep" id="modal-${id}">
        <div class="div-btn-dep">
            <button id="btn-fechar-modal-${id}" class="btn-dep">X</button>
        </div>
        <h1 class="descricao-dep">${textoDescricao}</h1>
        <div class="div-btn-confirmar">
            <button id="btn-confirmar-modal-${id}" class="btn-confirmar">Confirmar</button>
        </div>
    </div>
    `
}

renderUsuarios(usuarios)
addListenerParaExcluirUsuario(usuarios);

function logicaParaRemoverUsuario(usuario) {
    return async (event) => {
        event.preventDefault();
        await excluirUsuario({
            user_uuid: usuario.uuid
        });
        const usuarios = await listaDeUsuarios();
        renderUsuarios(usuarios);
        addListenerParaExcluirUsuario(usuarios);
        document.getElementById(`modal-${usuario.uuid}`).remove()
        document.getElementsByTagName('body')[0].classList.remove('transparencia')
    }
}