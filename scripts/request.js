const baseUrl = "http://localhost:6278"
const listarSetoresPath = '/sectors';
const listarTodasEmpresasPath = '/companies';
const loginPath = '/auth/login'
const buscarInformacoesFuncionarioPath = '/users/profile'
const atualizarInformFuncPath = '/users'
const tipoDeUsuarioPath = '/auth/validate_user'
const todosDepartamentosPath = '/departments'
const usuarioSemDepartamentopath = '/admin/out_of_work'
const contratarFuncionarioPath = '/departments/hire/'
const listarFuncMesmoDepartPath = '/users'
const desligarFuncionarioPath = '/departments/dismiss/'
const excluirUsuarioPath = '/admin/delete_user/';
const criarUsuarioPath = '/auth/register'
const funcionariosDoMesmoDepartamentoPath = '/users/departments/coworkers'

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
        const request = await fetch(`http://localhost:6278/companies/${setor}`, {
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

async function getInformacoesUsuario() {
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
        const request = await fetch(`http://localhost:6278/departments/${idDepart}`, {
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

async function removerDepartamento({
    idDoDepartamento
}) {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token
        const request = await fetch(`http://localhost:6278/departments/${idDoDepartamento}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })

        if (!request.ok) {
            throw new Error('unauthorized');
        }

    } catch (err) {
        console.log(err)
        throw err;
    }
}

async function atualizarDepartamento({
    idDoDepartamento,
    description
}) {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token
        const request = await fetch(`http://localhost:6278/departments/${idDoDepartamento}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description
            })
        })
        if (!request.ok) {
            throw new Error('unauthorized');
        }

    } catch (err) {
        console.log(err)
        throw err;
    }
}

async function criarDepartamento({
    name,
    description,
    company_uuid
}) {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token
        const request = await fetch(`http://localhost:6278/departments`, {
            method: "POST",
            body: JSON.stringify({
                name,
                description,
                company_uuid
            }),
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

async function listaDeUsuarios() {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token
        const request = await fetch(`http://localhost:6278/users`, {
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

async function getUsuarioSemDepartamento() {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token
        const request = await fetch(baseUrl + usuarioSemDepartamentopath, {
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

async function contratarFuncionario({
    user_uuid,
    department_uuid
}) {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token
        const request = await fetch(baseUrl + contratarFuncionarioPath, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_uuid,
                department_uuid
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

async function listarTodosFuncionariosDoMesmoDepartamento() {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token
        const request = await fetch(baseUrl + listarFuncMesmoDepartPath, {
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

async function desligarFuncionario({
    user_uuid
}) {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token
        const request = await fetch(baseUrl + desligarFuncionarioPath + user_uuid, {
            method: "PATCH",
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

async function excluirUsuario({
    user_uuid
}) {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token
        const request = await fetch(baseUrl + excluirUsuarioPath + user_uuid, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })

        if (request.ok) {
            const response = await request.text()
            return response;
        } else {
            throw new Error('unauthorized');
        }
    } catch (err) {
        console.log(err)
        throw err;
    }
}

async function cadastro({
    username,
    password,
    email,
    profissional_level,
    
    
}) {
    try {
        const request = await fetch(baseUrl + criarUsuarioPath, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                email,
                profissional_level,
                
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


async function listaDeFuncionariosDoMesmoDepartamento() {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token
        const request = await fetch(baseUrl + funcionariosDoMesmoDepartamentoPath, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        if (request.ok) {
            const response = await request.json()
            return response;

        } else {
            throw new Error('unauthorized');
        }

    } catch (err) {
        console.error('error', err);
        throw err;
    }
}


export {
    criarDepartamento,
    listarTodosSetores,
    listarEmpresas,
    listarEmpresasPorSetor,
    login,
    getInformacoesUsuario,
    atualizarInformacoesFuncionario,
    getTipoDeUsuario,
    getTodosDepartamentosDeUmaEmpresa,
    getTodosOsDepartamentos,
    removerDepartamento,
    atualizarDepartamento,
    listaDeUsuarios,
    getUsuarioSemDepartamento,
    contratarFuncionario,
    listarTodosFuncionariosDoMesmoDepartamento,
    desligarFuncionario,
    excluirUsuario,
    cadastro,
    listaDeFuncionariosDoMesmoDepartamento
}