var preloader = function(game){};

preloader.prototype = {
		preload: function() {
				//images
				var loading = this.add.sprite(0, 0, 'loading');
				var loadbar = this.add.sprite(0, 440, 'loadbar');
				this.load.setPreloadSprite(loadbar);
				this.load.image('title', 'assets/title.png');
				this.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
				this.load.image('snowTiles', 'assets/snowTiles.png');
				this.load.image('UI', 'assets/UI.png');
				this.load.image('loader', 'assets/loader.png');
				//sprites
				this.load.spritesheet('player', 'assets/player.png', 57, 64);
				//audio
				this.load.audio('explosion', 'assets/explosion.mp3');
				this.load.audio('music', 'assets/music.mp3');
		},
		create: function() {
				this.state.start('MainMenu');
		}
}
