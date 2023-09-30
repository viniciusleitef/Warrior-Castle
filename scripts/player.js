export class Player {
    constructor(name) {
      this.name = name;
      this.max_health = 100;
      this.health = this.max_health
      this.damage = 18;
      this.esquiva = 10
      this.crit = 20
      this.lvl = 1
      this.max_xp = 100
      this.xp = 0
      this.itens = {
        pocao: [35, 5],
        espada: "Cleymore",
        armadura: "malha",
        capacete: null,
        bota: "couro",
        luva: "couro",
        escudo: null
      }
      this.fugas = 3
      this.atacou = false
    }


    esquivou(){
        let number = Math.random()
        if(number <= this.esquiva*0.01){
            return true
        }
        return false
    }

    critou(){
        let number = Math.random()
        if(number <= this.crit * 0.01){
            return true
        }
        return false
    }

    addPotion(){
        return this.itens.pocao[1] ++
    }
  }
  