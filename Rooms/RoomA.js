var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var scoreText;
var roomID = "roomA";




class roomA extends Phaser.Scene {

constructor ()
{
    super("roomA");
}




preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('eric', 'eric.jpg');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

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

        this.scene.run('roomB');
        socket.emit("roomChange", roomID, "RoomB");
        this.scene.sleep(roomID);
        

    }, this);


   

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    this.input.mouse.capture = true;

    


    //  The score
    scoreText = this.add.text(16, 16, 'score: ' + score, { fontSize: '32px', fill: '#000' });


    socket.emit("roomJoin", roomID);

    this.input.on('pointerup', event => {
        socket.emit("scoreup", 1000);
    });

    

    socket.on("scoreup", (point) => {
        score += point;
        scoreText.setText("score: " + score);
    });


}

update ()
{
    if (this.input.activePointer.primaryDown) {
        socket.emit("scoreup", 10);
    }
}

}


export default roomA 