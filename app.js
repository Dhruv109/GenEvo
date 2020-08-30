let food = [];
let animals = [];
let poison = [];

let foodSize = 50;
let poisonSize = 20;
let popSize = 100;

let healthBoost = 100;
let poisonRate = 20;
let canvas;
let x = 0 ;

let checkbox;
function setup(){
  let canvas = createCanvas(400,400);
  canvas.parent('canvas');
  checkbox = createCheckbox('Properties',false);
  checkbox.id('props');
  for(let i = 0; i<foodSize;++i){
    food.push(new Food());
  }
  for(let i = 0; i<poisonSize;++i){
    poison.push(new Poison());
  }

  for(let i=0;i<popSize;i++){
    animals.push(new Animal(random(width),random(height)));
  }
 }

function draw(){
  background(255);
  for(let f of food){
    f.show();
  }
  for(let p of poison){
    p.show();
  }


  
  for(let a of animals){
    a.show();
    if(food.length>0) a.nearestFood(food);
    if(poison.length>0) a.nearestPoison(poison);
    a.update();
  }

  for(let a of animals){
    for(let i=food.length-1;i>=0;i--){ 
      if(food[i].eat(a)){
        a.health+=healthBoost;
        food.splice(i,1);
      }
    }
    for(let i=poison.length-1;i>=0;i--){
      if(poison[i].eat(a)){
        a.health-=poisonRate;
        poison.splice(i,1);
      }
    }
  }

  for(let i = animals.length-1;i>=0;i--){
    let t = random(1);
    //console.log(t);
    //reproduce
    if(t<0.005){
      animals.push(new Animal(animals[i].pos.x,animals[i].pos.y,animals[i].maxVel,animals[i].foodSensingRadius,animals[i].maxForce,animals[i].poisonSensingRadius));
      if(random(1)<0.1) animals[animals.length-1].mutate();
    // console.log( animals[animals.length-1].maxVel);
    }

    if(animals[i].health<=0){
      animals.splice(i,1);  
     }

  }

 if(random(1)<0.1) food.push(new Food());
 if(random(1)<0.01) poison.push(new Poison());
  

  if(x>width) x = 0;
  
}