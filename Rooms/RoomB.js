var roomID = "roomB";

class roomB extends Phaser.Scene {

    constructor ()
    {
        super("roomB");
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

        this.scene.run('CircleRoom');
        socket.emit("roomChange", roomID, "CircleRoom");
        this.scene.sleep(roomID);

    }, this);



    this.input.mouse.capture = true;

    }
}


export default roomB 
