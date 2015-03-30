SpaceTour.Game = function (game) {

  this.ACCELERATION = 200; // pixels/second/second
  this.MAX_SPEED = 300; // pixels/second
  this.DRAG = 20; // pixels/second
  this.GRAVITY = 60; // pixels/second/second

  this.ENEMIES = ['meteorBrownSmall1','meteorBrownSmall2','meteorGreySmall1','meteorGreySmall2',
                  'meteorBrownMed1','meteorBrownMed2','meteorGreyMed1','meteorGreyMed2',
                  'meteorBrownBig1','meteorBrownBig2','meteorBrownBig3','meteorBrownBig4',
                  'meteorGreyBig1','meteorGreyBig2','meteorGreyBig3','meteorGreyBig4',
                  'ufoBlue','ufoGreen','ufoRed','ufoYellow',
                  'enemyBlack1','enemyBlack2','enemyBlack3','enemyBlack4','enemyBlack5',
                  'enemyBlue1','enemyBlue2','enemyBlue3','enemyBlue4','enemyBlue5',
                  'enemyGreen1','enemyGreen2','enemyGreen3','enemyGreen4','enemyGreen5',
                  'enemyRed1','enemyRed2','enemyRed3','enemyRed4','enemyRed5'];

  this.background;
  this.music;
  this.ship;
  this.meteorSmalls;
  this.meteorBigs;
  this.meteorMeds;
  this.enemyShips;
  this.enemyUFOs;
  this.explosion;
  this.explosionSound;
  this.scoreTimer;
  this.scoreText;
  this.timerMeteorSmall;
  this.timerMeteorMed;
  this.timerMeteorBig;
  this.timerEnemyShip;
  this.timerEnemyUFO;

  this.enemyDead;
  this.score;

};

SpaceTour.Game.prototype = {

  create: function () {

    SpaceTour.game_over = false;
    this.enemyDead = 1;
    this.score = 0;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.checkCollision.up = false;
    this.game.physics.arcade.checkCollision.down = false;
    this.game.physics.arcade.gravity.y = this.GRAVITY;

    this.background = this.add.tileSprite(0, 0, 640, 960, 'background');
    this.background.autoScroll(0, -100);

    if(SpaceTour.sound == true)
    {
      this.music = this.game.add.audio('ambiance',0.75,true);
      this.music.play();
    }

    // Add the ship to the stage
    this.ship = this.game.add.sprite(this.world.centerX, 3 * this.world.height / 4, 'ship');
    this.ship.anchor.setTo(0.5, 0.5);
    this.ship.angle = -90;
    this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
    this.ship.body.setSize(43,48,6,6);
    this.ship.body.collideWorldBounds = true;
    this.ship.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED);
    this.ship.body.drag.setTo(this.DRAG, this.DRAG);
    this.ship.body.bounce.setTo(0.5, 0.5);
    this.ship.checkWorldBounds = true;

    this.scoreText = this.game.add.bitmapText(10, 10,'transformer','0',50);

    this.enemyShips = this.game.add.group();
    this.enemyShips.enableBody = true;
    this.enemyShips.physicsBodyType = Phaser.Physics.ARCADE;

    this.enemyUFOs = this.game.add.group();
    this.enemyUFOs.enableBody = true;
    this.enemyUFOs.physicsBodyType = Phaser.Physics.ARCADE;

    this.meteorSmalls = this.game.add.group();
    this.meteorSmalls.enableBody = true;
    this.meteorSmalls.physicsBodyType = Phaser.Physics.ARCADE;

    this.meteorMeds = this.game.add.group();
    this.meteorMeds.enableBody = true;
    this.meteorMeds.physicsBodyType = Phaser.Physics.ARCADE;

    this.meteorBigs = this.game.add.group();
    this.meteorBigs.enableBody = true;
    this.meteorBigs.physicsBodyType = Phaser.Physics.ARCADE;

    this.timerMeteorSmall = this.time.events.loop(2000, this.addEnemy, this, 'meteorSmall');
    this.timerMeteorMed = this.time.events.loop(3000, this.addEnemy, this, 'meteorMed');
    this.timerMeteorBig = this.time.events.loop(8000, this.addEnemy, this, 'meteorBig');
    this.timerEnemyShip = this.time.events.loop(6000, this.addEnemy, this, 'enemyShip');
    this.timerEnemyUFO = this.time.events.loop(5000, this.addEnemy, this, 'enemyUFO');

    this.addEnemy('meteorSmall');
    this.addEnemy('meteorMed');
    this.addEnemy('enemyShip');

    this.scoreTimer = this.time.create(false);
    this.scoreTimer.add(Phaser.Timer.SECOND * 10, this.updateEnemyTimers, this);
    this.scoreTimer.start();

  },

  update: function () {

    if(SpaceTour.game_over == true)
      return;

    if(this.ship.inWorld == false)
    {
      this.game_over();
      return;
    }

    if (this.input.activePointer.isDown) 
    {
      var targetAngle = this.game.math.angleBetween(
        this.ship.x, this.ship.y,
        this.game.input.activePointer.x, this.game.input.activePointer.y
      );
      if (this.nearestAngleBetween(targetAngle, this.ship.rotation) > 0.1) {
        this.ship.angle -= 5;
      }
      else if (this.nearestAngleBetween(targetAngle, this.ship.rotation) < 0.1) {
        this.ship.angle += 5;
      }

      this.ship.body.acceleration.x = Math.cos(this.ship.rotation) * this.ACCELERATION;
      this.ship.body.acceleration.y = Math.sin(this.ship.rotation) * this.ACCELERATION;

      this.ship.frame = 1;

      if(this.ship.angle < 0)
        this.ACCELERATION += 1;
    }
    else 
    {
      this.ACCELERATION = 200;
      this.ship.body.acceleration.setTo(0, 0);
      this.ship.frame = 0;
    }

    //update score
    this.score = this.enemyDead * Math.floor(this.scoreTimer.ms / 1000);
    this.scoreText.text = this.score;

    //update gravity
    if(this.GRAVITY + Math.floor(this.score / 100) > this.game.physics.arcade.gravity.y)
      this.game.physics.arcade.gravity.y = this.GRAVITY + Math.floor(this.score / 500);

    //animate enemies
    this.enemyShips.forEachAlive(function (enemy) {
      enemy.angle -= 1;
      enemy.body.acceleration.x = Math.cos(enemy.rotation) * 50;
    });

    this.enemyUFOs.forEachAlive(function (enemy) {
      enemy.angle += 1;
    });

    this.physics.arcade.collide(this.ship, this.meteorSmalls, this.onCollision, null, this);
    this.physics.arcade.collide(this.ship, this.meteorMeds, this.onCollision, null, this);
    this.physics.arcade.collide(this.ship, this.meteorBigs, this.onCollision, null, this);
    this.physics.arcade.collide(this.ship, this.enemyShips, this.onCollision, null, this);
    this.physics.arcade.collide(this.ship, this.enemyUFOs, this.onCollision, null, this);
  },

  addEnemy : function(type){

    var enemy;
    var enemyGroup;
    switch(type)
    {
      case 'meteorSmall':
        enemyGroup = this.meteorSmalls;
        break;

      case 'meteorMed':
        enemyGroup = this.meteorMeds;
        break;

      case 'meteorBig':
        enemyGroup = this.meteorBigs;
        break;

      case 'enemyShip':
        enemyGroup = this.enemyShips;
        break;

      case 'enemyUFO':
        enemyGroup = this.enemyUFOs;
        break;
    }
    enemy = enemyGroup.getFirstDead();
    if(enemy == null)
    {
      enemy = enemyGroup.create(20 + Math.random() * 600, -50, this.getEnemyKey(type));
      enemy.body.drag.setTo(this.DRAG, this.DRAG);
      enemy.anchor.setTo(0.5, 0.5);
      enemy.events.onOutOfBounds.add(this.enemyDeath, this);
      enemy.checkWorldBounds = true;
    }
    else
    {
      enemy.loadTexture(this.getEnemyKey(type),0);
      enemy.reset(20 + Math.random() * 600,-50);
    }
  },

  enemyDeath: function(enemy){
    if(enemy.y < 0)
      return;

    enemy.kill();
    this.enemyDead++;
  },

  getEnemyKey: function(type){
    var i;
    var key;
    switch(type)
    {                
      case 'meteorSmall':
        i = Math.floor(Math.random() * 4);
        key = this.ENEMIES[i];
        break;

      case 'meteorMed':
        i = Math.floor(Math.random() * 4);
        i += 4;
        key = this.ENEMIES[i];
        break;

      case 'meteorBig':
        i = Math.floor(Math.random() * 8);
        i += 8;
        key = this.ENEMIES[i];
        break;

      case 'enemyUFO':
        i = Math.floor(Math.random() * 4);
        i += 16;
        key = this.ENEMIES[i];
        break;

      case 'enemyShip':
        i = Math.floor(Math.random() * 16);
        i += 20;
        key = this.ENEMIES[i];
        break;
    }
    return key;
  },

  updateEnemyTimers: function()
  {
    var i = Math.floor(Math.random() * 5) + 1;
    switch(i)
    {
      case 1:
        if(this.timerMeteorSmall.delay > 500)
          this.timerMeteorSmall.delay -= 250;
        break;
      case 2:
        if(this.timerMeteorMed.delay > 500)
          this.timerMeteorMed.delay -= 250;
        break;
      case 3:
        if(this.timerMeteorBig.delay > 500)
          this.timerMeteorBig.delay -= 250;
        break;
      case 4:
        if(this.timerEnemyShip.delay > 500)
          this.timerEnemyShip.delay -= 250;
        break;
      case 5:
        if(this.timerEnemyUFO.delay > 500)
          this.timerEnemyUFO.delay -= 250;
        break;
    }
    this.scoreTimer.add(Phaser.Timer.SECOND * 5, this.updateEnemyTimers, this);
  },

  onCollision: function()
  {
    SpaceTour.game_over = true;
    this.ship.visible = false;

    this.explosion = this.game.add.sprite(this.ship.x,this.ship.y,'explosion');
    this.explosion.anchor.setTo(0.5, 0.5);
    this.explosion.animations.add('explosion');
    this.explosion.events.onAnimationComplete.add(this.game_over,this);
    this.explosion.animations.play('explosion',40,false,true);

    if(SpaceTour.sound == true)
    {
      this.explosionSound = this.game.add.audio('explosionSound');
      this.explosionSound.play();
    }
  },

  game_over : function(){

    this.time.events.remove(this.timerEnemyShip);
    this.time.events.remove(this.timerEnemyUFO);
    this.time.events.remove(this.timerMeteorBig);
    this.time.events.remove(this.timerMeteorMed);
    this.time.events.remove(this.timerMeteorSmall);      

    SpaceTour.lastScore = this.score;
    if(SpaceTour.lastScore > SpaceTour.bestScore)
    {
      SpaceTour.bestScore = SpaceTour.lastScore;
      var gameSave = {};
      gameSave.score = SpaceTour.bestScore;
      localStorage.setItem('score', JSON.stringify(gameSave));
    }

    this.state.start('Menu');
  },

  nearestAngleBetween: function (a1, a2) {

    var rd = Math.PI;

    if (a1 < -rd / 2 && a2 > rd / 2) {
      a1 += rd * 2;
    }

    if (a2 < -rd / 2 && a1 > rd / 2) {
      a2 += rd * 2;
    }

    return a2 - a1;
  }

};
