class Animal {
    constructor(especie, tamanho, bioma) {
        this.especie = especie;
        this.tamanho = tamanho;
        this.bioma = bioma;
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
        if (this.animais.has(animal.especie)) {
            this.tamanhoatual -= animal.tamanho*qtd;
            this.animais.set(animal.especie, this.animais.get(animal.especie) + qtd);
            return true;
        }
        if ((this.bioma.includes(animal.bioma[0]) || this.bioma.includes(animal.bioma[1])) && this.tamanhoatual >= animal.tamanho*qtd) {
            this.animais.set(animal.especie, qtd);
            this.tamanhoatual -= animal.tamanho*qtd;
            if (this.animais.size > 1) {
                this.tamanhoatual--
                if (this.tamanhoatual < 0) return false;
            }
            return true;
        }
    }
}

const leao = new Animal('LEAO', 3, ['savana']);
const macaco = new Animal('MACACO', 1, ['savana','floresta']);
const gazela = new Animal('GAZELA', 2, ['savana']);

const recinto1 = new Recintos(1, ['savana'], 10);
const recinto2 = new Recintos(2, 'floresta', 5);
const recinto3 = new Recintos(3, ['savana','rio'], 7);
const recinto4 = new Recintos(4, 'rio', 8);
const recinto5 = new Recintos(5, 'savana', 9);

recinto1.adicionarAnimal(macaco, 3);
recinto3.adicionarAnimal(gazela, 1);
recinto5.adicionarAnimal(leao, 1);

class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        if (quantidade <= 0) {
            return {erro: "Quantidade inválida"}
        }

        let recintosViaveis = [];

        switch (animal){
            case 'LEAO':
                const leao = new Animal('LEAO', 3, 'savana');
                if(recinto5.adicionarAnimal(leao, quantidade)){
                    recintosViaveis.push(`Recinto ${recinto5.numero} (espaço livre: ${recinto5.tamanhoatual} total: ${recinto5.tamanhototal})`);
                }
                if(recintosViaveis.length === 0){
                    return {erro: "Não há recinto viável"};
                }
                return {recintosViaveis};
            case 'LEOPARDO':
                return {erro: "Não há recinto viável"};
            case 'CROCODILO':
                const crocodilo = new Animal('CROCODILO', 3, 'rio');
                if(recinto4.adicionarAnimal(crocodilo, quantidade)){
                    recintosViaveis.push(`Recinto ${recinto4.numero} (espaço livre: ${recinto4.tamanhoatual} total: ${recinto4.tamanhototal})`);
                }
                if(recintosViaveis.length === 0){
                    return {erro: "Não há recinto viável"};
                }
                return {recintosViaveis};
            case 'MACACO':
                const macaco = new Animal('MACACO', 1, ['savana','floresta']);
                if(recinto1.adicionarAnimal(macaco, quantidade)){
                    recintosViaveis.push(`Recinto ${recinto1.numero} (espaço livre: ${recinto1.tamanhoatual} total: ${recinto1.tamanhototal})`);
                }
                if(recinto2.adicionarAnimal(macaco, quantidade) && quantidade > 1){
                    recintosViaveis.push(`Recinto ${recinto2.numero} (espaço livre: ${recinto2.tamanhoatual} total: ${recinto2.tamanhototal})`);
                }
                if(recinto3.adicionarAnimal(macaco, quantidade)){
                    recintosViaveis.push(`Recinto ${recinto3.numero} (espaço livre: ${recinto3.tamanhoatual} total: ${recinto3.tamanhototal})`);
                }
                if(recintosViaveis.length === 0){
                    return {erro: "Não há recinto viável"};
                }
                return {recintosViaveis};
            case 'GAZELA':
                const gazela = new Animal('GAZELA', 2, 'savana');
                if(recinto1.adicionarAnimal(gazela, quantidade)){
                    recintosViaveis.push(`Recinto ${recinto1.numero} (espaço livre: ${recinto1.tamanhoatual} total: ${recinto1.tamanhototal})`);
                }
                if(recinto3.adicionarAnimal(gazela, quantidade)){
                    recintosViaveis.push(`Recinto ${recinto3.numero} (espaço livre: ${recinto3.tamanhoatual} total: ${recinto3.tamanhototal})`);
                }
                if(recintosViaveis.length === 0){
                    return {erro: "Não há recinto viável"};
                }
                return {recintosViaveis};
            case 'HIPOPOTAMO':
                const hipopotamo = new Animal('HIPOPOTAMO', 4, ['savana','rio']);
                if(recinto3.adicionarAnimal(hipopotamo, quantidade)){
                    recintosViaveis.push(`Recinto ${recinto3.numero} (espaço livre: ${recinto3.tamanhoatual} total: ${recinto3.tamanhototal})`);
                }
                if(recinto4.adicionarAnimal(hipopotamo, quantidade)){
                    recintosViaveis.push(`Recinto ${recinto4.numero} (espaço livre: ${recinto4.tamanhoatual} total: ${recinto4.tamanhototal})`);
                }
                if(recintosViaveis.length === 0){
                    return {erro: "Não há recinto viável"};
                }
                return {recintosViaveis};
            default:
                return {erro: "Animal inválido"}
        }
    }
}

// talvez eu refatore (confia)
new RecintosZoo().analisaRecintos();

export { RecintosZoo as RecintosZoo };
