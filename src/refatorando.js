class Animal {
    constructor(especie, tamanho, bioma) {
        this.especie = especie;
        this.tamanho = tamanho;
        this.bioma = bioma;
    }

    adicionarSeViavel(animal, quantidade, recintosViaveis, recinto) {
        if (recinto.adicionarAnimal(animal, quantidade)) {
            recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoatual} total: ${recinto.tamanhototal})`);
        }
    }
}

class Recintos {
    constructor(numero, bioma, tamanhoatual) {
        this.numero = numero;
        this.bioma = bioma;
        this.tamanhoatual = tamanhoatual;
        this.tamanhototal = tamanhoatual;
        this.animais = new Map();
    }

    adicionarAnimal(animal, qtd) {
        if (this.tamanhoatual < animal.tamanho*qtd) return false
        if (animal.bioma.some(b => this.bioma.includes(b)) && this.tamanhoatual >= animal.tamanho * qtd) {
            this.animais.set(animal.especie, qtd);
            this.tamanhoatual -= animal.tamanho*qtd;
            if (this.animais.size > 1) {
                this.tamanhoatual--;
            }
            return this.tamanhoatual >= 0;
        } else {
            return false;
        }
    }
}

const animaisConfig = {
    'LEAO': { tamanho: 3, bioma: ['savana'] },
    'LEOPARDO': { tamanho: 2, bioma: ['savana'] },
    'CROCODILO': { tamanho: 3, bioma: ['rio'] },
    'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'] },
    'GAZELA': { tamanho: 2, bioma: ['savana'] },
    'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'] }
}

const recintoConfig = {
    1: { bioma: ['savana'], tamanhoatual: 10 },
    2: { bioma: ['floresta'], tamanhoatual: 5 },
    3: { bioma: ['savana', 'rio'], tamanhoatual: 7 },
    4: { bioma: ['rio'], tamanhoatual: 8 },
    5: { bioma: ['savana'], tamanhoatual: 9 }
}

function criarRecinto(numero, zoo) {
    const { bioma, tamanhoatual } = recintoConfig[numero];
    const recinto = new Recintos(numero, bioma, tamanhoatual);
    zoo.push(recinto);
    return zoo;
}


function criarAnimal(animal) {
    if (animaisConfig[animal]) {
        const { tamanho, bioma } = animaisConfig[animal];
        const novoAnimal = new Animal(animal, tamanho, bioma);
        return novoAnimal;
    }
}

class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        if (quantidade <= 0) {
            return {erro: "Quantidade inválida"}
        }

        let zoo = [];
        for (let numero = 1; numero < 6; numero++) {
            zoo = criarRecinto(numero, zoo);
        }

        zoo[0].adicionarAnimal(criarAnimal('MACACO'), 3);
        zoo[2].adicionarAnimal(criarAnimal('GAZELA'), 1);
        zoo[4].adicionarAnimal(criarAnimal('LEAO'), 1);

        if (!criarAnimal(animal)) {
            return {erro: "Animal inválido"};
        }

        let recintosViaveis = [];
        animal = criarAnimal(animal);
        zoo.forEach(recinto => {
            animal.adicionarSeViavel(animal, quantidade, recintosViaveis, recinto);
        });

        if (recintosViaveis.length === 0) {
            return {erro: "Não há recinto viável"};
        }
        return {recintosViaveis}
    }
}

console.log(new RecintosZoo().analisaRecintos('MACACO', 0))
console.log(new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1));
console.log(new RecintosZoo().analisaRecintos('LEAO', 1));

// todo: as regras do readme entre as espécies e os recintos ainda não estão sendo respeitadas

export { RecintosZoo as RecintosZoo };
