//Create variables here
var dog_sprite, dog, happyDog, DB, foodS;
var foodObj;
var foodStock;
var h, r, c;
var pet_name_input, pet_name_btn, instruct;
var Name, dog_new_pos_x, dog_new_pos_y;
var pet_name = "";
var gameState= "";
var gameState_reader;
var bedroom_img, garden_img, washroom_img;
var last_fed_text;
var DB_pet_name;
var add_food, feed_food;
var fedTime;
var lastFed = 0;

const database = firebase.database();
const FoodStock = database.ref('Virtual_Pet_3/Food_Stock');
const LastFed = database.ref('Virtual_Pet_3/Feed_Time');
const Pro_36 = database.ref('Virtual_Pet_3')

function preload() {
  //load images here
  bedroom_img = loadImage("./Images/Bed Room.png")
  garden_img = loadImage("./Images/Garden.png")
  washroom_img = loadImage("./Images/Wash Room.png")
  dog = loadImage("./images/dogImg.png")
  happyDog = loadImage("./images/dogImg1.png")
}

function setup() {
  var canvas = createCanvas(900, 500);
  last_fed_text = createElement("h1")
  last_fed_text.hide();
  Name = createElement("h1")
  instruct = createElement("h4")
  instruct.html("Enter Pet Name")
  instruct.position(1100, 285)
  pet_name_btn = createButton("Add Name")
  pet_name_btn.position(1117, 355)
  pet_name_input = createInput()
  pet_name_input.position(1070, 325)
  add_food = createButton("Add Food");
  add_food.position(displayWidth / 3 + 50, 55);
  feed_food = createButton("Feed Pet");
  feed_food.position(displayWidth / 3 + 150, 55)
  dog_sprite = createSprite(650, 250, 50, 50);
  dog_sprite.addImage("normal_dog", dog);
  dog_sprite.addImage("Happy_dog", happyDog);
  dog_sprite.visible = true;
  dog_sprite.scale = 0.3;
  foodObj = new Food();
  Pro_36.child('Name').on('value', (name)=>{
    DB_pet_name = name.val();
  })
}


function draw() {
  background(46, 139, 87);
  foodObj.getFoodStock();
  feed_food.mousePressed(foodObj.deductFoodStock);
  add_food.mousePressed(foodObj.addFood);

  Pro_36.child('gameState').once('value', async (value)=>{
    gameState_reader = await value.val();

    if(gameState_reader != "hungry"){
      add_food.hide()
      feed_food.hide()
      dog_sprite.visible = false;
    }
  
    currentTime = hour();
    if(lastFed == currentTime){
      foodObj.bedroom();
      update_State("bedroom"); 
      Name.hide()
      if(lastFed !=0 && lastFed != 12){
        last_fed_text.html("Last Fed: "+ lastFed % 12 +" PM")
        last_fed_text.position(500,75)
        last_fed_text.show();
        }
        else if(lastFed == 0){
        last_fed_text.html("Last Fed: 12 midnight")
        last_fed_text.position(500,75)
        last_fed_text.show();
        }
        else if(lastFed == 12){
          last_fed_text.html("Last Fed: 12 noon")
          last_fed_text.position(500,75)
          last_fed_text.show();
        }
    }
    if(currentTime == lastFed + 1){
      update_State("playing"); 
      foodObj.garden();
      Name.hide()
      if(lastFed !=0 && lastFed != 12){
        last_fed_text.html("Last Fed: "+ lastFed % 12 +" PM")
        last_fed_text.position(500,75)
        last_fed_text.show();
        }
        else if(lastFed == 0){
        last_fed_text.html("Last Fed: 12 midnight")
        last_fed_text.position(500,75)
        last_fed_text.show();
        }
        else if(lastFed == 12){
          last_fed_text.html("Last Fed: 12 noon")
          last_fed_text.position(500,75)
          last_fed_text.show();
        }
    }
    if(currentTime <= lastFed + 4  && currentTime >= lastFed + 2){
      update_State("bathing");
      Name.hide()
      foodObj.washroom();
      if(lastFed !=0 && lastFed != 12){
      last_fed_text.html("Last Fed: "+ lastFed % 12 +" PM")
      last_fed_text.position(500,75)
      last_fed_text.show();
      }
      else if(lastFed == 0){
      last_fed_text.html("Last Fed: 12 midnight")
      last_fed_text.position(500,75)
      last_fed_text.show();
      }
      else if(lastFed == 12){
        last_fed_text.html("Last Fed: 12 noon")
        last_fed_text.position(500,75)
        last_fed_text.show();
      }
    }
    if(currentTime > lastFed + 4){
      gameState_reader = "hungry"
      update_State("hungry")
      add_food.show()
      feed_food.show()
      dog_sprite.visible = true;
      foodObj.display();
    }
  })


  drawSprites();
  fill(rgb(128, 0, 0));
  textSize(20);
  text("Instructions:", 510, 400)
  text("Instructions:", 510, 400)
  text("Instructions:", 510, 400)
  textSize(15)
  fill("blue");
  text("* Enter pet name", 520, 420)
  text("* Click \"Add Food\" button to add milk", 520, 440)
  text("* Click \"Feed Pet\" button to feed " + pet_name, 520, 460)
  foodObj.getLastFed();
  fill(255, 255, 255);
  textSize(48);
  if (lastFed >= 12) {
    text("Last Fed : " + lastFed % 12 + " PM", 275, 75);
  }
  else if (lastFed === 0) {
    text("Last Fed : 12 AM", 275, 75)
  }
  else if (lastFed < 12) {
    text("Last Fed : " + lastFed + " AM", 275, 75)
  }
  if(DB_pet_name!==null || DB_pet_name !== undefined){
    instruct.hide()
    pet_name_input.hide()
    pet_name_btn.hide()
    Name.html(DB_pet_name)
    Name.position(965, 385)
  }
  if(DB_pet_name==null || DB_pet_name == undefined){
    instruct.show()
    pet_name_input.show()
    pet_name_btn.show()
  pet_name_btn.mousePressed(() => {
    pet_name = pet_name_input.value();
    Name.html(pet_name)
    Name.position(965, 385)
    Pro_36.update({
      Name:pet_name
    })
  })
}
}


function update_State(state){
    Pro_36.update({
      gameState : state
    })
}