import roomA from "./Rooms/RoomA.js";
import roomB from "./Rooms/RoomB.js";
import UI from "./Rooms/UI.js";
import Home from "./Rooms/Home.js";
import CircleRoom from "./Rooms/CircleRoom.js";


var config = {
    type: Phaser.AUTO,
    parent: "divId",
    width: 1500,
    height: 650,
    dom: {
        createContainer: true
    },
    scene: [Home, UI, roomA, roomB, CircleRoom]
};

var game = new Phaser.Game(config);
