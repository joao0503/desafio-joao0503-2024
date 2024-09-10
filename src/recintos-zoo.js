class Animal {
    constructor(especie, tamanho, bioma, alimentacao) {
        this.especie = especie;
        this.tamanho = tamanho;
        this.bioma = bioma;
        this.alimentacao = alimentacao;
    }

    // retorna true se for viavel ao recinto
    adicionarSeViavel(animal, quantidade, recintosViaveis, recinto) {
        if (recinto.adicionarAnimal(animal, quantidade)) {
            recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoAtual} total: ${recinto.tamanhoTotal})`);
        }
    }
}

class Recintos {
    constructor(numero, bioma, tamanhoAtual) {
        this.numero = numero;
        this.bioma = bioma;
        this.tamanhoAtual = tamanhoAtual;
        this.tamanhoTotal = tamanhoAtual;
        this.animaisNoRecinto = new Map();
    }

    adicionarAnimal(animal, qtd) {
        // Se não houver espaço
        if (this.tamanhoAtual < animal.tamanho*qtd) {
            return false;
        }
        // Se já houver animal da mesma espécie
        if (this.animaisNoRecinto.has(animal.especie)) {
            this.tamanhoAtual -= animal.tamanho*qtd;
            this.animaisNoRecinto.set(animal.especie, this.animaisNoRecinto.get(animal.especie) + qtd);
            return true;
        }

        // Se o recinto for compatível com o animal
        if (animal.bioma.some(b => this.bioma.includes(b)) && this.tamanhoAtual >= animal.tamanho * qtd) {
            this.animaisNoRecinto.set(animal.especie, qtd);
            this.tamanhoAtual -= animal.tamanho*qtd;
            if (this.animaisNoRecinto.size > 1) {
                this.tamanhoAtual--;
            }
            return this.tamanhoAtual >= 0;

        } else {
            return false;
        }
    }
}

const animaisConfig = {
    'LEAO': { tamanho: 3, bioma: ['savana'], alimentacao: 'carnivoro' },
    'LEOPARDO': { tamanho: 2, bioma: ['savana'], alimentacao: 'carnivoro' },
    'CROCODILO': { tamanho: 3, bioma: ['rio'], alimentacao: 'carnivoro' },
    'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], alimentacao: 'herbivoro'},
    'GAZELA': { tamanho: 2, bioma: ['savana'], alimentacao: 'herbivoro'},
    'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'], alimentacao: 'herbivoro'}
}

const recintoConfig = {
    1: { bioma: ['savana'], tamanhoAtual: 10 },
    2: { bioma: ['floresta'], tamanhoAtual: 5 },
    3: { bioma: ['savana', 'rio'], tamanhoAtual: 7 },
    4: { bioma: ['rio'], tamanhoAtual: 8 },
    5: { bioma: ['savana'], tamanhoAtual: 9 }
}

function criarAnimal(animal) {
    if (animaisConfig[animal]) {
        const { tamanho, bioma, alimentacao } = animaisConfig[animal];
        const novoAnimal = new Animal(animal, tamanho, bioma, alimentacao);
        return novoAnimal;
    }
}

function criarRecinto(numero, recintos) {
    const { bioma, tamanhoAtual,} = recintoConfig[numero];
    const recinto = new Recintos(numero, bioma, tamanhoAtual);
    recintos.push(recinto);
    return recintos;
}

class RecintosZoo {
    regras(animal, recinto, quantidade) {
        if (animal.alimentacao.includes('carnivoro')) {
            if (recinto.animaisNoRecinto.keys().next().value === animal.especie) {
                return true;
            }
            if (recinto.animaisNoRecinto.size === 0) {
                return true;
            }
            return false;
        }

        if (animal.especie === 'HIPOPOTAMO') {
            if ((recinto.animaisNoRecinto.size > 0) && (recinto.bioma != ['savana','rio'])){
                return false;
            }
            return true;
        }

        // não falamos sobre essa regra
        if (animal.especie === 'MACACO') {
            if (recinto.animaisNoRecinto.get('LEAO') || recinto.animaisNoRecinto.get('LEOPARDO') || recinto.animaisNoRecinto.get('CROCODILO')) {
                return false;
            }
            return !((recinto.animaisNoRecinto.size === 0) && quantidade < 2)
        }
    }

    analisaRecintos(animal, quantidade) {
        if (quantidade <= 0) {
            return {erro: "Quantidade inválida"}
        }

        if (!criarAnimal(animal)) {
            return {erro: "Animal inválido"};
        }

        let recintos = [];
        for (let numero = 1; numero < 6; numero++) {
            recintos = criarRecinto(numero, recintos);
        }

        recintos[0].adicionarAnimal(criarAnimal('MACACO'), 3);
        recintos[2].adicionarAnimal(criarAnimal('GAZELA'), 1);
        recintos[4].adicionarAnimal(criarAnimal('LEAO'), 1);

        let recintosViaveis = [];
        animal = criarAnimal(animal);

        recintos.forEach(recinto => {
            if (this.regras(animal, recinto, quantidade)) {
                animal.adicionarSeViavel(animal, quantidade, recintosViaveis, recinto);
            }
        });

        if (recintosViaveis.length === 0) {
            return {erro: "Não há recinto viável"};
        }
        return {recintosViaveis}
    }
}

new RecintosZoo().analisaRecintos();

export { RecintosZoo as RecintosZoo };