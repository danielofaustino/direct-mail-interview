const teste = [
  'Katharine Conceição da Silva',
  'katharine.silva@hotmail.com',
]

const newTeste = {
  completeName: teste[0],
  email: teste[1],
  firstName: teste[0].split(' ')[0]

}

console.log(newTeste)