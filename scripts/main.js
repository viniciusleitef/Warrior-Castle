import { Player } from './player.js';
import { Enemy } from './enemy.js';

const pontuação = 0;
const typeEnemys = ["comum", "raro", "super raro"]
const player = new Player("vinicius")
const mensagem = document.querySelector(".message")

let enemy
let player_lvl_display = document.querySelector("#lvl")
let player_life_display = document.querySelector("#life")
let player_xp_display = document.querySelector("#xp")
let player_cura_display = document.querySelector("#cura")
let player_esquiva_display = document.querySelector("#esquiva")
let player_damage_display = document.querySelector("#dano")
let player_fugas_display = document.querySelector("#fugas")

//Jogador clica em Start
document.querySelector(".start_button").addEventListener("click", function(){
    document.querySelector("#menu").style.display = "none"
    document.querySelector(".menu_in_game").style.display = "flex"
    document.querySelector(".personagem").style.display = "flex"
})

//Jogador clica em Explorar
document.querySelector("#botoes_perguntas_1").addEventListener("click", function(){
    hideMessage()
    deleteMessages()
    //Chance de entrar em uma sala vazia 
    const chanceToFoundEmptyRoom = Math.random()
    if(chanceToFoundEmptyRoom <= 0.4){
        document.querySelector(".menu_in_game").style.display = "none"
        document.querySelector(".menu_exploring_chest").style.display = "flex"
        writeMessage("Você recuperou 5% de vida máxima")
    }else{
        document.querySelector(".menu_in_game").style.display = "none"
        document.querySelector(".menu_exploring").style.display = "flex"
        enemy = createMonster()
    }
})

//Jogador clica em Desistir
document.querySelector("#botoes_perguntas_2").addEventListener("click", function(){
    document.querySelector(".menu_in_game").style.display = "none"
    document.querySelector(".menu_tela_final").style.display = "flex"
})

//Clica em abrir baú
document.querySelector("#botoes_abrir_bau").addEventListener("click", function(){
    const chanceToFoundPotion = Math.random() * 100
    if (chanceToFoundPotion <= 10){
        writeMessage("Você achou uma poção de cura dentro do baú!")
        player.addPotion()
        updatePlayerStatus()
    }

    player.health += (player.max_health * 0.05)
    if (player.health > player.max_health){
        player.health = player.max_health
    }
    updatePlayerStatus()
    document.querySelector(".menu_exploring_chest").style.display = "none"
    document.querySelector(".menu_in_game").style.display = "flex"
    
})

//Jogador clica em atacar
document.querySelector("#botoes_perguntas_combat_1").addEventListener("click", function(){
    combat(enemy, player)
    console.log(player)
    console.log(enemy)
})

//Jogador clica em Poção
document.querySelector("#botoes_perguntas_combat_2").addEventListener("click", function(){
    if(player.itens.pocao[1] == 0){
        alert("Você está sem poção!")
        return
    }
    player.health += player.itens.pocao[0]
    player.itens.pocao[1] --

    if (player.health > player.max_health){
        player.health = player.max_health
    }

    updatePlayerStatus()
})

//Jogador clica em fugir

document.querySelector("#botoes_perguntas_combat_3").addEventListener("click", function(){
    if(player.fugas > 0 && player.atacou == false){
        document.querySelector(".menu_exploring").style.display = "none"
        document.querySelector(".menu_in_game").style.display = "flex"
        player.fugas --
        updatePlayerStatus()

    }else{
        alert("Você não pode mais fugir")
    }

})

function writeMessage(message){
    const paragrafo = document.createElement("p")
    paragrafo.textContent = message
    mensagem.appendChild(paragrafo)

    mensagem.style.display = "block";
}

function hideMessage(){
    mensagem.style.display = "none"
}

function deleteMessages(){
    while(mensagem.firstChild){
        mensagem.removeChild(mensagem.firstChild)
    }
}

function createMonster(){
    const enemy = new Enemy(monsterTypeCancheAppear(typeEnemys))
    writeTypeMonster(enemy)
    showMonsterStatus(enemy)
    
    return enemy
}

//Escreve o tipo de monstro na tela e configura a cor do texto
function writeTypeMonster(enemy){
    const type_monster_text = document.querySelector("#type_enemy")
    type_monster_text.style.color = "black"
    if(enemy.type == "raro"){
        type_monster_text.style.color = "purple"
    }else if (enemy.type == "super raro"){
        type_monster_text.style.color = "red"
    }
    type_monster_text.innerHTML = enemy.type
}

function showMonsterStatus(enemy){
    const formatedMonsterHealth = enemy.health
    document.querySelector(".status_monstro").innerHTML = `
        <h2>Monstro</h2>
        <p>Tipo: ${enemy.type}</p>
        <p>Vida: ${formatedMonsterHealth.toFixed(1)}</p>
    `
}

function monsterTypeCancheAppear(typeenemys){
    const number = Math.random()
    console.log(number)

    if(number <= 0.75){
        return typeenemys[0]
    }else if(number > 0.75 && number <= 0.95){
        return typeenemys[1]
    }else{
        return typeenemys[2]
    }
}

function critChance(player){
    if(player.critou()){
        return player.damage * 2
    }else{
        return player.damage
    }
}

function updatePlayerStatus() {
    const formattedMaxHealth = player.max_health.toFixed(1);
    const formattedHealth = player.health.toFixed(1);
    const formattedEsquiva = player.esquiva.toFixed(1);
    const formattedDamage = player.damage.toFixed(1);

    player_life_display.innerHTML = `Vida: ${formattedHealth} / ${formattedMaxHealth}`;
    player_lvl_display.innerHTML = `Nível: ${player.lvl}`;
    player_esquiva_display.innerHTML = `Chance de Esquiva: ${formattedEsquiva}%`;
    player_damage_display.innerHTML = `Dano: ${formattedDamage}`;
    player_xp_display.innerHTML = `XP: ${player.xp} / ${player.max_xp}`;
    player_cura_display.innerHTML = `Poções de Cura: ${player.itens.pocao[1]}`;
    player_fugas_display.innerHTML = `Fugas disponíveis: ${player.fugas}`;
}


function combat(enemy, player){
    
    //Player ataca primeiro
    enemy.health -= critChance(player)
    player.atacou = true


    if(enemy.health <= 0){
        enemy.health = 0

        //Voltar para o menu de exploração
        document.querySelector(".menu_exploring").style.display = "none"
        document.querySelector(".menu_in_game").style.display = "flex"

        player.xp += enemy.xp
        //Player Upou
        if(player.xp >= player.max_xp){
            player.xp -= player.max_xp
            player.lvl += 1
            player.fugas += 1
            player.itens.pocao[1] += 1
            player.max_xp += 12
            player.max_health *= 1.10.toFixed(1)
            player.esquiva *= 1.05.toFixed(1)
            player.damage *= 1.10.toFixed(1)
            player.health = player.max_health

            updatePlayerStatus()
        }
        player.atacou = false
        updatePlayerStatus()

        return 0
    }

    //Monstro ataca depois

    if (player.esquivou() == false){
        player.health -= enemy.randomDamage()
    }else{
        alert("Você esquivou e não sofreu nenhum dano!")
    }

    if(player.health < 0){
        player.health = 0
        //Ir para tela final
        
        document.querySelector(".menu_tela_final h1").innerHTML = "Você morreu!" //Alterar texto final
        
        document.querySelector(".menu_exploring").style.display = "none"
        document.querySelector(".menu_tela_final").style.display = "flex"

    }
    
    //Atualizar vida do jogador no display dos status do jogador
    updatePlayerStatus()

   showMonsterStatus(enemy)
}

