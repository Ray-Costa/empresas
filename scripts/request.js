
const baseUrl = "http://localhost:6278"
const listarSetoresPath = '/sectors';
const listarTodasEmpresasPath = '/companies';
const loginPath = '/auth/login'
const buscarInformacoesFuncionarioPath = '/users/profile'
const atualizarInformFuncPath = '/users'
const tipoDeUsuarioPath = '/auth/validate_user'
const todosDepartamentosPath = '/departments'


async function listarTodosSetores() {
    try {
        const request = await fetch(baseUrl + listarSetoresPath, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        if (request.ok) {
            const response = await request.json()
            return response;
        } else {
            throw new Error('unauthorized');
        }
    } catch (err) {
        console.log(err)
        throw err;
    }
}


async function listarEmpresas() {
    try {
        const request = await fetch(baseUrl + listarTodasEmpresasPath, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        if (request.ok) {
            const response = await request.json()
            return response;
        } else {
            throw new Error('unauthorized');
        }
    } catch (err) {
        console.log(err)
        throw err;
    }
}

async function listarEmpresasPorSetor(setor) {
    try {
        const request = await fetch(`http://localhost:6278/companies/${setor}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
       
        if (request.ok) {
            const response = await request.json()
            return response;
            
        } else {
            throw new Error('unauthorized');
        }
    } catch (err) {
        console.log(err)
        throw err;
    }
}

async function login({
    email,
    password
}) {
    try {
        const request = await fetch(baseUrl + loginPath, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        if (request.ok) {
            const response = await request.json()
            localStorage.setItem("user", JSON.stringify(response))
            return response;
           
        } else {
            throw new Error('unauthorized');
        }

    } catch (err) {
        console.error('error', err);
        throw err;
    }
}

async function getInformacoesUsuario(){
    try {
        const token = JSON.parse(localStorage.getItem('user')).token
        const request = await fetch(baseUrl + buscarInformacoesFuncionarioPath, {
            method: "GET",
            headers: {
                 Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })

        if (request.ok) {
            const response = await request.json()
            return response;
        } else {
            throw new Error('unauthorized');
        }
    } catch (err) {
        console.log(err)
        throw err;
    }

}

async function atualizarInformacoesFuncionario({
    username,
    email,
    password,
}) {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const request = await fetch(baseUrl + atualizarInformFuncPath, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password,
            })
        })

        if (request.ok) {
            const response = await request.json()
            return response;
        } else {
            throw new Error('unauthorized');
        }
    } catch (err) {
        console.log(err)
        throw err;
    }

}

async function getTipoDeUsuario() {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token
        const request = await fetch(baseUrl + tipoDeUsuarioPath, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })

        if (request.ok) {
            const response = await request.json()
            return response;
        } else {
            throw new Error('unauthorized');
        }
    } catch (err) {
        console.log(err)
        throw err;
    }
}

async function getTodosOsDepartamentos() {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token
        const request = await fetch(baseUrl + todosDepartamentosPath, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })

        if (request.ok) {
            const response = await request.json()
            return response;
        } else {
            throw new Error('unauthorized');
        }
    } catch (err) {
        console.log(err)
        throw err;
    }
}

async function getTodosDepartamentosDeUmaEmpresa(idDepart) {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token
        const request = await fetch(`http://localhost:6278/departments/${idDepart}`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })

        if (request.ok) {
            const response = await request.json()
            return response;
        } else {
            throw new Error('unauthorized');
        }
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export{

    listarTodosSetores,
    listarEmpresas,
    listarEmpresasPorSetor,
    login,
    getInformacoesUsuario,
    atualizarInformacoesFuncionario,
    getTipoDeUsuario, 
    getTodosDepartamentosDeUmaEmpresa,  
    getTodosOsDepartamentos,
}





