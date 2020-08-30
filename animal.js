class Animal{
  constructor(x,y,v,r,f,p){
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.accl = createVector();

    if(r){
      this.foodSensingRadius = r;
    }
    else this.foodSensingRadius = random(30);

    this.poisonSensingRadius = p ? p : random(30);
    if(v){
      this.maxVel = v;
    }
    else{
      this.maxVel = random(5);
    }
    this.maxForce = f ? f : random(1);
    this.health = 100;
  }

  steer(target,isFood){
    let desireVel = p5.Vector.sub(target,this.pos);
    desireVel.setMag(this.maxVel);
    let steer = p5.Vector.sub(desireVel,this.vel);
    steer.limit(this.maxForce);
    steer.mult(isFood);
    this.applyForce(steer);
  }
  applyForce(force){
    force.setMag(this.maxForce);
    this.accl.add(force);
  }
  update(){

    this.health-=(0.05*this.maxVel*this.maxVel + 0.001*(this.foodSensingRadius+this.poisonSensingRadius) + 0.5 + 0.1*this.maxForce + 0.01);

    this.health = constrain(this.health,0,200); 
    this.vel.add(this.accl);
    this.pos.add(this.vel);

    this.pos.x = constrain(this.pos.x,0,width);
    this.pos.y = constrain(this.pos.y,0,height);

    this.accl.mult(0);
  }
  show(){
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading());
    let t = map(this.maxForce,0,3,0,255);
    fill(t,0,255-t);
    triangle(8,0,-8,-8,-8,8);
    if(checkbox.checked()){
      noFill();
      stroke(100,255,20);
      ellipse(0,0,this.foodSensingRadius*2);
      stroke(255,0,100);
      ellipse(0,0,this.poisonSensingRadius*2);
    }
    pop();
  }

  nearestFood(f){
    let nearest = Infinity;
    let index = -1; 
    for(let i=0;i<f.length;i++){
      let d = f[i].pos.dist(this.pos);
      if(d<nearest) {
        nearest = d;
        index = i;
      }
    }

    if(nearest<this.foodSensingRadius){ 
         if(index!=-1) this.steer(f[index].pos,1);
     }
    else{
      this.applyForce(p5.Vector.random2D());
    }
    
  }

  nearestPoison(f){
    let nearest = Infinity;
    let index = -1; 
    for(let i=0;i<f.length;i++){
      let d = f[i].pos.dist(this.pos);
      if(d<nearest) {
        nearest = d;
        index = i;
      }
    }

    if(nearest<this.poisonSensingRadius){ 
         if(index!=-1) this.steer(f[index].pos,-1);
     }
    else{
      this.applyForce(p5.Vector.random2D());
    }
    
  }

  mutate(){
    let t = random(1);
    t = map(t,0,1,-2,2);
    this.maxVel+=t;
    this.maxVel = constrain(this.maxVel,0.1,Infinity);

    let r = random(1);
    r = map(r,0,1,-10,10);
    this.foodSensingRadius += r; 
    this.foodSensingRadius = constrain(this.foodSensingRadius,0,1000);

    r = random(1);
    r = map(r,0,1,-5,5);
    this.poisonSensingRadius += r; 
    this.poisonSensingRadius = constrain(this.poisonSensingRadius,0,1000);

    r = random(1);
    r = map(r,0,1,-0.5,0.5);
    this.maxForce+=r;
    this.maxForce = constrain(this.maxForce,0,5);
  }

}