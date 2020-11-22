class Food {
  constructor() {
    this.lastFed;
    this.image = loadImage("./images/Milk.png")
  }

  getFoodStock() {
    FoodStock.on('value', (value) => {
      foodStock = value.val();
    })
  }

  getLastFed() {
    LastFed.on('value', (value) => {
      lastFed = value.val();
    })
  }

  addFood() {
    if (DB_pet_name == null) {
      window.alert("Enter pet name first")
    }
    else {
      if (foodStock < 30) {
        foodStock = foodStock + 1;
        Pro_36.update({
          Food_Stock: foodStock
        })
      }
      else {
        window.alert("Cannot Add food more than 30")
      }
    }
  }

  deductFoodStock() {
    if (DB_pet_name == null) {
      window.alert("Enter pet name first")
    }
    else {
      if (foodStock != 0) {
        if ((foodStock / 10) % 1 != 0) {
          for (let i = 1; i <= foodStock / 10 + 1; i++) {
            if (foodStock / 10 <= i) {
              r = i;
              c = foodStock % 10;
              if (c != 0) {
                dog_new_pos_x = 80 + (c * 45)
              }
              else {
                dog_new_pos_x = 530
              }
              dog_new_pos_y = r * 100 + 100;
              dog_sprite.x = dog_new_pos_x;
              dog_sprite.y = dog_new_pos_y;
              setTimeout(function () {
                dog_sprite.x = 650;
                dog_sprite.y = 250;
              }, 2000);
              if (foodStock == 0) {
                dog_sprite.x = 650;
                dog_sprite.y = 250;
              }
            }
          }
        }
        else {
          r = foodStock / 10;
          dog_new_pos_y = r * 100 + 100;
          dog_new_pos_x = 530
          dog_sprite.x = dog_new_pos_x;
          dog_sprite.y = dog_new_pos_y;
          setTimeout(function () {
            dog_sprite.x = 650;
            dog_sprite.y = 250;
          }, 2000)
        }
        h = hour();
        lastFed = h;
        foodStock = foodStock - 1;
        Pro_36.update({
          Food_Stock: foodStock
        })
        Pro_36.update({
          Feed_Time: h
        })
        dog_sprite.changeImage("Happy_dog");
        setTimeout(function () {
          dog_sprite.changeImage("normal_dog");
        }, 2000)
      }
      else {
        window.alert("Food is over, click add food to add")
      }
    }
  }

  display() {
    var x = 80;
    var y = 100;

    imageMode(CENTER);

    if (foodStock != 0) {
      for (var i = 0; i < foodStock; i++) {
        if (i % 10 === 0) {
          x = 80;
          y = y + 100;
        }
        image(this.image, x, y, 75, 75);
        x = x + 45;
      }
    }
  }

  bedroom() {
    instruct.hide()
    pet_name_btn.hide()
    pet_name_input.hide()
    canvas = createCanvas(493, 801)
    imageMode(CORNER)
    image(bedroom_img, 0, 0, 493, 801)
  }

  garden() {
    instruct.hide()
    pet_name_btn.hide()
    pet_name_input.hide()
    canvas = createCanvas(493, 801)
    imageMode(CORNER)
    image(garden_img, 0, 0, 493, 801)
  }

  washroom() {
    instruct.hide()
    pet_name_btn.hide()
    pet_name_input.hide()
    canvas = createCanvas(493, 801)
    imageMode(CORNER)
    image(washroom_img, 0, 0, 493, 801)
  }
}