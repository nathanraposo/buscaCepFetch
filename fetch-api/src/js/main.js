const cep = document.querySelector('#cep')

/**
 * Este metodo recebe os dados em json da API VIA CEP
 * percorre cada um dos campos verifica em meu formulario HTML quais campos eu tenho com mesmo ID
 * e coloca o valor dentro do campo assim ficando automatico a forma de listar os valores.
 */
const showData = (result) =>{
    for(const campo in result){
        if(document.querySelector("#"+campo)){
            document.querySelector("#"+campo).value = result[campo]
        }
    }
}

/**
 * Evento de Listener no campo CEP do meu formulario HTML
 * o "BLUR" significa que ao sair do campo ele dispare toda a logica dentro do evento
 * A variavel "search" retira os "-" do value.
 * A constante "options" passa os parametros para API do que eu to fazendo no momento
 * O fetch se comunica com a API passando a URL e o valor da variavel "search"
 * pego o resultado e se deu certo o response transformo em json e se deu certo o json eu chamo a função showData e alimenta os campos.
 * se der erro printa a mensgagem do erro no log
 */
cep.addEventListener("blur", (e) => {

    let search = cep.value.replace("-", "")

    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`https://viacep.com.br/ws/${search}/json/`, options)
        .then(response => {
            response.json()
                .then(data => showData(data))
        })
        .catch(e => console.log('Deu Erro:'+ e,message))
})
