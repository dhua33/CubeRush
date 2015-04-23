var main = function(game) {};

main.prototype = {
		create: function() {
				// set world
				this.map = this.game.add.tilemap('map');
				this.map.addTilesetImage('snowTiles', 'snowTiles');
				this.physics.startSystem(Phaser.Physics.ARCADE);
				
				// layers
				this.bg = this.map.createLayer('BG');
				this.walls = this.map.createLayer('Walls');
				this.death = this.map.createLayer('Death');
				this.walls.resizeWorld();
				this.map.setCollisionBetween(1, 5000, true, 'Walls');
				this.map.setCollisionBetween(1, 5000, true, 'Death');
				
				// player sprites and properties
				this.cp = 20;
				this.p = this.add.sprite(this.cp, 450, 'player');
				this.p.anchor.setTo(0.5, 1);
				this.p.width *= 0.4;
				this.p.height *= 0.3;
				this.physics.arcade.enable(this.p);
				this.p.body.setSize(this.p.body.width*0.4, this.p.body.height*0.3);
				this.p.body.collideWorldBounds = true;
				// parameters
				this.p.body.gravity.y = 800;
				this.jumpBool = false;
				this.camera.follow(this.p);
				this.small = false;
				this.jump = -230;
				this.jumpval = 250;
				this.speed = 400;
				
				// UI
				this.UI = this.add.sprite(0, 500, 'UI');
				this.UI.visible = false;
				this.style = {font: "24px Verdana", fill: "#C0C0C0", align: "left" };
				this.UI.text = this.add.text(100, 520, "", this.style);
				this.UI.fixedToCamera = true;
				this.UI.text.fixedToCamera = true;
				
				// audio
				this.music = this.add.audio('music', 0.4, false);
				this.sound.explode = this.add.audio('explosion', 0.3);
				this.music.play();
				
				// set keyboard controls
				this.keys = this.input.keyboard.createCursorKeys();
		},
		update: function() {
				this.deathwall = this.physics.arcade.overlap(this.p, this.death);
				this.jumpCollide = this.physics.arcade.collide(this.p, this.walls)
				
				if(this.p.x > 33600) {
						this.cp = 33610;
				} else if(this.p.x > 21936) {
						this.cp = 21946;
				} else if(this.p.x > 10576) {
						this.cp = 10586;
				}
				// controls
				if(this.keys.down.isDown) {
						this.music.stop();
						this.p.visible = true;
						this.UI.visible = false;
						this.UI.text.setText("");
						this.p.x = this.cp;
						this.p.y = 450;
						this.speed = 400;
						this.music.play();
				} 
				// dying
				if(this.deathwall) {
						this.music.stop();
						this.sound.explode.play();
						this.p.body.velocity.x = 0;
						this.p.body.velocity.y = 0;
						this.speed = 0;
						this.p.visible = false;
						this.UI.visible = true;
						this.UI.text.setText("You Lose. Press Down to restart.");
				} else {
						// jumping 
						if(this.keys.up.isDown && this.jumpCollide) {
								this.jumpBool = true;
						}
						if(this.p.body.velocity.y < this.jump) {
								this.jumpBool = false;
						} else if(this.jumpBool && this.p.body.velocity.y > this.jump){
								this.p.body.velocity.y -= this.jumpval;
						}
						this.p.body.velocity.x = this.speed;
				}
				if(this.p.x > 47850 && this.p.y < 560) {
						this.music.stop();
						this.UI.visible = true;
						this.UI.text.setText("You Win!");
				}
		}
}
