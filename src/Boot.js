SpaceTour = {
    lastScore: 0,
    bestScore: 0,
    sound: true,
    game_over: false
};

SpaceTour.Boot = function(game) {};

SpaceTour.Boot.prototype = {

    init: function() {

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.setScreenSize(true);
    },

    preload: function() {

        this.load.image('preloadBar', 'assets/preload_bar.png');
    },

    create: function() {

        this.state.start('Preloader');
    },

};