var dog,happyDog,database,foodS,foodStock;
var dogImg,happyDogImg;
var feedPet,addFood,fedTime,lastFed,foodObj

function preload()
{
  //load images here
  dogImg=loadImage("dogImg.png");
  happyDogImg=loadImage("dogImg1.png");

}

function setup() {
	createCanvas(1000, 500);
  
  database=firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


  dog=createSprite(800,190);
  dog.addImage(dogImg);
  dog.scale=0.15;



  feed=createButton("feed the dog pls")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("add the food")
  addFood.position(900,95)
  addFood.mousePressed(addFoods)

  foodObj=new Food()
}

function draw() {  

background(46,139,87);
foodObj.display()



fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed=data.val()
})

  drawSprites();
  //add styles here

  textSize(15);

  fill("white");

  stroke("black");

 
 if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
 }else if(lastFed==0){
   text("Last Feed : 12 AM",350,30);
 }else{
   text("Last Feed : "+ lastFed + " AM", 350,30);
 }
  text(foodS+"  food left for the doggo",150,450)
}


function feedDog(){
  dog.addImage(happyDogImg)

  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}


function addFoodss(){
  addFood=createButton("add the food")
  addFood.mousePressed(addFoods)
}


function readStock(data){
  foodS=data.val();

  foodObj.updateFoodStock(foodS);
}