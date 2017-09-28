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

//THE ARRAY OF PIECES
//this will store 4 vales for each piece:
//[positionX, positionY, color, turn]
var pieces = [];

//-----------
//  PLAYERS
//-----------
//  Player1 (red)
var p1TilePiece = 110;
var p1TileTerritory = 99;
var p1Territory;
var p1Captures;
var p1Score = p1Territory + p1Captures;
var p1Turn = 1;

//  Player2 (blue)
var p2TilePiece = 40;
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
    
    currentTile = map.getTile(2, 3);

    //  Pointer rectangle (marker)
    marker = game.add.graphics();
    marker.lineStyle(2, 0xffffff, 1);
    marker.drawRect(0, 0, 32, 32);

    game.input.addMoveCallback(updateMarker, this);

    game.input.onDown.add(changeTile, this);

    //cursors = game.input.keyboard.createCursorKeys();
    key1 = game.input.keyboard.addKey(49);
    key2 = game.input.keyboard.addKey(50);
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
}

//-------------
//  FUNCTIONS
//-------------
function updateMarker() {
    marker.x = layer.getTileX(game.input.activePointer.worldX) * 32;
    marker.y = layer.getTileY(game.input.activePointer.worldY) * 32;
}

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
        pieces.push([xx, yy, selectedTileTerritory, turnCounter]);
        console.log(pieces);
        
        map.putTile(selectedTile+1, xx, yy);
        //turns();
    }
}

//growing the area
function growArea(){
    turnCounterAdder();
    
    //[positionX, positionY, color, turn]
    function calc(positionX, positionY, color, turn){
        var time = turnCounter - turn;
        var width = time*2 + 1; //width and height might have to stop at different values
        var height = time*2 + 1;
        var startX = positionX - time;
        var startY = positionY - time;
        
        //in case the start values go below 0
        if(startX < 0){
            startX = 0;
            //gotta change the width formula
            width = positionX + 1 + turnCounter;
            
        }
        if(startY < 0){
            startY = 0;
            //gotta change the height formula
            height = positionY + 1 + turnCounter;
        }
        
        //in case the area goes beyond tue botton or rightmost limits
        width = (time > 18 - positionX) ? width = 19 - startX : width = width;
//        height = (time > 18 - positionY) ? height = time + 1 : height = height;
        height = (time > 18 - positionY) ? height = 19 - startY : height = height;

        console.log('time '+time, 'width '+width, 'height '+height, 'startX '+startX, 'startY '+startY);
        map.fill(color, startX, startY, width, height);
//        map.fill(color, 1, startY, 1, height);
        map.putTile(color + 12, positionX, positionY);
    }

    pieces.forEach(
        function(element, index){
            calc.apply(this, element)
        });
}

//Changing tiles for single tiles        
//        map.fill(selectedTileTerritory, areaX, areaY, width, height);

//Changing tiles for full map
/*function changeTile(){
    //  This will replace every instance of tile 31 (cactus plant) with tile 46 (the sign post).
    //  It does this across the whole layer of the map unless a region is specified.
    //  You can also pass in x, y, width, height values to control the area in which the replace happens
    map.replace(42, 29);
    //tiles I want
    //red: 110, 99
    //blue: 40, 29
}*/