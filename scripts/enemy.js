export class Enemy {
    constructor(type = "comum") {
        this.type = type
        this.health = Math.floor(Math.random() * (61 - 30)) + 30
        this.damage = Math.floor(Math.random() * (26 - 10)) + 10
        this.xp = Math.floor(Math.random() * (15 - 8)) + 8

        if (this.type === "raro"){
            this.health = Math.floor(Math.random() * (91 - 60)) + 60
            this.damage = Math.floor(Math.random() * (36 - 20)) + 20
            this.xp = Math.floor(Math.random() * (36 - 25)) + 25
        }else if(this.type === "super raro"){
            this.health = Math.floor(Math.random() * (121 - 90)) + 90
            this.damage = Math.floor(Math.random() * (61 - 30)) + 30
            this.xp = Math.floor(Math.random() * (56 - 45)) + 45
        }
    }
    
    randomDamage() {
        if(this.type == "comum"){
            return this.damage = Math.floor(Math.random() * (26 - 10)) + 10
        }else if (this.type == "raro"){
            return this.damage = Math.floor(Math.random() * (36 - 20)) + 20
        }else if (this.type == "super raro"){
            return this.damage = Math.floor(Math.random() * (61 - 30)) + 30
        }
    }
    
  }
  