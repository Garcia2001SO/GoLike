//var game = new Phaser.Game(700, 700, Phaser.AUTO, null, 'gameDiv');
var game = new Phaser.Game(608, 608, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });

"use strict";

//------------
//  VARIABLES
//------------
var map;
var layer;
var marker;
var currentTile;
var turn;
var turnCounter = 0;
var startImg;
var enterKey;

//keyboard
var key1;
var key2;
var key3;
var key4;

//--------------------
//THE ARRAY OF PIECES
//--------------------
//this will store 4 vales for each piece:
//[positionX, positionY, color, turn]
var pieces = [];

//array EVADE, coordinates of tiles that must not be changed
//[x, y, color]
var evade = [];
var evadeColor = p2TileTerritory;

//-----------
//  PLAYERS
//-----------
//  Player1 (red)
var p1TilePiece = 111;
var p1TileTerritory = 99;
var p1Territory;
var p1Captures;
var p1Score = p1Territory + p1Captures;
var p1Turn = 1;

//  Player2 (blue)
var p2TilePiece = 41;
var p2TileTerritory = 29;
var p2Territory;
var p2Captures;
var p2Score = p2Territory + p2Captures;
var p2Turn = 2;

//More Tiles
//tiles I want
    //red: 110, 99
    //blue: 40, 29
var selectedTile = p1TilePiece;
var selectedTileTerritory = p1TileTerritory;

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
    
    startMenu()
    
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
    enterKey = game.input.keyboard.addKey(13)
    
    enterKey.onDown.add(growArea,this);
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
        evadeColor = p2TileTerritory;
    }
    if(key4.isDown){
        selectedTile = p2TileTerritory;
        selectedTileTerritory = 0;
        evadeColor = p1TileTerritory;
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
    var xx = layer.getTileX(marker.x);    //position x of the cursor
    var yy = layer.getTileY(marker.y);    //position y of the cursor
    
    if(xx <= 18 && yy <= 18){
        if (selectedTileTerritory != 0){
            pieces.push([xx, yy, selectedTileTerritory, turnCounter]);
            console.log(pieces);
        } else {
            evade.push[xx, yy, evadeColor];
        }
        
        map.putTile(selectedTile, xx, yy);
    }
}