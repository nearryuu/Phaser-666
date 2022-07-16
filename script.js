var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var scoreText;



class sceneA extends Phaser.Scene {

constructor ()
{
    super("sceneA");
}




preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('eric', 'eric.jpg');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

    this.load.html("form", "form.html");
}

create ()
{
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    var sprite = this.add.sprite(400, 300, 'eric').setInteractive();

    sprite.on('pointerdown', function (pointer) {

        this.setTint(0xff0000);

    });

    sprite.on('pointerout', function (pointer) {

        this.clearTint();

    });

    sprite.on('pointerover', function () {

        sprite.setTint(0x7878ff);

    });

    sprite.on('pointerup', function (pointer) {

        this.scene.start('sceneB');

    }, this);

    
    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    game.input.mouse.capture = true;


    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });


    this.textInput = this.add.dom(1135, 690).createFromCache("form").setOrigin(0.5);
    this.chat = this.add.text(1000, 10, "test", { lineSpacing: 15, backgroundColor: "#21313CDD", color: "#26924F", padding: 10, fontStyle: "bold" });
    this.chat.setFixedSize(270, 645);

}

update ()
{
    if (this.input.activePointer.primaryDown) {
        score += 10;
        scoreText.setText('Score: ' + score);
    }
    if (this.input.activePointer.leftButtonReleased()) {
        score = 100;
        scoreText.setText('Score: ' + score);
    }
}

}


class sceneB extends Phaser.Scene {

    constructor ()
    {
        super("sceneB");
    }

    create () 
    {
        this.add.image(400, 500, "sky");

        var sprite = this.add.sprite(400, 300, 'eric').setInteractive();

    sprite.on('pointerdown', function (pointer) {

        this.setTint(0xff0000);

    });

    sprite.on('pointerout', function (pointer) {

        this.clearTint();

    });

    sprite.on('pointerover', function () {

        sprite.setTint(0x7878ff);

    });

    sprite.on('pointerup', function (pointer) {

        this.scene.start('sceneA');

    }, this);

    

    game.input.mouse.capture = true;

    }
}


var config = {
    type: Phaser.AUTO,
    parent: "divId",
    width: 1800,
    height: 1600,
    dom: {
        createContainer: true
    },
    scene: [sceneA, sceneB]
};

var game = new Phaser.Game(config);