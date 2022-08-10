const chat = document.getElementById("chatMessages");


class UI extends Phaser.Scene {

    constructor ()
    {
        super("UI");
    }

    preload ()
{

    this.load.image('star', 'assets/UI/star.png');

    this.load.image('d4', 'assets/UI/d4.png');
    this.load.image('d6', 'assets/UI/d6.png');
    this.load.image('d8', 'assets/UI/d8.png');
    this.load.image('d10', 'assets/UI/d10.png');
    this.load.image('d12', 'assets/UI/d12.png');
    this.load.image('d20', 'assets/UI/d20.png');
    this.load.image('d100', 'assets/UI/d100.png');
    
}

    create () 
    {

    this.scene.bringToTop("UI");

    var star = this.add.sprite(1175, 20, 'star').setInteractive();

    


    var diceBox = this.add.graphics();

    diceBox.fillStyle(0xffffff, 1)
    diceBox.lineStyle(5, 0x000000, 1);
    diceBox.strokeRoundedRect(995, 10, 200, 350, 10);
    diceBox.fillRoundedRect(995, 10, 200, 350, 10);


    var d4 = this.add.image(1015, 40, 'd4');
    var d6 = this.add.image(1015, 80, 'd6');
    var d8 = this.add.image(1015, 120, 'd8');
    var d10 = this.add.image(1015, 160, 'd10');
    var d12 = this.add.image(1015, 200, 'd12');
    var d20 = this.add.image(1015, 240, 'd20');
    var d100 = this.add.image(1015, 280, 'd100');

    var diceImages =[];
    diceImages.push(d4);
    diceImages.push(d6);
    diceImages.push(d8);
    diceImages.push(d10);
    diceImages.push(d12);
    diceImages.push(d20);
    diceImages.push(d100);

    var diceNb = [];
    diceNb[0] = 0;
    diceNb[1] = 0;
    diceNb[2] = 0;
    diceNb[3] = 0;
    diceNb[4] = 0;
    diceNb[5] = 0;
    diceNb[6] = 0;


    var buttons = [];

    diceImages.forEach(die => {
        var y = die.y;
        var minus = this.add.text(1055, y-10, '-' , { fontSize: '26px', fill: '#000' }).setInteractive();
        var nbs = this.add.text(1100, y-10, '0' , { fontSize: '26px', fill: '#000' });
        var plus = this.add.text(1155, y-10, '+' , { fontSize: '26px', fill: '#000' }).setInteractive();
        var object = [];
        object["nbs"] = nbs;
        object["i"] = y/40 -1;

        buttons.push(minus);
        buttons.push(plus);
        buttons.push(nbs);


        minus.on("pointerdown", removeDice, object);
        plus.on("pointerdown", addDice, object);
    })

    function removeDice(){
        if (diceNb[this["i"]] > 0 ){
        diceNb[this["i"]]--;
        this["nbs"].setText(diceNb[this["i"]]);
        }
    }

    function addDice() {
        diceNb[this["i"]]++;
        this["nbs"].setText(diceNb[this["i"]]);
    }

    var roll = this.add.text(1100, 330, "Roll", { fontSize: '20px', fill: '#000' }).setInteractive();
    var closeDice = this.add.text(1010, 12, "X", { fontSize: '20px', fill: '#F00' }).setInteractive();

    closeDice.on("pointerdown", hideDice);
    roll.on("pointerdown", rollDice);


    function rollDice(){
        //var message = "";
        var result = 0;
        var random;
        for (var i=0; i < 7; i++){
            for (var j=0; j<diceNb[i]; j++){
                switch (i){
                    case 0:
                        random = Phaser.Math.Between(1, 4);
                        break;
                    case 1:
                        random = Phaser.Math.Between(1, 6);
                        break;
                    case 2:
                        random = Phaser.Math.Between(1, 8);
                        break;
                    case 3:
                        random = Phaser.Math.Between(1, 10);
                        break;
                    case 4:
                        random = Phaser.Math.Between(1, 12);
                        break;
                    case 5:
                        random = Phaser.Math.Between(1, 20);
                        break;
                    case 6:
                        random = Phaser.Math.Between(1, 100);
                        break;
                }
                result += random;
                //message += random + " + ";
            }
        }
        //socket.emit("message", message);
        if (result>0){
        socket.emit("message", result);
        }
    }

    this.textInput = document.getElementById("chatInput");
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.enterKey.on("down", event => {
        let chatbox = this.textInput;
        if (chatbox.value != "") {
            socket.emit("message", chatbox.value);
            chatbox.value = "";
        }
    })

    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.space.on("down", event => {
        let chatbox = this.textInput;
        if (chatbox === document.activeElement ){
        chatbox.value += " ";
        }
    })

    socket.on("message", (message) => {
        var chatMessage = document.createElement("li");
        chatMessage.innerHTML = message;
        chat.appendChild(chatMessage);
        chat.lastChild.scrollIntoView();
    });

    this.input.mouse.capture = true;


    star.on('pointerover', function () {

        star.setTint(0x7878ff);

    });
    
    star.on('pointerout', function (pointer) {

        this.clearTint();

    });

    star.on('pointerup', function (pointer) {
        showDice();

    }, this);

    function hideDice(){
        star.visible = true;
        closeDice.visible = false;
        diceBox.visible = false;
        roll.visible = false;
        buttons.forEach((button)=>{
            button.visible = false;
        });
        diceImages.forEach((image)=>{
            image.visible = false;
        });
    }

    function showDice(){
        star.visible = false;
        closeDice.visible = true;
        diceBox.visible = true;
        roll.visible = true;
        buttons.forEach((button)=>{
            button.visible = true;
        });
        diceImages.forEach((image)=>{
            image.visible = true;
        });
    }

    hideDice();

    }
}


export default UI 