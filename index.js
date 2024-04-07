let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 1, 2, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Fulano de Tal",
    email: "fulano@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 10, 30),
    dataCheckIn: new Date(2024, 0, 15, 11, 15)
  },
  {
    nome: "Ciclano Silva",
    email: "ciclano@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 14, 45),
    dataCheckIn: null
  },
  {
    nome: "Beltrano Souza",
    email: "beltrano@gmail.com",
    dataInscricao: new Date(2024, 1, 20, 8, 0),
    dataCheckIn: new Date(2024, 1, 20, 8, 30)
  },
  {
    nome: "João da Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 3, 5, 16, 0),
    dataCheckIn: new Date(2024, 3, 5, 16, 45)
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 12, 10),
    dataCheckIn: new Date(2024, 2, 22, 12, 45)
  },
  {
    nome: "José Santos",
    email: "jose@gmail.com",
    dataInscricao: new Date(2024, 1, 8, 9, 30),
    dataCheckIn: null
  },
  {
    nome: "Ana Pereira",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 25, 14, 20),
    dataCheckIn: new Date(2024, 0, 25, 14, 50)
  },
  {
    nome: "Pedro Alves",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 11, 45),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  //CONDICIONAL//
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
        <button
          data-email="${participante.email}"
          onclick="fazerCheckIn(event)"
        >
          Confirmar check-in
        </button>
      `
  }

  return `
<tr> 
  <td>
    <strong>
      ${participante.nome}
    </strong>
    <br>
    <small>
      ${participante.email}
          </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
</tr>
`
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find( 
    (p) => {
      return p.email == participante.email
    }
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }
  
  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?' 
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  // atualizar a lista de participantes
  atualizarLista(participantes)
}

