import {
    getTodosOsDepartamentos,
    

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
          
         const divDepart = document.createElement("div")
         const nomeDepartamneto = document.createElement("h4")
         const descricaoDepartamento = document.createElement("p")
         const nomeCompany = document.createElement("p")
         const divBtnsIcon = document.createElement("div")
         const btnolho = document.createElement("button")
         const btneditar = document.createElement("button")
         const btnExcluir = document.createElement("button")


         nomeDepartamneto.innerText = elemento.name
         descricaoDepartamento.innerText = elemento.description
         nomeCompany.innerText = departamentoCompany.name


         divDepart.className = "div-depart"
         nomeDepartamneto.className = "nome-departamento"
         descricaoDepartamento.className = "descricao-departamento"
         divBtnsIcon.className = "div-btns-icons"
         btnolho.className = "btn-olho"
         btneditar.className = "btn-editar"
         btnExcluir.className = "btn-excluir"


         divDepart.appendChild(nomeDepartamneto)
         divDepart.appendChild(descricaoDepartamento)
         divDepart.appendChild(nomeCompany)
         divDepart.appendChild(divBtnsIcon)
         divBtnsIcon.appendChild(btnolho)
         divBtnsIcon.appendChild(btneditar)
         divBtnsIcon.appendChild(btnExcluir)

         renderizandoDepart.appendChild(divDepart)
         

            
            
            
        })
    } catch (error) {

    }
};
await renderDepartamento(depart);
