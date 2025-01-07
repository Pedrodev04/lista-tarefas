function atualizarRelogio(){
var controleHoras = document.getElementById('segundos')
var data = new Date()
var minutos = data.getMinutes()
var hora = data.getHours()
var Segundos = data.getSeconds()

// Adiciona um zero à esquerda para valores menores que 10
if(minutos < 10) minutos = '0' + minutos
if(hora < 10) hora = '0' + hora
if(Segundos < 10) Segundos = '0' + Segundos

controleHoras.innerHTML = `${hora} : ${minutos} : ${Segundos}`
}

// Atualiza o relógio a cada segundo (1000 milissegundos)
setInterval(atualizarRelogio, 1000)

// Chama a função uma vez para garantir que o relógio esteja correto imediatamente
atualizarRelogio()

let tarefasUrgentes = []
let tarefasModeradas = []
let metas = []
let contadorModeradas = 1
let contadorMetas = 1
let contadorUrgentes = 1 //contador para enumerar as tarefas

// adicionar tarefas
function adicionar(){
    let incluir = document.getElementById('nova-tarefa')
    let minhas = incluir.value

    if(minhas == 0 || minhas.trim() === ""){
        window.alert('Por favor digite uma tarefa.')
    } else {
        let categoria = document.getElementsByName('list')
        let categoriaId = ''

        if(categoria[0].checked){
            categoriaId = 'taf'
            tarefasUrgentes.push({numero: contadorUrgentes, tarefa: minhas})
            contadorUrgentes++;
            window.alert('tarefa adicionada!')
        }else if(categoria[1].checked){
            categoriaId = 'mod'
            tarefasModeradas.push({numero: contadorModeradas, tarefa: minhas})
            contadorModeradas++;
            window.alert('tarefa adicionada!')
        }else if(categoria[2].checked){
            categoriaId = 'met'
            metas.push({numero: contadorMetas, tarefa: minhas})
            contadorMetas++;
            window.alert('Meta adicionada!')
        }
        if(categoriaId){
            atualizarTarefas(categoriaId)
            incluir.value = ""
        }else{
            window.alert('Por favor selecione uma categoria.');
        }
    }
}

// Referente a atualizar as tarefas
function atualizarTarefas(categoriaId){
    let tarefasElement = document.getElementById(categoriaId)
    let tarefasArray = []

    if(categoriaId === 'taf'){
        tarefasArray = tarefasUrgentes
    } else if(categoriaId === 'mod'){
        tarefasArray = tarefasModeradas
    } else if(categoriaId === 'met'){
        tarefasArray = metas
    }

     tarefasArray.forEach((item, index) => { item.numero = index + 1}); // Reordena os contadores 

    tarefasElement.innerHTML = tarefasArray.map(item => `${item.numero} - ${item.tarefa}`).join("<br>")
}

// excluir tarefas
function excluir(){
    let apagar = document.getElementById('excluir-tarefa')
    let apagado = parseInt(apagar.value)

//trim() verifica se o excluir tarefa esta vazio
    if((isNaN(apagado) || apagado <= 0)){
        window.alert('Digite o nome da tarefa a ser excluida.')
    }else{
       let index = -1
       let categoria = document.getElementsByName('list')
       let categoriaId = ''

        if(categoria[0].checked){
            categoriaId = 'taf'
            index = tarefasUrgentes.findIndex(item => item.numero === apagado)
        }else if(categoria[1].checked){
            categoriaId = 'mod'
            index = tarefasModeradas.findIndex(item => item.numero === apagado)
        }else if(categoria[2].checked){
            categoriaId = 'met'
            index = metas.findIndex(item => item.numero === apagado)
        }
        if(categoriaId && index !== -1){
            if(categoriaId === 'taf'){
                tarefasUrgentes.splice(index, 1)
                window.alert('Tarefa excluída!')
            }else if(categoriaId === 'mod'){
                tarefasModeradas.splice(index, 1)
                window.alert('Tarefa excluída!')
            } else if(categoriaId === 'met'){
                metas.splice(index, 1)
                window.alert('Meta excluída!')
            }
            atualizarTarefas(categoriaId)
            if(tarefasUrgentes.length === 0 && tarefasModeradas.length === 0 && metas.length === 0){
                contadorUrgentes = 1
                contadorModeradas = 1
                contadorMetas = 1
            }
        } else {
            window.alert('Por favor selecione uma categoria.')
        }
    }
    apagar.value = ""
}
