class Level extends Phaser.Scene {
  constructor(key) {
    super({key});
    this.levelKey = key
    this.nextLevel = {
      'Level1': 'Level1'
    }
  }

  preload() {
    this.load.image('Barrier', 'https://cors-anywhere.herokuapp.com/https://github.com/ItsMaximum/RedBallPort/blob/master/Barrier.png?raw=true');
	  this.load.image('StartPlatform', 'https://cors-anywhere.herokuapp.com/https://github.com/ItsMaximum/RedBallPort/blob/master/StartPlatform.png?raw=true');
	  this.load.image('EndPlatform', 'https://cors-anywhere.herokuapp.com/https://github.com/ItsMaximum/RedBallPort/blob/master/ExitPlatform.png?raw=true');
    this.load.image('Grass', 'https://cors-anywhere.herokuapp.com/https://github.com/ItsMaximum/RedBallPort/blob/master/Grass.png?raw=true');
	  this.load.image('PlayerBall', 'https://cors-anywhere.herokuapp.com/https://github.com/ItsMaximum/RedBallPort/blob/master/PlayerBall.png?raw=true')
    this.load.spritesheet('EndFlag', 'https://cors-anywhere.herokuapp.com/https://github.com/ItsMaximum/RedBallPort/blob/master/EndFlag.png?raw=true',
      { frameWidth: 26, frameHeight: 47});
	  this.load.image('StartFlag', 'https://cors-anywhere.herokuapp.com/https://github.com/ItsMaximum/RedBallPort/blob/master/StartFlag.png?raw=true');
    this.load.image('BackGround', 'https://cors-anywhere.herokuapp.com/https://github.com/ItsMaximum/RedBallPort/blob/master/BackGround.png?raw=true');
	  this.load.image('GradientBack', 'https://cors-anywhere.herokuapp.com/https://github.com/ItsMaximum/RedBallPort/blob/master/GradientBack.png?raw=true');
	  
	   this.load.image('text1', 'https://cors-anywhere.herokuapp.com/https://github.com/ItsMaximum/RedBallPort/blob/master/text1.png?raw=true');
	  this.load.image('text2', 'https://cors-anywhere.herokuapp.com/https://github.com/ItsMaximum/RedBallPort/blob/master/text2.png?raw=true');
	  this.load.image('text3', 'https://cors-anywhere.herokuapp.com/https://github.com/ItsMaximum/RedBallPort/blob/master/text3.png?raw=true');
	  this.load.image('text4', 'https://cors-anywhere.herokuapp.com/https://github.com/ItsMaximum/RedBallPort/blob/master/text4.png?raw=true');
    
  }

  create() {
    gameState.active = true
	  this.add.image(370,300,'GradientBack').setScale(1)
	  this.add.image(1110,300,'GradientBack').setScale(1)
    this.add.image(0,0,'BackGround')
	  
	  this.add.image(377, 130, 'text1').setScale(1.15)
	  this.add.image(377, 225, 'text2').setScale(1.15)
	  this.add.image(520, 225, 'text3').setScale(1.15)
	  this.add.image(850, 225, 'text4').setScale(1.15)
	  
	  gameState.platforms = this.physics.add.staticGroup();
	  
	  for (let i=0; i<this.objects.length; i+=1) {
     this.createPlatform(this.objects[i]); 
  } 
	  
	  this.add.image(290,277,'StartFlag')
    gameState.player = this.physics.add.sprite(290, 265, 'PlayerBall').setScale(1.15);
	  
	  
	 this.anims.create({
      key: 'endFlagRaise',
      frames: this.anims.generateFrameNumbers('EndFlag', { start: 0, end: 19 }),
      frameRate: 30,
      repeat: 0
    });
    

    this.levelSetup();

    this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);
    this.physics.world.setBounds(0, 0, gameState.width, gameState.height + gameState.player.height);

    this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5)
    gameState.player.setCollideWorldBounds(true);

    this.physics.add.collider(gameState.player, gameState.platforms);
    this.physics.add.collider(gameState.goal, gameState.platforms);

    gameState.cursors = this.input.keyboard.createCursorKeys();
  }

  createPlatform(platformObject) {
        gameState.platforms.create(platformObject.x,  platformObject.y, platformObject.name).setScale(1.15).setOrigin(0, 0.5).refreshBody();
	  if(platformObject.name === 'StartPlatform') {
		  this.add.image(platformObject.x+84,platformObject.y - 15,'Grass').setScale(1.15)
		  this.add.image(platformObject.x+144,platformObject.y - 15,'Grass').setScale(1.15)
	  }
	  if(platformObject.name === 'EndPlatform') {
		  this.add.image(platformObject.x+84,platformObject.y - 15,'Grass').setScale(1.15)
		  this.add.image(platformObject.x+258,platformObject.y - 15,'Grass').setScale(1.15)
		 
	  }
      
  }

  

  levelSetup() {
    
	  
	  
    gameState.goal = this.physics.add.sprite(850, 250, 'EndFlag');

    this.physics.add.overlap(gameState.goal, gameState.player, function() {
      // Add in the collider that will fade out to the next level here
		
		if(gameState.levelEnd != true) {
			gameState.goal.anims.play('endFlagRaise', true);
			gameState.player.setVelocityX(gameState.player.body.velocity.x/2)
			gameState.player.setVelocityY(gameState.player.body.velocity.y/2)
			gameState.levelEnd = true;
			
				
				}
				
			}
			
      
    
    , null, this)
  }

  update() {
    if(gameState.active){
		
		var r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
     
	  let velocityX = gameState.player.body.velocity.x
	  let velocityY = gameState.player.body.velocity.y
	  if(gameState.levelEnd === true)
			  {

				  config.physics.arcade.gravity.y = 1
				  if(velocityX > 0) {
					gameState.player.setVelocityX(velocityX - (Math.sign(velocityX))*1.5)
				  }
				  else {
					  gameState.player.setVelocityX(0)
				  }
			  }
      if (gameState.cursors.right.isDown && gameState.levelEnd != true) {
		
		  if(!gameState.player.body.touching.down) {
			  if(velocityX < 90){
		   gameState.player.setVelocityX(velocityX+5);
				  
			  }
		  }
	   else if(velocityX < 180){
		   gameState.player.setVelocityX(velocityX+5);
	   }
		 velocityX = gameState.player.body.velocity.x;
     
      } 
	if (gameState.cursors.left.isDown && gameState.levelEnd != true) {
        if(!gameState.player.body.touching.down) {
			  if(velocityX > -90){
		   gameState.player.setVelocityX(velocityX-5);
			  }
		  }
        else if(velocityX > -180){
		   gameState.player.setVelocityX(velocityX-5);
	   }

      
	  }

      if ((gameState.cursors.space.isDown || gameState.cursors.up.isDown) && gameState.player.body.touching.down && gameState.levelEnd!=true) {
      
        gameState.player.setVelocityY(-180);
      }
	  else if(gameState.cursors.space.isDown || gameState.cursors.up.isDown) {
		  gameState.player.setVelocityY(velocityY-1.5);
	  }

      if (!gameState.player.body.touching.down){

      }
		gameState.player.angle+=velocityX / 10
      if (gameState.player.y > 550 || r.isDown) {
        
            this.scene.restart(this.levelKey);
          gameState.levelEnd = false;
		  config.physics.arcade.gravity.y = 350;
       
      }
    }
  }
}