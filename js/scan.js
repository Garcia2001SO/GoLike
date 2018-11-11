"use strict";

var conflicts = [];

// "scans" (calculates) the moment 2 areas of different colors will meet
//we will use a 2d array, it will hold the relationship
//of 2 pieces of different colors, the info will be
//[turn they meet, tiles border, if in conflict or not, tiles in conflict]
function Scan(){
    var p1pieces = [];  //[x,y,turn,area[]]
    var p2pieces = [];  //[x,y,turn,area[]]
    
    for(i=0; i + 1 <= pieces.length; i++){
        if(pieces[i][2] == p1TileTerritory){
            p1pieces.push([pieces[i][0], pieces[i][1], pieces[i][3]]);
        } else {
            p2pieces.push([pieces[i][0], pieces[i][1], pieces[i][3]]);
        }
    }
    
    //match out the moment each pair meets
    for(i=0; i + 1 <= p1pieces.length; i++){
        for(j=0; i + 1 <= p2pieces.length; i++){
            var axisX;
            var axisY;
            
            axisX = (p1pieces[i][0] - p2pieces[j][0] < 0) ? p2pieces[j][0] - p1pieces[i][0] : p1pieces[i][0] - p2pieces[j][0];
            axisY = (p1pieces[i][1] - p2pieces[j][1] < 0) ? p2pieces[j][1] - p1pieces[i][1] : p1pieces[i][1] - p2pieces[j][1];
            
            var axisImportant = (axisX - axisY > 0) ? axisX : axisY;
            
            
            
            //introduce to conflicts[]
            //[turn they meet, tiles border, if in conflict, tiles in conflict]
            conflicts.push([]);
        }
    }
}