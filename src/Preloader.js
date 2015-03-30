SpaceTour.Preloader = function (game) {

  this.preloadBar = null;
};

SpaceTour.Preloader.prototype = {

  preload: function () {

    this.game.stage.backgroundColor = 0x5e3f6b;
    
    this.game.add.text(285,this.world.centerY - 36,'Loading',{font : '20px Arial', fill: '#ffffff'});
    this.preloadBar = this.add.sprite(this.world.centerX,this.world.centerY,'preloadBar');
    this.preloadBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.spritesheet('ship','assets/ships.png', 55, 60);
    this.game.load.spritesheet('explosion','assets/explosion.png', 64, 64, 48);

    this.game.load.image('background','assets/starBackground.png');
    
    this.game.load.image('playButton','assets/playButton.png');
    this.game.load.image('howToButton','assets/howToButton.png');
    this.game.load.image('retryButton','assets/retryButton.png');
    this.game.load.image('howToPanel','assets/howToPanel.png');
    this.game.load.image('soundOn','assets/sound_on.png');
    this.game.load.image('soundOff','assets/sound_off.png');

    this.game.load.image('enemyBlack1','assets/enemies/enemyBlack1.png');
    this.game.load.image('enemyBlack2','assets/enemies/enemyBlack2.png');
    this.game.load.image('enemyBlack3','assets/enemies/enemyBlack3.png');
    this.game.load.image('enemyBlack4','assets/enemies/enemyBlack4.png');
    this.game.load.image('enemyBlack5','assets/enemies/enemyBlack5.png');

    this.game.load.image('enemyBlue1','assets/enemies/enemyBlue1.png');
    this.game.load.image('enemyBlue2','assets/enemies/enemyBlue2.png');
    this.game.load.image('enemyBlue3','assets/enemies/enemyBlue3.png');
    this.game.load.image('enemyBlue4','assets/enemies/enemyBlue4.png');
    this.game.load.image('enemyBlue5','assets/enemies/enemyBlue5.png');

    this.game.load.image('enemyGreen1','assets/enemies/enemyGreen1.png');
    this.game.load.image('enemyGreen2','assets/enemies/enemyGreen2.png');
    this.game.load.image('enemyGreen3','assets/enemies/enemyGreen3.png');
    this.game.load.image('enemyGreen4','assets/enemies/enemyGreen4.png');
    this.game.load.image('enemyGreen5','assets/enemies/enemyGreen5.png');

    this.game.load.image('enemyRed1','assets/enemies/enemyRed1.png');
    this.game.load.image('enemyRed2','assets/enemies/enemyRed2.png');
    this.game.load.image('enemyRed3','assets/enemies/enemyRed3.png');
    this.game.load.image('enemyRed4','assets/enemies/enemyRed4.png');
    this.game.load.image('enemyRed5','assets/enemies/enemyRed5.png');

    this.game.load.image('ufoBlue','assets/ufos/ufoBlue.png');
    this.game.load.image('ufoGreen','assets/ufos/ufoGreen.png');
    this.game.load.image('ufoRed','assets/ufos/ufoRed.png');
    this.game.load.image('ufoYellow','assets/ufos/ufoYellow.png');

    this.game.load.image('meteorBrownBig1','assets/meteors/meteorBrown_big1.png');
    this.game.load.image('meteorBrownBig2','assets/meteors/meteorBrown_big2.png');
    this.game.load.image('meteorBrownBig3','assets/meteors/meteorBrown_big3.png');
    this.game.load.image('meteorBrownBig4','assets/meteors/meteorBrown_big4.png');
    this.game.load.image('meteorGreyBig1','assets/meteors/meteorGrey_big1.png');
    this.game.load.image('meteorGreyBig2','assets/meteors/meteorGrey_big2.png');
    this.game.load.image('meteorGreyBig3','assets/meteors/meteorGrey_big3.png');
    this.game.load.image('meteorGreyBig4','assets/meteors/meteorGrey_big4.png');

    this.game.load.image('meteorBrownMed1','assets/meteors/meteorBrown_med1.png');
    this.game.load.image('meteorBrownMed2','assets/meteors/meteorBrown_med2.png');
    this.game.load.image('meteorGreyMed1','assets/meteors/meteorGrey_med1.png');
    this.game.load.image('meteorGreyMed2','assets/meteors/meteorGrey_med2.png');

    this.game.load.image('meteorBrownSmall1','assets/meteors/meteorBrown_small1.png');
    this.game.load.image('meteorBrownSmall2','assets/meteors/meteorBrown_small2.png');
    this.game.load.image('meteorGreySmall1','assets/meteors/meteorGrey_small1.png');
    this.game.load.image('meteorGreySmall2','assets/meteors/meteorGrey_small2.png');

    var fileFormat = (this.game.device.cocoonJS) ? '.json' : '.fnt'
    this.game.load.bitmapFont('transformer','assets/font/font.png','assets/font/font' + fileFormat);

    this.game.load.audio('explosionSound','assets/audio/explosion.ogg');
    this.game.load.audio('ambiance', 'assets/audio/ambiance.ogg');
  },

  create: function () {

    this.preloadBar.cropEnabled = false;
    this.state.start('Menu');
  }

};
