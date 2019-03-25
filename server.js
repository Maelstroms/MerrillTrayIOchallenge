

const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');

const bodyParser = require('body-parser');
const ip = require('ip');
const cors = require('cors');
const helmet = require('helmet');
const PORT = 3000;

// import modules in module folder
var helperMethods = require('./modules/helperMethods.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(helmet());

// The goal of the program is to take the room dimensions, the locations of the dirt patches, the hoover location and the driving instructions as input and to then output the following:

// The final hoover position (X, Y)
// The number of patches of dirt the robot cleaned up
var maxX = 0;
var maxY = 0;

var hooverXY = [0,0];


var dirtPatches = [];

var hooverMoves = [];

// object to enumerate hoover moves
// E and W change X coordinate
// N and S change Y coordinate
var CardinalToCartisian = {
  'E': function (position){
    var newPos = [helperMethods.dontExceedRoomBoundaries(position[0]+1, 'x',maxX,maxY),position[1]];
    return newPos;
  },
  'W': function (position){
    var newPos = [helperMethods.dontExceedRoomBoundaries(position[0]-1, 'x',maxX,maxY), position[1]];
    return newPos;
  },
  'N': function (position){
    var newPos = [position[0],helperMethods.dontExceedRoomBoundaries(position[1]+1, 'y',maxX,maxY)];
    return newPos;
  },
  'S': function (position){
    var newPos = [position[0],helperMethods.dontExceedRoomBoundaries(position[1]-1, 'y',maxX,maxY)];
    return newPos;
  },

}

//input
//four pieces of information that will be processed differently
//Size of room x by y
//starting coordinates of hoover
//coordinates where dirt is
//net of movements that the robot will take


//think about having this function return the values instead of having global vars
function loadInstructions(fileName){
  var contents =fs.readFileSync(fileName, 'utf8');
  // console.log(contents);
  var information = contents.split(/\s/);
  // console.log(information);

  maxX = Number(information[0]);
  maxY = Number(information[1]);
  hooverXY[0] = Number(information[2]);
  hooverXY[1] = Number(information[3]);

  //go through input to properly sort dirt patches
  var i = 4;
  while(i < information.length){
    if (information[i].search(/[a-zA-Z]/g) > -1) {
      hooverMoves = information[i].split('');
      break;
    }
    else if (i%2 == 0){
      var tempDirtCoord = [Number(information[i])];
    }
    else{
      tempDirtCoord.push(Number(information[i]));
      dirtPatches.push(tempDirtCoord);
    }
    // console.log(dirtPatches);
    i++;
  }

  // console.log(maxX);
  // console.log(maxY);
  // console.log(hooverXY);

  // console.log(hooverMoves);

}

//output
//final position of robot - goal #1, given a room size and set of instructions, where does the robot end up?
function robotTravel(start, moves){
  var spotsCleaned = 0;
  var currentPos = start;
  for (let mov of moves){
    // console.log(mov);
    currentPos = CardinalToCartisian[mov](currentPos);
    spotsCleaned = spotsCleaned + helperMethods.wasSpotCleaned(currentPos, dirtPatches);
    console.log(dirtPatches);
    // console.log(currentPos);
    // console.log(spotsCleaned);
  }
  return [currentPos, spotsCleaned];
}




//catch program closure
//handy to make sure any background processes don't run indefinitely
process.on('SIGINT', function(){

  process.exit();
});


// executable code
//running robot instructions
loadInstructions('input.txt');
// console.log(robotTravel(hooverXY, hooverMoves));
var endvals = robotTravel(hooverXY, hooverMoves);
console.log(endvals[0]);
console.log(endvals[1]);



// boilerplate for web interface
// leaving for potential for future expansion
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });


// //Start Server
// http.listen(PORT, '0.0.0.0', function(){
//   console.log('Server at : ' + ip.address());
//   console.log('listening on ' + PORT);
// });
