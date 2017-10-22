
/*---------------------------------------------------------------------------

 Place your own copyright notice here!  This file contains all your own content
 and YOU control the distribution license.


 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
---------------------------------------------------------------------------*/

   //
   // This is the primary file users will modify to create their own map
   // application.  It's unlikely you will need to modify any other file.
   //
   // These global variables govern most of the map's settings and data
   // needed to create your application.  All variables pertaining to
   // the map begin with g_map_...  See section 4 for example code.  Section 4
   // also contains the map_userSetup() function where you can put all of your 
   // own custom code.
   //

   // -------------------------------------------------------------------------
   // SECTION 1:    COLORS
   //
   // By modifying the following values you can control virtually all of the
   // color settings of the map. Color syntax will either be default CSS style
   // or a three dimensional array of RGB values. The two are not interchangable
   //
   // Each state is fully configurable as to its default and highlighted color
   // and border color.  The info box that pops up when a state is hovered over
   // is also configurable as to color (border, text, and background)
   //
   // These are the default settings, to change the settings for an individual
   // state see section 2.
   //


   var g_map_backgroundColor = "white";        // background to draw map on
   var g_map_borderColor = "black";            // state border color  
   var g_map_highlightBorderColor = "yellow";  // highlighted state border color

   var g_map_baseRGB = [255,255,255];          // state color default
   var g_map_highlightRGB = [0,100,200];       // state color when highlighted

   var g_map_infoBoxFillRGB   = [0,0,0];       // info box background color
   var g_map_infoBoxBorderRGB = [255,255,255]; // info box border color
   var g_map_infoBoxTextRGB   = [255,255,255]; // info box text color

   var g_map_useInfoBox = true;  // default to use the info box for all states
   var g_map_isIE9 = false;      // must detect IE9 for proper mouse position



   // -------------------------------------------------------------------------
   // SECTION 2:    CHANGING SETTINGS FOR INDIVIDUAL STATES
   //
   // The primary method of modifying the settings for an individual state
   // is to use the global variable g_map_stateMap.  You simply use the state's
   // postal abbreviation as the index into the map.  For example, to set the
   // default unhighlighted color of Florida to red (a 3D array): 
   //
   //               g_map_stateMap["FL"].myBaseRGB = [255,0,0];
   //
   // You can put all of your own custom code in the function map_userSetup()
   // which is at the end of this file in section 4.
   //
   // Here is a list of properties of each state that you can modify, and the
   // type of the value that is expected for the property:
   //
   // BASIC PROPRETIES
   // FIELD                     TYPE              DESCRIPTION
   // =====                     ====              ===========
   // myBorderColor             CSS style color   i.e. "white"  border color
   // myHighlightBorderColor    CSS style color   highlighted border
   // myHighlightRGB            3D array          [r,g,b] highlighted state 
   // myBaseRGB                 3D array                  when not highlighted
   // 
   // myUseInfoBox              boolean           default = true
   // myInfoBoxFillRGB          3D array          info box background
   // myInfoBoxBorderRGB        3D array          info box border
   // myInfoBoxTextRGB          3D array          info box text color
   //                                             
   //
   // setInfoBoxText(t)         t = the text to put into the info box 
   // addInfoBoxText(t)         t = append a new line of text to the info box
   //
   // myInfoBoxOrigin           2D array          default = [625,290]
   // myInfoBoxWidth            integer           default = 174 
   // myInfoBoxHeight           integer           default = 160
   // myInfoBoxTextHeight       integer=12        you must change this if you
   //                                             alter the font of the canvas
   //
   // myClickCallback           function          set this to your own callback
   //                                             invoked when state is clicked
   //
   // updateColor(highlight)    function          call this function after you
   //                                             have changed color settings
   //                                             within your custom click cb
   //                                             to make the map render them
   //                                             set 'highlight' (boolean)
   //                                             the current state should be
   //                                             filled highlighted or not
   //                                             
   // READ ONLY PROPERTIES
   // ====================
   // myAbbrev                  string            postal code, i.e. "FL"
   // myCapsName                string            name in all caps, "FLORIDA"
   // myPrettyName              string            prettier name, "Florida"
   //
   
   var g_map_stateMap = null;

   // -------------------------------------------------------------------------
   // SECTION 3:    CANVAS AND CONTEXT
   //
   // If you need direct access to the canvas, 2d context or the interval timer
   // for the redraw of the map, you can use these global variables
   //
   
   var g_map_canvas;
   var g_map_context;
   var g_map_renderInterval;


   // -------------------------------------------------------------------------
   // SECTION 4:    HOOK FUNCTION FOR INSERTING YOUR OWN CODE 
   //
   // This function called map_userSetup() is called when the map is configured 
   // and loaded on to your canvas. You can put all of your own custom settings
   // right here and they will show up on the map. 
   //

   function map_userSetup(stateColors)
   {

      //
      // EXAMPLE: SETTING THE INFO BOX TEXT
      //
      //          This example shows how to use the built in methods of the
      //          state object to set the text that appears in the info box
      //          when the user hovers the mouse over a state.
      //
      for ( var abbrev in g_map_stateMap )
      {
         
         var state = g_map_stateMap[abbrev]; 
         var nameAndAbbrev = state.myPrettyName + "  (" + state.myAbbrev + ")";

         state.setInfoBoxText(nameAndAbbrev);
         state.addInfoBoxText(""); // add a blank line
         if (abbrev in stateColors){ 
         var ngold = stateColors[abbrev].gold;

         var ngoldstr = ngold.toString()+' Gold';
         var nsilver = stateColors[abbrev].silver;
         var nsilverstr = nsilver.toString()+' Silver';
         var nbronze = stateColors[abbrev].bronze;
         var nbronzestr = nbronze.toString()+' Bronze';
         var nvalue = stateColors[abbrev].value;
         var nvaluestr = nvalue.toString()+' Points';
         var nrank = stateColors[abbrev].rank;
         var nrankstr = nrank.toString()+' Rank';
         state.addInfoBoxText(nvaluestr);
         state.addInfoBoxText(ngoldstr);
         state.addInfoBoxText(nsilverstr);
         state.addInfoBoxText(nbronzestr);
         state.addInfoBoxText(nrankstr);
         state.myBaseRGB = [stateColors.base1+(255-stateColors[abbrev].points)*(stateColors.max1-stateColors.base1)/255,stateColors.base2+(255-stateColors[abbrev].points)*(stateColors.max2-stateColors.base2)/255,stateColors.base3+(255-stateColors[abbrev].points)*(stateColors.max3-stateColors.base3)/255];
         }
         else{
          state.myBaseRGB = [stateColors.base1,stateColors.base2,stateColors.base3];  
         }
      }

      




      //
      // Put some additional text into the info box. This example demonstrates 
      // how the addInfoBoxText() method automatically wraps the text according
      // to the size of the string you give it.
      //

      for ( var abbrev in g_map_stateMap )
      {
         var state = g_map_stateMap[abbrev]; 
         state.addInfoBoxText("");
         state.addInfoBoxText("");
         state.addInfoBoxText("The text in this optional box is fully configurable on a state by state basis, as well as the size and position of this text box. All colors are fully configurable too!");
      }

      
      return;
}

