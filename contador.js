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

let tarefass = []
let contador = 1 //contador para enumerar as tarefas


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
            window.alert('tarefa adicionada!')
        }else if(categoria[1].checked){
            categoriaId = 'mod'
            window.alert('tarefa adicionada!')
        }else if(categoria[2].checked){
            categoriaId = 'met'
            window.alert('Meta adicionada!')
        }
        if(categoriaId){
            let tarefas = document.getElementById(categoriaId)
            tarefass.push({numero: contador, tarefa: minhas})//push para levar pro array 
            tarefas.innerHTML = tarefass.map(item => `${item.numero} - ${item.tarefa}`).join("<br>");//join para pular linha sem usar html
            contador++;
            incluir.value = ""
        }else{
            window.alert('Por favor selecione uma categoria.');
        }
    }
}

// excluir tarefas
function excluir(){
    let apagar = document.getElementById('excluir-tarefa')
    let apagado = parseInt(apagar.value)

//trim() verifica se o excluir tarefa esta vazio
    if((isNaN(apagado) || apagado <= 0)){
        window.alert('Digite o nome da tarefa a ser excluida.')
    }else{
       let index = tarefass.findIndex(item => item.numero === apagado) //procura a tarefa no array
       let categoria = document.getElementsByName('list')
       let categoriaId = ''

        if(categoria[0].checked){
            categoriaId = 'taf'
            window.alert('Tarefa excluida!')
        }else if(categoria[1].checked){
            categoriaId = 'mod'
            window.alert('Tarefa excluida!')
        }else if(categoria[2].checked){
            categoriaId = 'met'
            window.alert('Meta excluida!')
        }
        if(categoriaId){
            let tarefas = document.getElementById(categoriaId)
            if(index !== -1){
                tarefass.splice(index, 1)
                tarefas.innerHTML= tarefass.map(item => `${item.numero} - ${item.tarefa}`).join("<br>")
                if(tarefass.length === 0){
                    contador = 1
                }else{
                window.alert('Não encontrada!')
            }
        }else{
            window.alert('Por favor selecione uma categoria.')
        }
       }
    }
    apagar.value = ""
}
