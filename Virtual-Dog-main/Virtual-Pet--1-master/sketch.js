var dog, happyDog, database, foodS, foodStock;
var fedTime, lastFed;

function preload()
{
  this.image = loadImage("dogImg.png");
  this.image = loadImage("happyDog.png");
}

function setup() {
	createCanvas(500, 500);

  dog = createSprite(250,250,10,10);
  this.dog = loadImage("dogImg.png");

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  FOOD = new food(810, 220);

  feed=createButton("Feed the button");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}

function feedDog(){
    dog.addImage(dogImg);

    food.Obj.updateFoodStock(foodObj.getFoodStoock()-1);
    database.ref('/').update({
      food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function draw() {  
background(46,139,87)

  drawSprites();
  noStroke();
  display();
  textSize(35)
  fill("white")

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){lastFed=data.val();
  });

}



function readStock(data){
  foodS-data.val();
}

function writeStock(x){
  if(x<-0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
