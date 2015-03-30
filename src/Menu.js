SpaceTour.Menu = function (game) {

  this.volumeBtn;
  this.music;
};

SpaceTour.Menu.prototype = {

  create: function () {

    this.background = this.add.tileSprite(0, 0, 640, 960, 'background');
    this.background.autoScroll(0, -100);

    var gameSave = JSON.parse(localStorage.getItem('score'));
    if(gameSave)
      SpaceTour.bestScore = gameSave.score;

    this.titleText = this.game.add.bitmapText(100, 200,'transformer','Space Tour',80);
    this.titleText.align = 'center';
    this.titleText.x = this.game.width / 2 - this.titleText.textWidth / 2;

    if(SpaceTour.lastScore > 0)
    {
      if(SpaceTour.lastScore == SpaceTour.bestScore)
      {
        this.bestText = this.game.add.bitmapText(100,375,'transformer','New Best Score', 50);
        this.bestText.align = 'center';
        this.bestText.x = this.game.width / 2 - this.bestText.textWidth / 2;
        
        this.scoreText = this.game.add.bitmapText(100,450,'transformer',SpaceTour.bestScore + '', 75);
        this.scoreText.align = 'center';
        this.scoreText.x = this.game.width / 2 - this.scoreText.textWidth / 2;
      }
      else
      {
        this.bestText = this.game.add.bitmapText(100,375,'transformer','Best Score : ' + SpaceTour.bestScore, 50);
        this.bestText.align = 'center';
        this.bestText.x = this.game.width / 2 - this.bestText.textWidth / 2;
        
        this.lastText = this.game.add.bitmapText(100,450,'transformer','Last Score : ' + SpaceTour.lastScore, 50);
        this.lastText.align = 'center';
        this.lastText.x = this.game.width / 2 - this.lastText.textWidth / 2;
      }
      this.howToButton = this.game.add.button(this.world.centerX, 600, 'retryButton',this.startGame,this);
      this.howToButton.anchor.setTo(0.5,0.5);
    }
    else
    {
      this.playButton = this.game.add.button(this.world.centerX, 450, 'playButton',this.startGame,this);
      this.playButton.anchor.setTo(0.5,0.5);
      
      this.howToButton = this.game.add.button(this.world.centerX, 550, 'howToButton',this.showHowTo,this);
      this.howToButton.anchor.setTo(0.5,0.5);
    }
  },

  showHowTo: function() {
    
      this.howToPanel = this.game.add.sprite(this.world.centerX, this.world.centerY, 'howToPanel');
      this.howToPanel.anchor.setTo(0.5,0.5);
      this.game.input.onTap.add(function(){
        this.howToPanel.destroy();
      },this);
  },

  startGame: function () {

    this.state.start('Game');
  }

};
