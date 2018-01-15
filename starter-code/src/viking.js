// Soldier
function Soldier(health, strength) {
    this.health = health;   
    this.strength = strength;
    this.attack = function (){
      return this.strength;
    }
    this.receiveDamage = function (damage) {
            this.health  = this.health - damage;
    }
}


// Viking

function Viking(name,health, strength) {
    Soldier.call(this, health, strength);
    this.name = name;
    this.receiveDamage = function (damage){
        this.health = this.health - damage;
        if (this.health > 0){
            return this.name + " has received " + damage + " points of damage";
        }   
        else {
            return this.name +" has died in act of combat";}
        
        }
        this.battleCry = function (){
        return "Odin Owns You All!"
        }
    }
Viking.prototype = Object.create(Soldier.prototype);


// Saxon
function Saxon(health, strength) {
   Soldier.call(this, health, strength);
   this.receiveDamage = function (damage){
       this.health = this.health - damage;
   if (this.health > 0) {
     return "A Saxon has received " + damage + " points of damage";
        }
        else {
        return "A Saxon has died in combat";
        }
    }
   
}

Saxon.prototype = Object.create(Soldier.prototype);

// War

function War() {
    this.vikingArmy = [];
    this.saxonArmy = [];  
    this.addViking = function(Viking) {
        this.vikingArmy.push(Viking);
    }
    this.addSaxon = function (Saxon){
        this.saxonArmy.push(Saxon); 
    }
    this.vikingAttack = function(){
        var randomSaxon = Math.floor(Math.random() * ((this.saxonArmy.length- 1) - 0) + 0); /* 0 = al numero minimo que puede recibir el array */
        var randomViking = Math.floor(Math.random() * ((this.vikingArmy.length-1) - 0) + 0);
        var saxonNewLife = this.saxonArmy[randomSaxon].receiveDamage(this.vikingArmy[randomViking].attack());
        for (i = 0; i < this.saxonArmy.length; i++) {
            if (this.saxonArmy[i].health < 1) {
                this.saxonArmy.splice(i, 1);
            }
        }
     return saxonNewLife;

    }
    this.saxonAttack = function (){
         var randomSaxon = Math.floor(Math.random() * (this.saxonArmy.length - 1 - 0) + 0);
         var randomViking = Math.floor(Math.random() * (this.vikingArmy.length - 1 - 0) + 0);
        var vikingNewLife = this.vikingArmy[randomViking].receiveDamage(this.saxonArmy[randomSaxon].attack()); 
        for (i = 0; i < this.vikingArmy.length; i++) {
             if (this.vikingArmy[i].health < 1) {
                this.vikingArmy.splice(i, 1);
            }
        }
    return vikingNewLife;
    }
this.showStatus = function() {
    if (this.saxonArmy.length == 0){
     return "Vikings have won the war of the century!";   
    }
    else if (this.vikingArmy.length == 0){
        return "Saxons have fought for their lives and survive another day...";
    }
    else {
        return "Vikings and Saxons are still in the thick of battle.";
    }

}
}
for ( i = 0; i < 20; i++) {
    war.addViking(new Viking('vikingo'+i,150,30));
    war.addSaxon(new Saxon(150,30));

}
for ( k = 0; k < 30; k++) {
    war.vikingAttack() ;
    war.saxonAttack();
    war.showStatus();
}
