var mainmenu = function(game) {
		var title;
		var space;
};

mainmenu.prototype = {
		create: function() {
				title = this.add.sprite(0, 0, 'title');
				space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
				space.onDown.add(this.play, this);
		},
		play: function() {
				loader = this.add.sprite(0, 0, 'loader');
				this.time.events.add(100, this.starter, this);
		},
		starter: function() {
				this.state.start('Game');
		}
}
