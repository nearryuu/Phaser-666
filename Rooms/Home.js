

class Home extends Phaser.Scene {

    constructor ()
    {
        super("Home");
    }

    preload ()
{
    this.load.image('Reload', 'assets/Persos/reload.jpg');
    this.load.image('Pro_zero', 'assets/Persos/Pro_zero_2.jpg');
    this.load.image('Jester', 'assets/Persos/jester.jpg');
    this.load.image('First', 'assets/Persos/First.jpg');
    this.load.image('Hero', 'assets/Persos/Hero.jpg');
    this.load.image('Masque', 'assets/Persos/Masque.jpg');

}


    

    create () 
    {

    var Reload = this.add.sprite(150, 150, 'Reload').setInteractive();
    Reload.setName("Reload");
    var Pro_zero = this.add.sprite(500, 150, 'Pro_zero').setInteractive();
    Pro_zero.setName("Pro_zero");
    var Jester = this.add.sprite(850, 150, 'Jester').setInteractive();
    Jester.setName("Jester");
    var First = this.add.sprite(150, 400, 'First').setInteractive();
    First.setName("First");
    var Hero = this.add.sprite(500, 400, 'Hero').setInteractive();
    Hero.setName("Hero");
    var Masque = this.add.sprite(850, 400, 'Masque').setInteractive();
    Masque.setName("Masque");

    var persos = [];
    persos.push(Reload);
    persos.push(Pro_zero);
    persos.push(Jester);
    persos.push(First);
    persos.push(Hero);
    persos.push(Masque);


    function onDown(){
        this.setTint(0xff0000);
    }

    function onOut(){
        this.clearTint();
    }

    function onOver(){
        this.setTint(0x7878ff);
    }

    function onUp(){
        this.scene.run('roomA');
        this.scene.run('UI');
        this.scene.sleep('Home');
    }

    function emit(){
    socket.emit("characterChoice", this.name );
    }

    persos.forEach(sprite => {
        sprite.displayWidth = 200;
        sprite.displayHeight = 200;

        sprite.on("pointerdown", onDown);
        sprite.on( "pointerover", onOver);
        sprite.on( "pointerout", onOut);
        sprite.on ( "pointerup", emit)
        
        sprite.on( "pointerup", onUp, this);
    });


    var combo = this.input.keyboard.createCombo("mj", {
        resetOnWrongKey: true,
        maxKeyDelay: 500,
        resetOnMatch: true,
        deleteOnMatch: false,
    });

    var key1 = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.ONE );

    var key2 = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.TWO );

    this.input.keyboard.on('keycombomatch', function (event) {
        if (key1.isDown){
            socket.emit("characterChoice", "MJ 1" );
        }
        if (key2.isDown){
            socket.emit("characterChoice", "MJ 2" );
        }
        this.scene.run('roomA');
        this.scene.run('UI');
        this.scene.sleep('Home');
        

    }, this);






    //socket.emit("roomJoin", roomID);



    this.input.mouse.capture = true;

    }
}


export default Home 
