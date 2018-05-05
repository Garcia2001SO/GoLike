"use strict";
//growing the area
function growArea(){
    turnCounterAdder();
    
    for(var i=0; i + 1 <= pieces.length; i++){
        //[positionX, positionY, color, turn]
        var time = turnCounter - pieces[i][3];
        var width = time*2 + 1; //width and height might stop at different values
        var height = time*2 + 1;
        var startX = pieces[i][0] - time;
        var startY = pieces[i][1] - time;
        
        //in case the start values go below 0
        if(startX < 0){
            startX = 0;
            width = pieces[i][0] + 1 + time;   
        }
        if(startY < 0){
            startY = 0;
            height = pieces[i][1] + 1 + time;
        }
        
        //in case the area goes beyond the botton or rightmost limits
        width = (time > 18 - pieces[i][0]) ? 19 - startX : width;
        height = (time > 18 - pieces[i][1]) ? 19 - startY : height;

        console.log('time '+time, 'width '+width, 'height '+height, 'startX '+startX, 'startY '+startY);
        map.fill(pieces[i][2], startX, startY, width, height);
    }
    
    for(i=0; i + 1 <= pieces.length; i++){
        map.putTile(pieces[i][2] + 12, pieces[i][0], pieces[i][1]);
    }
//    countArea();
}

//function countArea(){
//    var red = 0;
//    
//    for(var i = 0; i <= 18; i++){
//        for(var j = 0; j <= 18; j++){
//            if(map.getTile(i,j) === p1TileTerritory || map.getTile(i,j) === p1TilePiece){
//                red++;
//            }
//        }
//    }
//    console.log(Territorio rojo: red);
////    map.getTile(2, 3);
//}