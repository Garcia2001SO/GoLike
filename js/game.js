//let game = new Phaser.Game(700, 700, Phaser.AUTO, null, 'gameDiv');
let game = new Phaser.Game(608, 608, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });

"use strict";

//------------
//  VARIABLES
//------------
let map;
let layer;
let marker;
let currentTile;
let turn;
let turnCounter = 0;
let startImg;
let enterKey;
//Trying text
let myText

//keyboard
let key1;
let key2;
let key3;
let key4;

//--------------------
//THE ARRAY OF PIECES
//--------------------
//this will store 4 vales for each piece:
//[positionX, positionY, color, turn]
let pieces = [];

//array EVADE, coordinates of tiles that must not be changed
//[x, y, color]
// let evade = [];
// let evadeColor = p2TileTerritory;

//-----------
//  PLAYERS
//-----------
//  Player1 (red)
let p1TilePiece = 111;
let p1TileTerritory = 99;
let p1Territory;
let p1Captures;
let p1Score = p1Territory + p1Captures;
let p1Turn = 1;

//  Player2 (blue)
let p2TilePiece = 41;
let p2TileTerritory = 29;
let p2Territory;
let p2Captures;
let p2Score = p2Territory + p2Captures;
let p2Turn = 2;

//More Tiles
//tiles I want
    //red: 110, 99
    //blue: 40, 29
let selectedTile = p1TilePiece;
let selectedTileTerritory = p1TileTerritory;

//-------------------
//  Phaser Functions
//-------------------
function preload() {
    game.load.tilemap('level', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/gridtiles.png');
    game.load.image('start', 'assets/clicktobegin.png');
}

function create() {
    this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
    map = game.add.tilemap('level');
    map.addTilesetImage('world', 'tiles');
    layer = map.createLayer('Layer1');
    layer.resizeWorld();
    
//    //trying text
//    myText = new Text(game, 800, 100, "TEXT", [fill = 'white']);
//    myText.text = 'TEXTO';
//    myText.text.backgroundColor='#ffffff';
//    myText.text.fill = 'white';
    
    startMenu();
    
    //what was this for??
//    currentTile = map.getTile(2, 3);

    //  Pointer rectangle (marker)
    marker = game.add.graphics();
    marker.lineStyle(2, 0xffffff, 1);
    marker.drawRect(0, 0, 32, 32);

    game.input.onDown.add(changeTile, this);

    //KEYBOARD INPUTS
    key1 = game.input.keyboard.addKey(49);
    key2 = game.input.keyboard.addKey(50);
    key3 = game.input.keyboard.addKey(51);
    key4 = game.input.keyboard.addKey(52);
    enterKey = game.input.keyboard.addKey(13);
    
    //Growing area
    //1st we scan for conflicts
    //we solve them
    //we make the changes necessary to grow each area
    //we paint the territory
    enterKey.onDown.add(growArea,this);
//    enterKey.onDown.add(Scan,this);
}

function update() {
    marker.x = layer.getTileX(game.input.activePointer.worldX) * 32;
    marker.y = layer.getTileY(game.input.activePointer.worldY) * 32;
    
    if(key1.isDown){
        selectedTile = p1TilePiece;
        selectedTileTerritory = p1TileTerritory;
    }
    if(key2.isDown){
        selectedTile = p2TilePiece;
        selectedTileTerritory = p2TileTerritory;
    }
    if(key3.isDown){
        selectedTile = p1TileTerritory;
        selectedTileTerritory = 0;
        // evadeColor = p2TileTerritory;
    }
    if(key4.isDown){
        selectedTile = p2TileTerritory;
        selectedTileTerritory = 0;
        // evadeColor = p1TileTerritory;
    }
}

//-------------
//  FUNCTIONS
//-------------

//START MENU
function startMenu(){
    //startImg = game.add.sprite(game.world.centerX, game.world.centerY, 'start');
    //startImg.anchor.set(0.5);
    turn = p1Turn;
    p1Territory = 0;
    p2Territory = 0;
    p1Captures = 0;
    p2Captures = 0;
    p1Score = 0;
    p2Score = 0;
}

//TURNS
function turns(){
        if(turn == p1Turn){
            turn = p2Turn;
            selectedTileTerritory = p2TileTerritory;
            selectedTile = p2TilePiece;
            console.log("1!!!");
        }
        else{
            turn = p1Turn;
            selectedTileTerritory = p1TileTerritory;
            selectedTile = p1TilePiece;
            console.log("2!!!");
        }
    turnCounterAdder();
}

function turnCounterAdder(){
        turnCounter++;
        console.log('Turn: ' + turnCounter);
}

function changeTile(){
    let x = layer.getTileX(marker.x);    //position x of the cursor
    let y = layer.getTileY(marker.y);    //position y of the cursor
    
    if(x <= 18 && y <= 18){
        if (selectedTileTerritory != 0){
            pieces.push([x, y, selectedTileTerritory, turnCounter]);
            console.log(pieces);
        } else {
            // evade.push[x, y, evadeColor];
        }
        
        map.putTile(selectedTile, x, y);
    }
}