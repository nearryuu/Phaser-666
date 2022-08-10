var roomID = "CircleRoom";

class CircleRoom extends Phaser.Scene {

    constructor ()
    {
        super("CircleRoom");
    }

    preload()
    {
    this.load.image('Background', 'assets/CircleRoom/Background.jpg');
    this.load.image('Abjuration', 'assets/CircleRoom/Abjuration.png');
    this.load.image('ActCircle', 'assets/CircleRoom/ActivableCircle.png');
    this.load.image('Circles', 'assets/CircleRoom/Circles.png');
    this.load.image('Conjuration', 'assets/CircleRoom/Conjuration.png');
    this.load.image('Creation', 'assets/CircleRoom/Creation.png');
    this.load.image('Divination', 'assets/CircleRoom/Divination.png');
    this.load.image('Enchantement', 'assets/CircleRoom/Enchantement.png');
    this.load.image('Evocation', 'assets/CircleRoom/Evocation.png');
    this.load.image('Feu', 'assets/CircleRoom/Feu.png');
    this.load.image('Froid', 'assets/CircleRoom/Froid.png');
    this.load.image('Illusion', 'assets/CircleRoom/Illusion.png');
    this.load.image('Mouvement', 'assets/CircleRoom/Mouvement.png');
    this.load.image('Necromancy', 'assets/CircleRoom/Necromancy.png');
    this.load.image('Transmutation', 'assets/CircleRoom/Transmutation.png');
    }


    create () 
    {

    this.add.image(0, 0, "Background").setOrigin(0).scale = 1.3;

    this.add.image(980, 500, "Circles").scale = 0.125;

    var finalCircle = this.add.image(450, 350, 'ActCircle');
    finalCircle.displayWidth = 600;
    finalCircle.displayHeight = 600;


    var abjuration = this.add.sprite(100, 100, "Abjuration").setInteractive();
    abjuration.setName("abjuration");
    var conjuration = this.add.sprite(100, 250, "Conjuration").setInteractive();
    conjuration.setName("conjuration");
    var necromancy = this.add.sprite(100, 400, "Necromancy").setInteractive();
    necromancy.setName("necromancy");
    var divination = this.add.sprite(100, 550, "Divination").setInteractive();
    divination.setName("divination");
    var enchantement = this.add.sprite(900, 100, "Enchantement").setInteractive();
    enchantement.setName("enchantement");
    var evocation = this.add.sprite(900, 250, "Evocation").setInteractive();
    evocation.setName("evocation");
    var illusion = this.add.sprite(900, 400, "Illusion").setInteractive();
    illusion.setName("illusion");
    var transmutation = this.add.sprite(900, 550, "Transmutation").setInteractive();
    transmutation.setName("transmutation");


    this.input.on("pointerdown", this.startDrag, this);

    


    var circles = [];
    
    circles.push(abjuration);
    circles.push(conjuration);
    circles.push(necromancy);
    circles.push(divination);
    circles.push(enchantement);
    circles.push(evocation);
    circles.push(illusion);
    circles.push(transmutation);

    

    circles.forEach(sprite => {
        sprite.displayWidth = 80;
        sprite.displayHeight = 80;
    });
    

    this.input.mouse.capture = true;


    socket.on("moveCircle", (name, x, y) => this.realDrag(name, x, y));

    }

    startDrag(pointer, targets){
        this.dragObj=targets[0];
        if (this.dragObj !== undefined) {
            this.input.on("pointermove", this.doDrag, this);
            this.input.on("pointerup", this.stopDrag, this);
            this.input.off("pointerdown", this.startDrag, this);
        } 
    }

    doDrag(pointer){
        const name = this.dragObj.name;
        socket.emit("moveCircle", name, pointer.x, pointer.y);
        this.realDrag(name, pointer.x, pointer.y);
    }

    realDrag(name, x, y){
        const circle = this.children.getByName(name);
        circle.x = x;
        circle.y = y;
    }

    stopDrag(){
        this.input.on("pointerdown", this.startDrag, this);
        this.input.off("pointermove", this.doDrag, this);
        this.input.off("pointerup", this.stopDrag, this);
    }
}


export default CircleRoom
