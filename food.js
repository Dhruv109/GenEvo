class Food{
  constructor(){
    this.pos = createVector(random(width),random(height));
  }

  show(){
    noStroke();
    fill(0,255,100);
    ellipse(this.pos.x,this.pos.y,8,8);
  }

  eat(a){
    let d = this.pos.dist(a.pos);
    return d<5;
  }

}

class Poison{
  constructor(){
    this.pos = createVector(random(width),random(height));
  }

  show(){
    noStroke();
    fill(255,0,50);
    ellipse(this.pos.x,this.pos.y,8,8);
  }

  eat(a){
    let d = this.pos.dist(a.pos);
    return d<5;
  }

}