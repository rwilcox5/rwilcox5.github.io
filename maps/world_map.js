/*---------------------------------------------------------------------------
 Map Technology Copyright (C) 2011 DougX.net
 Extended Content Copyright (C)  ==your organization here==

 ===
 ===  place your copyright notice for your own content here
 ===

 -----------------------------------------------------------------------------

 LICENSE FOR BASE MAP TECHNOLOGY ONLY 

 Permission is hereby granted to copy, modify and distribute this software
 code for any reason PROVIDED that the "DX MapTech" logo remains visible and
 unaltered on the US Map, and PROVIDED that the "DX MapTech" logo directs
 the browser to http://dougx.net/map when clicked by users.

 Please email contact@dougx.net to purchase a license if you wish to remove
 this branding.

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
---------------------------------------------------------------------------*/


//
// NOTE: This file is not intended to be user-modified.  99% of typical use
//       of the map can be accomplished by modifications to MapConfig.js
//
// Please see MapConfig.js first before you start tinkering around here!
//

//  ------------
//  map_main() should be called from the onload() event of the body
//  of the page containing the map.  or, it can be called whenever you
//  are ready to start displaying the map. the canvas must be ready.
//
//  if called before the canvas is available an error will occur.
//  ------------
function map_main(stateColors)
{
   if (!map_initCanvas())
   {
      return;
   }

   var agent = navigator.userAgent;
   if ( agent.indexOf("MSIE") != -1 )
      g_map_isIE9 = true;

   map_startRenderLoop(stateColors);

   g_map_canvas.addEventListener('mousemove', map_mousemove, false);
   g_map_canvas.addEventListener('mousedown', map_mousedown, false);

   myRankBoxOrigin = [20,320];
  myRankBoxWidth  = 360;
  myRankBoxHeight = 365;

  myUseRankBox = true;
  myRankBoxFillRGB   = [255,255,255];
  myRankBoxBorderRGB = [0,0,0];
  myRankBoxTextRGB   = [0,0,0];


  myRankBoxTextHeight = 12;
  myRankBoxText = new Array();
  for (i=1;i<31;i++){
    for ( var abbrev in g_map_stateMap )
    {
          if (abbrev in stateColors){
          var nrank = parseInt(stateColors[abbrev].rank)+1;
          if (nrank==i){
            if (nrank<10){nrankstr = "  "+nrank.toString();}
            else {nrankstr = nrank.toString();}
          var name = g_map_stateMap[abbrev].myPrettyName;


          var value = parseFloat(stateColors[abbrev].value);
          valueStr = value.toFixed(1).toString();
          if (value<1000 && value >= 100){valueStr = '  '+value.toFixed(1).toString();}
          if (value<100 && value >= 10){valueStr = '    '+value.toFixed(1).toString();}
          if (value<10){valueStr = '      '+value.toFixed(1).toString();}

          var gvalue = parseFloat(stateColors[abbrev].gold);
          if (gvalue<1000 && gvalue >= 100){gvalueStr = ''+gvalue.toFixed(1).toString();}
          if (gvalue<100 && gvalue >= 10){gvalueStr = '  '+gvalue.toFixed(1).toString();}
          if (gvalue<10){gvalueStr = '    '+gvalue.toFixed(1).toString();}

          var svalue = parseFloat(stateColors[abbrev].silver);
          if (svalue<1000 && svalue >= 100){svalueStr = ''+svalue.toFixed(1).toString();}
          if (svalue<100 && svalue >= 10){svalueStr = '  '+svalue.toFixed(1).toString();}
          if (svalue<10){svalueStr = '    '+svalue.toFixed(1).toString();}

          var bvalue = parseFloat(stateColors[abbrev].bronze);
          if (bvalue<1000 && bvalue >= 100){bvalueStr = ''+bvalue.toFixed(1).toString();}
          if (bvalue<100 && bvalue >= 10){bvalueStr = '  '+bvalue.toFixed(1).toString();}
          if (bvalue<10){bvalueStr = '    '+bvalue.toFixed(1).toString();}
          

          var nrankstr = nrankstr+' '+valueStr.toString()+' '+gvalueStr.toString()+' '+svalueStr.toString()+' '+bvalueStr.toString()+'   '+ name.toString();
          addRankBoxText(nrankstr);
          }
        }
    }
  }
  drawRankBox(myRankBoxText);



}

//
// if you are having problems with mouse pointer position, try
// tweaking the code here.  NOTE that your <canvas> MUST have its CSS style
// set with "position:relative;" or this code will not work
//
function map_mousemove(ev)
{
   var x;
   var y;

   if (ev.offsetX || ev.offsetX == 0) 
   {
      x = ev.offsetX;
      y = ev.offsetY;
   }
   else if (ev.layerX || ev.layerX == 0)
   {
     x = ev.layerX;
     y = ev.layerY;

   }


   if ( g_map_isIE9 )
   {
     x = ev.x;
     y = ev.y;
   }

         /*---end generic mouse event processing---*/

         y = g_map_canvas.height - y;   // translate to map y coord

         var highState = null;
         for ( var i in g_map_stateMap )
         {
            var found = map_pointInState(x,y,g_map_stateMap[i]);

            if ( found && (highState == null))
            {
               highState = g_map_stateMap[i];
            }
            else
            {
               g_map_stateMap[i].mouseOut();
            }
         }

         if ( highState != null )
            highState.mouseIn();
}

function map_mousedown(ev)
{
   ev.preventDefault();

   var x;
   var y;

   if (ev.offsetX || ev.offsetX == 0)
   {
     x = ev.offsetX;
     y = ev.offsetY;
   }
   else if (ev.layerX || ev.layerX == 0)
   {
     x = ev.layerX;
     y = ev.layerY;
   }

   if ( g_map_isIE9 )
   {
     x = ev.x;
     y = ev.y;
   }


         /*---end generic mouse event processing---*/

         y = g_map_canvas.height - y;           //translate to map y coord


         for ( var i in g_map_stateMap )
         {
            var found = map_pointInState(x,y,g_map_stateMap[i]);

            if ( found )
            {
               g_map_stateMap[i].mouseClick(x,y,g_map_stateMap[i]);
               break;
            }
         }

}


function map_initCanvas()
{
   g_map_canvas = document.getElementById('map_canvas');

   if (!g_map_canvas.getContext)
   {
      return false;
   }

   g_map_context = g_map_canvas.getContext('2d');
   g_map_context.font = "bold 12px sans-serif";
   g_map_context.lineWidth = 1;

   return true;
}

function map_startRenderLoop(stateColors)
{
   map_createStateData();
   map_userSetup(stateColors);
   g_map_context.fillStyle = g_map_backgroundColor;
   g_map_context.fillRect(0,0,g_map_canvas.width,g_map_canvas.height);
   g_map_renderInterval = setInterval(map_renderLoop, 10);
}


function map_renderLoop()
{
   var highState = null;
   for ( var i in g_map_stateMap )
   {
      if ( ! g_map_stateMap[i].myHighlighted )
         g_map_stateMap[i].draw();
      else
         highState = g_map_stateMap[i];
   }
   if ( highState != null )
   {
      highState.draw();
   }
}

function map_Polygon()
{
   this.myXVals = null;
   this.myYVals = null;
}

function map_pointInState(x,y,state)
{
    for ( var i = 0; i < state.myPolygons.length; ++i)
    {
       var p = state.myPolygons[i];

       if (map_pointInPolygon(x,y,p))
       {
          return 1;
       }
    }
    return 0;
}


function map_pointInPolygon(x,y,p)
{
   var nodeCount = 0;
   var xValues = p.myXVals;
   var yValues = p.myYVals;

   var numPoints = xValues.length;

   for ( var i = 0; i < numPoints; ++i )
   {
      var Aindex = i;
      var Bindex = i+1;

      if ( i == numPoints - 1 )
         Bindex = 0;

      var Ax = xValues[Aindex];
      var Ay = yValues[Aindex];
      var Bx = xValues[Bindex];
      var By = yValues[Bindex];

      if (( Ax >= x ) && (Bx >= x ))
      {
         continue;
      }

      if (Ay == By)
      {
         continue;
      }

      if (( y > Ay  )&& (y > By ))
      {
         continue;
      }

      if (( y < Ay ) && (y < By ))
      {
         continue;
      }

      if ( Ay > By )
      {
         if ( y == Ay )
         {
            continue;
         }
      }
      else
      {
         if ( y == By )
         {
            continue;
         }
      }
      if ( Ax < Bx )
      {
         var m = (By - Ay)/(Bx - Ax);
         var alpha = ((y - Ay)/m) + Ax;
         if ( alpha > x )
         {
            continue;
         }
      }
      else
      {
         var m = (Ay - By)/(Ax - Bx);
         var alpha = ((y - By)/m) + Bx;
         if ( alpha > x )
         {
            continue;
         }
      }

      nodeCount++;
   }

   return ( nodeCount % 2 )
}

//
// The map is made up of State objects, which are defined here
//

function map_State(abbrev, capsName, prettyName)
{
   this.myAbbrev = abbrev;
   this.myCapsName = capsName;
   this.myPrettyName = prettyName;

   this.myPolygons = new Array();

   this.myBorderColor = g_map_borderColor;
   this.myHighlightBorderColor = g_map_highlightBorderColor;

   this.myHighlightRGB = g_map_highlightRGB;
   this.myBaseRGB = g_map_baseRGB;

   this.myRenderCount = -1;
   this.myGradOffset = 15;
   this.myHighlighted = false;
   this.myUseFill = true;

   this.myClickCallback = null;

   this.myInfoBoxOrigin = [1200,500];
   this.myInfoBoxWidth  = 174;
   this.myInfoBoxHeight = 160;

   this.myUseInfoBox = g_map_useInfoBox;
   this.myInfoBoxFillRGB   = g_map_infoBoxFillRGB;
   this.myInfoBoxBorderRGB = g_map_infoBoxBorderRGB;
   this.myInfoBoxTextRGB   = g_map_infoBoxTextRGB;

   this.myInfoBoxText = new Array();
   this.myInfoBoxTextHeight = 12;      /* change this if you change the font*/



}

map_State.prototype.mouseClick = function(x,y,state)
{
   if ( this.myClickCallback != null )
   {
      this.myClickCallback(x,y,state); 
   }
}

map_State.prototype.draw = function()
{

   var fillColor;
   var borderColor;
   
   if ( this.myRenderCount == 0 )
   {
      return;
   }
   else if ( this.myRenderCount < 0 )
   {
      this.myIdle = false;
      this.myRenderCount++;

      var sourceR = this.myHighlightRGB[0];
      var sourceG = this.myHighlightRGB[1];
      var sourceB = this.myHighlightRGB[2];

      var targetR = this.myBaseRGB[0];
      var targetG = this.myBaseRGB[1];
      var targetB = this.myBaseRGB[2];

      var stepR = (targetR - sourceR) / this.myGradOffset;
      var stepG = (targetG - sourceG) / this.myGradOffset;
      var stepB = (targetB - sourceB) / this.myGradOffset;

      var r = Math.floor(targetR + ( stepR * this.myRenderCount ));
      var g = Math.floor(targetG + ( stepG * this.myRenderCount ));
      var b = Math.floor(targetB + ( stepB * this.myRenderCount ));
      
      fillColor = "rgb(" + r + "," + g + "," + b + ")";
   }
   else 
   {
      this.myRenderCount--;

      var targetR = this.myHighlightRGB[0];
      var targetG = this.myHighlightRGB[1];
      var targetB = this.myHighlightRGB[2];

      var sourceR = this.myBaseRGB[0];
      var sourceG = this.myBaseRGB[1];
      var sourceB = this.myBaseRGB[2];

      var stepR = (targetR - sourceR) / this.myGradOffset;
      var stepG = (targetG - sourceG) / this.myGradOffset;
      var stepB = (targetB - sourceB) / this.myGradOffset;

      var r = Math.floor(targetR - ( stepR * this.myRenderCount ));
      var g = Math.floor(targetG - ( stepG * this.myRenderCount ));
      var b = Math.floor(targetB - ( stepB * this.myRenderCount ));

      fillColor = "rgb(" + r + "," + g + "," + b + ")";
   }

   if ( this.myHighlighted ) 
      borderColor = this.myHighlightBorderColor;
   else
      borderColor = this.myBorderColor;

   g_map_context.strokeStyle = borderColor;
   g_map_context.fillStyle = fillColor;

   for ( var i = 0; i < this.myPolygons.length; ++i)
   {
      g_map_context.beginPath();

      for ( var j = 0; j < this.myPolygons[i].myXVals.length; ++j )
      {
         var x = this.myPolygons[i].myXVals[j];
         var y = this.myPolygons[i].myYVals[j];

         y = g_map_canvas.height - y;

         if ( j == 0 )
            g_map_context.moveTo(x,y);
         else
            g_map_context.lineTo(x,y);
       }

       g_map_context.closePath();

       if ( this.myUseFill )
       {
          g_map_context.fill();
       }
       g_map_context.stroke();
    }

    if (this.myUseInfoBox)
    {
       this.drawInfoBox();
    }

}


map_State.prototype.drawInfoBox = function()
{
    g_map_context.lineWidth = 2;
    g_map_context.fillStyle = g_map_backgroundColor;
    g_map_context.strokeStyle = g_map_backgroundColor;
    g_map_context.beginPath();
    g_map_context.moveTo(this.myInfoBoxOrigin[0],this.myInfoBoxOrigin[1]);
    g_map_context.lineTo(this.myInfoBoxOrigin[0]+this.myInfoBoxWidth,
                     this.myInfoBoxOrigin[1]);
    g_map_context.lineTo(this.myInfoBoxOrigin[0]+this.myInfoBoxWidth,
                     this.myInfoBoxOrigin[1]+this.myInfoBoxHeight);
    g_map_context.lineTo(this.myInfoBoxOrigin[0],
                     this.myInfoBoxOrigin[1]+this.myInfoBoxHeight);
    g_map_context.closePath();
    g_map_context.stroke();
    g_map_context.fill();
    g_map_context.lineWidth = 1;

    var r = this.myInfoBoxFillRGB[0];
    var g = this.myInfoBoxFillRGB[1];
    var b = this.myInfoBoxFillRGB[2];

    var alpha = (this.myGradOffset - this.myRenderCount) / this.myGradOffset;
    if ( this.myRenderCount < 0 )
    {
       alpha = (this.myGradOffset + this.myRenderCount) / this.myGradOffset;
       alpha = 1.0 - alpha;
    }

    if ( this.myRenderCount == 0 )
    {
       if ( this.myHighlighted )
          alpha = 1.0;
       else
          alpha = 0.0;
    }
   
    r = this.myInfoBoxBorderRGB[0];
    g = this.myInfoBoxBorderRGB[1];
    b = this.myInfoBoxBorderRGB[2];

    borderColor = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";

    g_map_context.strokeStyle = borderColor;

    g_map_context.beginPath();
    g_map_context.moveTo(this.myInfoBoxOrigin[0],this.myInfoBoxOrigin[1]);
    g_map_context.lineTo(this.myInfoBoxOrigin[0]+this.myInfoBoxWidth,
                     this.myInfoBoxOrigin[1]);
    g_map_context.lineTo(this.myInfoBoxOrigin[0]+this.myInfoBoxWidth,
                     this.myInfoBoxOrigin[1]+this.myInfoBoxHeight);
    g_map_context.lineTo(this.myInfoBoxOrigin[0],
                     this.myInfoBoxOrigin[1]+this.myInfoBoxHeight);
    g_map_context.closePath();
    g_map_context.stroke();

    r = this.myInfoBoxFillRGB[0];
    g = this.myInfoBoxFillRGB[1];
    b = this.myInfoBoxFillRGB[2];
    fillColor = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
    g_map_context.fillStyle = fillColor;
    g_map_context.fill();

    r = this.myInfoBoxTextRGB[0];
    g = this.myInfoBoxTextRGB[1];
    b = this.myInfoBoxTextRGB[2];

    fillColor = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
    g_map_context.fillStyle = fillColor;

    for ( var i = 0; i < this.myInfoBoxText.length; ++i)
    {
       g_map_context.fillText( this.myInfoBoxText[i], 
                           this.myInfoBoxOrigin[0]+2,
                   this.myInfoBoxOrigin[1] + this.myInfoBoxTextHeight * (i+1) );
    }
}

map_State.prototype.addInfoBoxText = function(text)
{
   this.setInfoBoxText(text,false);
}

map_State.prototype.setInfoBoxText = function(text, clearflag)
{
    if ( clearflag == undefined || clearflag == true)
    {
       this.myInfoBoxText = new Array();
    }

    var splitString = text.split(" ");

    var justFinishedALine = false;
    var currentWordIndex = 0;
    var stringBuilder = splitString[currentWordIndex];
    var testString = stringBuilder;

    currentWordIndex++;

    while ( currentWordIndex <= splitString.length )
    {
       if ( currentWordIndex < splitString.length )
       {
          testString += " ";
          testString += splitString[currentWordIndex];
       }
       var metrics = g_map_context.measureText(testString);

       if ( metrics.width <= this.myInfoBoxWidth-2 )
       {
          if ( currentWordIndex < splitString.length )
          {
             stringBuilder += " ";
             stringBuilder += splitString[currentWordIndex];
          }
          currentWordIndex++;
          justFinishedALine = false;
       }
       else
       {
          metrics = g_map_context.measureText(stringBuilder);
          if (metrics.width > this.myInfoBoxWidth-2 )
          {
             stringBuilder = "<Overflow text length>";
             testString = stringBuilder;
          }
          this.myInfoBoxText.push(stringBuilder);

          if (currentWordIndex < splitString.length )
             stringBuilder = splitString[currentWordIndex];
          else
             stringBuilder = "";

          testString = stringBuilder;
          currentWordIndex++;
          justFinishedALine = true;
       }
    }

    if ( !justFinishedALine )
    {
       this.myInfoBoxText.push(stringBuilder);
    }
     
}

function drawRankBox(myRankBoxText)
{
   
    g_map_context.lineWidth = 2;
    g_map_context.fillStyle = "white";
    g_map_context.strokeStyle = "black";
    g_map_context.beginPath();
    g_map_context.moveTo(myRankBoxOrigin[0],myRankBoxOrigin[1]);
    g_map_context.lineTo(myRankBoxOrigin[0]+myRankBoxWidth,
                     myRankBoxOrigin[1]);
    g_map_context.lineTo(myRankBoxOrigin[0]+myRankBoxWidth,
                     myRankBoxOrigin[1]+myRankBoxHeight);
    g_map_context.lineTo(myRankBoxOrigin[0],
                     myRankBoxOrigin[1]+myRankBoxHeight);
    g_map_context.closePath();
    g_map_context.stroke();
    g_map_context.fill();
    g_map_context.lineWidth = 1;

    var r = myRankBoxFillRGB[0];
    var g = myRankBoxFillRGB[1];
    var b = myRankBoxFillRGB[2];


    alpha = 1.0;
   
    r = myRankBoxBorderRGB[0];
    g = myRankBoxBorderRGB[1];
    b = myRankBoxBorderRGB[2];

    borderColor = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";

    g_map_context.strokeStyle = borderColor;

    g_map_context.beginPath();
    g_map_context.moveTo(myRankBoxOrigin[0],myRankBoxOrigin[1]);
    g_map_context.lineTo(myRankBoxOrigin[0]+myRankBoxWidth,
                     myRankBoxOrigin[1]);
    g_map_context.lineTo(myRankBoxOrigin[0]+myRankBoxWidth,
                     myRankBoxOrigin[1]+myRankBoxHeight);
    g_map_context.lineTo(myRankBoxOrigin[0],
                     myRankBoxOrigin[1]+myRankBoxHeight);
    g_map_context.closePath();
    g_map_context.stroke();

    r = myRankBoxFillRGB[0];
    g = myRankBoxFillRGB[1];
    b = myRankBoxFillRGB[2];
    fillColor = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
    g_map_context.fillStyle = fillColor;
    g_map_context.fill();

    r = myRankBoxTextRGB[0];
    g = myRankBoxTextRGB[1];
    b = myRankBoxTextRGB[2];

    fillColor = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
    g_map_context.fillStyle = fillColor;

    for ( var i = 0; i < myRankBoxText.length; ++i)
    {
       g_map_context.fillText( myRankBoxText[i], 
                           myRankBoxOrigin[0]+2,
                   myRankBoxOrigin[1] + myRankBoxTextHeight * (i+1) );
    }
}

function addRankBoxText(text)
{
   setRankBoxText(text,false);
}

function setRankBoxText(text, clearflag)
{
    if ( clearflag == undefined || clearflag == true)
    {
       myRankBoxText = new Array();
    }

    var splitString = text.split(" ");

    var justFinishedALine = false;
    var currentWordIndex = 0;
    var stringBuilder = splitString[currentWordIndex];
    var testString = stringBuilder;

    currentWordIndex++;

    while ( currentWordIndex <= splitString.length )
    {
       if ( currentWordIndex < splitString.length )
       {
          testString += " ";
          testString += splitString[currentWordIndex];
       }
       var metrics = g_map_context.measureText(testString);

       if ( metrics.width <= myRankBoxWidth-2 )
       {
          if ( currentWordIndex < splitString.length )
          {
             stringBuilder += " ";
             stringBuilder += splitString[currentWordIndex];
          }
          currentWordIndex++;
          justFinishedALine = false;
       }
       else
       {
          metrics = g_map_context.measureText(stringBuilder);
          if (metrics.width > myRankBoxWidth-2 )
          {
             stringBuilder = "<Overflow text length>";
             testString = stringBuilder;
          }
          myRankBoxText.push(stringBuilder);

          if (currentWordIndex < splitString.length )
             stringBuilder = splitString[currentWordIndex];
          else
             stringBuilder = "";

          testString = stringBuilder;
          currentWordIndex++;
          justFinishedALine = true;
       }
    }

    if ( !justFinishedALine )
    {
       myRankBoxText.push(stringBuilder);
    }
     
}

map_State.prototype.updateColor = function(highlight)
{
   if ( highlight == undefined || highlight == false )
      this.myRenderCount = -1 * this.myGradOffset;
   else
      this.myRenderCount = this.myGradOffset;
}

map_State.prototype.mouseIn = function()
{
   if ( !this.myHighlighted )
   {
      this.myRenderCount = this.myGradOffset;
   }

   this.myHighlighted = true;
}

map_State.prototype.mouseOut = function()
{
   if ( this.myHighlighted )
   {
      this.myRenderCount = this.myGradOffset * -1;
   }

   this.myHighlighted = false;
}

function map_createStateData()
{
   g_map_stateMap = new Array();
   var theStateArray = new Array();

theStateArray.push( new map_State("CAF","Central African Republic","Central African Republic") );
g_map_stateMap["CAF"] = theStateArray[0];
theStateArray[0].myPolygons.push( new map_Polygon() );
theStateArray[0].myPolygons[0].myXVals= [876, 880, 881, 882, 883, 889, 891, 894, 894, 895, 900, 905, 908, 911, 914, 914, 917, 917, 916, 917, 919, 922, 925, 925, 928, 931, 932, 936, 936, 935, 932, 928, 926, 925, 924, 922, 916, 914, 913, 912, 908, 904, 901, 897, 894, 892, 892, 889, 885, 882, 880, 879, 879, 877, 875, 874, 872, 872, 872, 872, 873, 876] ;
theStateArray[0].myPolygons[0].myYVals= [537, 537, 538, 538, 537, 539, 541, 543, 544, 545, 545, 547, 552, 554, 555, 553, 550, 548, 546, 544, 543, 541, 539, 537, 534, 532, 529, 527, 526, 525, 525, 526, 525, 524, 524, 525, 523, 523, 523, 520, 521, 521, 523, 525, 523, 521, 517, 517, 518, 515, 511, 512, 515, 516, 519, 521, 523, 525, 527, 531, 532, 537] ;
theStateArray.push( new map_State("BDI","Burundi","Burundi") );
g_map_stateMap["BDI"] = theStateArray[1];
theStateArray[1].myPolygons.push( new map_Polygon() );
theStateArray[1].myPolygons[0].myXVals= [946, 946, 945, 948, 949, 952, 952, 953, 953, 952, 950, 948, 946] ;
theStateArray[1].myPolygons[0].myYVals= [477, 483, 485, 485, 488, 487, 485, 484, 483, 482, 479, 477, 477] ;
theStateArray.push( new map_State("AGO","Angola","Angola") );
g_map_stateMap["AGO"] = theStateArray[2];
theStateArray[2].myPolygons.push( new map_Polygon() );
theStateArray[2].myPolygons[0].myXVals= [881, 882, 884, 885, 887, 890, 892, 895, 895, 897, 900, 900, 903, 902, 908, 908, 909, 909, 909, 911, 910, 912, 914, 917, 919, 920, 919, 920, 919, 920, 909, 909, 912, 916, 906, 894, 891, 871, 870, 867, 864, 861, 858, 858, 858, 860, 860, 862, 863, 866, 868, 868, 868, 866, 865, 864, 864, 866, 864, 863, 861, 861, 863, 865, 866, 881] ;
theStateArray[2].myPolygons[0].myYVals= [470, 466, 463, 462, 459, 460, 460, 460, 461, 464, 464, 465, 465, 463, 463, 460, 458, 455, 452, 450, 444, 445, 444, 445, 445, 443, 441, 439, 437, 435, 435, 419, 415, 412, 410, 411, 413, 413, 412, 415, 415, 414, 413, 416, 421, 425, 427, 432, 434, 437, 439, 443, 446, 448, 451, 454, 455, 457, 462, 465, 468, 469, 470, 470, 470, 470] ;
theStateArray[2].myPolygons.push( new map_Polygon() );
theStateArray[2].myPolygons[1].myXVals= [862, 860, 859, 861, 863, 864, 863, 862, 862] ;
theStateArray[2].myPolygons[1].myYVals= [471, 471, 474, 476, 477, 476, 475, 473, 471] ;
theStateArray.push( new map_State("COD","Democratic Republic of the Congo","Democratic Republic of the Congo") );
g_map_stateMap["COD"] = theStateArray[3];
theStateArray[3].myPolygons.push( new map_Polygon() );
theStateArray[3].myPolygons[0].myXVals= [954, 953, 955, 954, 952, 950, 949, 949, 947, 947, 946, 946, 945, 945, 946, 946, 947, 947, 948, 950, 953, 951, 945, 943, 942, 943, 942, 941, 943, 946, 948, 948, 944, 942, 940, 936, 935, 932, 928, 927, 923, 921, 921, 919, 917, 914, 912, 910, 911, 909, 909, 909, 908, 908, 902, 903, 900, 900, 897, 895, 895, 892, 890, 887, 885, 884, 882, 881, 866, 865, 863, 861, 860, 862, 862, 863, 864, 866, 868, 870, 871, 872, 875, 878, 880, 879, 882, 884, 887, 888, 888, 889, 888, 889, 890, 891, 892, 892, 894, 897, 901, 904, 908, 912, 913, 914, 916, 922, 924, 925, 926, 928, 932, 935, 936, 939, 942, 943, 945, 948, 949, 954] ;
theStateArray[3].myPolygons[0].myYVals= [517, 511, 511, 509, 507, 505, 502, 498, 497, 493, 491, 488, 488, 485, 483, 477, 472, 470, 467, 464, 458, 458, 457, 457, 454, 451, 446, 441, 440, 438, 439, 433, 433, 436, 438, 439, 441, 440, 441, 443, 443, 443, 445, 445, 445, 444, 445, 444, 450, 452, 455, 458, 460, 463, 463, 465, 465, 464, 464, 461, 460, 460, 460, 459, 462, 463, 466, 470, 470, 470, 470, 469, 471, 471, 473, 475, 476, 475, 477, 477, 476, 475, 478, 480, 482, 486, 491, 493, 496, 497, 499, 501, 504, 508, 511, 514, 517, 521, 523, 525, 523, 521, 521, 520, 523, 523, 523, 525, 524, 524, 525, 526, 525, 525, 526, 522, 521, 522, 521, 523, 520, 517] ;
theStateArray.push( new map_State("BWA","Botswana","Botswana") );
g_map_stateMap["BWA"] = theStateArray[4];
theStateArray[4].myPolygons.push( new map_Polygon() );
theStateArray[4].myPolygons[0].myXVals= [928, 929, 930, 936, 938, 938, 940, 943, 947, 940, 935, 933, 932, 929, 928, 928, 925, 921, 918, 916, 914, 912, 910, 908, 904, 903, 903, 900, 899, 899, 904, 904, 908, 915, 917, 921, 922, 925, 926, 928] ;
theStateArray[4].myPolygons[0].myYVals= [407, 406, 403, 398, 397, 395, 392, 391, 389, 385, 382, 378, 376, 376, 374, 372, 371, 371, 373, 373, 372, 370, 368, 366, 365, 367, 370, 375, 376, 390, 390, 408, 408, 410, 408, 410, 410, 411, 411, 407] ;
theStateArray.push( new map_State("COG","Republic of Congo","Republic of Congo") );
g_map_stateMap["COG"] = theStateArray[5];
theStateArray[5].myPolygons.push( new map_Polygon() );
theStateArray[5].myPolygons[0].myXVals= [864, 863, 861, 859, 855, 859, 857, 859, 862, 862, 865, 869, 871, 872, 871, 869, 871, 870, 866, 865, 865, 871, 875, 879, 880, 882, 885, 889, 892, 891, 890, 889, 888, 889, 888, 888, 887, 884, 882, 879, 880, 878, 875, 872, 871, 870, 868, 866, 864] ;
theStateArray[5].myPolygons[0].myYVals= [476, 477, 476, 474, 480, 482, 486, 487, 488, 490, 487, 487, 490, 493, 497, 500, 505, 506, 506, 509, 511, 511, 509, 508, 511, 515, 518, 517, 517, 514, 511, 508, 504, 501, 499, 497, 496, 493, 491, 486, 482, 480, 478, 475, 476, 477, 477, 475, 476] ;
theStateArray.push( new map_State("CIV","Ivory Coast","Ivory Coast") );
g_map_stateMap["CIV"] = theStateArray[6];
theStateArray[6].myPolygons.push( new map_Polygon() );
theStateArray[6].myPolygons[0].myXVals= [785, 783, 779, 776, 770, 767, 762, 761, 761, 762, 762, 760, 758, 756, 758, 757, 757, 758, 758, 758, 758, 760, 759, 758, 758, 759, 760, 761, 765, 766, 767, 768, 769, 770, 772, 775, 776, 778, 780, 782, 785, 787, 785, 783, 785, 785] ;
theStateArray[6].myPolygons[0].myYVals= [524, 524, 525, 525, 524, 523, 521, 521, 525, 526, 528, 530, 530, 532, 534, 536, 538, 538, 540, 541, 542, 542, 546, 548, 550, 551, 551, 550, 550, 552, 552, 552, 550, 551, 551, 550, 549, 548, 549, 549, 548, 541, 536, 531, 526, 524] ;
theStateArray.push( new map_State("BFA","Burkina Faso","Burkina Faso") );
g_map_stateMap["BFA"] = theStateArray[7];
theStateArray[7].myPolygons.push( new map_Polygon() );
theStateArray[7].myPolygons[0].myXVals= [785, 782, 780, 778, 776, 775, 772, 772, 774, 773, 777, 778, 779, 782, 784, 785, 789, 789, 794, 797, 798, 801, 801, 802, 804, 805, 810, 810, 809, 807, 806, 804, 800, 797, 796, 793, 785, 785, 785] ;
theStateArray[7].myPolygons[0].myYVals= [548, 549, 549, 548, 549, 550, 551, 554, 556, 558, 562, 566, 567, 566, 567, 568, 571, 572, 574, 575, 574, 574, 572, 569, 566, 564, 563, 559, 558, 557, 555, 554, 555, 555, 554, 555, 554, 551, 548] ;
theStateArray.push( new map_State("DZA","Algeria","Algeria") );
g_map_stateMap["DZA"] = theStateArray[8];
theStateArray[8].myPolygons.push( new map_Polygon() );
theStateArray[8].myPolygons[0].myXVals= [859, 842, 828, 821, 815, 815, 813, 810, 809, 792, 775, 756, 756, 756, 756, 764, 769, 773, 775, 781, 781, 784, 786, 793, 794, 793, 791, 791, 789, 793, 799, 802, 807, 815, 824, 826, 831, 836, 838, 842, 841, 841, 840, 837, 838, 842, 842, 845, 847, 849, 849, 848, 848, 848, 848, 846, 849, 849, 851, 853, 857, 859] ;
theStateArray[8].myPolygons[0].myYVals= [617, 607, 598, 595, 595, 598, 599, 600, 603, 613, 624, 636, 637, 638, 644, 647, 648, 650, 652, 654, 658, 658, 660, 661, 663, 664, 669, 672, 675, 678, 679, 681, 683, 683, 684, 683, 685, 685, 684, 684, 682, 677, 673, 670, 666, 663, 662, 660, 651, 647, 644, 640, 638, 635, 632, 630, 626, 624, 621, 622, 620, 617] ;
theStateArray.push( new map_State("ETH","Ethiopia","Ethiopia") );
g_map_stateMap["ETH"] = theStateArray[9];
theStateArray[9].myPolygons.push( new map_Polygon() );
theStateArray[9].myPolygons[0].myXVals= [989, 992, 995, 996, 1000, 1004, 1005, 1007, 1010, 1011, 1010, 1008, 1008, 1008, 1011, 1012, 1013, 1012, 1014, 1016, 1018, 1034, 1038, 1024, 1018, 1013, 1010, 1009, 1005, 1003, 999, 997, 994, 993, 992, 990, 984, 980, 979, 979, 976, 973, 971, 970, 967, 964, 966, 969, 969, 969, 971, 973, 974, 976, 979, 981, 982, 987, 989] ;
theStateArray[9].myPolygons[0].myYVals= [574, 572, 573, 572, 572, 570, 568, 567, 564, 562, 560, 558, 556, 555, 555, 555, 554, 552, 550, 547, 545, 539, 540, 525, 524, 521, 521, 519, 519, 521, 519, 517, 517, 518, 517, 517, 522, 522, 523, 526, 527, 532, 534, 536, 538, 538, 541, 541, 543, 547, 553, 554, 556, 560, 562, 567, 572, 571, 574] ;
theStateArray.push( new map_State("EGY","Egypt","Egypt") );
g_map_stateMap["EGY"] = theStateArray[10];
theStateArray[10].myPolygons.push( new map_Polygon() );
theStateArray[10].myPolygons[0].myXVals= [974, 973, 972, 970, 969, 967, 965, 962, 961, 963, 966, 970, 972, 973, 978, 977, 977, 983, 984, 964, 945, 925, 925, 925, 923, 924, 924, 925, 932, 937, 942, 944, 948, 950, 954, 958, 959, 960, 964, 968, 971, 974] ;
theStateArray[10].myPolygons[0].myYVals= [647, 645, 641, 639, 638, 639, 642, 649, 648, 643, 638, 630, 627, 625, 619, 618, 615, 611, 610, 610, 610, 610, 628, 646, 650, 653, 655, 657, 657, 656, 655, 654, 655, 657, 657, 657, 654, 656, 655, 654, 656, 647] ;
theStateArray.push( new map_State("GIN","Guinea","Guinea") );
g_map_stateMap["GIN"] = theStateArray[11];
theStateArray[11].myPolygons.push( new map_Polygon() );
theStateArray[11].myPolygons[0].myXVals= [757, 756, 755, 753, 752, 753, 751, 749, 748, 747, 747, 746, 746, 745, 744, 740, 739, 737, 737, 736, 733, 731, 729, 728, 727, 726, 725, 724, 726, 728, 729, 730, 731, 730, 731, 731, 733, 737, 738, 738, 741, 742, 742, 743, 744, 745, 747, 749, 750, 752, 753, 754, 755, 756, 758, 757, 756, 757, 758, 758, 759, 758, 758, 759, 760, 758, 758, 758, 758, 757] ;
theStateArray[11].myPolygons[0].myYVals= [538, 538, 536, 536, 537, 539, 542, 542, 542, 541, 543, 544, 546, 548, 550, 550, 549, 549, 548, 546, 544, 547, 549, 550, 551, 553, 554, 555, 557, 557, 558, 558, 559, 560, 561, 562, 562, 561, 561, 562, 561, 562, 560, 560, 561, 560, 559, 559, 560, 560, 561, 561, 560, 559, 556, 555, 554, 554, 553, 552, 551, 550, 548, 546, 542, 542, 541, 540, 538, 538] ;
theStateArray.push( new map_State("ERI","Eritrea","Eritrea") );
g_map_stateMap["ERI"] = theStateArray[12];
theStateArray[12].myPolygons.push( new map_Polygon() );
theStateArray[12].myPolygons[0].myXVals= [1011, 1010, 1007, 1005, 1004, 1000, 996, 995, 992, 989, 987, 982, 981, 983, 984, 985, 989, 992, 994, 996, 999, 1005, 1008, 1011, 1012, 1015, 1013, 1011] ;
theStateArray[12].myPolygons[0].myYVals= [562, 564, 567, 568, 570, 572, 572, 573, 572, 574, 571, 572, 574, 581, 584, 586, 587, 589, 584, 579, 577, 572, 569, 566, 565, 563, 562, 562] ;
theStateArray.push( new map_State("GNB","Guinea Bissau","Guinea Bissau") );
g_map_stateMap["GNB"] = theStateArray[13];
theStateArray[13].myPolygons.push( new map_Polygon() );
theStateArray[13].myPolygons[0].myXVals= [724, 721, 719, 718, 718, 716, 716, 719, 720, 722, 731, 731, 730, 731, 730, 729, 728, 726, 724] ;
theStateArray[13].myPolygons[0].myYVals= [555, 557, 557, 559, 559, 560, 561, 562, 562, 563, 562, 561, 560, 559, 558, 558, 557, 557, 555] ;
theStateArray.push( new map_State("GHA","Ghana","Ghana") );
g_map_stateMap["GHA"] = theStateArray[14];
theStateArray[14].myPolygons.push( new map_Polygon() );
theStateArray[14].myPolygons[0].myXVals= [805, 797, 794, 790, 785, 785, 783, 785, 787, 785, 785, 785, 793, 796, 797, 800, 799, 801, 801, 802, 803, 802, 802, 804, 805] ;
theStateArray[14].myPolygons[0].myYVals= [529, 526, 525, 523, 524, 526, 531, 536, 541, 548, 551, 554, 555, 554, 555, 555, 553, 550, 547, 543, 541, 537, 534, 531, 529] ;
theStateArray.push( new map_State("GNQ","Equatorial Guinea","Equatorial Guinea") );
g_map_stateMap["GNQ"] = theStateArray[15];
theStateArray[15].myPolygons.push( new map_Polygon() );
theStateArray[15].myPolygons[0].myXVals= [847, 846, 848, 856, 856, 849, 847] ;
theStateArray[15].myPolygons[0].myYVals= [505, 505, 511, 511, 505, 505, 505] ;
theStateArray.push( new map_State("LBY","Libya","Libya") );
g_map_stateMap["LBY"] = theStateArray[16];
theStateArray[16].myPolygons.push( new map_Polygon() );
theStateArray[16].myPolygons[0].myXVals= [874, 870, 867, 859, 857, 853, 851, 849, 849, 846, 848, 848, 848, 848, 849, 849, 847, 849, 850, 849, 853, 854, 857, 857, 863, 865, 869, 876, 878, 883, 890, 895, 897, 900, 899, 900, 904, 907, 914, 916, 918, 919, 924, 925, 924, 924, 923, 925, 925, 925, 925, 919, 919, 899, 879, 874] ;
theStateArray[16].myPolygons[0].myYVals= [614, 612, 615, 617, 620, 622, 621, 624, 626, 630, 632, 635, 638, 640, 644, 647, 651, 652, 654, 656, 658, 660, 661, 665, 663, 664, 663, 661, 656, 655, 653, 651, 652, 654, 658, 661, 663, 664, 663, 660, 660, 660, 659, 657, 655, 653, 650, 646, 628, 610, 600, 600, 597, 607, 617, 614] ;
theStateArray.push( new map_State("LBR","Liberia","Liberia") );
g_map_stateMap["LBR"] = theStateArray[17];
theStateArray[17].myPolygons.push( new map_Polygon() );
theStateArray[17].myPolygons[0].myXVals= [761, 760, 754, 750, 746, 742, 744, 744, 746, 748, 749, 751, 753, 752, 753, 755, 756, 757, 757, 758, 756, 758, 760, 762, 762, 761, 761] ;
theStateArray[17].myPolygons[0].myYVals= [521, 521, 524, 527, 530, 533, 535, 536, 539, 542, 542, 542, 539, 537, 536, 536, 538, 538, 536, 534, 532, 530, 530, 528, 526, 525, 521] ;
theStateArray.push( new map_State("KEN","Kenya","Kenya") );
g_map_stateMap["KEN"] = theStateArray[18];
theStateArray[18].myPolygons.push( new map_Polygon() );
theStateArray[18].myPolygons[0].myXVals= [1004, 1007, 1004, 1003, 1001, 1000, 999, 998, 996, 988, 988, 970, 969, 969, 970, 973, 975, 972, 972, 970, 973, 976, 979, 979, 980, 984, 990, 992, 993, 994, 997, 999, 1003, 1005, 1009, 1004, 1004] ;
theStateArray[18].myPolygons[0].myYVals= [495, 491, 489, 487, 487, 483, 481, 478, 476, 481, 484, 494, 495, 500, 502, 505, 509, 515, 517, 521, 524, 527, 526, 523, 522, 522, 517, 517, 518, 517, 517, 519, 521, 519, 519, 513, 495] ;
theStateArray.push( new map_State("MAR","Morocco","Morocco") );
g_map_stateMap["MAR"] = theStateArray[19];
theStateArray[19].myPolygons.push( new map_Polygon() );
theStateArray[19].myPolygons[0].myXVals= [774, 777, 781, 786, 789, 791, 791, 793, 794, 793, 786, 784, 781, 781, 775, 773, 769, 764, 756, 756, 755, 755, 756, 752, 751, 749, 747, 743, 741, 739, 737, 730, 728, 726, 726, 714, 714, 715, 717, 718, 718, 720, 722, 724, 725, 725, 727, 731, 734, 734, 736, 741, 745, 748, 752, 750, 752, 753, 756, 761, 765, 768, 770, 774] ;
theStateArray[19].myPolygons[0].myYVals= [678, 676, 676, 675, 675, 672, 669, 664, 663, 661, 660, 658, 658, 654, 652, 650, 648, 647, 644, 638, 638, 638, 635, 635, 634, 634, 634, 634, 630, 630, 623, 618, 611, 609, 607, 607, 607, 609, 610, 613, 615, 618, 621, 622, 625, 628, 631, 633, 638, 638, 640, 640, 644, 645, 649, 655, 660, 662, 666, 668, 670, 675, 678, 678] ;
theStateArray.push( new map_State("CMR","Cameroon","Cameroon") );
g_map_stateMap["CMR"] = theStateArray[20];
theStateArray[20].myPolygons.push( new map_Polygon() );
theStateArray[20].myPolygons[0].myXVals= [865, 864, 861, 858, 856, 848, 848, 847, 844, 843, 842, 842, 843, 846, 847, 850, 852, 855, 858, 859, 860, 861, 863, 864, 865, 866, 867, 872, 872, 872, 870, 871, 872, 874, 874, 874, 877, 874, 873, 870, 869, 872, 874, 875, 877, 876, 873, 872, 872, 872, 872, 874, 875, 877, 879, 879, 880, 879, 875, 871, 865] ;
theStateArray[20].myPolygons[0].myYVals= [511, 511, 510, 511, 511, 511, 515, 518, 519, 521, 522, 523, 527, 532, 532, 535, 535, 533, 534, 536, 538, 541, 543, 547, 548, 550, 553, 557, 559, 560, 562, 564, 564, 561, 557, 554, 549, 549, 549, 550, 547, 544, 543, 541, 538, 537, 532, 531, 527, 525, 523, 521, 519, 516, 515, 512, 511, 508, 509, 511, 511] ;
theStateArray.push( new map_State("BEN","Benin","Benin") );
g_map_stateMap["BEN"] = theStateArray[21];
theStateArray[21].myPolygons.push( new map_Polygon() );
theStateArray[21].myPolygons[0].myXVals= [813, 809, 808, 808, 807, 807, 805, 803, 804, 806, 807, 809, 810, 812, 814, 818, 817, 818, 818, 818, 816, 814, 813, 813, 813] ;
theStateArray[21].myPolygons[0].myYVals= [531, 530, 534, 545, 546, 549, 550, 552, 554, 555, 557, 558, 559, 561, 561, 558, 556, 553, 551, 550, 547, 545, 542, 539, 531] ;
theStateArray.push( new map_State("MOZ","Mozambique","Mozambique") );
g_map_stateMap["MOZ"] = theStateArray[22];
theStateArray[22].myPolygons.push( new map_Polygon() );
theStateArray[22].myPolygons[0].myXVals= [972, 976, 982, 983, 987, 989, 992, 997, 1001, 1002, 1002, 1002, 1002, 1003, 1002, 1000, 997, 992, 987, 981, 979, 975, 973, 973, 975, 976, 976, 977, 977, 976, 978, 977, 975, 971, 965, 962, 963, 964, 964, 960, 959, 959, 958, 959, 958, 955, 961, 962, 963, 963, 963, 963, 964, 964, 961, 959, 958, 955, 951, 951, 950, 966, 968, 970, 972, 972, 971, 971, 975, 976, 978, 978, 976, 974, 972, 971, 972] ;
theStateArray[22].myPolygons[0].myYVals= [442, 442, 441, 442, 442, 443, 443, 445, 448, 446, 441, 436, 428, 426, 422, 419, 416, 414, 412, 406, 405, 402, 401, 397, 393, 390, 389, 389, 384, 382, 381, 379, 377, 375, 373, 371, 369, 368, 366, 366, 368, 370, 372, 378, 381, 388, 394, 398, 398, 401, 402, 406, 410, 416, 418, 418, 419, 420, 420, 422, 426, 430, 427, 428, 426, 424, 422, 419, 415, 419, 420, 426, 430, 432, 432, 438, 442] ;
theStateArray.push( new map_State("MLI","Mali","Mali") );
g_map_stateMap["MLI"] = theStateArray[23];
theStateArray[23].myPolygons.push( new map_Polygon() );
theStateArray[23].myPolygons[0].myXVals= [739, 740, 741, 743, 746, 749, 751, 752, 772, 773, 772, 770, 767, 775, 792, 809, 810, 813, 815, 815, 821, 821, 818, 818, 813, 806, 805, 801, 798, 797, 794, 789, 789, 785, 784, 782, 779, 778, 777, 773, 774, 772, 772, 770, 769, 768, 767, 766, 765, 761, 760, 759, 758, 758, 757, 756, 757, 758, 756, 755, 754, 753, 752, 750, 749, 747, 745, 744, 743, 742, 742, 742, 742, 740, 739, 739] ;
theStateArray[23].myPolygons[0].myYVals= [573, 573, 576, 577, 575, 576, 576, 577, 577, 581, 581, 603, 624, 624, 613, 603, 600, 599, 598, 595, 595, 584, 580, 577, 577, 576, 574, 574, 574, 575, 574, 572, 571, 568, 567, 566, 567, 566, 562, 558, 556, 554, 551, 551, 550, 552, 552, 552, 550, 550, 551, 551, 552, 553, 554, 554, 555, 556, 559, 560, 561, 561, 560, 560, 559, 559, 560, 561, 560, 560, 562, 563, 565, 567, 569, 573] ;
theStateArray.push( new map_State("DJI","Djibouti","Djibouti") );
g_map_stateMap["DJI"] = theStateArray[24];
theStateArray[24].myPolygons.push( new map_Polygon() );
theStateArray[24].myPolygons[0].myXVals= [1015, 1016, 1016, 1013, 1015, 1013, 1012, 1011, 1008, 1008, 1008, 1010, 1011, 1013, 1015] ;
theStateArray[24].myPolygons[0].myYVals= [563, 561, 559, 558, 557, 554, 555, 555, 555, 556, 558, 560, 562, 562, 563] ;
theStateArray.push( new map_State("MWI","Malawi","Malawi") );
g_map_stateMap["MWI"] = theStateArray[25];
theStateArray[25].myPolygons.push( new map_Polygon() );
theStateArray[25].myPolygons[0].myXVals= [972, 971, 972, 974, 976, 978, 978, 976, 975, 971, 971, 972, 972, 970, 968, 966, 963, 964, 966, 965, 966, 967, 966, 963, 968, 969, 971, 972] ;
theStateArray[25].myPolygons[0].myYVals= [442, 438, 432, 432, 430, 426, 420, 419, 415, 419, 422, 424, 426, 428, 427, 430, 431, 436, 437, 441, 446, 447, 451, 453, 452, 451, 449, 442] ;
theStateArray.push( new map_State("NAM","Namibia","Namibia") );
g_map_stateMap["NAM"] = theStateArray[26];
theStateArray[26].myPolygons.push( new map_Polygon() );
theStateArray[26].myPolygons[0].myXVals= [881, 878, 876, 874, 873, 872, 871, 871, 869, 866, 864, 863, 858, 858, 861, 864, 867, 870, 871, 891, 894, 906, 916, 920, 923, 925, 925, 922, 921, 917, 915, 908, 904, 904, 899, 899, 899, 895, 892, 889, 886, 886, 884, 881] ;
theStateArray[26].myPolygons[0].myYVals= [357, 360, 364, 369, 373, 380, 386, 389, 391, 395, 401, 404, 409, 413, 414, 415, 415, 412, 413, 413, 411, 410, 412, 413, 413, 412, 411, 410, 410, 408, 410, 408, 408, 390, 390, 376, 357, 355, 354, 355, 356, 358, 359, 357] ;
theStateArray.push( new map_State("MRT","Mauritania","Mauritania") );
g_map_stateMap["MRT"] = theStateArray[27];
theStateArray[27].myPolygons.push( new map_Polygon() );
theStateArray[27].myPolygons[0].myXVals= [739, 735, 732, 729, 727, 724, 721, 719, 717, 717, 718, 719, 718, 718, 718, 717, 714, 715, 735, 734, 735, 740, 740, 756, 756, 775, 767, 770, 772, 773, 772, 752, 751, 749, 746, 743, 741, 740, 739] ;
theStateArray[27].myPolygons[0].myYVals= [573, 576, 580, 581, 582, 582, 581, 582, 580, 583, 585, 590, 595, 597, 600, 602, 604, 606, 606, 613, 616, 616, 629, 629, 636, 624, 624, 603, 581, 581, 577, 577, 576, 576, 575, 577, 576, 573, 573] ;
theStateArray.push( new map_State("GAB","Gabon","Gabon") );
g_map_stateMap["GAB"] = theStateArray[28];
theStateArray[28].myPolygons.push( new map_Polygon() );
theStateArray[28].myPolygons[0].myXVals= [855, 850, 847, 843, 844, 845, 846, 847, 849, 856, 856, 858, 861, 864, 865, 865, 866, 870, 871, 869, 871, 872, 871, 869, 865, 862, 862, 859, 857, 859, 855] ;
theStateArray[28].myPolygons[0].myYVals= [480, 485, 489, 494, 496, 497, 501, 505, 505, 505, 511, 511, 510, 511, 511, 509, 506, 506, 505, 500, 497, 493, 490, 487, 487, 490, 488, 487, 486, 482, 480] ;
theStateArray.push( new map_State("SAH","Western Sahara","Western Sahara") );
g_map_stateMap["SAH"] = theStateArray[29];
theStateArray[29].myPolygons.push( new map_Polygon() );
theStateArray[29].myPolygons[0].myXVals= [756, 755, 756, 756, 756, 756, 740, 740, 735, 734, 735, 715, 714, 714, 714, 726, 726, 728, 730, 737, 739, 741, 743, 747, 749, 751, 752, 756] ;
theStateArray[29].myPolygons[0].myYVals= [635, 638, 638, 637, 636, 629, 629, 616, 616, 613, 606, 606, 604, 607, 607, 607, 609, 611, 618, 623, 630, 630, 634, 634, 634, 634, 635, 635] ;
theStateArray.push( new map_State("NGA","Nigeria","Nigeria") );
g_map_stateMap["NGA"] = theStateArray[30];
theStateArray[30].myPolygons.push( new map_Polygon() );
theStateArray[30].myPolygons[0].myXVals= [842, 837, 835, 833, 829, 826, 825, 821, 817, 813, 813, 813, 814, 816, 818, 818, 818, 817, 818, 818, 819, 820, 821, 827, 832, 834, 836, 839, 845, 847, 850, 853, 854, 857, 861, 865, 866, 869, 870, 872, 872, 872, 867, 866, 865, 864, 863, 861, 860, 859, 858, 855, 852, 850, 847, 846, 843, 842] ;
theStateArray[30].myPolygons[0].myYVals= [523, 522, 522, 521, 521, 524, 528, 531, 531, 531, 539, 542, 545, 547, 550, 551, 553, 556, 558, 562, 564, 567, 568, 569, 567, 565, 565, 566, 564, 564, 566, 566, 566, 566, 565, 567, 567, 562, 562, 560, 559, 557, 553, 550, 548, 547, 543, 541, 538, 536, 534, 533, 535, 535, 532, 532, 527, 523] ;
theStateArray.push( new map_State("GMB","Gambia","Gambia") );
g_map_stateMap["GMB"] = theStateArray[31];
theStateArray[31].myPolygons.push( new map_Polygon() );
theStateArray[31].myPolygons[0].myXVals= [715, 716, 721, 723, 724, 726, 728, 729, 730, 728, 726, 724, 722, 721, 720, 715] ;
theStateArray[31].myPolygons[0].myYVals= [565, 567, 568, 569, 569, 568, 568, 568, 567, 566, 566, 567, 566, 566, 565, 565] ;
theStateArray.push( new map_State("SLE","Sierra Leone","Sierra Leone") );
g_map_stateMap["SLE"] = theStateArray[32];
theStateArray[32].myPolygons.push( new map_Polygon() );
theStateArray[32].myPolygons[0].myXVals= [742, 741, 737, 735, 734, 733, 736, 737, 737, 739, 740, 744, 745, 746, 746, 747, 747, 748, 746, 744, 744, 742] ;
theStateArray[32].myPolygons[0].myYVals= [533, 534, 536, 538, 540, 544, 546, 548, 549, 549, 550, 550, 548, 546, 544, 543, 541, 542, 539, 536, 535, 533] ;
theStateArray.push( new map_State("SEN","Senegal","Senegal") );
g_map_stateMap["SEN"] = theStateArray[33];
theStateArray[33].myPolygons.push( new map_Polygon() );
theStateArray[33].myPolygons[0].myXVals= [716, 714, 711, 714, 716, 717, 719, 721, 724, 727, 729, 732, 735, 739, 739, 740, 742, 742, 742, 741, 738, 738, 737, 733, 731, 722, 720, 719, 716, 715, 720, 721, 722, 724, 726, 728, 730, 729, 728, 726, 724, 723, 721, 716] ;
theStateArray[33].myPolygons[0].myYVals= [567, 571, 573, 574, 578, 580, 582, 581, 582, 582, 581, 580, 576, 573, 569, 567, 565, 563, 562, 561, 562, 561, 561, 562, 562, 563, 562, 562, 561, 565, 565, 566, 566, 567, 566, 566, 567, 568, 568, 568, 569, 569, 568, 567] ;
theStateArray.push( new map_State("RWA","Rwanda","Rwanda") );
g_map_stateMap["RWA"] = theStateArray[34];
theStateArray[34].myPolygons.push( new map_Polygon() );
theStateArray[34].myPolygons[0].myXVals= [952, 954, 953, 952, 949, 948, 945, 945, 946, 946, 947, 949, 952] ;
theStateArray[34].myPolygons[0].myYVals= [494, 491, 488, 487, 488, 485, 485, 488, 488, 491, 493, 492, 494] ;
theStateArray.push( new map_State("SOM","Somalia","Somalia") );
g_map_stateMap["SOM"] = theStateArray[35];
theStateArray[35].myPolygons.push( new map_Polygon() );
theStateArray[35].myPolygons[0].myXVals= [1048, 1051, 1053, 1055, 1055, 1055, 1055, 1054, 1052, 1050, 1047, 1042, 1038, 1032, 1027, 1020, 1015, 1010, 1009, 1007, 1004, 1004, 1009, 1010, 1013, 1018, 1024, 1038, 1042, 1044, 1044, 1044, 1044, 1044, 1046, 1048] ;
theStateArray[35].myPolygons[0].myYVals= [557, 558, 560, 560, 558, 555, 553, 551, 545, 540, 534, 526, 521, 514, 510, 505, 501, 495, 492, 491, 495, 513, 519, 521, 521, 524, 525, 540, 544, 547, 549, 554, 556, 557, 557, 557] ;
theStateArray.push( new map_State("SDS","South Sudan","South Sudan") );
g_map_stateMap["SDS"] = theStateArray[36];
theStateArray[36].myPolygons.push( new map_Polygon() );
theStateArray[36].myPolygons[0].myXVals= [969, 969, 969, 966, 964, 967, 970, 971, 973, 976, 973, 970, 966, 963, 959, 956, 954, 949, 948, 945, 943, 942, 939, 936, 936, 932, 931, 928, 925, 925, 922, 919, 920, 922, 923, 925, 928, 929, 932, 933, 935, 939, 939, 944, 945, 947, 948, 949, 954, 956, 959, 962, 961, 960, 963, 963, 966, 965, 966, 968, 969, 969, 969] ;
theStateArray[36].myPolygons[0].myYVals= [547, 543, 541, 541, 538, 538, 536, 534, 532, 527, 524, 521, 518, 518, 517, 518, 517, 520, 523, 521, 522, 521, 522, 526, 527, 529, 532, 534, 537, 539, 541, 543, 543, 544, 549, 551, 552, 550, 547, 547, 548, 548, 546, 546, 548, 548, 550, 551, 548, 549, 552, 555, 558, 559, 560, 561, 560, 557, 553, 551, 549, 547, 547] ;
theStateArray.push( new map_State("TUN","Tunisia","Tunisia") );
g_map_stateMap["TUN"] = theStateArray[37];
theStateArray[37].myPolygons.push( new map_Polygon() );
theStateArray[37].myPolygons[0].myXVals= [847, 845, 842, 842, 838, 837, 840, 841, 841, 842, 847, 851, 850, 855, 855, 853, 852, 854, 854, 850, 851, 854, 855, 857, 857, 854, 853, 849, 850, 849, 847] ;
theStateArray[37].myPolygons[0].myYVals= [651, 660, 662, 663, 666, 670, 673, 677, 682, 684, 686, 686, 683, 685, 684, 682, 679, 678, 674, 671, 668, 668, 666, 665, 661, 660, 658, 656, 654, 652, 651] ;
theStateArray.push( new map_State("TCD","Chad","Chad") );
g_map_stateMap["TCD"] = theStateArray[38];
theStateArray[38].myPolygons.push( new map_Polygon() );
theStateArray[38].myPolygons[0].myXVals= [872, 872, 869, 869, 867, 869, 876, 876, 878, 879, 877, 877, 875, 874, 879, 899, 919, 919, 915, 912, 911, 912, 910, 911, 910, 909, 911, 912, 912, 914, 914, 911, 908, 905, 900, 895, 894, 894, 891, 889, 883, 882, 881, 880, 876, 877, 875, 874, 872, 869, 870, 873, 874, 877, 874, 874, 874, 872] ;
theStateArray[38].myPolygons[0].myYVals= [564, 566, 566, 569, 571, 578, 583, 589, 599, 601, 603, 605, 606, 614, 617, 607, 597, 578, 578, 574, 571, 570, 568, 566, 564, 562, 563, 561, 558, 556, 555, 554, 552, 547, 545, 545, 544, 543, 541, 539, 537, 538, 538, 537, 537, 538, 541, 543, 544, 547, 550, 549, 549, 549, 554, 557, 561, 564] ;
theStateArray.push( new map_State("UGA","Uganda","Uganda") );
g_map_stateMap["UGA"] = theStateArray[39];
theStateArray[39].myPolygons.push( new map_Polygon() );
theStateArray[39].myPolygons[0].myXVals= [959, 953, 952, 949, 947, 947, 949, 949, 950, 952, 954, 955, 953, 954, 956, 959, 963, 966, 970, 972, 972, 975, 973, 970, 969, 969, 959] ;
theStateArray[39].myPolygons[0].myYVals= [494, 494, 494, 492, 493, 497, 498, 502, 505, 507, 509, 511, 511, 517, 518, 517, 518, 518, 521, 517, 515, 509, 505, 502, 500, 495, 494] ;
theStateArray.push( new map_State("TZA","United Republic of Tanzania","United Republic of Tanzania") );
g_map_stateMap["TZA"] = theStateArray[40];
theStateArray[40].myPolygons.push( new map_Polygon() );
theStateArray[40].myPolygons[0].myXVals= [969, 970, 988, 988, 996, 993, 993, 997, 997, 995, 996, 995, 997, 999, 1001, 997, 992, 989, 987, 983, 982, 976, 972, 971, 969, 968, 963, 960, 957, 955, 953, 951, 948, 947, 947, 946, 948, 950, 952, 953, 953, 952, 952, 953, 954, 952, 953, 959, 969] ;
theStateArray[40].myPolygons[0].myYVals= [495, 494, 484, 481, 476, 470, 467, 465, 464, 461, 459, 457, 454, 449, 448, 445, 443, 443, 442, 442, 441, 442, 442, 449, 451, 452, 453, 455, 456, 457, 458, 464, 467, 470, 472, 477, 477, 479, 482, 483, 484, 485, 487, 488, 491, 494, 494, 494, 495] ;
theStateArray.push( new map_State("ZWE","Zimbabwe","Zimbabwe") );
g_map_stateMap["ZWE"] = theStateArray[41];
theStateArray[41].myPolygons.push( new map_Polygon() );
theStateArray[41].myPolygons[0].myXVals= [955, 953, 951, 949, 947, 943, 940, 938, 938, 936, 930, 929, 928, 926, 931, 933, 935, 937, 942, 944, 944, 947, 951, 951, 955, 958, 959, 961, 964, 964, 963, 963, 963, 963, 962, 961, 955] ;
theStateArray[41].myPolygons[0].myYVals= [388, 389, 388, 389, 389, 391, 392, 395, 397, 398, 403, 406, 407, 411, 410, 410, 410, 413, 417, 418, 419, 421, 422, 420, 420, 419, 418, 418, 416, 410, 406, 402, 401, 398, 398, 394, 388] ;
theStateArray.push( new map_State("LSO","Lesotho","Lesotho") );
g_map_stateMap["LSO"] = theStateArray[42];
theStateArray[42].myPolygons.push( new map_Polygon() );
theStateArray[42].myPolygons[0].myXVals= [944, 946, 945, 944, 941, 940, 938, 934, 937, 940, 942, 944] ;
theStateArray[42].myPolygons[0].myYVals= [355, 353, 351, 349, 348, 347, 346, 350, 353, 355, 356, 355] ;
theStateArray.push( new map_State("ZMB","Zambia","Zambia") );
g_map_stateMap["ZMB"] = theStateArray[43];
theStateArray[43].myPolygons.push( new map_Polygon() );
theStateArray[43].myPolygons[0].myXVals= [963, 966, 967, 966, 965, 966, 964, 963, 966, 950, 951, 947, 944, 944, 942, 937, 935, 933, 931, 926, 925, 925, 923, 920, 916, 912, 909, 909, 920, 919, 920, 919, 920, 919, 921, 921, 923, 927, 928, 932, 935, 936, 940, 942, 944, 948, 948, 946, 943, 941, 942, 943, 942, 943, 945, 951, 953, 955, 957, 960, 963] ;
theStateArray[43].myPolygons[0].myYVals= [453, 451, 447, 446, 441, 437, 436, 431, 430, 426, 422, 421, 419, 418, 417, 413, 410, 410, 410, 411, 411, 412, 413, 413, 412, 415, 419, 435, 435, 437, 439, 441, 443, 445, 445, 443, 443, 443, 441, 440, 441, 439, 438, 436, 433, 433, 439, 438, 440, 441, 446, 451, 454, 457, 457, 458, 458, 457, 456, 455, 453] ;
theStateArray.push( new map_State("AFG","Afghanistan","Afghanistan") );
g_map_stateMap["AFG"] = theStateArray[44];
theStateArray[44].myPolygons.push( new map_Polygon() );
theStateArray[44].myPolygons[0].myXVals= [1106, 1111, 1114, 1115, 1119, 1122, 1123, 1127, 1128, 1131, 1132, 1135, 1139, 1140, 1144, 1145, 1147, 1150, 1151, 1151, 1154, 1156, 1156, 1157, 1157, 1159, 1160, 1163, 1166, 1169, 1174, 1175, 1172, 1170, 1164, 1159, 1156, 1157, 1158, 1155, 1155, 1154, 1149, 1151, 1148, 1146, 1146, 1144, 1142, 1138, 1138, 1134, 1131, 1131, 1125, 1121, 1120, 1117, 1112, 1104, 1108, 1108, 1104, 1104, 1102, 1104, 1102, 1104, 1106] ;
theStateArray[44].myPolygons[0].myYVals= [678, 676, 677, 679, 680, 681, 685, 686, 688, 686, 686, 686, 685, 685, 686, 685, 688, 687, 688, 690, 692, 691, 689, 689, 685, 683, 684, 685, 687, 687, 687, 685, 685, 684, 683, 682, 680, 678, 675, 673, 671, 669, 670, 666, 665, 662, 659, 658, 658, 657, 656, 656, 653, 649, 647, 647, 646, 647, 646, 649, 653, 656, 657, 660, 664, 667, 668, 672, 678] ;
theStateArray.push( new map_State("MDG","Madagascar","Madagascar") );
g_map_stateMap["MDG"] = theStateArray[45];
theStateArray[45].myPolygons.push( new map_Polygon() );
theStateArray[45].myPolygons[0].myXVals= [1047, 1049, 1050, 1051, 1052, 1051, 1051, 1049, 1048, 1049, 1048, 1047, 1047, 1045, 1042, 1039, 1037, 1035, 1031, 1027, 1024, 1020, 1018, 1018, 1016, 1016, 1017, 1019, 1019, 1021, 1022, 1021, 1020, 1019, 1021, 1022, 1024, 1027, 1029, 1031, 1034, 1038, 1040, 1039, 1041, 1044, 1044, 1045, 1047] ;
theStateArray[45].myPolygons[0].myYVals= [437, 435, 432, 426, 423, 421, 419, 422, 421, 417, 415, 414, 410, 404, 397, 388, 381, 375, 374, 371, 373, 375, 377, 382, 386, 389, 393, 394, 395, 399, 402, 405, 408, 412, 415, 418, 419, 420, 421, 421, 423, 427, 429, 431, 431, 434, 437, 439, 437] ;
theStateArray.push( new map_State("ARM","Armenia","Armenia") );
g_map_stateMap["ARM"] = theStateArray[46];
theStateArray[46].myPolygons.push( new map_Polygon() );
theStateArray[46].myPolygons[0].myXVals= [1017, 1024, 1025, 1027, 1026, 1029, 1028, 1030, 1032, 1032, 1030, 1028, 1028, 1026, 1025, 1023, 1022, 1018, 1018, 1017] ;
theStateArray[46].myPolygons[0].myYVals= [705, 706, 704, 704, 702, 701, 699, 698, 697, 693, 693, 696, 697, 697, 698, 698, 700, 701, 703, 705] ;
theStateArray.push( new map_State("ARE","United Arab Emirates","United Arab Emirates") );
g_map_stateMap["ARE"] = theStateArray[47];
theStateArray[47].myPolygons.push( new map_Polygon() );
theStateArray[47].myPolygons[0].myXVals= [1057, 1058, 1058, 1062, 1067, 1070, 1073, 1077, 1080, 1081, 1081, 1079, 1079, 1079, 1077, 1077, 1076, 1076, 1075, 1060, 1058, 1057] ;
theStateArray[47].myPolygons[0].myYVals= [621, 621, 620, 620, 620, 620, 623, 627, 630, 628, 624, 624, 621, 620, 619, 617, 615, 613, 612, 615, 620, 621] ;
theStateArray.push( new map_State("NER","Niger","Niger") );
g_map_stateMap["NER"] = theStateArray[48];
theStateArray[48].myPolygons.push( new map_Polygon() );
theStateArray[48].myPolygons[0].myXVals= [810, 810, 805, 804, 802, 801, 801, 805, 806, 813, 818, 818, 821, 821, 828, 842, 859, 867, 870, 874, 875, 877, 877, 879, 878, 876, 876, 869, 867, 869, 869, 872, 872, 871, 870, 869, 866, 865, 861, 857, 854, 853, 850, 847, 845, 839, 836, 834, 832, 827, 821, 820, 819, 818, 818, 814, 812, 810] ;
theStateArray[48].myPolygons[0].myYVals= [559, 563, 564, 566, 569, 572, 574, 574, 576, 577, 577, 580, 584, 595, 598, 607, 617, 615, 612, 614, 606, 605, 603, 601, 599, 589, 583, 578, 571, 569, 566, 566, 564, 564, 562, 562, 567, 567, 565, 566, 566, 566, 566, 564, 564, 566, 565, 565, 567, 569, 568, 567, 564, 562, 558, 561, 561, 559] ;
theStateArray.push( new map_State("AZE","Azerbaijan","Azerbaijan") );
g_map_stateMap["AZE"] = theStateArray[49];
theStateArray[49].myPolygons.push( new map_Polygon() );
theStateArray[49].myPolygons[0].myXVals= [1025, 1026, 1028, 1028, 1030, 1027, 1024, 1023, 1025] ;
theStateArray[49].myPolygons[0].myYVals= [698, 697, 697, 696, 693, 694, 696, 698, 698] ;
theStateArray[49].myPolygons.push( new map_Polygon() );
theStateArray[49].myPolygons[1].myXVals= [1036, 1039, 1039, 1042, 1045, 1048, 1050, 1051, 1047, 1046, 1046, 1044, 1044, 1043, 1040, 1041, 1040, 1038, 1032, 1032, 1030, 1028, 1029, 1026, 1027, 1025, 1024, 1026, 1029, 1032, 1033, 1030, 1032, 1033, 1036] ;
theStateArray[49].myPolygons[1].myYVals= [706, 705, 707, 709, 706, 702, 702, 701, 700, 696, 695, 694, 691, 691, 693, 696, 697, 697, 693, 697, 698, 699, 701, 702, 704, 704, 706, 707, 705, 705, 705, 708, 709, 709, 706] ;
theStateArray.push( new map_State("SDN","Sudan","Sudan") );
g_map_stateMap["SDN"] = theStateArray[50];
theStateArray[50].myPolygons.push( new map_Polygon() );
theStateArray[50].myPolygons[0].myXVals= [969, 969, 969, 968, 966, 965, 966, 963, 963, 960, 961, 962, 959, 956, 954, 949, 948, 947, 945, 944, 939, 939, 935, 933, 932, 929, 928, 925, 923, 922, 920, 919, 919, 917, 916, 917, 917, 914, 914, 914, 912, 912, 911, 909, 910, 911, 910, 912, 911, 912, 915, 919, 919, 919, 925, 925, 945, 964, 984, 985, 984, 985, 987, 989, 992, 989, 985, 984, 983, 981, 982, 981, 979, 976, 974, 973, 971, 969, 969] ;
theStateArray[50].myPolygons[0].myYVals= [547, 547, 549, 551, 553, 557, 560, 561, 560, 559, 558, 555, 552, 549, 548, 551, 550, 548, 548, 546, 546, 548, 548, 547, 547, 550, 552, 551, 549, 544, 543, 543, 543, 544, 546, 548, 550, 553, 555, 556, 558, 561, 563, 562, 564, 566, 568, 570, 571, 574, 578, 578, 597, 600, 600, 610, 610, 610, 610, 605, 604, 599, 593, 591, 589, 587, 586, 584, 581, 574, 572, 567, 562, 560, 556, 554, 553, 547, 547] ;
theStateArray.push( new map_State("BRN","Brunei","Brunei") );
g_map_stateMap["BRN"] = theStateArray[51];
theStateArray[51].myPolygons.push( new map_Polygon() );
theStateArray[51].myPolygons[0].myXVals= [1371, 1372, 1377, 1377, 1376, 1374, 1373, 1371] ;
theStateArray[51].myPolygons[0].myYVals= [522, 524, 527, 524, 521, 521, 520, 522] ;
theStateArray.push( new map_State("CHN","China","China") );
g_map_stateMap["CHN"] = theStateArray[52];
theStateArray[52].myPolygons.push( new map_Polygon() );
theStateArray[52].myPolygons[0].myXVals= [1351, 1347, 1343, 1343, 1345, 1351, 1353, 1355, 1352, 1351] ;
theStateArray[52].myPolygons[0].myYVals= [593, 590, 592, 596, 599, 600, 600, 598, 596, 593] ;
theStateArray[52].myPolygons.push( new map_Polygon() );
theStateArray[52].myPolygons[1].myXVals= [1438, 1446, 1452, 1454, 1462, 1466, 1475, 1472, 1470, 1468, 1465, 1459, 1455, 1456, 1455, 1453, 1453, 1449, 1447, 1440, 1441, 1436, 1434, 1430, 1425, 1421, 1414, 1410, 1405, 1407, 1406, 1410, 1408, 1403, 1398, 1395, 1390, 1387, 1390, 1394, 1394, 1398, 1404, 1408, 1411, 1412, 1405, 1403, 1398, 1395, 1401, 1403, 1406, 1409, 1409, 1406, 1407, 1410, 1409, 1408, 1405, 1401, 1397, 1393, 1386, 1379, 1373, 1370, 1369, 1366, 1359, 1353, 1352, 1349, 1348, 1349, 1342, 1340, 1335, 1332, 1333, 1329, 1326, 1322, 1317, 1313, 1310, 1308, 1309, 1306, 1305, 1305, 1302, 1299, 1296, 1297, 1294, 1293, 1288, 1288, 1293, 1293, 1293, 1291, 1289, 1286, 1281, 1282, 1280, 1277, 1272, 1267, 1262, 1258, 1256, 1253, 1250, 1247, 1244, 1243, 1240, 1234, 1229, 1225, 1221, 1219, 1216, 1211, 1207, 1205, 1198, 1193, 1192, 1195, 1196, 1194, 1194, 1189, 1180, 1179, 1175, 1174, 1174, 1174, 1171, 1169, 1168, 1169, 1169, 1173, 1177, 1182, 1184, 1190, 1192, 1200, 1201, 1200, 1204, 1199, 1209, 1212, 1215, 1225, 1228, 1228, 1232, 1236, 1238, 1240, 1244, 1251, 1254, 1252, 1254, 1260, 1267, 1273, 1276, 1278, 1281, 1287, 1297, 1304, 1309, 1316, 1322, 1324, 1330, 1338, 1346, 1352, 1355, 1359, 1358, 1356, 1359, 1362, 1367, 1372, 1379, 1383, 1387, 1394, 1398, 1398, 1394, 1390, 1386, 1381, 1378, 1377, 1380, 1383, 1389, 1396, 1396, 1400, 1403, 1403, 1400, 1405, 1411, 1417, 1425, 1429, 1432, 1434, 1436, 1438] ;
theStateArray[52].myPolygons[1].myYVals= [748, 747, 743, 738, 738, 740, 742, 737, 736, 730, 725, 726, 724, 720, 714, 714, 711, 714, 712, 709, 707, 707, 709, 705, 702, 699, 698, 695, 694, 696, 698, 702, 704, 702, 699, 696, 696, 693, 690, 689, 687, 685, 689, 687, 687, 684, 683, 680, 678, 674, 671, 666, 662, 658, 654, 653, 650, 649, 645, 641, 640, 635, 628, 622, 618, 613, 613, 611, 612, 610, 607, 606, 601, 601, 605, 606, 608, 607, 609, 611, 613, 614, 616, 614, 613, 613, 612, 611, 605, 606, 607, 609, 607, 608, 610, 614, 615, 620, 619, 625, 629, 633, 637, 638, 641, 641, 642, 644, 647, 645, 646, 643, 639, 638, 640, 640, 641, 640, 636, 640, 639, 639, 641, 643, 644, 646, 647, 650, 652, 650, 654, 657, 663, 662, 664, 667, 671, 677, 679, 683, 685, 687, 689, 691, 693, 692, 697, 698, 699, 701, 702, 702, 705, 705, 707, 710, 711, 714, 715, 724, 726, 727, 736, 735, 737, 742, 742, 746, 746, 742, 740, 738, 734, 728, 726, 725, 724, 721, 721, 716, 713, 713, 712, 713, 712, 709, 709, 707, 710, 712, 712, 714, 717, 718, 720, 722, 725, 725, 724, 726, 728, 731, 733, 734, 733, 735, 738, 740, 738, 739, 738, 740, 745, 749, 747, 750, 752, 758, 759, 762, 763, 766, 767, 767, 765, 763, 758, 756, 753, 748] ;
theStateArray.push( new map_State("SWZ","Swaziland","Swaziland") );
g_map_stateMap["SWZ"] = theStateArray[53];
theStateArray[53].myPolygons.push( new map_Polygon() );
theStateArray[53].myPolygons[0].myXVals= [960, 959, 956, 953, 953, 954, 955, 956, 959, 959, 960] ;
theStateArray[53].myPolygons[0].myYVals= [366, 364, 363, 366, 368, 369, 371, 371, 370, 368, 366] ;
theStateArray.push( new map_State("CYN","Northern Cyprus","Northern Cyprus") );
g_map_stateMap["CYN"] = theStateArray[54];
theStateArray[54].myPolygons.push( new map_Polygon() );
theStateArray[54].myPolygons[0].myXVals= [963, 964, 964, 968, 972, 969, 969, 969, 968, 967, 967, 967, 966, 965, 964, 963] ;
theStateArray[54].myPolygons[0].myYVals= [675, 675, 676, 676, 678, 676, 675, 675, 675, 675, 675, 675, 675, 675, 675, 675] ;
theStateArray.push( new map_State("CYP","Cyprus","Cyprus") );
g_map_stateMap["CYP"] = theStateArray[55];
theStateArray[55].myPolygons.push( new map_Polygon() );
theStateArray[55].myPolygons[0].myXVals= [969, 970, 964, 962, 961, 963, 964, 965, 966, 967, 967, 967, 968, 969, 969] ;
theStateArray[55].myPolygons[0].myYVals= [675, 674, 672, 673, 675, 675, 675, 675, 675, 675, 675, 675, 675, 675, 675] ;
theStateArray.push( new map_State("GEO","Georgia","Georgia") );
g_map_stateMap["GEO"] = theStateArray[56];
theStateArray[56].myPolygons.push( new map_Polygon() );
theStateArray[56].myPolygons[0].myXVals= [1007, 1008, 1007, 1004, 1001, 999, 1000, 1004, 1011, 1018, 1019, 1022, 1027, 1028, 1032, 1030, 1033, 1032, 1029, 1026, 1024, 1017, 1013, 1007] ;
theStateArray[56].myPolygons[0].myYVals= [707, 709, 713, 715, 715, 717, 717, 716, 716, 713, 712, 713, 712, 710, 709, 708, 705, 705, 705, 707, 706, 705, 707, 707] ;
theStateArray.push( new map_State("TGO","Togo","Togo") );
g_map_stateMap["TGO"] = theStateArray[57];
theStateArray[57].myPolygons.push( new map_Polygon() );
theStateArray[57].myPolygons[0].myXVals= [809, 805, 804, 802, 802, 803, 802, 801, 801, 799, 800, 804, 803, 805, 807, 807, 808, 808, 809] ;
theStateArray[57].myPolygons[0].myYVals= [530, 529, 531, 534, 537, 541, 543, 547, 550, 553, 555, 554, 552, 550, 549, 546, 545, 534, 530] ;
theStateArray.push( new map_State("SOL","Somaliland","Somaliland") );
g_map_stateMap["SOL"] = theStateArray[58];
theStateArray[58].myPolygons.push( new map_Polygon() );
theStateArray[58].myPolygons[0].myXVals= [1044, 1042, 1038, 1034, 1018, 1016, 1014, 1012, 1013, 1015, 1017, 1018, 1020, 1023, 1027, 1033, 1037, 1040, 1041, 1044, 1044, 1044, 1044, 1044] ;
theStateArray[58].myPolygons[0].myYVals= [547, 544, 540, 539, 545, 547, 550, 552, 554, 557, 556, 554, 552, 552, 553, 554, 555, 555, 556, 557, 556, 554, 549, 547] ;
theStateArray.push( new map_State("IDN","Indonesia","Indonesia") );
g_map_stateMap["IDN"] = theStateArray[59];
theStateArray[59].myPolygons.push( new map_Polygon() );
theStateArray[59].myPolygons[0].myXVals= [1403, 1401, 1394, 1399, 1402, 1403, 1403] ;
theStateArray[59].myPolygons[0].myYVals= [448, 448, 452, 453, 451, 450, 448] ;
theStateArray[59].myPolygons.push( new map_Polygon() );
theStateArray[59].myPolygons[1].myXVals= [1422, 1417, 1417, 1417, 1419, 1424, 1425, 1425, 1422] ;
theStateArray[59].myPolygons[1].myYVals= [449, 448, 448, 450, 453, 455, 454, 453, 449] ;
theStateArray[59].myPolygons.push( new map_Polygon() );
theStateArray[59].myPolygons[2].myXVals= [1389, 1391, 1394, 1395, 1389, 1386, 1383, 1385, 1388, 1389] ;
theStateArray[59].myPolygons[2].myYVals= [459, 458, 458, 456, 455, 454, 454, 457, 457, 459] ;
theStateArray[59].myPolygons.push( new map_Polygon() );
theStateArray[59].myPolygons[3].myXVals= [1414, 1413, 1406, 1399, 1399, 1403, 1406, 1410, 1414] ;
theStateArray[59].myPolygons[3].myYVals= [459, 456, 455, 455, 457, 458, 457, 457, 459] ;
theStateArray[59].myPolygons.push( new map_Polygon() );
theStateArray[59].myPolygons[4].myXVals= [1343, 1352, 1353, 1363, 1364, 1372, 1378, 1372, 1367, 1362, 1357, 1352, 1347, 1343, 1341, 1332, 1331, 1326, 1330, 1336, 1340, 1342, 1343] ;
theStateArray[59].myPolygons[4].myYVals= [466, 465, 467, 465, 462, 461, 458, 456, 458, 458, 458, 459, 461, 461, 461, 463, 465, 465, 470, 470, 468, 467, 466] ;
theStateArray[59].myPolygons.push( new map_Polygon() );
theStateArray[59].myPolygons[5].myXVals= [1473, 1471, 1470, 1471, 1472, 1473, 1473] ;
theStateArray[59].myPolygons[5].myYVals= [468, 465, 469, 471, 472, 471, 468] ;
theStateArray[59].myPolygons.push( new map_Polygon() );
theStateArray[59].myPolygons[6].myXVals= [1436, 1434, 1430, 1429, 1435, 1436] ;
theStateArray[59].myPolygons[6].myYVals= [482, 481, 481, 484, 484, 482] ;
theStateArray[59].myPolygons.push( new map_Polygon() );
theStateArray[59].myPolygons[7].myXVals= [1452, 1454, 1449, 1445, 1442, 1439, 1440, 1446, 1452] ;
theStateArray[59].myPolygons[7].myYVals= [484, 480, 482, 483, 482, 483, 485, 485, 484] ;
theStateArray[59].myPolygons.push( new map_Polygon() );
theStateArray[59].myPolygons[8].myXVals= [1470, 1472, 1477, 1481, 1487, 1491, 1495, 1499, 1505, 1505, 1505, 1500, 1495, 1494, 1488, 1490, 1493, 1492, 1489, 1479, 1475, 1468, 1466, 1464, 1463, 1463, 1459, 1465, 1468, 1468, 1461, 1459, 1454, 1452, 1459, 1461, 1469, 1470] ;
theStateArray[59].myPolygons[8].myYVals= [494, 486, 483, 488, 491, 491, 489, 487, 486, 470, 454, 458, 459, 458, 457, 462, 463, 468, 473, 477, 477, 482, 479, 479, 481, 483, 485, 487, 487, 488, 488, 491, 492, 495, 496, 498, 496, 494] ;
theStateArray[59].myPolygons.push( new map_Polygon() );
theStateArray[59].myPolygons[9].myXVals= [1426, 1422, 1418, 1413, 1405, 1400, 1400, 1404, 1407, 1416, 1416, 1414, 1411, 1407, 1412, 1411, 1415, 1415, 1413, 1411, 1413, 1408, 1407, 1408, 1404, 1404, 1401, 1401, 1402, 1398, 1396, 1398, 1397, 1395, 1393, 1395, 1396, 1399, 1400, 1404, 1408, 1414, 1420, 1425, 1426] ;
theStateArray[59].myPolygons[9].myYVals= [507, 502, 501, 502, 501, 501, 497, 492, 495, 496, 494, 495, 492, 490, 484, 482, 476, 473, 471, 473, 477, 475, 477, 479, 481, 486, 485, 479, 472, 471, 473, 477, 482, 482, 485, 489, 493, 500, 502, 506, 505, 504, 504, 508, 507] ;
theStateArray[59].myPolygons.push( new map_Polygon() );
theStateArray[59].myPolygons[10].myXVals= [1443, 1443, 1440, 1439, 1441, 1440, 1438, 1436, 1438, 1439, 1440, 1442, 1443] ;
theStateArray[59].myPolygons[10].myYVals= [505, 501, 501, 498, 496, 495, 498, 505, 509, 510, 508, 507, 505] ;
theStateArray[59].myPolygons.push( new map_Polygon() );
theStateArray[59].myPolygons[11].myXVals= [1389, 1394, 1389, 1387, 1387, 1382, 1382, 1380, 1380, 1374, 1372, 1368, 1366, 1360, 1358, 1355, 1351, 1350, 1347, 1345, 1344, 1345, 1348, 1349, 1352, 1355, 1358, 1361, 1364, 1369, 1373, 1375, 1377, 1379, 1385, 1389, 1386, 1390, 1389] ;
theStateArray[59].myPolygons[11].myYVals= [509, 504, 503, 500, 495, 492, 487, 479, 481, 479, 482, 482, 484, 482, 485, 484, 485, 492, 493, 497, 502, 506, 510, 506, 503, 504, 504, 507, 507, 506, 507, 514, 515, 521, 521, 520, 516, 511, 509] ;
theStateArray[59].myPolygons.push( new map_Polygon() );
theStateArray[59].myPolygons[12].myXVals= [1329, 1323, 1319, 1312, 1310, 1306, 1304, 1300, 1296, 1294, 1293, 1288, 1285, 1282, 1276, 1276, 1279, 1287, 1291, 1295, 1298, 1303, 1308, 1312, 1315, 1319, 1317, 1320, 1321, 1322, 1324, 1328, 1330, 1329, 1329] ;
theStateArray[59].myPolygons[12].myYVals= [470, 470, 474, 478, 481, 486, 489, 496, 500, 505, 509, 512, 516, 519, 524, 527, 527, 526, 521, 517, 515, 510, 510, 506, 502, 500, 496, 494, 494, 491, 488, 487, 484, 478, 470] ;
theStateArray.push( new map_State("IND","India","India") );
g_map_stateMap["IND"] = theStateArray[60];
theStateArray[60].myPolygons.push( new map_Polygon() );
theStateArray[60].myPolygons[0].myXVals= [1189, 1194, 1194, 1196, 1195, 1192, 1193, 1198, 1205, 1202, 1200, 1205, 1209, 1216, 1223, 1226, 1230, 1236, 1240, 1240, 1240, 1240, 1243, 1244, 1244, 1248, 1251, 1256, 1260, 1260, 1258, 1262, 1267, 1272, 1277, 1280, 1282, 1281, 1286, 1287, 1285, 1285, 1282, 1275, 1275, 1273, 1272, 1270, 1266, 1266, 1265, 1265, 1263, 1260, 1259, 1258, 1255, 1257, 1259, 1261, 1258, 1254, 1249, 1249, 1246, 1242, 1241, 1244, 1241, 1240, 1243, 1242, 1244, 1245, 1244, 1241, 1234, 1235, 1232, 1225, 1219, 1215, 1210, 1210, 1208, 1203, 1201, 1200, 1201, 1201, 1199, 1199, 1196, 1194, 1195, 1191, 1189, 1187, 1182, 1180, 1178, 1176, 1174, 1173, 1172, 1167, 1165, 1164, 1164, 1163, 1155, 1152, 1145, 1148, 1146, 1140, 1144, 1155, 1154, 1151, 1150, 1147, 1153, 1158, 1164, 1167, 1172, 1172, 1176, 1172, 1170, 1168, 1171, 1178, 1184, 1189] ;
theStateArray[60].myPolygons[0].myYVals= [677, 671, 667, 664, 662, 663, 657, 654, 650, 648, 643, 642, 639, 636, 636, 633, 633, 631, 632, 634, 637, 639, 640, 636, 635, 633, 634, 634, 634, 637, 638, 639, 643, 646, 645, 647, 644, 642, 641, 639, 638, 635, 636, 632, 630, 625, 623, 619, 620, 615, 613, 611, 610, 618, 618, 614, 617, 620, 620, 624, 625, 625, 626, 629, 630, 632, 628, 626, 624, 622, 621, 618, 614, 610, 608, 608, 607, 603, 600, 597, 591, 588, 585, 582, 581, 579, 579, 575, 569, 565, 560, 551, 551, 547, 546, 544, 541, 539, 544, 551, 556, 558, 563, 569, 573, 579, 589, 596, 602, 606, 603, 604, 610, 612, 614, 618, 621, 621, 626, 628, 632, 634, 639, 639, 644, 649, 654, 658, 661, 663, 667, 671, 673, 672, 673, 677] ;
theStateArray.push( new map_State("IRN","Iran","Iran") );
g_map_stateMap["IRN"] = theStateArray[61];
theStateArray[61].myPolygons.push( new map_Polygon() );
theStateArray[61].myPolygons[0].myXVals= [1069, 1074, 1077, 1080, 1083, 1086, 1092, 1096, 1101, 1105, 1106, 1104, 1102, 1104, 1102, 1104, 1104, 1108, 1108, 1104, 1106, 1108, 1113, 1113, 1116, 1116, 1109, 1107, 1098, 1092, 1086, 1084, 1082, 1078, 1073, 1067, 1062, 1057, 1054, 1050, 1047, 1044, 1042, 1040, 1040, 1038, 1039, 1036, 1030, 1027, 1028, 1030, 1030, 1027, 1023, 1021, 1022, 1020, 1023, 1024, 1027, 1030, 1032, 1038, 1040, 1041, 1040, 1043, 1044, 1045, 1050, 1054, 1061, 1069, 1069] ;
theStateArray[61].myPolygons[0].myYVals= [685, 686, 689, 689, 690, 690, 687, 687, 682, 682, 678, 672, 668, 667, 664, 660, 657, 656, 653, 649, 646, 643, 641, 636, 636, 633, 631, 625, 626, 628, 628, 634, 635, 634, 632, 634, 637, 639, 644, 650, 649, 651, 649, 652, 654, 654, 658, 662, 665, 669, 673, 675, 678, 679, 685, 689, 691, 697, 698, 696, 694, 693, 693, 697, 697, 696, 693, 691, 691, 687, 686, 684, 683, 684, 685] ;
theStateArray.push( new map_State("ISR","Israel","Israel") );
g_map_stateMap["ISR"] = theStateArray[62];
theStateArray[62].myPolygons.push( new map_Polygon() );
theStateArray[62].myPolygons[0].myXVals= [978, 977, 975, 974, 976, 974, 974, 976, 977, 974, 971, 972, 972, 973, 974, 975, 975, 977, 977, 979, 979, 978, 978] ;
theStateArray[62].myPolygons[0].myYVals= [663, 661, 662, 659, 658, 658, 656, 657, 655, 647, 656, 657, 658, 660, 664, 665, 665, 665, 666, 666, 664, 663, 663] ;
theStateArray.push( new map_State("JOR","Jordan","Jordan") );
g_map_stateMap["JOR"] = theStateArray[63];
theStateArray[63].myPolygons.push( new map_Polygon() );
theStateArray[63].myPolygons[0].myXVals= [977, 978, 984, 993, 995, 995, 985, 989, 988, 987, 983, 982, 980, 974, 974, 977, 976, 977, 977] ;
theStateArray[63].myPolygons[0].myYVals= [661, 663, 661, 666, 660, 660, 657, 652, 651, 650, 649, 647, 645, 646, 647, 655, 657, 658, 661] ;
theStateArray.push( new map_State("ZAF","South Africa","South Africa") );
g_map_stateMap["ZAF"] = theStateArray[64];
theStateArray[64].myPolygons.push( new map_Polygon() );
theStateArray[64].myPolygons[0].myXVals= [957, 956, 954, 953, 950, 944, 941, 937, 932, 929, 928, 925, 923, 917, 914, 912, 907, 903, 900, 898, 895, 894, 892, 891, 891, 891, 889, 891, 891, 887, 885, 885, 881, 884, 886, 886, 889, 892, 895, 899, 899, 900, 903, 903, 904, 908, 910, 912, 914, 916, 918, 921, 925, 928, 928, 929, 932, 933, 935, 940, 947, 949, 951, 953, 955, 958, 959, 958, 959, 956, 955, 954, 953, 953, 956, 959, 960, 964, 962, 962, 961, 957] ;
theStateArray[64].myPolygons[0].myYVals= [353, 352, 350, 347, 344, 339, 336, 333, 331, 331, 330, 331, 330, 331, 330, 330, 328, 327, 326, 325, 327, 327, 330, 329, 330, 333, 336, 337, 341, 346, 350, 350, 357, 359, 358, 356, 355, 354, 355, 357, 376, 375, 370, 367, 365, 366, 368, 370, 372, 373, 373, 371, 371, 372, 374, 376, 376, 378, 382, 385, 389, 389, 388, 389, 388, 381, 378, 372, 370, 371, 371, 369, 368, 366, 363, 364, 366, 366, 362, 358, 356, 353] ;
theStateArray[64].myPolygons.push( new map_Polygon() );
theStateArray[64].myPolygons[1].myXVals= [944, 942, 940, 937, 934, 938, 940, 941, 944, 945, 946, 944] ;
theStateArray[64].myPolygons[1].myYVals= [355, 356, 355, 353, 350, 346, 347, 348, 349, 351, 353, 355] ;
theStateArray.push( new map_State("KHM","Cambodia","Cambodia") );
g_map_stateMap["KHM"] = theStateArray[65];
theStateArray[65].myPolygons.push( new map_Polygon() );
theStateArray[65].myPolygons[0].myXVals= [1317, 1315, 1312, 1311, 1314, 1321, 1326, 1330, 1332, 1336, 1338, 1337, 1329, 1331, 1325, 1321, 1317] ;
theStateArray[65].myPolygons[0].myYVals= [553, 555, 560, 566, 571, 572, 571, 569, 572, 571, 567, 561, 557, 554, 554, 552, 553] ;
theStateArray.push( new map_State("KOR","South Korea","South Korea") );
g_map_stateMap["KOR"] = theStateArray[66];
theStateArray[66].myPolygons.push( new map_Polygon() );
theStateArray[66].myPolygons[0].myXVals= [1441, 1446, 1447, 1447, 1445, 1440, 1436, 1432, 1431, 1432, 1430, 1434, 1430, 1431, 1433, 1435, 1438, 1441, 1441] ;
theStateArray[66].myPolygons[0].myYVals= [693, 687, 683, 678, 675, 674, 672, 671, 674, 678, 683, 684, 688, 689, 689, 691, 691, 691, 693] ;
theStateArray.push( new map_State("KAZ","Kazakhstan","Kazakhstan") );
g_map_stateMap["KAZ"] = theStateArray[67];
theStateArray[67].myPolygons.push( new map_Polygon() );
theStateArray[67].myPolygons[0].myXVals= [1154, 1151, 1145, 1143, 1141, 1139, 1133, 1132, 1130, 1130, 1124, 1115, 1110, 1105, 1101, 1093, 1092, 1079, 1079, 1077, 1073, 1070, 1064, 1062, 1062, 1063, 1062, 1056, 1054, 1051, 1051, 1056, 1056, 1060, 1065, 1066, 1065, 1060, 1055, 1050, 1045, 1042, 1043, 1040, 1036, 1032, 1035, 1033, 1037, 1042, 1043, 1053, 1061, 1072, 1078, 1083, 1091, 1098, 1099, 1106, 1107, 1099, 1104, 1103, 1108, 1104, 1107, 1125, 1128, 1140, 1145, 1154, 1155, 1161, 1167, 1167, 1171, 1184, 1182, 1189, 1200, 1202, 1209, 1216, 1219, 1222, 1225, 1227, 1234, 1236, 1232, 1228, 1228, 1225, 1215, 1212, 1209, 1199, 1204, 1200, 1201, 1198, 1195, 1188, 1180, 1178, 1171, 1168, 1167, 1159, 1155, 1154] ;
theStateArray[67].myPolygons[0].myYVals= [711, 710, 706, 703, 703, 705, 705, 709, 709, 714, 718, 718, 717, 722, 723, 727, 727, 724, 706, 706, 710, 711, 710, 708, 710, 712, 713, 715, 720, 721, 723, 722, 726, 727, 726, 731, 734, 734, 735, 733, 731, 732, 735, 738, 738, 741, 745, 746, 752, 749, 753, 758, 758, 755, 753, 755, 755, 752, 754, 753, 756, 759, 762, 763, 764, 768, 770, 771, 773, 774, 776, 775, 770, 771, 770, 767, 767, 772, 770, 767, 754, 756, 754, 755, 754, 751, 750, 748, 749, 746, 742, 742, 737, 735, 736, 727, 726, 724, 715, 714, 711, 712, 714, 714, 714, 714, 716, 715, 712, 714, 713, 711] ;
theStateArray.push( new map_State("BTN","Bhutan","Bhutan") );
g_map_stateMap["BTN"] = theStateArray[68];
theStateArray[68].myPolygons.push( new map_Polygon() );
theStateArray[68].myPolygons[0].myXVals= [1258, 1260, 1260, 1256, 1251, 1248, 1244, 1244, 1247, 1250, 1253, 1256, 1258] ;
theStateArray[68].myPolygons[0].myYVals= [638, 637, 634, 634, 634, 633, 635, 636, 640, 641, 640, 640, 638] ;
theStateArray.push( new map_State("BGD","Bangladesh","Bangladesh") );
g_map_stateMap["BGD"] = theStateArray[69];
theStateArray[69].myPolygons.push( new map_Polygon() );
theStateArray[69].myPolygons[0].myXVals= [1263, 1263, 1261, 1261, 1260, 1260, 1259, 1257, 1252, 1252, 1251, 1249, 1248, 1247, 1245, 1244, 1242, 1243, 1240, 1241, 1244, 1241, 1242, 1246, 1249, 1249, 1254, 1258, 1261, 1259, 1257, 1255, 1258, 1259, 1260, 1263] ;
theStateArray[69].myPolygons[0].myYVals= [610, 606, 607, 603, 605, 608, 610, 613, 614, 611, 609, 610, 609, 609, 610, 614, 618, 621, 622, 624, 626, 628, 632, 630, 629, 626, 625, 625, 624, 620, 620, 617, 614, 618, 618, 610] ;
theStateArray.push( new map_State("IRQ","Iraq","Iraq") );
g_map_stateMap["IRQ"] = theStateArray[70];
theStateArray[70].myPolygons.push( new map_Polygon() );
theStateArray[70].myPolygons[0].myXVals= [1027, 1030, 1030, 1028, 1027, 1030, 1036, 1039, 1038, 1040, 1040, 1042, 1039, 1036, 1032, 1023, 1009, 1001, 995, 993, 1005, 1006, 1006, 1009, 1011, 1013, 1019, 1021, 1023, 1027] ;
theStateArray[70].myPolygons[0].myYVals= [679, 678, 675, 673, 669, 665, 662, 658, 654, 654, 652, 649, 649, 650, 645, 645, 655, 659, 660, 666, 672, 678, 681, 683, 686, 686, 686, 685, 685, 679] ;
theStateArray.push( new map_State("JPN","Japan","Japan") );
g_map_stateMap["JPN"] = theStateArray[71];
theStateArray[71].myPolygons.push( new map_Polygon() );
theStateArray[71].myPolygons[0].myXVals= [1473, 1473, 1471, 1468, 1466, 1465, 1461, 1461, 1464, 1467, 1469, 1473] ;
theStateArray[71].myPolygons[0].myYVals= [670, 669, 666, 667, 666, 663, 664, 667, 670, 669, 671, 670] ;
theStateArray[71].myPolygons.push( new map_Polygon() );
theStateArray[71].myPolygons[1].myXVals= [1504, 1502, 1503, 1501, 1494, 1486, 1478, 1475, 1475, 1466, 1460, 1454, 1460, 1456, 1453, 1451, 1452, 1449, 1447, 1451, 1454, 1459, 1463, 1473, 1478, 1483, 1486, 1494, 1497, 1500, 1499, 1501, 1506, 1509, 1509, 1504, 1504] ;
theStateArray[71].myPolygons[1].myYVals= [685, 681, 679, 675, 673, 673, 667, 669, 672, 671, 669, 669, 665, 657, 655, 657, 661, 663, 666, 668, 671, 673, 677, 678, 677, 686, 684, 689, 691, 697, 702, 705, 706, 699, 695, 690, 685] ;
theStateArray[71].myPolygons.push( new map_Polygon() );
theStateArray[71].myPolygons[2].myXVals= [1519, 1523, 1526, 1527, 1520, 1515, 1508, 1505, 1499, 1499, 1501, 1506, 1508, 1509, 1515, 1519] ;
theStateArray[71].myPolygons[2].myYVals= [720, 719, 721, 716, 714, 709, 713, 707, 707, 712, 716, 716, 723, 727, 722, 720] ;
theStateArray.push( new map_State("MYS","Malaysia","Malaysia") );
g_map_stateMap["MYS"] = theStateArray[72];
theStateArray[72].myPolygons.push( new map_Polygon() );
theStateArray[72].myPolygons[0].myXVals= [1305, 1305, 1309, 1310, 1311, 1314, 1316, 1317, 1316, 1317, 1317, 1319, 1321, 1321, 1317, 1312, 1306, 1306, 1303, 1302, 1300, 1301, 1300, 1301, 1305] ;
theStateArray[72].myPolygons[0].myYVals= [531, 528, 529, 531, 530, 527, 524, 520, 518, 516, 513, 512, 508, 506, 506, 509, 513, 516, 519, 523, 526, 530, 532, 533, 531] ;
theStateArray[72].myPolygons.push( new map_Polygon() );
theStateArray[72].myPolygons[1].myXVals= [1393, 1389, 1385, 1379, 1377, 1375, 1373, 1369, 1364, 1361, 1358, 1355, 1352, 1349, 1348, 1351, 1355, 1356, 1358, 1364, 1368, 1371, 1373, 1374, 1376, 1377, 1377, 1381, 1383, 1385, 1388, 1388, 1391, 1395, 1395, 1392, 1393] ;
theStateArray[72].myPolygons[1].myYVals= [522, 520, 521, 521, 515, 514, 507, 506, 507, 507, 504, 504, 503, 506, 510, 508, 509, 513, 514, 515, 519, 522, 520, 521, 521, 524, 527, 530, 534, 534, 532, 529, 528, 527, 525, 524, 522] ;
theStateArray.push( new map_State("NPL","Nepal","Nepal") );
g_map_stateMap["NPL"] = theStateArray[73];
theStateArray[73].myPolygons.push( new map_Polygon() );
theStateArray[73].myPolygons[0].myXVals= [1240, 1240, 1240, 1240, 1236, 1230, 1226, 1223, 1216, 1209, 1205, 1200, 1202, 1205, 1207, 1211, 1216, 1219, 1221, 1225, 1229, 1234, 1240] ;
theStateArray[73].myPolygons[0].myYVals= [639, 637, 634, 632, 631, 633, 633, 636, 636, 639, 642, 643, 648, 650, 652, 650, 647, 646, 644, 643, 641, 639, 639] ;
theStateArray.push( new map_State("LKA","Sri Lanka","Sri Lanka") );
g_map_stateMap["LKA"] = theStateArray[74];
theStateArray[74].myPolygons.push( new map_Polygon() );
theStateArray[74].myPolygons[0].myXVals= [1208, 1208, 1206, 1201, 1199, 1198, 1200, 1204, 1206, 1208] ;
theStateArray[74].myPolygons[0].myYVals= [537, 532, 530, 529, 533, 541, 549, 546, 542, 537] ;
theStateArray.push( new map_State("OMN","Oman","Oman") );
g_map_stateMap["OMN"] = theStateArray[75];
theStateArray[75].myPolygons.push( new map_Polygon() );
theStateArray[75].myPolygons[0].myXVals= [1094, 1092, 1090, 1089, 1088, 1088, 1088, 1086, 1083, 1082, 1081, 1078, 1076, 1076, 1073, 1071, 1067, 1065, 1063, 1060, 1074, 1078, 1076, 1076, 1077, 1077, 1079, 1079, 1079, 1081, 1084, 1087, 1090, 1093, 1095, 1097, 1099, 1099, 1097, 1096, 1094] ;
theStateArray[75].myPolygons[0].myYVals= [605, 602, 602, 601, 598, 595, 594, 594, 592, 590, 589, 589, 588, 586, 584, 585, 583, 583, 586, 595, 599, 610, 613, 615, 617, 619, 620, 621, 624, 624, 621, 619, 618, 617, 614, 613, 612, 611, 608, 607, 605] ;
theStateArray[75].myPolygons.push( new map_Polygon() );
theStateArray[75].myPolygons[1].myXVals= [1081, 1081, 1080, 1081, 1082, 1081] ;
theStateArray[75].myPolygons[1].myYVals= [629, 628, 630, 631, 631, 629] ;
theStateArray.push( new map_State("KGZ","Kyrgyzstan","Kyrgyzstan") );
g_map_stateMap["KGZ"] = theStateArray[76];
theStateArray[76].myPolygons.push( new map_Polygon() );
theStateArray[76].myPolygons[0].myXVals= [1154, 1155, 1159, 1167, 1168, 1171, 1178, 1180, 1188, 1195, 1198, 1201, 1200, 1192, 1190, 1184, 1182, 1177, 1173, 1169, 1169, 1168, 1158, 1152, 1147, 1147, 1153, 1155, 1158, 1165, 1159, 1155, 1152, 1156, 1154] ;
theStateArray[76].myPolygons[0].myYVals= [711, 713, 714, 712, 715, 716, 714, 714, 714, 714, 712, 711, 710, 707, 705, 705, 702, 702, 701, 699, 698, 697, 696, 698, 697, 700, 699, 701, 700, 704, 706, 705, 707, 710, 711] ;
theStateArray.push( new map_State("MMR","Myanmar","Myanmar") );
g_map_stateMap["MMR"] = theStateArray[77];
theStateArray[77].myPolygons.push( new map_Polygon() );
theStateArray[77].myPolygons[0].myXVals= [1297, 1294, 1291, 1288, 1286, 1289, 1292, 1294, 1292, 1290, 1292, 1295, 1296, 1295, 1297, 1295, 1292, 1292, 1293, 1292, 1292, 1290, 1288, 1287, 1285, 1282, 1276, 1274, 1270, 1272, 1271, 1267, 1268, 1265, 1261, 1261, 1263, 1263, 1265, 1265, 1266, 1266, 1270, 1272, 1273, 1275, 1275, 1282, 1285, 1285, 1287, 1286, 1289, 1291, 1293, 1293, 1293, 1288, 1288, 1293, 1294, 1297, 1296, 1299, 1302, 1305, 1305, 1301, 1300, 1297] ;
theStateArray[77].myPolygons[0].myYVals= [600, 598, 598, 593, 592, 587, 584, 580, 576, 575, 573, 569, 566, 564, 559, 554, 549, 553, 557, 560, 565, 568, 574, 580, 584, 582, 578, 579, 580, 586, 591, 596, 598, 599, 603, 607, 606, 610, 611, 613, 615, 620, 619, 623, 625, 630, 632, 636, 635, 638, 639, 641, 641, 638, 637, 633, 629, 625, 619, 620, 615, 614, 610, 608, 607, 609, 607, 603, 602, 600] ;
theStateArray.push( new map_State("PHL","Philippines","Philippines") );
g_map_stateMap["PHL"] = theStateArray[78];
theStateArray[78].myPolygons.push( new map_Polygon() );
theStateArray[78].myPolygons[0].myXVals= [1431, 1432, 1432, 1430, 1429, 1426, 1428, 1426, 1421, 1419, 1421, 1418, 1416, 1414, 1410, 1409, 1411, 1414, 1417, 1419, 1423, 1423, 1427, 1427, 1431, 1431, 1431] ;
theStateArray[78].myPolygons[0].myYVals= [542, 538, 535, 531, 536, 533, 530, 527, 530, 534, 536, 539, 537, 537, 534, 535, 540, 541, 543, 541, 542, 544, 544, 548, 546, 543, 542] ;
theStateArray[78].myPolygons.push( new map_Polygon() );
theStateArray[78].myPolygons[1].myXVals= [1419, 1418, 1416, 1414, 1411, 1412, 1414, 1414, 1417, 1416, 1420, 1419] ;
theStateArray[78].myPolygons[1].myYVals= [551, 549, 546, 545, 548, 549, 551, 554, 554, 551, 556, 551] ;
theStateArray[78].myPolygons.push( new map_Polygon() );
theStateArray[78].myPolygons[2].myXVals= [1392, 1385, 1388, 1391, 1394, 1397, 1398, 1395, 1392] ;
theStateArray[78].myPolygons[2].myYVals= [546, 541, 545, 548, 551, 556, 552, 550, 546] ;
theStateArray[78].myPolygons.push( new map_Polygon() );
theStateArray[78].myPolygons[3].myXVals= [1409, 1412, 1415, 1415, 1413, 1410, 1409, 1410, 1409] ;
theStateArray[78].myPolygons[3].myYVals= [559, 557, 557, 555, 553, 552, 554, 557, 559] ;
theStateArray[78].myPolygons.push( new map_Polygon() );
theStateArray[78].myPolygons[4].myXVals= [1427, 1428, 1425, 1425, 1426, 1424, 1423, 1422, 1421, 1424, 1424, 1421, 1426, 1427] ;
theStateArray[78].myPolygons[4].myYVals= [560, 555, 556, 554, 551, 550, 554, 554, 557, 557, 558, 562, 562, 560] ;
theStateArray[78].myPolygons.push( new map_Polygon() );
theStateArray[78].myPolygons[5].myXVals= [1407, 1406, 1404, 1401, 1405, 1407] ;
theStateArray[78].myPolygons[5].myYVals= [565, 561, 563, 567, 567, 565] ;
theStateArray[78].myPolygons.push( new map_Polygon() );
theStateArray[78].myPolygons[6].myXVals= [1406, 1409, 1411, 1411, 1410, 1412, 1411, 1408, 1407, 1408, 1411, 1413, 1419, 1419, 1420, 1420, 1416, 1414, 1413, 1410, 1405, 1403, 1403, 1404, 1403, 1402, 1400, 1399, 1399, 1401, 1401, 1403, 1406] ;
theStateArray[78].myPolygons[6].myYVals= [592, 591, 592, 591, 589, 585, 581, 579, 575, 571, 571, 571, 568, 566, 564, 562, 565, 567, 565, 568, 568, 569, 571, 572, 573, 571, 574, 577, 581, 580, 587, 592, 592] ;
theStateArray.push( new map_State("KWT","Kuwait","Kuwait") );
g_map_stateMap["KWT"] = theStateArray[79];
theStateArray[79].myPolygons.push( new map_Polygon() );
theStateArray[79].myPolygons[0].myXVals= [1039, 1040, 1040, 1042, 1038, 1037, 1032, 1036, 1039] ;
theStateArray[79].myPolygons[0].myYVals= [649, 647, 646, 642, 642, 645, 645, 650, 649] ;
theStateArray.push( new map_State("LAO","Laos","Laos") );
g_map_stateMap["LAO"] = theStateArray[80];
theStateArray[80].myPolygons.push( new map_Polygon() );
theStateArray[80].myPolygons[0].myXVals= [1326, 1327, 1327, 1323, 1323, 1319, 1316, 1314, 1312, 1310, 1305, 1305, 1306, 1303, 1302, 1300, 1301, 1305, 1306, 1309, 1308, 1310, 1313, 1316, 1322, 1324, 1320, 1319, 1325, 1329, 1332, 1336, 1337, 1336, 1332, 1330, 1326] ;
theStateArray[80].myPolygons[0].myYVals= [571, 573, 577, 582, 587, 591, 591, 589, 589, 590, 587, 592, 597, 597, 600, 602, 603, 607, 606, 605, 611, 612, 608, 603, 603, 599, 598, 596, 593, 587, 583, 579, 576, 571, 572, 569, 571] ;
theStateArray.push( new map_State("SAU","Saudi Arabia","Saudi Arabia") );
g_map_stateMap["SAU"] = theStateArray[81];
theStateArray[81].myPolygons.push( new map_Polygon() );
theStateArray[81].myPolygons[0].myXVals= [1013, 1013, 1011, 1011, 1008, 1006, 1004, 1001, 999, 995, 995, 995, 992, 990, 987, 985, 986, 984, 983, 981, 978, 975, 973, 973, 974, 974, 980, 982, 983, 987, 988, 989, 985, 995, 995, 1001, 1009, 1023, 1032, 1037, 1038, 1042, 1044, 1046, 1047, 1050, 1051, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1060, 1075, 1076, 1078, 1074, 1060, 1045, 1040, 1037, 1035, 1033, 1031, 1026, 1026, 1020, 1018, 1016, 1015, 1016, 1013] ;
theStateArray[81].myPolygons[0].myYVals= [581, 583, 585, 587, 589, 593, 597, 600, 601, 606, 609, 612, 618, 620, 621, 624, 625, 628, 629, 632, 636, 640, 640, 643, 644, 646, 645, 647, 649, 650, 651, 652, 657, 660, 660, 659, 655, 645, 645, 645, 642, 642, 638, 637, 635, 633, 631, 629, 628, 626, 624, 623, 622, 623, 621, 620, 615, 612, 613, 610, 599, 595, 593, 590, 585, 584, 586, 586, 586, 587, 587, 586, 587, 585, 583, 581] ;
theStateArray.push( new map_State("LBN","Lebanon","Lebanon") );
g_map_stateMap["LBN"] = theStateArray[82];
theStateArray[82].myPolygons.push( new map_Polygon() );
theStateArray[82].myPolygons[0].myXVals= [979, 977, 977, 975, 977, 979, 979, 982, 983, 980, 979] ;
theStateArray[82].myPolygons[0].myYVals= [666, 666, 665, 665, 669, 673, 673, 672, 671, 669, 666] ;
theStateArray.push( new map_State("SYR","Syria","Syria") );
g_map_stateMap["SYR"] = theStateArray[83];
theStateArray[83].myPolygons.push( new map_Polygon() );
theStateArray[83].myPolygons[0].myXVals= [993, 984, 978, 978, 979, 979, 980, 983, 982, 979, 979, 980, 982, 983, 983, 985, 990, 993, 997, 1003, 1006, 1011, 1009, 1006, 1006, 1005, 993] ;
theStateArray[83].myPolygons[0].myYVals= [666, 661, 663, 663, 664, 666, 669, 671, 672, 673, 677, 679, 680, 681, 684, 683, 684, 683, 683, 685, 685, 686, 683, 681, 678, 672, 666] ;
theStateArray.push( new map_State("MNG","Mongolia","Mongolia") );
g_map_stateMap["MNG"] = theStateArray[84];
theStateArray[84].myPolygons.push( new map_Polygon() );
theStateArray[84].myPolygons[0].myXVals= [1238, 1244, 1253, 1261, 1265, 1270, 1274, 1279, 1286, 1291, 1289, 1294, 1299, 1304, 1310, 1311, 1318, 1323, 1329, 1334, 1339, 1342, 1347, 1353, 1357, 1364, 1371, 1374, 1377, 1383, 1380, 1377, 1378, 1381, 1386, 1390, 1394, 1398, 1398, 1394, 1387, 1383, 1379, 1372, 1367, 1362, 1359, 1356, 1358, 1359, 1355, 1352, 1346, 1338, 1330, 1324, 1322, 1316, 1309, 1304, 1297, 1287, 1281, 1278, 1276, 1273, 1267, 1260, 1254, 1252, 1254, 1251, 1244, 1240, 1238] ;
theStateArray[84].myPolygons[0].myYVals= [746, 747, 751, 754, 752, 752, 750, 749, 748, 752, 755, 760, 758, 757, 756, 752, 750, 751, 752, 751, 748, 746, 746, 745, 746, 747, 751, 750, 749, 749, 745, 740, 738, 739, 738, 740, 738, 735, 733, 734, 733, 731, 728, 726, 724, 725, 725, 722, 720, 718, 717, 714, 712, 712, 710, 707, 709, 709, 712, 713, 712, 713, 713, 716, 721, 721, 724, 725, 726, 728, 734, 738, 740, 742, 746] ;
theStateArray.push( new map_State("QAT","Qatar","Qatar") );
g_map_stateMap["QAT"] = theStateArray[85];
theStateArray[85].myPolygons.push( new map_Polygon() );
theStateArray[85].myPolygons[0].myXVals= [1054, 1053, 1055, 1056, 1057, 1058, 1056, 1055, 1054] ;
theStateArray[85].myPolygons[0].myYVals= [623, 627, 630, 630, 629, 626, 623, 622, 623] ;
theStateArray.push( new map_State("TLS","East Timor","East Timor") );
g_map_stateMap["TLS"] = theStateArray[86];
theStateArray[86].myPolygons.push( new map_Polygon() );
theStateArray[86].myPolygons[0].myXVals= [1424, 1425, 1429, 1433, 1434, 1436, 1434, 1429, 1425, 1425, 1424] ;
theStateArray[86].myPolygons[0].myYVals= [455, 456, 457, 458, 458, 458, 456, 454, 453, 454, 455] ;
theStateArray.push( new map_State("PAK","Pakistan","Pakistan") );
g_map_stateMap["PAK"] = theStateArray[87];
theStateArray[87].myPolygons.push( new map_Polygon() );
theStateArray[87].myPolygons[0].myXVals= [1175, 1179, 1180, 1189, 1184, 1178, 1171, 1168, 1170, 1172, 1176, 1172, 1172, 1167, 1164, 1158, 1153, 1147, 1150, 1151, 1154, 1155, 1144, 1140, 1137, 1135, 1131, 1122, 1114, 1107, 1109, 1116, 1116, 1113, 1113, 1108, 1106, 1104, 1112, 1117, 1120, 1121, 1125, 1131, 1131, 1134, 1138, 1138, 1142, 1144, 1146, 1146, 1148, 1151, 1149, 1154, 1155, 1155, 1158, 1157, 1156, 1159, 1164, 1170, 1172, 1175] ;
theStateArray[87].myPolygons[0].myYVals= [685, 683, 679, 677, 673, 672, 673, 671, 667, 663, 661, 658, 654, 649, 644, 639, 639, 634, 632, 628, 626, 621, 621, 618, 619, 623, 627, 626, 626, 625, 631, 633, 636, 636, 641, 643, 646, 649, 646, 647, 646, 647, 647, 649, 653, 656, 656, 657, 658, 658, 659, 662, 665, 666, 670, 669, 671, 673, 675, 678, 680, 682, 683, 684, 685, 685] ;
theStateArray.push( new map_State("TUR","Turkey","Turkey") );
g_map_stateMap["TUR"] = theStateArray[88];
theStateArray[88].myPolygons.push( new map_Polygon() );
theStateArray[88].myPolygons[0].myXVals= [984, 991, 997, 1001, 1007, 1013, 1017, 1018, 1018, 1022, 1023, 1020, 1022, 1021, 1023, 1021, 1019, 1013, 1011, 1006, 1003, 997, 993, 990, 985, 983, 983, 982, 980, 978, 980, 977, 973, 970, 962, 958, 953, 951, 948, 943, 938, 935, 931, 934, 930, 936, 944, 946, 955, 961, 967, 975, 984] ;
theStateArray[88].myPolygons[0].myYVals= [706, 704, 705, 705, 707, 707, 705, 703, 701, 700, 698, 697, 691, 689, 685, 685, 686, 686, 686, 685, 685, 683, 683, 684, 683, 684, 681, 680, 679, 681, 683, 682, 683, 681, 680, 683, 683, 681, 680, 683, 683, 688, 691, 694, 697, 702, 702, 706, 705, 708, 710, 710, 706] ;
theStateArray[88].myPolygons.push( new map_Polygon() );
theStateArray[88].myPolygons[1].myXVals= [935, 931, 930, 930, 931, 933, 930, 935, 939, 940, 944, 944, 938, 935] ;
theStateArray[88].myPolygons[1].myYVals= [703, 700, 703, 704, 704, 707, 709, 710, 710, 708, 706, 705, 704, 703] ;
theStateArray.push( new map_State("PRK","North Korea","North Korea") );
g_map_stateMap["PRK"] = theStateArray[89];
theStateArray[89].myPolygons.push( new map_Polygon() );
theStateArray[89].myPolygons[0].myXVals= [1453, 1453, 1452, 1449, 1448, 1448, 1445, 1445, 1443, 1439, 1437, 1437, 1436, 1438, 1441, 1441, 1438, 1435, 1433, 1431, 1430, 1428, 1427, 1426, 1426, 1424, 1423, 1424, 1426, 1425, 1426, 1426, 1423, 1421, 1425, 1430, 1434, 1436, 1441, 1440, 1447, 1449, 1453] ;
theStateArray[89].myPolygons[0].myYVals= [711, 711, 711, 709, 708, 704, 703, 702, 700, 700, 698, 696, 696, 695, 693, 691, 691, 691, 689, 689, 688, 689, 688, 688, 689, 689, 690, 692, 693, 694, 696, 697, 698, 699, 702, 705, 709, 707, 707, 709, 712, 714, 711] ;
theStateArray.push( new map_State("ARG","Argentina","Argentina") );
g_map_stateMap["ARG"] = theStateArray[90];
theStateArray[90].myPolygons.push( new map_Polygon() );
theStateArray[90].myPolygons[0].myXVals= [472, 467, 465, 462, 456, 456, 458, 461, 467, 474, 472] ;
theStateArray[90].myPolygons[0].myYVals= [224, 223, 225, 225, 225, 236, 234, 230, 227, 226, 224] ;
theStateArray[90].myPolygons.push( new map_Polygon() );
theStateArray[90].myPolygons[1].myXVals= [475, 478, 480, 485, 486, 495, 499, 505, 511, 511, 506, 511, 517, 521, 526, 526, 529, 531, 531, 527, 524, 518, 511, 510, 509, 509, 508, 507, 507, 513, 513, 516, 516, 511, 503, 493, 488, 489, 488, 489, 486, 481, 476, 474, 475, 478, 481, 482, 478, 474, 473, 472, 467, 463, 462, 467, 471, 470, 464, 460, 456, 454, 455, 459, 457, 452, 440, 438, 438, 435, 433, 432, 436, 438, 437, 440, 442, 441, 443, 443, 441, 442, 440, 439, 441, 440, 441, 442, 445, 444, 444, 448, 448, 450, 450, 449, 447, 450, 449, 451, 454, 458, 457, 458, 457, 463, 465, 464, 468, 475] ;
theStateArray[90].myPolygons[1].myYVals= [389, 386, 390, 389, 388, 380, 379, 376, 374, 371, 364, 363, 362, 363, 366, 371, 372, 369, 365, 362, 360, 355, 348, 344, 339, 334, 333, 330, 327, 323, 320, 317, 315, 309, 306, 305, 305, 302, 299, 296, 294, 294, 295, 294, 289, 288, 289, 287, 285, 282, 277, 274, 274, 272, 268, 264, 263, 259, 256, 250, 248, 246, 241, 238, 238, 239, 239, 242, 246, 246, 248, 253, 255, 258, 261, 265, 272, 275, 276, 277, 278, 281, 282, 288, 289, 295, 300, 305, 307, 312, 316, 319, 324, 329, 333, 334, 343, 348, 353, 357, 362, 365, 367, 369, 377, 379, 385, 386, 390, 389] ;
theStateArray.push( new map_State("BOL","Bolivia","Bolivia") );
g_map_stateMap["BOL"] = theStateArray[91];
theStateArray[91].myPolygons.push( new map_Polygon() );
theStateArray[91].myPolygons[0].myXVals= [485, 480, 478, 475, 468, 464, 460, 458, 456, 457, 455, 454, 452, 455, 453, 454, 453, 455, 455, 455, 456, 452, 456, 458, 459, 464, 466, 473, 472, 473, 472, 478, 484, 485, 489, 491, 494, 497, 497, 498, 498, 497, 499, 508, 508, 508, 511, 512, 511, 510, 510, 509, 509, 504, 499, 491, 488, 488, 486, 485] ;
theStateArray[91].myPolygons[0].myYVals= [389, 390, 386, 389, 390, 386, 385, 392, 398, 402, 405, 408, 412, 417, 421, 423, 425, 427, 431, 435, 437, 445, 444, 444, 446, 448, 450, 451, 447, 445, 442, 437, 436, 434, 434, 432, 432, 431, 428, 426, 424, 424, 418, 418, 415, 413, 412, 409, 405, 402, 400, 399, 400, 403, 403, 401, 397, 394, 388, 389] ;
theStateArray.push( new map_State("TWN","Taiwan","Taiwan") );
g_map_stateMap["TWN"] = theStateArray[92];
theStateArray[92].myPolygons.push( new map_Polygon() );
theStateArray[92].myPolygons[0].myXVals= [1408, 1405, 1403, 1401, 1400, 1403, 1407, 1409, 1408] ;
theStateArray[92].myPolygons[0].myYVals= [621, 613, 609, 614, 617, 622, 626, 624, 621] ;
theStateArray.push( new map_State("BRA","Brazil","Brazil") );
g_map_stateMap["BRA"] = theStateArray[93];
theStateArray[93].myPolygons.push( new map_Polygon() );
theStateArray[93].myPolygons[0].myXVals= [511, 518, 524, 527, 531, 531, 529, 526, 527, 528, 528, 526, 524, 522, 522, 521, 521, 517, 515, 510, 510, 509, 510, 510, 511, 512, 511, 508, 508, 508, 499, 497, 498, 498, 497, 497, 494, 491, 489, 485, 484, 478, 472, 473, 472, 473, 466, 464, 459, 458, 456, 452, 449, 447, 447, 443, 439, 437, 433, 434, 432, 430, 431, 431, 434, 433, 435, 435, 441, 445, 446, 450, 452, 452, 452, 449, 449, 452, 453, 453, 450, 450, 460, 462, 463, 464, 465, 468, 472, 473, 476, 479, 479, 483, 482, 478, 477, 478, 475, 476, 480, 484, 485, 489, 495, 496, 496, 498, 500, 499, 501, 502, 500, 500, 501, 501, 504, 507, 507, 509, 511, 513, 516, 517, 520, 520, 519, 520, 522, 524, 527, 529, 531, 532, 532, 535, 537, 538, 541, 543, 544, 547, 550, 550, 546, 548, 556, 557, 560, 567, 575, 577, 577, 582, 592, 600, 607, 613, 617, 622, 623, 625, 626, 624, 621, 614, 611, 607, 606, 605, 605, 604, 603, 602, 601, 596, 595, 591, 590, 584, 576, 573, 567, 561, 557, 556, 557, 556, 555, 552, 546, 542, 538, 536, 533, 531, 533, 531, 527, 521, 520, 515, 511] ;
theStateArray[93].myPolygons[0].myYVals= [348, 355, 360, 362, 365, 369, 372, 371, 374, 377, 379, 380, 379, 380, 382, 386, 388, 389, 388, 389, 396, 399, 400, 402, 405, 409, 412, 413, 415, 418, 418, 424, 424, 426, 428, 431, 432, 432, 434, 434, 436, 437, 442, 445, 447, 451, 450, 448, 446, 444, 444, 445, 444, 444, 452, 449, 449, 452, 452, 454, 457, 462, 463, 465, 466, 469, 471, 473, 477, 477, 478, 478, 492, 494, 497, 499, 502, 503, 503, 504, 505, 508, 508, 510, 508, 505, 506, 503, 503, 505, 506, 507, 509, 511, 512, 512, 515, 518, 520, 520, 520, 518, 520, 520, 522, 524, 526, 526, 525, 522, 522, 519, 518, 513, 511, 508, 506, 506, 507, 507, 508, 509, 509, 509, 509, 510, 511, 512, 512, 512, 511, 510, 511, 511, 510, 510, 512, 516, 520, 521, 518, 509, 508, 505, 501, 499, 498, 493, 497, 495, 492, 489, 486, 488, 485, 485, 481, 475, 474, 474, 472, 466, 463, 455, 451, 444, 439, 434, 434, 431, 421, 413, 410, 408, 402, 395, 390, 388, 385, 385, 383, 381, 379, 375, 370, 366, 364, 359, 356, 353, 345, 341, 338, 334, 331, 333, 336, 339, 342, 345, 345, 349, 348] ;
theStateArray.push( new map_State("CHL","Chile","Chile") );
g_map_stateMap["CHL"] = theStateArray[94];
theStateArray[94].myPolygons.push( new map_Polygon() );
theStateArray[94].myPolygons[0].myXVals= [456, 456, 462, 465, 463, 459, 456, 453, 450, 444, 438, 433, 426, 430, 437, 444, 447, 448, 453, 456] ;
theStateArray[94].myPolygons[0].myYVals= [236, 225, 225, 225, 223, 221, 222, 222, 224, 224, 227, 230, 235, 234, 231, 229, 231, 235, 237, 236] ;
theStateArray[94].myPolygons.push( new map_Polygon() );
theStateArray[94].myPolygons[1].myXVals= [458, 460, 464, 465, 463, 457, 458, 457, 458, 454, 451, 449, 450, 447, 449, 450, 450, 448, 448, 444, 444, 445, 442, 441, 440, 441, 439, 440, 442, 441, 443, 443, 441, 442, 440, 437, 438, 436, 432, 433, 435, 438, 438, 440, 452, 457, 452, 450, 445, 444, 442, 437, 431, 431, 425, 423, 425, 422, 421, 424, 429, 421, 426, 428, 433, 436, 433, 431, 428, 429, 431, 433, 432, 432, 434, 437, 440, 442, 441, 443, 442, 445, 446, 447, 449, 449, 448, 450, 452, 454, 455, 457, 456, 458] ;
theStateArray[94].myPolygons[1].myYVals= [392, 385, 386, 385, 379, 377, 369, 367, 365, 362, 357, 353, 348, 343, 334, 333, 329, 324, 319, 316, 312, 307, 305, 300, 295, 289, 288, 282, 281, 278, 277, 276, 275, 272, 265, 261, 258, 255, 253, 248, 246, 246, 242, 239, 239, 238, 238, 237, 235, 230, 230, 232, 235, 235, 238, 241, 244, 248, 256, 261, 265, 266, 271, 279, 277, 288, 289, 283, 283, 291, 300, 303, 308, 314, 314, 322, 330, 337, 345, 349, 355, 361, 371, 381, 393, 401, 408, 409, 412, 408, 405, 402, 398, 392] ;
theStateArray.push( new map_State("VNM","Vietnam","Vietnam") );
g_map_stateMap["VNM"] = theStateArray[95];
theStateArray[95].myPolygons.push( new map_Polygon() );
theStateArray[95].myPolygons[0].myXVals= [1340, 1333, 1329, 1328, 1332, 1336, 1341, 1344, 1346, 1346, 1341, 1336, 1332, 1325, 1323, 1325, 1321, 1325, 1331, 1329, 1337, 1338, 1336, 1337, 1336, 1332, 1329, 1325, 1319, 1320, 1324, 1322, 1316, 1313, 1310, 1313, 1317, 1322, 1326, 1329, 1333, 1332, 1335, 1340] ;
theStateArray[95].myPolygons[0].myYVals= [607, 603, 598, 595, 590, 583, 580, 576, 567, 558, 555, 551, 547, 542, 546, 549, 552, 554, 554, 557, 561, 567, 571, 576, 579, 583, 587, 593, 596, 598, 599, 603, 603, 608, 612, 613, 613, 614, 616, 614, 613, 611, 609, 607] ;
theStateArray.push( new map_State("TKM","Turkmenistan","Turkmenistan") );
g_map_stateMap["TKM"] = theStateArray[96];
theStateArray[96].myPolygons.push( new map_Polygon() );
theStateArray[96].myPolygons[0].myXVals= [1106, 1105, 1101, 1096, 1092, 1086, 1083, 1080, 1077, 1074, 1069, 1068, 1069, 1065, 1066, 1063, 1064, 1069, 1073, 1070, 1068, 1064, 1064, 1062, 1064, 1070, 1073, 1077, 1079, 1085, 1084, 1088, 1093, 1099, 1100, 1102, 1107, 1109, 1111, 1117, 1120, 1126, 1132, 1132, 1131, 1128, 1127, 1123, 1122, 1119, 1115, 1114, 1111, 1106] ;
theStateArray[96].myPolygons[0].myYVals= [678, 682, 682, 687, 687, 690, 690, 689, 689, 686, 685, 689, 694, 696, 699, 700, 704, 703, 704, 707, 710, 709, 705, 708, 710, 711, 710, 706, 706, 706, 709, 710, 713, 711, 707, 706, 706, 705, 700, 696, 694, 692, 689, 686, 686, 688, 686, 685, 681, 680, 679, 677, 676, 678] ;
theStateArray.push( new map_State("COL","Colombia","Colombia") );
g_map_stateMap["COL"] = theStateArray[97];
theStateArray[97].myPolygons.push( new map_Polygon() );
theStateArray[97].myPolygons[0].myXVals= [423, 420, 418, 417, 412, 411, 410, 405, 405, 406, 406, 407, 410, 412, 414, 412, 413, 412, 413, 412, 410, 411, 412, 413, 412, 413, 415, 419, 421, 421, 422, 425, 428, 429, 432, 436, 438, 441, 443, 444, 443, 440, 438, 436, 435, 434, 433, 436, 436, 437, 438, 437, 437, 439, 440, 446, 449, 453, 455, 458, 461, 463, 462, 461, 460, 461, 463, 463, 460, 462, 464, 465, 464, 463, 462, 460, 450, 450, 453, 453, 452, 449, 449, 452, 452, 452, 450, 448, 446, 449, 445, 442, 441, 438, 434, 431, 429, 427, 424, 423] ;
theStateArray[97].myPolygons[0].myYVals= [499, 500, 502, 501, 501, 504, 504, 506, 508, 508, 511, 513, 513, 516, 519, 520, 523, 527, 529, 533, 536, 538, 538, 539, 542, 543, 543, 546, 547, 548, 553, 555, 555, 556, 556, 558, 559, 562, 561, 560, 558, 558, 555, 554, 552, 548, 545, 545, 543, 542, 540, 538, 537, 536, 534, 535, 534, 530, 531, 530, 531, 530, 527, 526, 522, 519, 517, 516, 514, 513, 511, 506, 505, 508, 510, 508, 508, 505, 504, 503, 503, 502, 499, 497, 494, 492, 478, 481, 481, 486, 488, 488, 489, 487, 488, 493, 494, 497, 499, 499] ;
theStateArray.push( new map_State("ECU","Ecuador","Ecuador") );
g_map_stateMap["ECU"] = theStateArray[98];
theStateArray[98].myPolygons.push( new map_Polygon() );
theStateArray[98].myPolygons[0].myXVals= [398, 401, 400, 398, 395, 396, 395, 397, 398, 399, 399, 402, 405, 410, 411, 412, 417, 418, 420, 423, 423, 422, 416, 410, 407, 406, 403, 401, 399, 397, 397, 399, 398] ;
theStateArray[98].myPolygons[0].myYVals= [482, 486, 488, 486, 488, 490, 494, 495, 498, 501, 503, 504, 506, 504, 504, 501, 501, 502, 500, 499, 495, 492, 486, 484, 480, 477, 475, 477, 478, 477, 479, 480, 482] ;
theStateArray.push( new map_State("FLK","Falkland Islands","Falkland Islands") );
g_map_stateMap["FLK"] = theStateArray[99];
theStateArray[99].myPolygons.push( new map_Polygon() );
theStateArray[99].myPolygons[0].myXVals= [494, 500, 504, 507, 511, 509, 503, 500, 496, 494] ;
theStateArray[99].myPolygons[0].myYVals= [240, 243, 242, 244, 242, 240, 239, 240, 238, 240] ;
theStateArray.push( new map_State("GUY","Guyana","Guyana") );
g_map_stateMap["GUY"] = theStateArray[100];
theStateArray[100].myPolygons.push( new map_Polygon() );
theStateArray[100].myPolygons[0].myXVals= [501, 504, 507, 507, 509, 512, 514, 513, 510, 510, 509, 511, 513, 514, 517, 516, 513, 511, 509, 507, 507, 504, 501, 501, 500, 500, 502, 501, 499, 500, 498, 496, 492, 494, 494, 497, 498, 496, 497, 501] ;
theStateArray[100].myPolygons[0].myYVals= [541, 539, 536, 534, 534, 531, 529, 525, 524, 522, 520, 516, 516, 513, 509, 509, 509, 508, 507, 507, 506, 506, 508, 511, 513, 518, 519, 522, 522, 525, 526, 526, 529, 531, 533, 534, 535, 537, 538, 541] ;
theStateArray.push( new map_State("YEM","Yemen","Yemen") );
g_map_stateMap["YEM"] = theStateArray[101];
theStateArray[101].myPolygons.push( new map_Polygon() );
theStateArray[101].myPolygons[0].myXVals= [1065, 1061, 1060, 1060, 1055, 1047, 1043, 1041, 1039, 1036, 1033, 1029, 1028, 1027, 1025, 1024, 1022, 1020, 1017, 1016, 1016, 1015, 1014, 1013, 1014, 1013, 1014, 1013, 1016, 1015, 1016, 1018, 1020, 1026, 1026, 1031, 1033, 1035, 1037, 1040, 1045, 1060, 1063, 1065] ;
theStateArray[101].myPolygons[0].myYVals= [583, 581, 579, 577, 575, 573, 570, 569, 570, 567, 566, 566, 566, 565, 564, 563, 563, 562, 563, 566, 568, 570, 574, 576, 576, 578, 579, 581, 583, 585, 587, 586, 587, 587, 586, 586, 586, 584, 585, 590, 593, 595, 586, 583] ;
theStateArray.push( new map_State("PER","Peru","Peru") );
g_map_stateMap["PER"] = theStateArray[102];
theStateArray[102].myPolygons.push( new map_Polygon() );
theStateArray[102].myPolygons[0].myXVals= [452, 450, 448, 443, 442, 432, 423, 419, 417, 418, 414, 409, 404, 402, 401, 397, 393, 395, 392, 394, 398, 399, 397, 397, 399, 401, 403, 406, 407, 410, 416, 422, 423, 423, 424, 427, 429, 431, 434, 438, 441, 442, 445, 449, 446, 448, 450, 446, 445, 441, 435, 435, 433, 434, 431, 431, 430, 432, 434, 433, 437, 439, 443, 447, 447, 449, 452, 456, 455, 455, 455, 453, 454, 453, 455, 452] ;
theStateArray[102].myPolygons[0].myYVals= [412, 409, 408, 411, 413, 418, 423, 426, 430, 432, 438, 448, 458, 460, 464, 467, 469, 471, 476, 479, 482, 480, 479, 477, 478, 477, 475, 477, 480, 484, 486, 492, 495, 499, 499, 497, 494, 493, 488, 487, 489, 488, 488, 486, 481, 481, 478, 478, 477, 477, 473, 471, 469, 466, 465, 463, 462, 457, 454, 452, 452, 449, 449, 452, 444, 444, 445, 437, 435, 431, 427, 425, 423, 421, 417, 412] ;
theStateArray.push( new map_State("SUR","Suriname","Suriname") );
g_map_stateMap["SUR"] = theStateArray[103];
theStateArray[103].myPolygons.push( new map_Polygon() );
theStateArray[103].myPolygons[0].myXVals= [514, 520, 520, 524, 530, 527, 528, 529, 529, 528, 527, 524, 522, 520, 519, 520, 520, 517, 514, 513, 511, 509, 510, 510, 513, 514] ;
theStateArray[103].myPolygons[0].myYVals= [529, 528, 529, 530, 528, 524, 521, 518, 515, 513, 511, 512, 512, 512, 511, 510, 509, 509, 513, 516, 516, 520, 522, 524, 525, 529] ;
theStateArray.push( new map_State("URY","Uruguay","Uruguay") );
g_map_stateMap["URY"] = theStateArray[104];
theStateArray[104].myPolygons.push( new map_Polygon() );
theStateArray[104].myPolygons[0].myXVals= [511, 515, 520, 521, 527, 531, 533, 531, 533, 530, 525, 521, 518, 514, 510, 507, 508, 509, 509, 510, 511] ;
theStateArray[104].myPolygons[0].myYVals= [348, 349, 345, 345, 342, 339, 336, 333, 331, 328, 325, 326, 325, 327, 327, 330, 333, 334, 339, 344, 348] ;
theStateArray.push( new map_State("PRY","Paraguay","Paraguay") );
g_map_stateMap["PRY"] = theStateArray[105];
theStateArray[105].myPolygons.push( new map_Polygon() );
theStateArray[105].myPolygons[0].myXVals= [486, 488, 488, 491, 499, 504, 509, 509, 510, 510, 515, 517, 521, 521, 522, 522, 524, 526, 528, 528, 527, 526, 526, 521, 517, 511, 506, 511, 511, 505, 499, 495, 486] ;
theStateArray[105].myPolygons[0].myYVals= [388, 394, 397, 401, 403, 403, 400, 399, 396, 389, 388, 389, 388, 386, 382, 380, 379, 380, 379, 377, 374, 371, 366, 363, 362, 363, 364, 371, 374, 376, 379, 380, 388] ;
theStateArray.push( new map_State("VEN","Venezuela","Venezuela") );
g_map_stateMap["VEN"] = theStateArray[106];
theStateArray[106].myPolygons.push( new map_Polygon() );
theStateArray[106].myPolygons[0].myXVals= [443, 443, 440, 441, 441, 439, 441, 443, 444, 443, 442, 449, 448, 450, 452, 455, 458, 459, 463, 468, 471, 475, 478, 478, 484, 490, 486, 488, 492, 495, 496, 499, 501, 497, 496, 498, 497, 494, 494, 492, 496, 496, 495, 489, 485, 484, 480, 476, 475, 478, 477, 478, 482, 483, 479, 479, 476, 473, 472, 468, 465, 464, 462, 460, 463, 463, 461, 460, 461, 462, 463, 461, 458, 455, 453, 449, 446, 440, 439, 437, 437, 438, 437, 436, 436, 433, 434, 435, 436, 438, 440, 443] ;
theStateArray[106].myPolygons[0].myYVals= [558, 557, 557, 554, 552, 549, 545, 545, 549, 551, 554, 556, 559, 560, 557, 557, 554, 552, 552, 553, 551, 550, 551, 553, 553, 553, 552, 549, 549, 546, 542, 543, 541, 538, 537, 535, 534, 533, 531, 529, 526, 524, 522, 520, 520, 518, 520, 520, 520, 518, 515, 512, 512, 511, 509, 507, 506, 505, 503, 503, 506, 511, 513, 514, 516, 517, 519, 522, 526, 527, 530, 531, 530, 531, 530, 534, 535, 534, 536, 537, 538, 540, 542, 543, 545, 545, 548, 552, 554, 555, 558, 558] ;
theStateArray.push( new map_State("THA","Thailand","Thailand") );
g_map_stateMap["THA"] = theStateArray[107];
theStateArray[107].myPolygons.push( new map_Polygon() );
theStateArray[107].myPolygons[0].myXVals= [1312, 1308, 1304, 1304, 1300, 1300, 1297, 1295, 1296, 1299, 1301, 1302, 1305, 1308, 1310, 1309, 1305, 1305, 1301, 1300, 1298, 1297, 1294, 1292, 1291, 1290, 1291, 1292, 1295, 1297, 1295, 1296, 1295, 1292, 1290, 1292, 1294, 1292, 1289, 1286, 1288, 1291, 1294, 1297, 1300, 1302, 1303, 1306, 1305, 1305, 1310, 1312, 1314, 1316, 1319, 1323, 1323, 1327, 1327, 1326, 1321, 1314, 1311, 1312] ;
theStateArray[107].myPolygons[0].myYVals= [560, 563, 563, 567, 567, 561, 554, 549, 546, 546, 541, 537, 534, 533, 531, 529, 528, 531, 533, 532, 534, 536, 539, 541, 538, 541, 544, 549, 554, 559, 564, 566, 569, 573, 575, 576, 580, 584, 587, 592, 593, 598, 598, 600, 602, 600, 597, 597, 592, 587, 590, 589, 589, 591, 591, 587, 582, 577, 573, 571, 572, 571, 566, 560] ;
theStateArray.push( new map_State("BHS","The Bahamas","The Bahamas") );
g_map_stateMap["BHS"] = theStateArray[108];
theStateArray[108].myPolygons.push( new map_Polygon() );
theStateArray[108].myPolygons[0].myXVals= [412, 411, 409, 407, 409, 410, 412, 412] ;
theStateArray[108].myPolygons[0].myYVals= [618, 618, 621, 622, 626, 625, 621, 618] ;
theStateArray[108].myPolygons.push( new map_Polygon() );
theStateArray[108].myPolygons[1].myXVals= [410, 405, 405, 407, 410, 410] ;
theStateArray[108].myPolygons[1].myYVals= [632, 632, 633, 634, 634, 632] ;
theStateArray[108].myPolygons.push( new map_Polygon() );
theStateArray[108].myPolygons[2].myXVals= [415, 414, 413, 413, 411, 411, 415] ;
theStateArray[108].myPolygons[2].myYVals= [632, 629, 630, 632, 634, 635, 632] ;
theStateArray.push( new map_State("BLZ","Belize","Belize") );
g_map_stateMap["BLZ"] = theStateArray[109];
theStateArray[109].myPolygons.push( new map_Polygon() );
theStateArray[109].myPolygons[0].myXVals= [354, 354, 354, 355, 357, 358, 358, 359, 359, 358, 359, 358, 358, 358, 357, 356, 355, 353, 354, 354] ;
theStateArray[109].myPolygons[0].myYVals= [589, 589, 590, 589, 592, 592, 591, 591, 590, 588, 587, 585, 585, 582, 581, 581, 579, 579, 585, 589] ;
theStateArray.push( new map_State("CAN","Canada","Canada") );
g_map_stateMap["CAN"] = theStateArray[110];
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[0].myXVals= [481, 485, 489, 487, 485, 479, 478, 479, 481] ;
theStateArray[110].myPolygons[0].myYVals= [732, 732, 732, 730, 729, 731, 733, 735, 732] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[1].myXVals= [490, 488, 482, 477, 479, 485, 490, 490] ;
theStateArray[110].myPolygons[1].myYVals= [745, 745, 747, 749, 749, 748, 746, 745] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[2].myXVals= [182, 179, 171, 170, 165, 164, 159, 157, 158, 163, 166, 171, 172, 175, 180, 182] ;
theStateArray[110].myPolygons[2].myYVals= [742, 741, 744, 745, 747, 749, 749, 752, 753, 752, 752, 751, 749, 747, 745, 742] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[3].myXVals= [519, 516, 519, 522, 520, 525, 527, 532, 531, 534, 535, 536, 534, 532, 529, 530, 528, 522, 520, 523, 518, 513, 503, 502, 506, 503, 508, 513, 516, 520, 522, 521, 519] ;
theStateArray[110].myPolygons[3].myYVals= [753, 749, 750, 749, 747, 746, 747, 746, 742, 743, 740, 737, 733, 733, 734, 738, 738, 734, 734, 736, 738, 737, 738, 739, 741, 742, 745, 753, 756, 758, 757, 756, 753] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[4].myXVals= [134, 136, 141, 139, 144, 142, 139, 137, 134, 133, 134] ;
theStateArray[110].myPolygons[4].myYVals= [770, 770, 770, 764, 760, 760, 763, 765, 767, 769, 770] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[5].myXVals= [403, 401, 399, 398, 398, 400, 402, 403] ;
theStateArray[110].myPolygons[5].myYVals= [810, 808, 808, 810, 810, 811, 811, 810] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[6].myXVals= [390, 384, 381, 380, 383, 390, 390] ;
theStateArray[110].myPolygons[6].myYVals= [813, 810, 810, 812, 814, 814, 813] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[7].myXVals= [374, 375, 377, 380, 386, 391, 392, 395, 399, 395, 387, 384, 379, 372, 370, 363, 368, 368, 370, 374] ;
theStateArray[110].myPolygons[7].myYVals= [828, 826, 826, 825, 823, 822, 819, 820, 818, 817, 818, 820, 817, 815, 818, 817, 820, 824, 828, 828] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[8].myXVals= [420, 415, 413, 415, 420, 424, 424, 423, 420] ;
theStateArray[110].myPolygons[8].myYVals= [835, 835, 837, 840, 841, 840, 837, 837, 835] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[9].myXVals= [321, 318, 311, 307, 301, 305, 308, 314, 317, 318, 321] ;
theStateArray[110].myPolygons[9].myYVals= [845, 843, 845, 844, 847, 848, 850, 849, 848, 847, 845] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[10].myXVals= [347, 347, 353, 359, 358, 363, 368, 372, 372, 379, 386, 393, 393, 390, 393, 393, 383, 376, 371, 369, 364, 363, 357, 350, 346, 346, 340, 334, 328, 326, 326, 333, 336, 338, 345, 354, 359, 363, 369, 374, 383, 388, 387, 389, 392, 400, 404, 406, 404, 400, 408, 414, 417, 416, 413, 407, 413, 411, 409, 412, 421, 426, 430, 435, 441, 443, 452, 451, 453, 458, 461, 468, 473, 477, 480, 487, 493, 491, 497, 502, 510, 513, 515, 519, 521, 521, 517, 514, 506, 499, 491, 480, 473, 468, 463, 457, 450, 444, 448, 456, 467, 474, 479, 474, 476, 477, 484, 492, 497, 497, 500, 494, 483, 478, 473, 469, 469, 477, 469, 464, 461, 461, 458, 455, 453, 450, 448, 446, 444, 442, 442, 433, 425, 423, 418, 417, 415, 411, 406, 404, 404, 405, 405, 398, 393, 387, 386, 384, 384, 384, 385, 387, 389, 388, 387, 382, 382, 381, 380, 379, 379, 378, 376, 377, 376, 375, 371, 367, 362, 358, 353, 352, 345, 341, 336, 331, 328, 326, 325, 324, 324, 313, 296, 279, 264, 249, 235, 219, 214, 200, 185, 185, 175, 171, 162, 160, 160, 154, 153, 147, 147, 150, 149, 141, 136, 133, 128, 125, 122, 117, 112, 108, 104, 99, 95, 95, 95, 104, 112, 117, 121, 127, 135, 142, 151, 154, 158, 159, 162, 171, 177, 178, 184, 186, 192, 200, 211, 218, 223, 230, 223, 232, 246, 250, 255, 261, 255, 259, 265, 269, 273, 278, 283, 292, 300, 307, 307, 311, 319, 319, 322, 326, 328, 323, 317, 318, 323, 330, 335, 342, 337, 347] ;
theStateArray[110].myPolygons[10].myYVals= [847, 842, 846, 843, 839, 835, 839, 843, 849, 849, 848, 845, 843, 840, 837, 835, 832, 831, 832, 830, 826, 823, 820, 820, 818, 814, 814, 810, 804, 800, 794, 793, 789, 785, 786, 784, 782, 779, 778, 776, 776, 775, 771, 766, 760, 756, 757, 762, 770, 773, 775, 779, 782, 786, 790, 794, 799, 803, 811, 812, 811, 810, 812, 810, 807, 805, 805, 801, 794, 794, 791, 793, 799, 801, 797, 790, 784, 781, 778, 776, 774, 773, 768, 768, 766, 760, 758, 757, 755, 751, 750, 751, 751, 751, 747, 745, 738, 734, 734, 741, 745, 746, 743, 740, 734, 731, 728, 729, 735, 731, 729, 726, 723, 721, 717, 718, 722, 726, 726, 725, 728, 735, 736, 735, 737, 733, 729, 727, 726, 726, 725, 725, 725, 724, 720, 720, 718, 718, 718, 717, 716, 714, 714, 711, 711, 708, 708, 709, 709, 710, 712, 714, 717, 722, 726, 729, 729, 730, 730, 731, 732, 732, 732, 732, 733, 734, 736, 737, 739, 741, 740, 740, 741, 740, 742, 743, 743, 744, 746, 746, 745, 745, 745, 744, 745, 745, 745, 745, 745, 745, 745, 745, 749, 752, 754, 758, 761, 763, 767, 771, 774, 776, 779, 782, 788, 792, 794, 796, 798, 797, 794, 797, 800, 801, 801, 830, 848, 847, 844, 844, 846, 848, 847, 849, 850, 848, 850, 852, 851, 847, 850, 846, 847, 849, 848, 846, 845, 844, 844, 841, 839, 838, 839, 839, 836, 839, 841, 843, 843, 844, 842, 840, 840, 838, 839, 838, 842, 842, 841, 836, 840, 840, 845, 848, 850, 855, 859, 858, 856, 850, 848, 847] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[11].myXVals= [229, 226, 237, 244, 250, 254, 259, 261, 258, 262, 267, 272, 276, 277, 286, 295, 294, 286, 289, 287, 278, 270, 264, 255, 242, 233, 230, 223, 219, 213, 216, 224, 231, 237, 228, 217, 210, 207, 219, 211, 202, 207, 210, 224, 229] ;
theStateArray[110].myPolygons[11].myYVals= [865, 863, 864, 862, 864, 863, 858, 860, 865, 866, 865, 863, 858, 854, 852, 850, 847, 847, 845, 843, 844, 845, 845, 843, 843, 842, 845, 846, 845, 849, 850, 851, 850, 851, 853, 852, 852, 854, 856, 856, 857, 861, 863, 866, 865] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[12].myXVals= [277, 273, 265, 267, 273, 277] ;
theStateArray[110].myPolygons[12].myYVals= [867, 863, 867, 868, 868, 867] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[13].myXVals= [418, 418, 413, 408, 402, 401, 395, 395, 398, 409, 418] ;
theStateArray[110].myPolygons[13].myYVals= [865, 864, 864, 864, 863, 864, 866, 868, 868, 868, 865] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[14].myXVals= [367, 371, 375, 388, 396, 396, 406, 410, 421, 428, 429, 438, 443, 456, 460, 465, 455, 467, 475, 482, 490, 489, 480, 474, 466, 459, 459, 464, 471, 473, 476, 474, 468, 456, 463, 468, 469, 455, 444, 438, 440, 433, 425, 425, 411, 407, 410, 419, 430, 428, 430, 436, 435, 433, 425, 415, 418, 413, 409, 405, 402, 393, 375, 364, 356, 352, 357, 350, 348, 352, 357, 370, 367] ;
theStateArray[110].myPolygons[14].myYVals= [865, 862, 866, 868, 863, 860, 861, 863, 861, 858, 856, 857, 854, 852, 850, 845, 843, 840, 839, 834, 834, 830, 824, 827, 831, 831, 828, 825, 823, 821, 816, 813, 814, 818, 814, 811, 809, 811, 814, 816, 818, 820, 823, 821, 821, 822, 826, 826, 827, 829, 831, 836, 838, 840, 842, 844, 845, 848, 849, 850, 849, 848, 849, 851, 852, 853, 856, 856, 861, 865, 867, 869, 865] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[15].myXVals= [298, 304, 313, 314, 309, 317, 316, 308, 303, 299, 287, 287, 297, 292, 298] ;
theStateArray[110].myPolygons[15].myYVals= [869, 868, 868, 867, 864, 862, 858, 856, 856, 858, 862, 864, 863, 866, 869] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[16].myXVals= [334, 328, 322, 319, 319, 322, 327, 337, 347, 339, 334] ;
theStateArray[110].myPolygons[16].myYVals= [863, 860, 860, 864, 867, 869, 870, 870, 869, 864, 863] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[17].myXVals= [197, 184, 181, 170, 172, 175, 180, 175, 192, 199, 212, 217, 222, 216, 203, 197, 197] ;
theStateArray[110].myPolygons[17].myYVals= [856, 854, 856, 859, 861, 865, 868, 871, 872, 871, 870, 869, 867, 866, 862, 859, 856] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[18].myXVals= [331, 329, 321, 315, 318, 325, 330, 331] ;
theStateArray[110].myPolygons[18].myYVals= [874, 872, 873, 874, 876, 878, 876, 874] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[19].myXVals= [307, 311, 311, 309, 300, 295, 295, 287, 287, 292, 300, 307, 307] ;
theStateArray[110].myPolygons[19].myYVals= [883, 881, 878, 875, 874, 875, 878, 877, 881, 881, 883, 882, 883] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[20].myXVals= [258, 260, 265, 270, 271, 268, 251, 238, 231, 230, 241, 218, 211, 218, 222, 237, 245, 254, 247, 252, 257, 258] ;
theStateArray[110].myPolygons[20].myYVals= [881, 879, 880, 879, 877, 875, 874, 872, 871, 873, 875, 875, 876, 880, 882, 880, 877, 877, 882, 883, 883, 881] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[21].myXVals= [326, 332, 341, 346, 345, 350, 354, 360, 368, 376, 386, 394, 399, 400, 397, 390, 383, 369, 359, 351, 337, 336, 335, 330, 320, 314, 316, 326] ;
theStateArray[110].myPolygons[21].myYVals= [885, 883, 883, 882, 880, 879, 878, 877, 877, 878, 878, 878, 876, 874, 873, 872, 872, 872, 871, 872, 874, 876, 879, 881, 882, 883, 885, 885] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[22].myXVals= [219, 218, 214, 209, 200, 192, 185, 185, 194, 204, 212, 219] ;
theStateArray[110].myPolygons[22].myYVals= [888, 884, 882, 882, 880, 879, 880, 880, 884, 887, 887, 888] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[23].myXVals= [330, 328, 319, 317, 327, 331, 330] ;
theStateArray[110].myPolygons[23].myYVals= [887, 887, 887, 889, 889, 888, 887] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[24].myXVals= [249, 239, 232, 236, 243, 250, 249] ;
theStateArray[110].myPolygons[24].myYVals= [888, 887, 888, 890, 890, 889, 888] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[25].myXVals= [251, 245, 237, 237, 242, 245, 251] ;
theStateArray[110].myPolygons[25].myYVals= [893, 892, 892, 892, 894, 894, 893] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[26].myXVals= [320, 313, 309, 307, 306, 313, 316, 322, 320] ;
theStateArray[110].myPolygons[26].myYVals= [890, 889, 890, 892, 894, 894, 893, 892, 890] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[27].myXVals= [299, 301, 293, 285, 274, 278, 272, 272, 282, 295, 299] ;
theStateArray[110].myPolygons[27].myYVals= [891, 889, 890, 891, 891, 893, 894, 896, 895, 894, 891] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[28].myXVals= [364, 370, 364, 354, 345, 335, 330, 330, 334, 325, 319, 316, 319, 323, 328, 326, 337, 344, 352, 360, 364] ;
theStateArray[110].myPolygons[28].myYVals= [898, 896, 895, 891, 891, 891, 893, 895, 896, 896, 898, 900, 903, 904, 904, 906, 906, 903, 902, 901, 898] ;
theStateArray[110].myPolygons.push( new map_Polygon() );
theStateArray[110].myPolygons[29].myXVals= [457, 470, 481, 490, 490, 478, 466, 461, 472, 460, 452, 444, 433, 430, 415, 422, 418, 423, 418, 410, 408, 401, 401, 410, 410, 397, 384, 369, 362, 352, 351, 361, 358, 361, 375, 368, 360, 364, 373, 374, 367, 365, 379, 382, 390, 379, 362, 353, 349, 343, 342, 349, 355, 365, 372, 378, 384, 387, 394, 403, 418, 421, 435, 446, 457] ;
theStateArray[110].myPolygons[29].myYVals= [915, 915, 914, 913, 911, 909, 908, 907, 907, 904, 903, 899, 898, 897, 896, 895, 895, 892, 890, 889, 887, 886, 884, 885, 883, 880, 882, 881, 882, 882, 884, 885, 889, 889, 887, 890, 891, 893, 894, 896, 898, 901, 901, 900, 902, 902, 902, 904, 906, 907, 909, 910, 910, 911, 913, 913, 911, 914, 915, 915, 915, 915, 916, 915, 915] ;
theStateArray.push( new map_State("CRI","Costa Rica","Costa Rica") );
g_map_stateMap["CRI"] = theStateArray[111];
theStateArray[111].myPolygons.push( new map_Polygon() );
theStateArray[111].myPolygons[0].myXVals= [385, 382, 381, 382, 381, 380, 378, 376, 376, 375, 375, 374, 373, 371, 371, 371, 371, 370, 371, 372, 375, 376, 378, 379, 380, 381, 382, 384, 387, 385, 385, 386, 385, 385, 385, 385] ;
theStateArray[111].myPolygons[0].myYVals= [541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 548, 547, 549, 549, 550, 552, 553, 554, 555, 556, 554, 555, 554, 553, 553, 554, 551, 549, 547, 547, 545, 544, 544, 543, 542, 541] ;
theStateArray.push( new map_State("CUB","Cuba","Cuba") );
g_map_stateMap["CUB"] = theStateArray[112];
theStateArray[112].myPolygons.push( new map_Polygon() );
theStateArray[112].myPolygons[0].myXVals= [388, 392, 396, 401, 403, 408, 410, 414, 417, 419, 422, 421, 425, 429, 428, 425, 421, 418, 411, 414, 412, 409, 407, 406, 403, 398, 397, 390, 389, 391, 386, 382, 380, 379, 377, 375, 377, 378, 381, 383, 387, 388] ;
theStateArray[112].myPolygons[0].myYVals= [615, 615, 615, 613, 611, 612, 611, 608, 606, 606, 605, 603, 603, 601, 600, 599, 599, 599, 599, 602, 603, 603, 605, 607, 607, 609, 610, 610, 611, 613, 613, 610, 610, 609, 609, 609, 611, 612, 613, 614, 615, 615] ;
theStateArray.push( new map_State("DOM","Dominican Republic","Dominican Republic") );
g_map_stateMap["DOM"] = theStateArray[113];
theStateArray[113].myPolygons.push( new map_Polygon() );
theStateArray[113].myPolygons[0].myXVals= [441, 442, 445, 448, 450, 451, 453, 453, 455, 458, 456, 454, 451, 450, 449, 447, 446, 445, 442, 441, 441, 441, 440, 441, 441, 441] ;
theStateArray[113].myPolygons[0].myYVals= [598, 599, 599, 598, 598, 596, 596, 595, 594, 593, 591, 592, 591, 592, 591, 590, 592, 591, 587, 588, 590, 591, 593, 593, 595, 598] ;
theStateArray.push( new map_State("GTM","Guatemala","Guatemala") );
g_map_stateMap["GTM"] = theStateArray[114];
theStateArray[114].myPolygons.push( new map_Polygon() );
theStateArray[114].myPolygons[0].myXVals= [349, 346, 343, 341, 338, 338, 339, 338, 341, 347, 347, 346, 346, 344, 342, 344, 344, 349, 354, 354, 353, 355, 356, 357, 358, 356, 354, 353, 354, 353, 352, 352, 351, 349, 349] ;
theStateArray[114].myPolygons[0].myYVals= [568, 569, 569, 570, 572, 574, 575, 576, 580, 580, 582, 582, 583, 584, 586, 586, 589, 589, 589, 585, 579, 579, 578, 579, 578, 576, 575, 574, 573, 572, 571, 571, 570, 569, 568] ;
theStateArray.push( new map_State("GRL","Greenland","Greenland") );
g_map_stateMap["GRL"] = theStateArray[115];
theStateArray[115].myPolygons.push( new map_Polygon() );
theStateArray[115].myPolygons[0].myXVals= [566, 582, 600, 606, 624, 664, 695, 686, 667, 640, 643, 660, 675, 685, 689, 684, 696, 721, 736, 738, 718, 715, 699, 711, 705, 701, 701, 707, 699, 691, 700, 702, 696, 703, 692, 697, 696, 689, 682, 688, 688, 678, 676, 682, 689, 691, 682, 678, 672, 673, 668, 681, 688, 674, 661, 646, 641, 635, 628, 618, 614, 608, 600, 596, 596, 594, 585, 587, 585, 583, 576, 568, 558, 553, 550, 541, 539, 538, 531, 533, 530, 535, 542, 544, 545, 539, 537, 532, 526, 526, 528, 532, 543, 534, 529, 525, 520, 526, 523, 519, 513, 507, 507, 493, 483, 469, 457, 451, 442, 456, 466, 444, 433, 434, 453, 471, 473, 459, 464, 481, 488, 486, 498, 513, 529, 534, 548, 559, 567, 577, 565, 566] ;
theStateArray[115].myPolygons[0].myYVals= [913, 916, 915, 917, 918, 917, 913, 911, 911, 911, 910, 910, 908, 910, 908, 905, 907, 909, 908, 906, 902, 901, 900, 900, 897, 893, 888, 884, 884, 883, 880, 876, 875, 871, 871, 869, 867, 866, 866, 863, 860, 862, 861, 860, 857, 853, 852, 854, 857, 853, 851, 850, 850, 846, 842, 840, 840, 838, 833, 829, 829, 828, 827, 824, 820, 817, 813, 809, 805, 800, 800, 804, 804, 807, 811, 818, 821, 825, 830, 834, 835, 841, 843, 845, 849, 847, 847, 846, 848, 851, 854, 854, 852, 856, 857, 857, 858, 862, 864, 868, 873, 875, 877, 880, 880, 880, 880, 881, 885, 886, 886, 888, 890, 892, 894, 896, 898, 900, 902, 906, 906, 908, 910, 910, 910, 909, 912, 910, 909, 908, 910, 913] ;
theStateArray.push( new map_State("HND","Honduras","Honduras") );
g_map_stateMap["HND"] = theStateArray[116];
theStateArray[116].myPolygons.push( new map_Polygon() );
theStateArray[116].myPolygons[0].myXVals= [363, 362, 361, 361, 360, 359, 357, 357, 355, 354, 353, 354, 353, 354, 356, 358, 359, 360, 361, 362, 363, 365, 367, 369, 369, 371, 372, 374, 375, 377, 378, 379, 381, 382, 384, 382, 381, 380, 378, 377, 376, 375, 375, 374, 374, 374, 372, 371, 370, 369, 368, 367, 366, 366, 365, 364, 363] ;
theStateArray[116].myPolygons[0].myYVals= [564, 566, 566, 568, 569, 569, 569, 569, 570, 571, 572, 573, 574, 575, 576, 578, 578, 579, 579, 578, 579, 578, 578, 579, 580, 579, 579, 579, 579, 579, 579, 578, 577, 576, 574, 575, 574, 573, 573, 573, 573, 574, 573, 572, 572, 571, 570, 569, 569, 570, 568, 568, 568, 566, 566, 565, 564] ;
theStateArray.push( new map_State("HTI","Haiti","Haiti") );
g_map_stateMap["HTI"] = theStateArray[117];
theStateArray[117].myPolygons.push( new map_Polygon() );
theStateArray[117].myPolygons[0].myXVals= [434, 437, 441, 441, 441, 440, 441, 441, 438, 435, 432, 430, 427, 428, 432, 436, 438, 436, 436, 432, 434] ;
theStateArray[117].myPolygons[0].myYVals= [599, 599, 598, 595, 593, 593, 591, 590, 591, 590, 591, 590, 591, 593, 592, 592, 593, 595, 597, 598, 599] ;
theStateArray.push( new map_State("JAM","Jamaica","Jamaica") );
g_map_stateMap["JAM"] = theStateArray[118];
theStateArray[118].myPolygons.push( new map_Polygon() );
theStateArray[118].myPolygons[0].myXVals= [412, 415, 418, 419, 415, 413, 411, 408, 408, 411, 412] ;
theStateArray[118].myPolygons[0].myYVals= [592, 592, 590, 589, 589, 588, 589, 591, 592, 592, 592] ;
theStateArray.push( new map_State("TJK","Tajikistan","Tajikistan") );
g_map_stateMap["TJK"] = theStateArray[119];
theStateArray[119].myPolygons.push( new map_Polygon() );
theStateArray[119].myPolygons[0].myXVals= [1155, 1153, 1147, 1147, 1152, 1158, 1168, 1169, 1171, 1174, 1174, 1174, 1169, 1166, 1163, 1160, 1159, 1157, 1157, 1156, 1156, 1154, 1151, 1151, 1150, 1147, 1145, 1144, 1140, 1139, 1141, 1140, 1137, 1138, 1142, 1145, 1146, 1153, 1152, 1153, 1155] ;
theStateArray[119].myPolygons[0].myYVals= [701, 699, 700, 697, 698, 696, 697, 692, 693, 691, 689, 687, 687, 687, 685, 684, 683, 685, 689, 689, 691, 692, 690, 688, 687, 688, 685, 686, 685, 685, 690, 694, 695, 697, 697, 700, 703, 704, 702, 701, 701] ;
theStateArray.push( new map_State("MEX","Mexico","Mexico") );
g_map_stateMap["MEX"] = theStateArray[120];
theStateArray[120].myPolygons.push( new map_Polygon() );
theStateArray[120].myPolygons[0].myXVals= [314, 312, 311, 311, 310, 311, 313, 314, 317, 318, 320, 325, 327, 332, 336, 339, 342, 346, 347, 347, 348, 351, 357, 361, 364, 365, 365, 363, 361, 362, 362, 360, 359, 358, 357, 355, 354, 354, 354, 349, 344, 344, 342, 344, 346, 346, 347, 347, 341, 338, 339, 338, 338, 333, 330, 326, 323, 319, 317, 313, 309, 305, 301, 295, 291, 290, 287, 282, 280, 275, 272, 271, 273, 272, 273, 273, 271, 271, 269, 265, 260, 257, 253, 252, 253, 250, 248, 246, 244, 241, 238, 238, 235, 234, 234, 230, 228, 226, 225, 226, 226, 228, 232, 232, 233, 234, 235, 236, 237, 238, 241, 243, 245, 246, 246, 249, 251, 252, 252, 250, 249, 248, 245, 241, 239, 239, 238, 236, 232, 232, 230, 227, 224, 225, 227, 229, 229, 225, 222, 220, 218, 216, 214, 220, 226, 225, 233, 244, 254, 258, 258, 267, 269, 271, 274, 276, 277, 280, 284, 287, 291, 295, 297, 299, 302, 303, 304, 308, 312, 314] ;
theStateArray[120].myPolygons[0].myYVals= [629, 624, 621, 614, 612, 609, 607, 603, 599, 596, 594, 592, 590, 592, 592, 593, 594, 596, 599, 603, 604, 606, 607, 607, 607, 606, 604, 601, 598, 597, 595, 591, 592, 592, 592, 589, 590, 589, 589, 589, 589, 586, 586, 584, 583, 582, 582, 580, 580, 576, 575, 574, 572, 578, 579, 581, 580, 578, 578, 579, 580, 582, 583, 585, 588, 589, 589, 591, 593, 596, 599, 602, 602, 604, 605, 607, 609, 611, 613, 618, 622, 625, 627, 629, 632, 633, 635, 639, 639, 642, 644, 646, 650, 653, 655, 657, 657, 658, 656, 654, 650, 648, 645, 644, 643, 642, 642, 638, 637, 635, 633, 628, 626, 624, 621, 621, 619, 616, 615, 614, 614, 617, 620, 622, 623, 627, 630, 631, 633, 633, 634, 635, 638, 638, 638, 640, 642, 646, 647, 650, 654, 658, 662, 663, 663, 662, 660, 656, 656, 656, 658, 658, 656, 655, 653, 650, 647, 646, 644, 648, 648, 646, 643, 640, 637, 634, 631, 630, 629, 629] ;
theStateArray.push( new map_State("UZB","Uzbekistan","Uzbekistan") );
g_map_stateMap["UZB"] = theStateArray[121];
theStateArray[121].myPolygons.push( new map_Polygon() );
theStateArray[121].myPolygons[0].myXVals= [1132, 1132, 1126, 1120, 1117, 1111, 1109, 1107, 1102, 1100, 1099, 1093, 1088, 1084, 1085, 1079, 1079, 1092, 1093, 1101, 1105, 1110, 1115, 1124, 1130, 1130, 1132, 1133, 1139, 1141, 1143, 1145, 1151, 1154, 1156, 1152, 1155, 1159, 1165, 1158, 1155, 1153, 1152, 1153, 1146, 1145, 1142, 1138, 1137, 1140, 1141, 1139, 1135, 1132] ;
theStateArray[121].myPolygons[0].myYVals= [686, 689, 692, 694, 696, 700, 705, 706, 706, 707, 711, 713, 710, 709, 706, 706, 724, 727, 727, 723, 722, 717, 718, 718, 714, 709, 709, 705, 705, 703, 703, 706, 710, 711, 710, 707, 705, 706, 704, 700, 701, 701, 702, 704, 703, 700, 697, 697, 695, 694, 690, 685, 686, 686] ;
theStateArray.push( new map_State("PAN","Panama","Panama") );
g_map_stateMap["PAN"] = theStateArray[122];
theStateArray[122].myPolygons.push( new map_Polygon() );
theStateArray[122].myPolygons[0].myXVals= [410, 408, 407, 409, 407, 406, 404, 402, 401, 399, 398, 397, 399, 398, 397, 395, 394, 394, 392, 391, 389, 388, 385, 385, 385, 385, 385, 385, 386, 385, 385, 387, 389, 388, 390, 391, 392, 395, 397, 400, 402, 404, 404, 407, 409, 411, 413, 412, 413, 412, 411, 410] ;
theStateArray[122].myPolygons[0].myYVals= [536, 537, 540, 541, 541, 543, 544, 544, 542, 541, 541, 540, 537, 537, 536, 536, 539, 538, 538, 540, 540, 541, 541, 540, 541, 542, 543, 544, 544, 545, 547, 547, 546, 544, 544, 545, 543, 544, 545, 546, 548, 547, 547, 547, 546, 544, 543, 542, 539, 538, 538, 536] ;
theStateArray.push( new map_State("NIC","Nicaragua","Nicaragua") );
g_map_stateMap["NIC"] = theStateArray[123];
theStateArray[123].myPolygons.push( new map_Polygon() );
theStateArray[123].myPolygons[0].myXVals= [371, 369, 367, 366, 364, 361, 362, 363, 363, 364, 365, 366, 366, 367, 368, 369, 370, 371, 372, 374, 374, 374, 375, 375, 376, 377, 378, 380, 381, 382, 384, 383, 383, 384, 382, 382, 382, 382, 382, 381, 381, 381, 380, 380, 381, 380, 379, 378, 376, 375, 372, 371] ;
theStateArray[123].myPolygons[0].myYVals= [555, 557, 559, 560, 562, 564, 565, 564, 564, 565, 566, 566, 568, 568, 568, 570, 569, 569, 570, 571, 572, 572, 573, 574, 573, 573, 573, 573, 574, 575, 574, 574, 573, 571, 569, 567, 565, 564, 562, 561, 559, 558, 556, 555, 554, 553, 553, 554, 555, 554, 556, 555] ;
theStateArray.push( new map_State("PRI","Puerto Rico","Puerto Rico") );
g_map_stateMap["PRI"] = theStateArray[124];
theStateArray[124].myPolygons.push( new map_Polygon() );
theStateArray[124].myPolygons[0].myXVals= [468, 471, 472, 470, 467, 464, 463, 464, 468] ;
theStateArray[124].myPolygons[0].myYVals= [592, 592, 591, 589, 589, 589, 591, 592, 592] ;
theStateArray.push( new map_State("SLV","El Salvador","El Salvador") );
g_map_stateMap["SLV"] = theStateArray[125];
theStateArray[125].myPolygons.push( new map_Polygon() );
theStateArray[125].myPolygons[0].myXVals= [361, 360, 357, 355, 353, 350, 349, 349, 351, 352, 352, 353, 354, 355, 357, 357, 359, 360, 361, 361] ;
theStateArray[125].myPolygons[0].myYVals= [566, 565, 565, 566, 567, 567, 568, 569, 570, 571, 571, 572, 571, 570, 569, 569, 569, 569, 568, 566] ;
theStateArray.push( new map_State("TTO","Trinidad and Tobago","Trinidad and Tobago") );
g_map_stateMap["TTO"] = theStateArray[126];
theStateArray[126].myPolygons.push( new map_Polygon() );
theStateArray[126].myPolygons[0].myXVals= [491, 494, 495, 495, 491, 490, 491, 491] ;
theStateArray[126].myPolygons[0].myYVals= [553, 554, 554, 550, 550, 550, 551, 553] ;
theStateArray.push( new map_State("USA","United States of America","United States of America") );
g_map_stateMap["USA"] = theStateArray[127];
theStateArray[127].myPolygons.push( new map_Polygon() );
theStateArray[127].myPolygons[0].myXVals= [22, 21, 20, 20, 19, 19, 20, 20, 20, 21, 22, 23, 24, 25, 25, 23, 22] ;
theStateArray[127].myPolygons[0].myYVals= [595, 594, 595, 596, 598, 599, 599, 600, 601, 601, 600, 599, 599, 597, 597, 596, 595] ;
theStateArray[127].myPolygons.push( new map_Polygon() );
theStateArray[127].myPolygons[1].myXVals= [19, 17, 17, 16, 16, 16, 18, 20, 19] ;
theStateArray[127].myPolygons[1].myYVals= [603, 602, 603, 604, 604, 605, 604, 603, 603] ;
theStateArray[127].myPolygons.push( new map_Polygon() );
theStateArray[127].myPolygons[2].myXVals= [16, 16, 13, 13, 16] ;
theStateArray[127].myPolygons[2].myYVals= [605, 605, 605, 606, 605] ;
theStateArray[127].myPolygons.push( new map_Polygon() );
theStateArray[127].myPolygons[3].myXVals= [11, 11, 11, 9, 8, 8, 9, 10, 11] ;
theStateArray[127].myPolygons[3].myYVals= [606, 606, 606, 606, 607, 607, 608, 608, 606] ;
theStateArray[127].myPolygons.push( new map_Polygon() );
theStateArray[127].myPolygons[4].myXVals= [3, 2, 0, 1, 2, 3, 3] ;
theStateArray[127].myPolygons[4].myYVals= [609, 609, 610, 610, 611, 611, 609] ;
theStateArray[127].myPolygons.push( new map_Polygon() );
theStateArray[127].myPolygons[5].myXVals= [325, 326, 328, 331, 336, 341, 345, 352, 353, 358, 362, 367, 371, 375, 376, 377, 376, 378, 379, 379, 380, 381, 382, 382, 387, 388, 389, 387, 385, 384, 384, 384, 386, 387, 393, 398, 405, 405, 404, 404, 406, 411, 415, 417, 418, 423, 425, 433, 442, 442, 444, 446, 448, 450, 453, 455, 458, 461, 461, 464, 465, 459, 454, 449, 446, 445, 445, 447, 449, 449, 450, 450, 446, 444, 440, 438, 435, 431, 438, 440, 433, 430, 430, 428, 430, 429, 425, 425, 423, 422, 423, 424, 424, 423, 420, 419, 421, 418, 418, 417, 418, 415, 418, 418, 420, 420, 421, 418, 413, 409, 407, 404, 403, 398, 395, 393, 392, 393, 395, 397, 397, 399, 399, 399, 398, 396, 394, 393, 391, 388, 386, 385, 386, 385, 381, 379, 374, 373, 371, 368, 362, 357, 354, 352, 352, 352, 353, 352, 351, 349, 345, 341, 337, 333, 330, 326, 321, 317, 314, 313, 313, 313, 314, 312, 308, 304, 303, 302, 299, 297, 295, 291, 287, 284, 280, 277, 276, 274, 271, 269, 267, 258, 258, 254, 244, 233, 225, 226, 220, 214, 213, 210, 207, 207, 204, 202, 198, 196, 196, 191, 187, 187, 185, 181, 180, 178, 179, 178, 177, 179, 179, 180, 179, 178, 176, 177, 184, 187, 188, 187, 185, 200, 214, 219, 235, 249, 264, 279, 296, 313, 324, 324, 325] ;
theStateArray[127].myPolygons[5].myYVals= [746, 744, 743, 743, 742, 740, 741, 740, 740, 741, 739, 737, 736, 734, 733, 732, 732, 732, 732, 731, 730, 730, 729, 729, 726, 722, 717, 714, 712, 710, 709, 709, 708, 708, 711, 711, 714, 714, 716, 717, 718, 718, 718, 720, 720, 724, 725, 725, 725, 726, 726, 727, 729, 733, 737, 735, 736, 735, 728, 725, 724, 721, 719, 718, 715, 714, 711, 709, 708, 710, 709, 708, 707, 707, 706, 706, 706, 704, 705, 704, 703, 703, 703, 702, 702, 698, 694, 695, 696, 697, 694, 693, 692, 690, 686, 686, 689, 691, 695, 693, 690, 691, 689, 684, 684, 682, 677, 674, 672, 669, 669, 667, 665, 662, 660, 657, 653, 650, 645, 642, 640, 634, 631, 629, 626, 625, 626, 628, 629, 633, 637, 639, 642, 645, 649, 650, 648, 648, 650, 652, 651, 651, 651, 650, 649, 647, 646, 645, 646, 645, 645, 648, 647, 648, 648, 647, 643, 641, 639, 636, 633, 631, 629, 629, 630, 631, 634, 637, 640, 643, 646, 648, 648, 644, 646, 647, 650, 653, 655, 656, 658, 658, 656, 656, 656, 660, 662, 663, 663, 662, 665, 668, 668, 670, 670, 671, 672, 673, 675, 680, 687, 688, 690, 694, 698, 701, 705, 709, 713, 718, 723, 727, 734, 738, 740, 741, 740, 735, 736, 740, 745, 745, 745, 745, 745, 745, 745, 744, 745, 745, 745, 746, 746] ;
theStateArray[127].myPolygons.push( new map_Polygon() );
theStateArray[127].myPolygons[6].myXVals= [34, 29, 27, 26, 31, 33, 37, 39, 34] ;
theStateArray[127].myPolygons[6].myYVals= [785, 783, 784, 787, 789, 789, 789, 787, 785] ;
theStateArray[127].myPolygons.push( new map_Polygon() );
theStateArray[127].myPolygons[7].myXVals= [-27, -30, -34, -37, -32, -28, -27] ;
theStateArray[127].myPolygons[7].myYVals= [799, 798, 799, 801, 801, 801, 799] ;
theStateArray[127].myPolygons.push( new map_Polygon() );
theStateArray[127].myPolygons[8].myXVals= [-58, -55, -52, -48, -43, -43, -47, -51, -53, -57, -58, -58] ;
theStateArray[127].myPolygons[8].myYVals= [818, 817, 818, 817, 816, 815, 814, 815, 816, 816, 817, 818] ;
theStateArray[127].myPolygons.push( new map_Polygon() );
theStateArray[127].myPolygons[9].myXVals= [24, 28, 30, 38, 38, 46, 51, 61, 71, 75, 82, 89, 95, 95, 95, 95, 99, 104, 108, 112, 117, 122, 125, 128, 133, 136, 141, 149, 150, 147, 144, 140, 138, 132, 129, 124, 116, 110, 100, 95, 87, 80, 70, 64, 58, 59, 57, 51, 46, 41, 40, 42, 48, 46, 40, 37, 29, 33, 28, 23, 18, 17, 9, 7, 1, -1, -6, -11, -15, -23, -24, -19, -14, -9, -2, 0, 6, 7, 11, 12, 14, 9, 7, 4, 1, 0, -1, -6, -9, -10, -9, -12, -19, -23, -26, -26, -30, -28, -24, -22, -18, -15, -11, -7, -3, -4, -7, -3, -6, -12, -13, -17, -24, -32, -34, -40, -33, -22, -18, -18, -8, -12, -18, -22, -26, -33, -31, -22, -15, -14, -9, -4, 4, 9, 17, 24] ;
theStateArray[127].myPolygons[9].myYVals= [855, 853, 854, 854, 853, 852, 852, 851, 850, 849, 850, 849, 848, 848, 830, 801, 801, 800, 797, 794, 797, 798, 796, 794, 792, 788, 782, 779, 776, 774, 775, 777, 781, 785, 790, 790, 791, 792, 797, 798, 800, 799, 802, 804, 803, 799, 799, 798, 796, 795, 798, 803, 805, 806, 803, 800, 796, 794, 790, 788, 787, 784, 782, 779, 777, 778, 776, 775, 773, 772, 772, 775, 776, 779, 780, 782, 785, 786, 787, 791, 794, 793, 793, 792, 794, 792, 795, 793, 793, 796, 798, 799, 798, 801, 802, 805, 807, 810, 813, 815, 816, 815, 817, 817, 818, 821, 822, 823, 823, 822, 821, 822, 822, 823, 825, 828, 830, 832, 832, 830, 830, 833, 835, 838, 840, 841, 844, 844, 846, 849, 851, 852, 854, 854, 856, 855] ;
theStateArray.push( new map_State("BGR","Bulgaria","Bulgaria") );
g_map_stateMap["BGR"] = theStateArray[128];
theStateArray[128].myPolygons.push( new map_Polygon() );
theStateArray[128].myPolygons[0].myXVals= [913, 914, 916, 920, 927, 930, 936, 939, 942, 940, 938, 939, 935, 930, 930, 925, 922, 918, 914, 914, 911, 912, 912, 913, 914, 912, 912, 913] ;
theStateArray[128].myPolygons[0].myYVals= [721, 719, 719, 718, 718, 719, 720, 719, 718, 716, 712, 710, 710, 709, 706, 706, 707, 706, 706, 709, 711, 712, 712, 714, 716, 718, 720, 721] ;
theStateArray.push( new map_State("BLR","Belarus","Belarus") );
g_map_stateMap["BLR"] = theStateArray[129];
theStateArray[129].myPolygons.push( new map_Polygon() );
theStateArray[129].myPolygons[0].myXVals= [917, 922, 927, 928, 932, 932, 935, 940, 946, 946, 949, 954, 954, 953, 956, 958, 958, 962, 963, 961, 957, 956, 957, 958, 954, 953, 952, 950, 946, 944, 943, 941, 937, 931, 926, 922, 920, 917, 917, 915, 918, 919, 917, 917] ;
theStateArray[129].myPolygons[0].myYVals= [769, 769, 771, 774, 775, 778, 778, 780, 779, 778, 778, 777, 775, 774, 770, 769, 768, 768, 766, 765, 765, 765, 763, 760, 760, 759, 756, 757, 756, 758, 757, 757, 757, 759, 759, 759, 758, 757, 760, 762, 763, 765, 767, 769] ;
theStateArray.push( new map_State("BIH","Bosnia and Herzegovina","Bosnia and Herzegovina") );
g_map_stateMap["BIH"] = theStateArray[130];
theStateArray[130].myPolygons.push( new map_Polygon() );
theStateArray[130].myPolygons[0].myXVals= [895, 896, 895, 897, 897, 896, 895, 893, 892, 888, 886, 884, 882, 881, 878, 879, 881, 882, 885, 889, 892, 895] ;
theStateArray[130].myPolygons[0].myYVals= [724, 724, 722, 720, 717, 717, 717, 716, 713, 715, 717, 718, 720, 721, 724, 726, 725, 726, 726, 725, 725, 724] ;
theStateArray.push( new map_State("DEU","Germany","Germany") );
g_map_stateMap["DEU"] = theStateArray[131];
theStateArray[131].myPolygons.push( new map_Polygon() );
theStateArray[131].myPolygons[0].myXVals= [849, 849, 854, 854, 859, 862, 868, 870, 871, 870, 872, 873, 873, 875, 872, 871, 870, 866, 864, 861, 862, 862, 865, 867, 866, 864, 865, 864, 863, 860, 857, 852, 852, 849, 847, 842, 841, 837, 837, 840, 833, 830, 831, 830, 830, 829, 832, 834, 835, 834, 835, 839, 840, 844, 842, 842, 846, 849] ;
theStateArray[131].myPolygons[0].myYVals= [774, 772, 771, 770, 770, 772, 770, 768, 766, 764, 763, 760, 758, 755, 755, 755, 754, 753, 752, 751, 749, 747, 746, 744, 742, 741, 738, 737, 738, 738, 737, 737, 736, 737, 737, 739, 738, 738, 741, 745, 746, 747, 749, 750, 754, 759, 759, 761, 765, 767, 768, 768, 767, 770, 771, 774, 774, 774] ;
theStateArray.push( new map_State("CZE","Czech Republic","Czech Republic") );
g_map_stateMap["CZE"] = theStateArray[132];
theStateArray[132].myPolygons.push( new map_Polygon() );
theStateArray[132].myPolygons[0].myXVals= [884, 882, 880, 876, 874, 871, 867, 865, 862, 862, 861, 864, 866, 870, 871, 872, 875, 877, 881, 880, 883, 884, 887, 888, 891, 894, 892, 891, 890, 890, 889, 889, 887, 885, 884] ;
theStateArray[132].myPolygons[0].myYVals= [742, 743, 743, 745, 744, 742, 744, 746, 747, 749, 751, 752, 753, 754, 755, 755, 755, 753, 753, 752, 751, 752, 751, 750, 749, 747, 747, 746, 746, 745, 744, 744, 744, 744, 742] ;
theStateArray.push( new map_State("ALB","Albania","Albania") );
g_map_stateMap["ALB"] = theStateArray[133];
theStateArray[133].myPolygons.push( new map_Polygon() );
theStateArray[133].myPolygons[0].myXVals= [902, 902, 903, 905, 904, 903, 903, 900, 899, 899, 897, 896, 897, 897, 896, 896, 898, 899, 900, 901, 902, 902] ;
theStateArray[133].myPolygons[0].myYVals= [709, 707, 705, 704, 702, 702, 700, 698, 698, 699, 701, 703, 707, 708, 709, 710, 713, 712, 712, 711, 711, 709] ;
theStateArray.push( new map_State("BEL","Belgium","Belgium") );
g_map_stateMap["BEL"] = theStateArray[134];
theStateArray[134].myPolygons.push( new map_Polygon() );
theStateArray[134].myPolygons[0].myXVals= [816, 820, 824, 828, 830, 830, 828, 828, 823, 821, 817, 815, 813, 812, 816] ;
theStateArray[134].myPolygons[0].myYVals= [756, 756, 757, 755, 754, 750, 750, 747, 749, 749, 751, 753, 753, 755, 756] ;
theStateArray.push( new map_State("CHE","Switzerland","Switzerland") );
g_map_stateMap["CHE"] = theStateArray[135];
theStateArray[135].myPolygons.push( new map_Polygon() );
theStateArray[135].myPolygons[0].myXVals= [847, 848, 847, 849, 852, 851, 849, 845, 844, 842, 841, 838, 836, 834, 832, 830, 830, 833, 833, 835, 837, 841, 842, 847] ;
theStateArray[135].myPolygons[0].myYVals= [737, 736, 735, 734, 734, 732, 731, 732, 730, 730, 730, 729, 728, 729, 732, 731, 733, 736, 737, 737, 738, 738, 739, 737] ;
theStateArray.push( new map_State("ESP","Spain","Spain") );
g_map_stateMap["ESP"] = theStateArray[136];
theStateArray[136].myPolygons.push( new map_Polygon() );
theStateArray[136].myPolygons[0].myXVals= [754, 755, 753, 760, 766, 772, 778, 782, 790, 792, 801, 803, 809, 814, 815, 810, 804, 803, 800, 798, 800, 797, 796, 792, 789, 782, 778, 775, 773, 770, 768, 767, 762, 762, 764, 764, 763, 764, 762, 764, 764, 765, 765, 768, 766, 763, 762, 759, 758, 756, 754] ;
theStateArray[136].myPolygons[0].myYVals= [709, 712, 715, 718, 717, 717, 717, 717, 717, 715, 712, 713, 711, 712, 709, 706, 705, 703, 700, 696, 693, 691, 688, 687, 683, 683, 683, 681, 679, 680, 681, 684, 685, 687, 689, 690, 691, 695, 698, 698, 700, 701, 705, 706, 709, 709, 708, 708, 711, 710, 709] ;
theStateArray.push( new map_State("AUT","Austria","Austria") );
g_map_stateMap["AUT"] = theStateArray[137];
theStateArray[137].myPolygons.push( new map_Polygon() );
theStateArray[137].myPolygons[0].myXVals= [884, 884, 881, 882, 881, 880, 875, 873, 869, 861, 860, 855, 855, 852, 849, 847, 848, 847, 849, 852, 852, 857, 860, 863, 864, 865, 864, 866, 867, 871, 874, 876, 880, 882, 884, 884, 884] ;
theStateArray[137].myPolygons[0].myYVals= [740, 738, 738, 737, 734, 733, 733, 732, 732, 733, 735, 734, 733, 734, 734, 735, 736, 737, 737, 736, 737, 737, 738, 738, 737, 738, 741, 742, 744, 742, 744, 745, 743, 743, 742, 742, 740] ;
theStateArray.push( new map_State("DNK","Denmark","Denmark") );
g_map_stateMap["DNK"] = theStateArray[138];
theStateArray[138].myPolygons.push( new map_Polygon() );
theStateArray[138].myPolygons[0].myXVals= [863, 860, 855, 854, 861, 863] ;
theStateArray[138].myPolygons[0].myYVals= [778, 774, 776, 778, 780, 778] ;
theStateArray[138].myPolygons.push( new map_Polygon() );
theStateArray[138].myPolygons[1].myXVals= [854, 853, 851, 848, 849, 846, 842, 840, 840, 841, 842, 847, 848, 852, 852, 851, 851, 854] ;
theStateArray[138].myPolygons[1].myYVals= [782, 780, 780, 777, 774, 774, 774, 777, 782, 784, 785, 785, 787, 788, 786, 784, 783, 782] ;
theStateArray.push( new map_State("FRA","France","France") );
g_map_stateMap["FRA"] = theStateArray[139];
theStateArray[139].myPolygons.push( new map_Polygon() );
theStateArray[139].myPolygons[0].myXVals= [537, 535, 532, 532, 531, 529, 527, 528, 529, 529, 528, 527, 530, 531, 535, 540, 541, 538, 537] ;
theStateArray[139].myPolygons[0].myYVals= [512, 510, 510, 511, 511, 510, 511, 513, 515, 518, 521, 524, 528, 528, 527, 522, 520, 516, 512] ;
theStateArray[139].myPolygons.push( new map_Polygon() );
theStateArray[139].myPolygons[1].myXVals= [847, 846, 843, 842, 843, 846, 847] ;
theStateArray[139].myPolygons[1].myYVals= [710, 706, 707, 711, 713, 715, 710] ;
theStateArray[139].myPolygons.push( new map_Polygon() );
theStateArray[139].myPolygons[2].myXVals= [817, 821, 823, 828, 829, 830, 833, 840, 837, 837, 835, 833, 833, 830, 830, 832, 834, 834, 835, 833, 835, 837, 837, 832, 822, 815, 814, 809, 803, 801, 792, 790, 793, 794, 788, 785, 777, 777, 783, 791, 790, 795, 806, 808, 812, 813, 815, 817] ;
theStateArray[139].myPolygons[2].myYVals= [751, 749, 749, 747, 747, 747, 746, 745, 741, 738, 737, 737, 736, 733, 731, 732, 729, 728, 726, 725, 721, 720, 718, 715, 716, 715, 712, 711, 713, 712, 715, 717, 720, 730, 735, 737, 739, 743, 744, 743, 748, 746, 750, 754, 755, 753, 753, 751] ;
theStateArray.push( new map_State("FIN","Finland","Finland") );
g_map_stateMap["FIN"] = theStateArray[140];
theStateArray[140].myPolygons.push( new map_Polygon() );
theStateArray[140].myPolygons[0].myXVals= [942, 942, 949, 945, 951, 947, 952, 950, 957, 955, 951, 940, 931, 922, 914, 911, 906, 907, 905, 907, 912, 923, 926, 926, 919, 917, 917, 909, 903, 906, 911, 918, 923, 928, 930, 938, 945, 942] ;
theStateArray[140].myPolygons[0].myYVals= [845, 841, 838, 834, 829, 824, 821, 817, 814, 811, 808, 802, 802, 800, 799, 801, 803, 808, 813, 815, 819, 824, 825, 827, 830, 831, 839, 843, 845, 846, 844, 844, 843, 845, 849, 850, 848, 845] ;
theStateArray.push( new map_State("GBR","United Kingdom","United Kingdom") );
g_map_stateMap["GBR"] = theStateArray[141];
theStateArray[141].myPolygons.push( new map_Polygon() );
theStateArray[141].myPolygons[0].myXVals= [771, 769, 765, 762, 763, 762, 766, 771] ;
theStateArray[141].myPolygons[0].myYVals= [772, 769, 770, 770, 772, 775, 775, 772] ;
theStateArray[141].myPolygons.push( new map_Polygon() );
theStateArray[141].myPolygons[1].myXVals= [784, 779, 784, 790, 788, 784, 789, 789, 794, 797, 800, 802, 808, 807, 805, 807, 802, 796, 787, 785, 781, 777, 773, 771, 778, 782, 782, 775, 773, 778, 776, 777, 784, 784, 785, 781, 781, 775, 774, 776, 774, 772, 771, 769, 771, 774, 778, 784] ;
theStateArray[141].myPolygons[1].myYVals= [793, 787, 788, 788, 784, 779, 779, 779, 773, 772, 766, 764, 763, 760, 759, 756, 753, 753, 752, 753, 751, 751, 749, 750, 756, 757, 757, 757, 759, 761, 764, 767, 767, 767, 769, 773, 773, 773, 775, 777, 778, 776, 781, 783, 789, 793, 792, 793] ;
theStateArray.push( new map_State("PSX","Palestine","Palestine") );
g_map_stateMap["PSX"] = theStateArray[142];
theStateArray[142].myPolygons.push( new map_Polygon() );
theStateArray[142].myPolygons[0].myXVals= [977, 977, 976, 974, 974, 976, 974, 975, 977] ;
theStateArray[142].myPolygons[0].myYVals= [661, 658, 657, 656, 658, 658, 659, 662, 661] ;
theStateArray.push( new map_State("EST","Estonia","Estonia") );
g_map_stateMap["EST"] = theStateArray[143];
theStateArray[143].myPolygons.push( new map_Polygon() );
theStateArray[143].myPolygons[0].myXVals= [921, 922, 920, 917, 916, 923, 929, 934, 939, 940, 937, 938, 936, 932, 928, 925, 921] ;
theStateArray[143].myPolygons[0].myYVals= [788, 791, 791, 793, 795, 797, 798, 797, 797, 796, 793, 788, 787, 787, 789, 789, 788] ;
theStateArray.push( new map_State("GRC","Greece","Greece") );
g_map_stateMap["GRC"] = theStateArray[144];
theStateArray[144].myPolygons.push( new map_Polygon() );
theStateArray[144].myPolygons[0].myXVals= [918, 921, 925, 928, 928, 931, 930, 923, 923, 917, 918] ;
theStateArray[144].myPolygons[0].myYVals= [678, 676, 677, 676, 675, 676, 675, 674, 675, 676, 678] ;
theStateArray[144].myPolygons.push( new map_Polygon() );
theStateArray[144].myPolygons[1].myXVals= [933, 931, 930, 927, 924, 918, 922, 919, 916, 914, 913, 914, 916, 914, 917, 920, 920, 915, 917, 913, 915, 912, 908, 906, 905, 903, 901, 900, 903, 903, 904, 905, 908, 910, 912, 913, 914, 918, 922, 925, 930, 930, 933] ;
theStateArray[144].myPolygons[1].myYVals= [707, 704, 704, 704, 704, 703, 700, 699, 699, 702, 701, 698, 695, 694, 692, 691, 688, 689, 687, 686, 682, 682, 684, 688, 691, 693, 696, 698, 700, 702, 702, 704, 704, 705, 705, 706, 706, 706, 707, 706, 706, 709, 707] ;
theStateArray.push( new map_State("HRV","Croatia","Croatia") );
g_map_stateMap["HRV"] = theStateArray[145];
theStateArray[145].myPolygons.push( new map_Polygon() );
theStateArray[145].myPolygons[0].myXVals= [894, 895, 896, 895, 892, 889, 885, 882, 881, 879, 878, 881, 882, 884, 886, 888, 892, 892, 887, 884, 880, 875, 876, 874, 874, 871, 869, 868, 868, 868, 872, 872, 874, 876, 876, 878, 878, 882, 884, 888, 892, 894] ;
theStateArray[145].myPolygons[0].myYVals= [729, 727, 726, 724, 725, 725, 726, 726, 725, 726, 724, 721, 720, 718, 717, 715, 713, 712, 714, 716, 717, 721, 721, 723, 725, 726, 724, 725, 727, 727, 727, 728, 727, 727, 728, 729, 731, 732, 731, 729, 728, 729] ;
theStateArray.push( new map_State("IRL","Ireland","Ireland") );
g_map_stateMap["IRL"] = theStateArray[146];
theStateArray[146].myPolygons.push( new map_Polygon() );
theStateArray[146].myPolygons[0].myXVals= [769, 769, 766, 757, 750, 754, 751, 758, 762, 763, 762, 765, 769] ;
theStateArray[146].myPolygons[0].myYVals= [769, 765, 761, 758, 759, 764, 769, 773, 775, 772, 770, 770, 769] ;
theStateArray.push( new map_State("KOS","Kosovo","Kosovo") );
g_map_stateMap["KOS"] = theStateArray[147];
theStateArray[147].myPolygons.push( new map_Polygon() );
theStateArray[147].myPolygons[0].myXVals= [903, 903, 902, 902, 901, 900, 901, 902, 903, 904, 904, 905, 906, 907, 908, 908, 908, 907, 907, 906, 903] ;
theStateArray[147].myPolygons[0].myYVals= [710, 709, 709, 711, 711, 712, 714, 714, 716, 716, 715, 715, 714, 714, 713, 713, 712, 711, 711, 711, 710] ;
theStateArray.push( new map_State("ISL","Iceland","Iceland") );
g_map_stateMap["ISL"] = theStateArray[148];
theStateArray[148].myPolygons.push( new map_Polygon() );
theStateArray[148].myPolygons[0].myXVals= [727, 726, 731, 725, 711, 706, 700, 686, 691, 680, 689, 688, 678, 681, 689, 697, 704, 711, 719, 727] ;
theStateArray[148].myPolygons[0].myYVals= [832, 829, 825, 821, 818, 817, 818, 819, 822, 824, 825, 826, 828, 831, 832, 828, 831, 829, 832, 832] ;
theStateArray.push( new map_State("HUN","Hungary","Hungary") );
g_map_stateMap["HUN"] = theStateArray[149];
theStateArray[149].myPolygons.push( new map_Polygon() );
theStateArray[149].myPolygons[0].myXVals= [881, 882, 881, 884, 884, 887, 889, 893, 893, 895, 898, 898, 901, 902, 904, 909, 910, 913, 913, 910, 908, 905, 901, 897, 894, 892, 888, 884, 882, 881, 881] ;
theStateArray[149].myPolygons[0].myYVals= [734, 737, 738, 738, 740, 739, 738, 739, 740, 740, 741, 741, 741, 742, 743, 741, 742, 740, 739, 738, 734, 731, 730, 730, 729, 728, 729, 731, 732, 734, 734] ;
theStateArray.push( new map_State("LUX","Luxembourg","Luxembourg") );
g_map_stateMap["LUX"] = theStateArray[150];
theStateArray[150].myPolygons.push( new map_Polygon() );
theStateArray[150].myPolygons[0].myXVals= [830, 831, 830, 829, 828, 828, 830] ;
theStateArray[150].myPolygons[0].myYVals= [750, 749, 747, 747, 747, 750, 750] ;
theStateArray.push( new map_State("ITA","Italy","Italy") );
g_map_stateMap["ITA"] = theStateArray[151];
theStateArray[151].myPolygons.push( new map_Polygon() );
theStateArray[151].myPolygons[0].myXVals= [877, 875, 876, 875, 871, 869, 862, 862, 868, 873, 877] ;
theStateArray[151].myPolygons[0].myYVals= [691, 687, 685, 683, 684, 685, 688, 690, 690, 690, 691] ;
theStateArray[151].myPolygons.push( new map_Polygon() );
theStateArray[151].myPolygons[1].myXVals= [846, 849, 848, 846, 844, 842, 841, 840, 843, 846] ;
theStateArray[151].myPolygons[1].myYVals= [706, 702, 695, 696, 694, 695, 701, 704, 704, 706] ;
theStateArray[151].myPolygons.push( new map_Polygon() );
theStateArray[151].myPolygons[2].myXVals= [861, 869, 868, 869, 865, 861, 861, 861, 862, 867, 870, 875, 879, 880, 879, 883, 887, 891, 892, 891, 888, 884, 882, 885, 885, 883, 880, 878, 878, 879, 880, 878, 877, 874, 873, 870, 868, 864, 860, 855, 852, 851, 848, 844, 842, 839, 837, 837, 835, 833, 835, 834, 834, 836, 838, 841, 842, 844, 845, 849, 851, 852, 855, 855, 860, 861] ;
theStateArray[151].myPolygons[2].myYVals= [733, 732, 730, 727, 728, 726, 724, 723, 720, 717, 713, 709, 709, 708, 707, 705, 704, 701, 700, 699, 701, 702, 698, 697, 694, 694, 689, 689, 691, 693, 694, 697, 700, 700, 703, 703, 705, 706, 708, 711, 714, 719, 720, 721, 721, 718, 718, 720, 721, 725, 726, 728, 729, 728, 729, 730, 730, 730, 732, 731, 732, 734, 733, 734, 735, 733] ;
theStateArray.push( new map_State("LTU","Lithuania","Lithuania") );
g_map_stateMap["LTU"] = theStateArray[152];
theStateArray[152].myPolygons.push( new map_Polygon() );
theStateArray[152].myPolygons[0].myXVals= [913, 913, 913, 911, 906, 905, 911, 919, 924, 925, 927, 932, 932, 928, 927, 922, 917, 916, 913] ;
theStateArray[152].myPolygons[0].myYVals= [771, 772, 774, 775, 775, 780, 781, 781, 781, 780, 780, 778, 775, 774, 771, 769, 769, 771, 771] ;
theStateArray.push( new map_State("LVA","Latvia","Latvia") );
g_map_stateMap["LVA"] = theStateArray[153];
theStateArray[153].myPolygons.push( new map_Polygon() );
theStateArray[153].myPolygons[0].myXVals= [905, 905, 907, 912, 916, 920, 921, 925, 928, 932, 936, 938, 939, 940, 935, 932, 927, 925, 924, 919, 911, 905] ;
theStateArray[153].myPolygons[0].myYVals= [780, 783, 787, 788, 785, 785, 788, 789, 789, 787, 787, 786, 783, 780, 778, 778, 780, 780, 781, 781, 781, 780] ;
theStateArray.push( new map_State("NLD","Netherlands","Netherlands") );
g_map_stateMap["NLD"] = theStateArray[154];
theStateArray[154].myPolygons.push( new map_Polygon() );
theStateArray[154].myPolygons[0].myXVals= [830, 834, 835, 834, 832, 829, 830, 828, 824, 820, 816, 819, 823, 830] ;
theStateArray[154].myPolygons[0].myYVals= [767, 767, 765, 761, 759, 759, 754, 755, 757, 756, 756, 758, 765, 767] ;
theStateArray.push( new map_State("MDA","Moldova","Moldova") );
g_map_stateMap["MDA"] = theStateArray[155];
theStateArray[155].myPolygons.push( new map_Polygon() );
theStateArray[155].myPolygons[0].myXVals= [933, 934, 937, 941, 943, 945, 945, 947, 947, 949, 949, 950, 948, 945, 945, 944, 944, 943, 942, 941, 940, 940, 940, 937, 936, 934, 933] ;
theStateArray[155].myPolygons[0].myYVals= [741, 741, 742, 740, 740, 739, 737, 736, 734, 733, 732, 732, 731, 731, 732, 732, 731, 729, 727, 727, 729, 731, 734, 737, 739, 740, 741] ;
theStateArray.push( new map_State("NOR","Norway","Norway") );
g_map_stateMap["NOR"] = theStateArray[156];
theStateArray[156].myPolygons.push( new map_Polygon() );
theStateArray[156].myPolygons[0].myXVals= [940, 956, 950, 955, 946, 942, 945, 938, 930, 928, 923, 918, 911, 906, 903, 900, 899, 889, 888, 883, 880, 875, 867, 869, 867, 862, 859, 859, 863, 861, 857, 855, 851, 841, 835, 828, 826, 824, 829, 842, 852, 861, 873, 882, 895, 906, 915, 922, 931, 940] ;
theStateArray[156].myPolygons[0].myYVals= [855, 852, 850, 847, 845, 845, 848, 850, 849, 845, 843, 844, 844, 846, 845, 845, 842, 842, 840, 840, 836, 830, 823, 822, 820, 820, 815, 809, 806, 800, 797, 794, 797, 791, 790, 792, 798, 809, 813, 817, 822, 829, 839, 842, 849, 851, 851, 855, 854, 855] ;
theStateArray[156].myPolygons.push( new map_Polygon() );
theStateArray[156].myPolygons[1].myXVals= [923, 912, 903, 907, 904, 914, 916, 923] ;
theStateArray[156].myPolygons[1].myYVals= [889, 887, 888, 889, 891, 892, 890, 889] ;
theStateArray[156].myPolygons.push( new map_Polygon() );
theStateArray[156].myPolygons[2].myXVals= [891, 907, 895, 892, 887, 885, 879, 868, 873, 865, 856, 852, 865, 868, 875, 877, 884, 891] ;
theStateArray[156].myPolygons[2].myYVals= [898, 894, 892, 889, 888, 884, 883, 886, 888, 890, 894, 898, 900, 898, 898, 900, 900, 898] ;
theStateArray[156].myPolygons.push( new map_Polygon() );
theStateArray[156].myPolygons[3].myXVals= [927, 937, 929, 915, 900, 899, 892, 886, 902, 909, 914, 927] ;
theStateArray[156].myPolygons[3].myYVals= [902, 900, 897, 897, 897, 899, 899, 901, 902, 901, 903, 902] ;
theStateArray.push( new map_State("PRT","Portugal","Portugal") );
g_map_stateMap["PRT"] = theStateArray[157];
theStateArray[157].myPolygons.push( new map_Polygon() );
theStateArray[157].myPolygons[0].myXVals= [754, 756, 758, 759, 762, 763, 766, 768, 765, 765, 764, 764, 762, 764, 763, 764, 764, 762, 762, 760, 758, 755, 756, 755, 753, 752, 752, 754, 755, 756, 756, 755, 754] ;
theStateArray[157].myPolygons[0].myYVals= [709, 710, 711, 708, 708, 709, 709, 706, 705, 701, 700, 698, 698, 695, 691, 690, 689, 687, 685, 684, 684, 684, 688, 691, 691, 693, 696, 698, 700, 703, 705, 707, 709] ;
theStateArray.push( new map_State("MKD","Macedonia","Macedonia") );
g_map_stateMap["MKD"] = theStateArray[158];
theStateArray[158].myPolygons.push( new map_Polygon() );
theStateArray[158].myPolygons[0].myXVals= [902, 903, 903, 906, 907, 909, 911, 914, 914, 913, 912, 910, 908, 905, 903, 902, 902] ;
theStateArray[158].myPolygons[0].myYVals= [709, 709, 710, 711, 711, 711, 711, 709, 706, 706, 705, 705, 704, 704, 705, 707, 709] ;
theStateArray.push( new map_State("MNE","Montenegro","Montenegro") );
g_map_stateMap["MNE"] = theStateArray[159];
theStateArray[159].myPolygons.push( new map_Polygon() );
theStateArray[159].myPolygons[0].myXVals= [899, 898, 896, 896, 895, 894, 892, 892, 893, 895, 896, 897, 898, 899, 901, 901, 900, 899] ;
theStateArray[159].myPolygons[0].myYVals= [712, 713, 710, 709, 709, 711, 712, 713, 716, 717, 717, 716, 716, 715, 714, 714, 712, 712] ;
theStateArray.push( new map_State("ROU","Romania","Romania") );
g_map_stateMap["ROU"] = theStateArray[160];
theStateArray[160].myPolygons.push( new map_Polygon() );
theStateArray[160].myPolygons[0].myXVals= [913, 915, 918, 922, 924, 926, 929, 930, 933, 934, 936, 937, 940, 940, 940, 941, 943, 945, 948, 948, 945, 944, 942, 939, 936, 930, 927, 920, 916, 914, 913, 912, 913, 912, 910, 907, 907, 904, 903, 901, 905, 908, 910, 913] ;
theStateArray[160].myPolygons[0].myYVals= [739, 740, 739, 739, 738, 739, 739, 741, 741, 740, 739, 737, 734, 731, 729, 727, 726, 727, 726, 725, 724, 724, 718, 719, 720, 719, 718, 718, 719, 719, 721, 722, 722, 723, 722, 723, 725, 727, 728, 730, 731, 734, 738, 739] ;
theStateArray.push( new map_State("POL","Poland","Poland") );
g_map_stateMap["POL"] = theStateArray[161];
theStateArray[161].myPolygons.push( new map_Polygon() );
theStateArray[161].myPolygons[0].myXVals= [875, 873, 873, 872, 870, 871, 870, 874, 881, 888, 893, 893, 898, 904, 913, 916, 917, 917, 919, 918, 915, 917, 917, 920, 919, 917, 912, 913, 912, 908, 904, 902, 899, 896, 894, 894, 891, 888, 887, 884, 883, 880, 881, 877, 875] ;
theStateArray[161].myPolygons[0].myYVals= [755, 758, 760, 763, 764, 766, 768, 770, 772, 774, 773, 772, 772, 771, 771, 771, 769, 767, 765, 763, 762, 760, 757, 753, 752, 751, 747, 745, 745, 747, 746, 747, 746, 747, 747, 747, 749, 750, 751, 752, 751, 752, 753, 753, 755] ;
theStateArray.push( new map_State("SRB","Republic of Serbia","Republic of Serbia") );
g_map_stateMap["SRB"] = theStateArray[162];
theStateArray[162].myPolygons.push( new map_Polygon() );
theStateArray[162].myPolygons[0].myXVals= [904, 907, 907, 910, 912, 913, 912, 913, 912, 912, 914, 913, 912, 912, 911, 909, 907, 907, 908, 908, 908, 907, 906, 905, 904, 904, 903, 902, 901, 901, 899, 898, 897, 896, 897, 897, 895, 896, 895, 896, 895, 894, 897, 901, 903, 904] ;
theStateArray[162].myPolygons[0].myYVals= [727, 725, 723, 722, 723, 722, 722, 721, 720, 718, 716, 714, 712, 712, 711, 711, 711, 711, 712, 713, 713, 714, 714, 715, 715, 716, 716, 714, 714, 714, 715, 716, 716, 717, 717, 720, 722, 724, 724, 726, 727, 729, 730, 730, 728, 727] ;
theStateArray.push( new map_State("SVK","Slovakia","Slovakia") );
g_map_stateMap["SVK"] = theStateArray[163];
theStateArray[163].myPolygons.push( new map_Polygon() );
theStateArray[163].myPolygons[0].myXVals= [894, 894, 896, 899, 902, 904, 908, 912, 911, 910, 909, 904, 902, 901, 898, 898, 895, 893, 893, 889, 887, 884, 884, 884, 885, 887, 889, 889, 890, 890, 891, 892, 894] ;
theStateArray[163].myPolygons[0].myYVals= [747, 747, 747, 746, 747, 746, 747, 745, 744, 742, 741, 743, 742, 741, 741, 741, 740, 740, 739, 738, 739, 740, 742, 742, 744, 744, 744, 744, 745, 746, 746, 747, 747] ;
theStateArray.push( new map_State("UKR","Ukraine","Ukraine") );
g_map_stateMap["UKR"] = theStateArray[164];
theStateArray[164].myPolygons.push( new map_Polygon() );
theStateArray[164].myPolygons[0].myXVals= [958, 960, 962, 963, 968, 971, 970, 971, 975, 976, 976, 983, 986, 990, 992, 1000, 1000, 998, 999, 998, 993, 991, 991, 987, 983, 979, 974, 975, 977, 982, 981, 976, 969, 966, 967, 962, 963, 967, 966, 958, 958, 953, 951, 948, 945, 943, 941, 942, 943, 944, 944, 945, 945, 948, 950, 949, 949, 947, 947, 945, 945, 943, 941, 937, 934, 933, 930, 929, 926, 924, 922, 918, 915, 913, 913, 910, 911, 912, 913, 912, 917, 919, 920, 917, 920, 922, 926, 931, 937, 941, 943, 944, 946, 950, 952, 953, 954, 958] ;
theStateArray[164].myPolygons[0].myYVals= [760, 760, 761, 761, 761, 758, 757, 756, 756, 753, 752, 751, 751, 749, 749, 748, 746, 743, 741, 739, 739, 737, 735, 735, 733, 733, 731, 728, 727, 727, 725, 724, 721, 722, 725, 726, 727, 729, 730, 731, 733, 732, 730, 726, 727, 726, 727, 727, 729, 731, 732, 732, 731, 731, 732, 732, 733, 734, 736, 737, 739, 740, 740, 742, 741, 741, 741, 739, 739, 738, 739, 739, 740, 739, 740, 742, 744, 745, 745, 747, 751, 752, 753, 757, 758, 759, 759, 759, 757, 757, 757, 758, 756, 757, 756, 759, 760, 760] ;
theStateArray.push( new map_State("SVN","Slovenia","Slovenia") );
g_map_stateMap["SVN"] = theStateArray[165];
theStateArray[165].myPolygons.push( new map_Polygon() );
theStateArray[165].myPolygons[0].myXVals= [869, 873, 875, 880, 881, 881, 882, 878, 878, 876, 876, 874, 872, 872, 868, 869, 868, 869] ;
theStateArray[165].myPolygons[0].myYVals= [732, 732, 733, 733, 734, 734, 732, 731, 729, 728, 727, 727, 728, 727, 727, 727, 730, 732] ;
theStateArray.push( new map_State("AUS","Australia","Australia") );
g_map_stateMap["AUS"] = theStateArray[166];
theStateArray[166].myPolygons.push( new map_Polygon() );
theStateArray[166].myPolygons[0].myXVals= [1526, 1531, 1534, 1538, 1541, 1541, 1540, 1539, 1537, 1534, 1533, 1530, 1527, 1526, 1523, 1523, 1526] ;
theStateArray[166].myPolygons[0].myYVals= [296, 294, 294, 295, 295, 289, 287, 283, 285, 281, 282, 282, 286, 289, 294, 296, 296] ;
theStateArray[166].myPolygons.push( new map_Polygon() );
theStateArray[166].myPolygons[1].myXVals= [1517, 1519, 1522, 1524, 1526, 1526, 1527, 1528, 1529, 1530, 1530, 1531, 1537, 1540, 1544, 1543, 1546, 1548, 1550, 1552, 1553, 1554, 1558, 1560, 1564, 1565, 1565, 1565, 1567, 1567, 1566, 1565, 1565, 1564, 1562, 1558, 1556, 1555, 1553, 1551, 1550, 1549, 1549, 1547, 1541, 1536, 1534, 1531, 1527, 1524, 1525, 1522, 1518, 1513, 1510, 1508, 1503, 1499, 1499, 1497, 1495, 1490, 1492, 1491, 1488, 1484, 1486, 1487, 1489, 1489, 1484, 1481, 1479, 1476, 1476, 1473, 1470, 1471, 1464, 1461, 1456, 1447, 1441, 1435, 1430, 1425, 1421, 1420, 1418, 1414, 1410, 1406, 1402, 1399, 1396, 1395, 1392, 1390, 1386, 1383, 1377, 1375, 1375, 1377, 1378, 1378, 1379, 1378, 1375, 1374, 1375, 1373, 1373, 1370, 1370, 1367, 1366, 1368, 1367, 1369, 1371, 1371, 1368, 1368, 1366, 1367, 1368, 1369, 1368, 1370, 1371, 1373, 1377, 1379, 1383, 1385, 1387, 1391, 1394, 1394, 1396, 1399, 1404, 1406, 1408, 1411, 1411, 1411, 1415, 1417, 1419, 1417, 1419, 1421, 1421, 1424, 1425, 1428, 1428, 1430, 1430, 1432, 1435, 1439, 1441, 1444, 1448, 1447, 1449, 1451, 1450, 1453, 1456, 1458, 1462, 1462, 1459, 1461, 1465, 1467, 1471, 1473, 1476, 1479, 1481, 1482, 1484, 1483, 1481, 1479, 1480, 1478, 1477, 1477, 1481, 1485, 1487, 1491, 1492, 1495, 1496, 1501, 1504, 1505, 1506, 1506, 1508, 1507, 1508, 1507, 1508, 1509, 1508, 1509, 1510, 1510, 1512, 1513, 1514, 1515, 1515, 1517, 1517, 1517] ;
theStateArray[166].myPolygons[1].myYVals= [431, 427, 429, 427, 425, 422, 418, 416, 415, 411, 408, 405, 402, 400, 398, 396, 393, 388, 389, 387, 387, 382, 379, 377, 373, 369, 366, 363, 359, 355, 352, 348, 345, 341, 337, 334, 330, 328, 324, 321, 317, 314, 312, 311, 310, 308, 306, 304, 307, 307, 310, 309, 305, 307, 308, 308, 309, 312, 316, 319, 321, 321, 324, 328, 324, 323, 326, 329, 331, 335, 331, 329, 325, 327, 330, 333, 335, 336, 339, 340, 342, 342, 340, 338, 338, 336, 335, 332, 330, 330, 329, 330, 330, 330, 327, 327, 326, 324, 324, 324, 328, 329, 331, 332, 333, 335, 338, 341, 346, 349, 352, 355, 357, 359, 363, 367, 369, 367, 371, 370, 368, 371, 375, 376, 378, 380, 382, 384, 387, 391, 387, 390, 392, 394, 396, 396, 396, 398, 398, 399, 400, 400, 401, 403, 406, 409, 411, 413, 417, 413, 414, 417, 419, 418, 422, 424, 426, 427, 428, 428, 429, 430, 430, 428, 425, 425, 425, 427, 431, 433, 434, 437, 439, 438, 439, 441, 443, 444, 443, 441, 439, 440, 438, 440, 439, 440, 438, 435, 433, 433, 431, 428, 426, 425, 422, 420, 418, 415, 415, 414, 413, 411, 413, 415, 418, 420, 424, 427, 428, 431, 435, 436, 437, 440, 443, 444, 446, 444, 441, 440, 438, 435, 432, 431] ;
theStateArray.push( new map_State("SWE","Sweden","Sweden") );
g_map_stateMap["SWE"] = theStateArray[167];
theStateArray[167].myPolygons.push( new map_Polygon() );
theStateArray[167].myPolygons[0].myXVals= [910, 906, 906, 898, 889, 885, 889, 893, 889, 884, 882, 879, 873, 870, 864, 863, 858, 855, 857, 861, 863, 859, 859, 862, 867, 869, 867, 875, 880, 883, 888, 889, 899, 900, 903, 909, 917, 917, 919, 910] ;
theStateArray[167].myPolygons[0].myYVals= [828, 825, 822, 818, 813, 806, 803, 800, 794, 793, 785, 780, 781, 777, 776, 781, 787, 794, 797, 800, 806, 809, 815, 820, 820, 822, 823, 830, 836, 840, 840, 842, 842, 845, 845, 843, 839, 831, 830, 828] ;
theStateArray.push( new map_State("RUS","Russia","Russia") );
g_map_stateMap["RUS"] = theStateArray[168];
theStateArray[168].myPolygons.push( new map_Polygon() );
theStateArray[168].myPolygons[0].myXVals= [1518, 1523, 1515, 1512, 1517, 1517, 1513, 1510, 1509, 1510, 1509, 1510, 1510, 1507, 1508, 1513, 1511, 1513, 1514, 1516, 1516, 1518] ;
theStateArray[168].myPolygons[0].myYVals= [753, 744, 746, 739, 734, 730, 733, 729, 734, 738, 744, 748, 754, 759, 766, 768, 771, 771, 768, 763, 758, 753] ;
theStateArray[168].myPolygons.push( new map_Polygon() );
theStateArray[168].myPolygons[1].myXVals= [913, 904, 898, 899, 906, 911, 913, 913, 913] ;
theStateArray[168].myPolygons[1].myYVals= [771, 771, 772, 774, 775, 775, 774, 772, 771] ;
theStateArray[168].myPolygons.push( new map_Polygon() );
theStateArray[168].myPolygons[2].myXVals= [-75, -71, -72, -59, -49, -54, -62, -62, -64, -69, -73, -79, -81, -86, -91, -94, -93, -99, -97, -100, -100, -87, -74, -75] ;
theStateArray[168].myPolygons[2].myYVals= [832, 831, 835, 834, 829, 827, 827, 822, 821, 821, 823, 824, 826, 827, 826, 828, 830, 829, 827, 824, 844, 841, 836, 832] ;
theStateArray[168].myPolygons.push( new map_Polygon() );
theStateArray[168].myPolygons[3].myXVals= [1700, 1694, 1693, 1700, 1700] ;
theStateArray[168].myPolygons[3].myYVals= [854, 853, 855, 857, 854] ;
theStateArray[168].myPolygons.push( new map_Polygon() );
theStateArray[168].myPolygons[4].myXVals= [-93, -100, -100, -99, -95, -87, -88, -93] ;
theStateArray[168].myPolygons[4].myYVals= [854, 854, 857, 857, 857, 856, 855, 854] ;
theStateArray[168].myPolygons.push( new map_Polygon() );
theStateArray[168].myPolygons[5].myXVals= [1518, 1510, 1500, 1499, 1504, 1510, 1517, 1518] ;
theStateArray[168].myPolygons[5].myYVals= [866, 866, 866, 866, 868, 869, 867, 866] ;
theStateArray[168].myPolygons.push( new map_Polygon() );
theStateArray[168].myPolygons[6].myXVals= [1553, 1547, 1539, 1530, 1531, 1541, 1553] ;
theStateArray[168].myPolygons[6].myYVals= [875, 873, 873, 875, 877, 876, 875] ;
theStateArray[168].myPolygons.push( new map_Polygon() );
theStateArray[168].myPolygons[7].myXVals= [1525, 1521, 1503, 1494, 1484, 1487, 1494, 1507, 1525] ;
theStateArray[168].myPolygons[7].myYVals= [877, 874, 874, 873, 876, 879, 880, 880, 877] ;
theStateArray[168].myPolygons.push( new map_Polygon() );
theStateArray[168].myPolygons[8].myXVals= [1087, 1084, 1068, 1067, 1058, 1057, 1062, 1062, 1072, 1067, 1079, 1078, 1089, 1105, 1122, 1131, 1140, 1144, 1140, 1123, 1107, 1092, 1084, 1077, 1078, 1087] ;
theStateArray[168].myPolygons[8].myYVals= [853, 853, 853, 856, 857, 860, 861, 863, 868, 868, 873, 875, 878, 881, 882, 884, 884, 882, 881, 878, 876, 871, 866, 861, 857, 853] ;
theStateArray[168].myPolygons.push( new map_Polygon() );
theStateArray[168].myPolygons[9].myXVals= [1334, 1336, 1340, 1355, 1366, 1370, 1369, 1363, 1350, 1347, 1353, 1360, 1365, 1367, 1369, 1377, 1393, 1395, 1416, 1416, 1426, 1434, 1442, 1445, 1442, 1448, 1456, 1461, 1469, 1477, 1487, 1491, 1499, 1495, 1502, 1547, 1551, 1564, 1585, 1594, 1599, 1598, 1604, 1611, 1620, 1629, 1639, 1647, 1654, 1650, 1652, 1668, 1678, 1693, 1700, 1700, 1699, 1693, 1687, 1691, 1694, 1696, 1697, 1696, 1686, 1672, 1668, 1660, 1653, 1651, 1644, 1631, 1629, 1624, 1617, 1616, 1610, 1610, 1615, 1615, 1610, 1608, 1610, 1601, 1600, 1592, 1591, 1583, 1582, 1579, 1577, 1579, 1583, 1584, 1591, 1600, 1609, 1618, 1622, 1616, 1613, 1600, 1596, 1583, 1571, 1575, 1564, 1556, 1556, 1548, 1542, 1527, 1510, 1494, 1475, 1483, 1485, 1490, 1494, 1499, 1506, 1506, 1502, 1502, 1500, 1492, 1491, 1484, 1477, 1474, 1467, 1464, 1461, 1454, 1453, 1453, 1453, 1455, 1456, 1455, 1459, 1465, 1468, 1470, 1472, 1475, 1466, 1462, 1454, 1452, 1446, 1438, 1436, 1434, 1432, 1429, 1425, 1417, 1411, 1405, 1400, 1403, 1403, 1400, 1396, 1396, 1389, 1383, 1377, 1374, 1371, 1364, 1357, 1353, 1347, 1342, 1339, 1334, 1329, 1323, 1318, 1311, 1310, 1304, 1299, 1294, 1289, 1291, 1286, 1279, 1274, 1270, 1265, 1261, 1253, 1244, 1238, 1236, 1234, 1227, 1225, 1222, 1219, 1216, 1209, 1202, 1200, 1189, 1182, 1184, 1171, 1167, 1167, 1161, 1155, 1154, 1145, 1140, 1128, 1125, 1107, 1104, 1108, 1103, 1104, 1099, 1107, 1106, 1099, 1098, 1091, 1083, 1078, 1072, 1061, 1053, 1043, 1042, 1037, 1033, 1035, 1032, 1036, 1040, 1043, 1042, 1045, 1043, 1038, 1033, 1037, 1037, 1042, 1039, 1039, 1036, 1033, 1032, 1028, 1027, 1022, 1019, 1018, 1011, 1004, 1000, 999, 993, 987, 983, 987, 991, 988, 995, 995, 991, 991, 993, 998, 999, 998, 1000, 1000, 992, 990, 986, 983, 976, 976, 975, 971, 970, 971, 968, 963, 962, 960, 958, 957, 956, 957, 961, 963, 962, 958, 958, 956, 953, 954, 954, 949, 946, 946, 940, 939, 938, 936, 938, 937, 940, 939, 945, 940, 951, 955, 957, 950, 952, 947, 951, 945, 949, 942, 942, 946, 955, 960, 968, 982, 1001, 1005, 1005, 1000, 991, 969, 965, 974, 974, 974, 981, 985, 985, 982, 985, 997, 1002, 998, 1010, 1015, 1019, 1022, 1018, 1020, 1017, 1031, 1034, 1027, 1027, 1031, 1039, 1040, 1051, 1068, 1072, 1067, 1073, 1077, 1086, 1094, 1099, 1105, 1100, 1102, 1117, 1124, 1142, 1145, 1140, 1140, 1134, 1136, 1133, 1133, 1142, 1145, 1149, 1162, 1163, 1159, 1162, 1163, 1162, 1168, 1166, 1156, 1162, 1164, 1169, 1170, 1175, 1172, 1174, 1169, 1168, 1171, 1165, 1174, 1173, 1175, 1178, 1176, 1181, 1179, 1187, 1198, 1207, 1203, 1202, 1211, 1223, 1234, 1230, 1235, 1241, 1251, 1264, 1266, 1279, 1283, 1294, 1303, 1305, 1309, 1321, 1330, 1323, 1334] ;
theStateArray[168].myPolygons[9].myYVals= [884, 882, 883, 883, 881, 879, 876, 875, 872, 870, 870, 868, 869, 866, 867, 868, 867, 865, 864, 868, 867, 867, 865, 861, 859, 855, 853, 859, 856, 858, 856, 858, 857, 862, 864, 861, 858, 854, 855, 854, 852, 848, 847, 848, 848, 847, 847, 843, 845, 848, 850, 849, 849, 847, 844, 824, 824, 822, 823, 820, 816, 814, 812, 811, 812, 808, 808, 804, 801, 799, 802, 798, 800, 798, 799, 796, 791, 789, 788, 780, 780, 776, 774, 771, 766, 764, 759, 755, 758, 765, 776, 783, 786, 789, 790, 796, 801, 805, 812, 812, 808, 802, 808, 807, 798, 795, 794, 793, 797, 798, 795, 796, 795, 785, 773, 773, 769, 768, 771, 770, 765, 761, 756, 750, 742, 734, 731, 725, 719, 716, 714, 713, 716, 712, 711, 711, 714, 714, 720, 724, 726, 725, 730, 736, 737, 742, 740, 738, 738, 743, 747, 748, 753, 756, 758, 763, 765, 767, 767, 766, 763, 762, 759, 758, 752, 750, 747, 749, 749, 750, 751, 747, 746, 745, 746, 746, 748, 751, 752, 751, 750, 752, 756, 757, 758, 760, 755, 752, 748, 749, 750, 752, 752, 754, 751, 747, 746, 746, 749, 748, 750, 751, 754, 755, 754, 756, 754, 767, 770, 772, 767, 767, 770, 771, 770, 775, 776, 774, 773, 771, 770, 768, 764, 763, 762, 759, 756, 753, 754, 752, 755, 755, 753, 755, 758, 758, 753, 749, 752, 746, 745, 741, 738, 738, 735, 732, 731, 729, 728, 723, 718, 714, 709, 707, 705, 706, 709, 709, 710, 712, 713, 712, 713, 716, 716, 717, 717, 721, 723, 726, 727, 731, 733, 735, 736, 735, 737, 739, 739, 741, 743, 746, 748, 749, 749, 751, 751, 752, 753, 756, 756, 757, 758, 761, 761, 761, 760, 760, 763, 765, 765, 765, 766, 768, 768, 769, 770, 774, 775, 777, 778, 778, 779, 780, 783, 786, 787, 788, 793, 796, 797, 800, 802, 808, 811, 814, 817, 821, 824, 829, 834, 838, 841, 845, 845, 847, 849, 846, 845, 839, 837, 833, 831, 829, 833, 833, 829, 827, 822, 820, 819, 821, 823, 825, 822, 823, 827, 832, 832, 830, 833, 836, 839, 842, 841, 838, 837, 835, 833, 834, 837, 839, 844, 844, 841, 840, 842, 842, 844, 841, 844, 847, 849, 847, 846, 840, 843, 845, 846, 847, 849, 853, 855, 859, 864, 865, 863, 861, 857, 855, 851, 845, 842, 838, 831, 830, 832, 833, 836, 838, 841, 844, 845, 848, 853, 857, 860, 864, 864, 861, 856, 855, 859, 861, 861, 858, 862, 868, 869, 869, 869, 872, 875, 875, 878, 878, 880, 880, 879, 882, 882, 884, 886, 888, 886, 885, 884] ;
theStateArray[168].myPolygons.push( new map_Polygon() );
theStateArray[168].myPolygons[10].myXVals= [1325, 1297, 1306, 1310, 1314, 1326, 1325] ;
theStateArray[168].myPolygons[10].myYVals= [891, 889, 896, 896, 896, 893, 891] ;
theStateArray[168].myPolygons.push( new map_Polygon() );
theStateArray[168].myPolygons[11].myXVals= [1055, 1048, 1044, 1043, 1037, 1032, 1035, 1024, 1033, 1041, 1042, 1045, 1050, 1057, 1055] ;
theStateArray[168].myPolygons[11].myYVals= [902, 902, 901, 900, 900, 901, 902, 902, 903, 903, 902, 903, 904, 903, 902] ;
theStateArray[168].myPolygons.push( new map_Polygon() );
theStateArray[168].myPolygons[12].myXVals= [1299, 1288, 1274, 1266, 1262, 1255, 1268, 1279, 1289, 1300, 1299] ;
theStateArray[168].myPolygons[12].myYVals= [894, 893, 895, 897, 900, 901, 905, 906, 903, 898, 894] ;
theStateArray.push( new map_State("FJI","Fiji","Fiji") );
g_map_stateMap["FJI"] = theStateArray[169];
theStateArray[169].myPolygons.push( new map_Polygon() );
theStateArray[169].myPolygons[0].myXVals= [1691, 1693, 1692, 1689, 1686, 1686, 1688, 1690, 1691] ;
theStateArray[169].myPolygons[0].myYVals= [413, 411, 409, 408, 409, 411, 413, 412, 413] ;
theStateArray[169].myPolygons.push( new map_Polygon() );
theStateArray[169].myPolygons[1].myXVals= [1696, 1693, 1692, 1695, 1697, 1700, 1700, 1696] ;
theStateArray[169].myPolygons[1].myYVals= [415, 414, 416, 417, 418, 419, 417, 415] ;
theStateArray[169].myPolygons.push( new map_Polygon() );
theStateArray[169].myPolygons[2].myXVals= [-99, -100, -100, -98, -99] ;
theStateArray[169].myPolygons[2].myYVals= [417, 417, 419, 419, 417] ;
theStateArray.push( new map_State("NCL","New Caledonia","New Caledonia") );
g_map_stateMap["NCL"] = theStateArray[170];
theStateArray[170].myPolygons.push( new map_Polygon() );
theStateArray[170].myPolygons[0].myXVals= [1628, 1632, 1635, 1633, 1630, 1627, 1624, 1620, 1620, 1622, 1625, 1627, 1628] ;
theStateArray[170].myPolygons[0].myYVals= [394, 391, 389, 388, 389, 391, 394, 397, 399, 399, 397, 395, 394] ;
theStateArray.push( new map_State("NZL","New Zealand","New Zealand") );
g_map_stateMap["NZL"] = theStateArray[171];
theStateArray[171].myPolygons.push( new map_Polygon() );
theStateArray[171].myPolygons[0].myXVals= [1665, 1666, 1669, 1671, 1671, 1669, 1666, 1663, 1665, 1661, 1657, 1655, 1653, 1649, 1646, 1642, 1638, 1633, 1632, 1635, 1641, 1644, 1648, 1652, 1655, 1657, 1659, 1660, 1663, 1665] ;
theStateArray[171].myPolygons[0].myYVals= [295, 293, 295, 293, 291, 288, 285, 283, 280, 280, 278, 275, 270, 268, 266, 266, 268, 268, 270, 274, 279, 280, 282, 284, 287, 291, 292, 295, 297, 295] ;
theStateArray[171].myPolygons.push( new map_Polygon() );
theStateArray[171].myPolygons[1].myXVals= [1673, 1676, 1676, 1679, 1679, 1683, 1687, 1690, 1692, 1691, 1689, 1686, 1684, 1685, 1684, 1682, 1680, 1676, 1675, 1673, 1676, 1674, 1669, 1669, 1672, 1673, 1673, 1671, 1671, 1669, 1665, 1663, 1665, 1667, 1671, 1673] ;
theStateArray[171].myPolygons[1].myYVals= [319, 313, 317, 316, 312, 310, 310, 312, 311, 307, 304, 304, 302, 300, 299, 296, 293, 291, 292, 293, 297, 300, 302, 304, 306, 309, 313, 316, 317, 319, 323, 327, 327, 324, 323, 319] ;
theStateArray.push( new map_State("PNG","Papua New Guinea","Papua New Guinea") );
g_map_stateMap["PNG"] = theStateArray[172];
theStateArray[172].myPolygons.push( new map_Polygon() );
theStateArray[172].myPolygons[0].myXVals= [1579, 1577, 1575, 1573, 1572, 1573, 1573, 1575, 1577, 1580, 1579] ;
theStateArray[172].myPolygons[0].myYVals= [465, 465, 467, 470, 474, 474, 473, 472, 468, 467, 465] ;
theStateArray[172].myPolygons.push( new map_Polygon() );
theStateArray[172].myPolygons[1].myXVals= [1559, 1557, 1556, 1553, 1551, 1548, 1544, 1541, 1542, 1546, 1549, 1549, 1550, 1551, 1554, 1555, 1558, 1557, 1560, 1561, 1561, 1559] ;
theStateArray[172].myPolygons[1].myYVals= [472, 472, 470, 469, 468, 468, 469, 471, 472, 472, 472, 474, 474, 472, 472, 474, 476, 479, 479, 478, 475, 472] ;
theStateArray[172].myPolygons.push( new map_Polygon() );
theStateArray[172].myPolygons[2].myXVals= [1535, 1540, 1543, 1546, 1546, 1550, 1548, 1554, 1553, 1550, 1548, 1544, 1539, 1535, 1532, 1530, 1523, 1519, 1516, 1517, 1513, 1510, 1505, 1505, 1505, 1513, 1522, 1526, 1529, 1529, 1538, 1539, 1534, 1535] ;
theStateArray[172].myPolygons[2].myYVals= [463, 459, 454, 454, 452, 451, 450, 448, 447, 446, 448, 448, 449, 452, 455, 459, 461, 460, 458, 455, 453, 454, 454, 470, 486, 483, 480, 478, 475, 472, 469, 466, 466, 463] ;
theStateArray[172].myPolygons.push( new map_Polygon() );
theStateArray[172].myPolygons[3].myXVals= [1565, 1564, 1563, 1562, 1559, 1556, 1553, 1554, 1557, 1559, 1561, 1563, 1565, 1565] ;
theStateArray[172].myPolygons[3].myYVals= [477, 476, 479, 481, 482, 484, 486, 487, 486, 485, 483, 481, 480, 477] ;
theStateArray.push( new map_State("SLB","Solomon Islands","Solomon Islands") );
g_map_stateMap["SLB"] = theStateArray[173];
theStateArray[173].myPolygons.push( new map_Polygon() );
theStateArray[173].myPolygons[0].myXVals= [1610, 1611, 1608, 1606, 1609, 1610] ;
theStateArray[173].myPolygons[0].myYVals= [447, 445, 445, 448, 447, 447] ;
theStateArray[173].myPolygons.push( new map_Polygon() );
theStateArray[173].myPolygons[1].myXVals= [1604, 1602, 1599, 1598, 1598, 1601, 1603, 1604] ;
theStateArray[173].myPolygons[1].myYVals= [450, 450, 451, 451, 453, 452, 451, 450] ;
theStateArray[173].myPolygons.push( new map_Polygon() );
theStateArray[173].myPolygons[2].myXVals= [1608, 1607, 1603, 1602, 1604, 1606, 1608] ;
theStateArray[173].myPolygons[2].myYVals= [452, 451, 455, 458, 458, 454, 452] ;
theStateArray[173].myPolygons.push( new map_Polygon() );
theStateArray[173].myPolygons[3].myXVals= [1599, 1599, 1595, 1592, 1591, 1591, 1594, 1598, 1599] ;
theStateArray[173].myPolygons[3].myYVals= [458, 457, 459, 461, 462, 463, 462, 459, 458] ;
theStateArray[173].myPolygons.push( new map_Polygon() );
theStateArray[173].myPolygons[4].myXVals= [1587, 1586, 1584, 1582, 1582, 1585, 1587] ;
theStateArray[173].myPolygons[4].myYVals= [463, 462, 464, 466, 467, 464, 463] ;
theStateArray.push( new map_State("VUT","Vanuatu","Vanuatu") );
g_map_stateMap["VUT"] = theStateArray[174];
theStateArray[174].myPolygons.push( new map_Polygon() );
theStateArray[174].myPolygons[0].myXVals= [1639, 1637, 1635, 1636, 1639] ;
theStateArray[174].myPolygons[0].myYVals= [417, 417, 419, 420, 417] ;
theStateArray[174].myPolygons.push( new map_Polygon() );
theStateArray[174].myPolygons[1].myXVals= [1635, 1636, 1635, 1633, 1633, 1633, 1635] ;
theStateArray[174].myPolygons[1].myYVals= [425, 421, 421, 421, 423, 426, 425] ;

for(iii=0;iii<175;iii++){
for(ii=0;ii<theStateArray[iii].myPolygons.length;ii++){
for(i=0;i<theStateArray[iii].myPolygons[ii].myYVals.length;i++){theStateArray[iii].myPolygons[ii].myYVals[i]-=210;}
}
}
for(iii=0;iii<175;iii++){
for(ii=0;ii<theStateArray[iii].myPolygons.length;ii++){
for(i=0;i<theStateArray[iii].myPolygons[ii].myXVals.length;i++){theStateArray[iii].myPolygons[ii].myXVals[i]+=110;}
}
}
for(iii=0;iii<175;iii++){
for(ii=0;ii<theStateArray[iii].myPolygons.length;ii++){
for(i=0;i<theStateArray[iii].myPolygons[ii].myYVals.length;i++){theStateArray[iii].myPolygons[ii].myYVals[i]*=(window.innerWidth-100.)*1./1820.;}
}
}
for(iii=0;iii<175;iii++){
for(ii=0;ii<theStateArray[iii].myPolygons.length;ii++){
for(i=0;i<theStateArray[iii].myPolygons[ii].myXVals.length;i++){theStateArray[iii].myPolygons[ii].myXVals[i]*=(window.innerWidth-100.)*1./1820.;}
}
}
}