function createBG(left_x,center_y,pitches){
	pitch_initCanvas();
	var pci;
	for (pci=0;pci<pitches.length;pci++){
		if (pitches[pci][0]==1){colors = [255,0,0];}
		else if (pitches[pci][0]==2){colors = [0,128,0];}
		else if (pitches[pci][0]==3){colors = [255,165,0];}
		else if (pitches[pci][0]==4){colors = [0,0,255];}
		else {colors = [0,0,0];}
		ocolors= [255-colors[0],255-colors[1],255-colors[2]];
		if (pitches[pci][1]==0){alpha=.3;}
		else {alpha = 1.0;}

		draw_balls(left_x+pci*25,center_y,"rgba("+colors[0]+", "+colors[1]+", "+colors[2]+", "+alpha+")",pitches[pci][2],"rgba("+ocolors[0]+", "+ocolors[1]+", "+ocolors[2]+", 1.0)",pitches[pci][3],pitches[pci][4]);

	}
	

	
}

function pitch_initCanvas()
{
   

   if (!pitch_canvas.getContext)
   {
      return false;
   }

   pitch_context = pitch_canvas.getContext('2d');
   pitch_context.font = "bold 16px sans-serif";
   pitch_context.lineWidth = 1;

   return true;
}

function draw_lines(center_x,center_y){
	pitch_context.beginPath();
	pitch_context.moveTo(center_x-10,center_y);
    pitch_context.lineTo(center_x-10,center_y-400);
    pitch_context.moveTo(center_x+10,center_y);
    pitch_context.lineTo(center_x+10,center_y-400);
    pitch_context.stroke();
}


function write_text(age,row){
	pitch_context.textAlign = "center";
	pitch_context.fillText(age, center_x, center_y-20*row);

}
pitch_balls = [];
function draw_balls(center_x, center_y,color,swing,outlinecolor,loc_x,loc_y){
	
	pitch_context.beginPath();
	pitch_context.arc(center_x,center_y,10,0,2*Math.PI);
	pitch_context.fillStyle = color;
	pitch_context.fill();	
	pitch_context.closePath();

	if (swing==1){
	pitch_context.lineWidth = 1;
	pitch_context.strokeStyle = "white";
	pitch_context.beginPath();
	pitch_context.arc(center_x,center_y,10,0,2*Math.PI);
	pitch_context.stroke();	
	pitch_context.closePath();
	pitch_context.lineWidth = 1;
	pitch_context.strokeStyle = "black";
	pitch_context.beginPath();
	pitch_context.arc(center_x,center_y,11,0,2*Math.PI);
	pitch_context.stroke();	
	pitch_context.closePath();
	}

	pitch_context.strokeStyle = "rgba(255,255,255, 1.0)";
	pitch_context.lineWidth = 1;

	pitch_context.beginPath();
	pitch_context.arc(center_x-9,center_y+9,10,-Math.PI/2,0);
	pitch_context.stroke();

	pitch_context.beginPath();
	pitch_context.arc(center_x+9,center_y-9,10,Math.PI/2,Math.PI);
	pitch_context.stroke();

	pitch_balls.push([center_x,center_y,loc_x,loc_y,color,swing,outlinecolor,0]);


}

function draw_data(){
	data_context = data_canvas.getContext('2d');
	data_context.beginPath();
	data_context.moveTo(40,40);
	data_context.lineTo(160,40);
	data_context.lineTo(160,160);
	data_context.lineTo(40,160);
	data_context.lineTo(40,40);
	data_context.stroke();
	data_context.closePath();
}

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


   for (pbi=0;pbi<pitch_balls.length;pbi++){
   	if (Math.pow(x-pitch_balls[pbi][0],2)+Math.pow(y-pitch_balls[pbi][1],2)<144){
   		if (pitch_balls[pbi][7]==0){
   			draw_loc(pitch_balls[pbi][2]*2,pitch_balls[pbi][3]*2,pitch_balls[pbi][4],pitch_balls[pbi][5],pitch_balls[pbi][6]);
   			pitch_balls[pbi][7]=1;
   		}
   	}
   }
}

function draw_loc(center_x, center_y,color,swing,outlinecolor){
	
	data_context.beginPath();
	data_context.arc(center_x,center_y,10,0,2*Math.PI);
	data_context.fillStyle = color;
	data_context.fill();	
	data_context.closePath();

	if (swing==1){
	data_context.lineWidth = 1;
	data_context.strokeStyle = "white";
	data_context.beginPath();
	data_context.arc(center_x,center_y,10,0,2*Math.PI);
	data_context.stroke();	
	data_context.closePath();
	data_context.lineWidth = 1;
	data_context.strokeStyle = "black";
	data_context.beginPath();
	data_context.arc(center_x,center_y,11,0,2*Math.PI);
	data_context.stroke();	
	data_context.closePath();
	}

	data_context.strokeStyle = "rgba(255,255,255, 1.0)";
	data_context.lineWidth = 1;

	data_context.beginPath();
	data_context.arc(center_x-9,center_y+9,10,-Math.PI/2,0);
	data_context.stroke();

	data_context.beginPath();
	data_context.arc(center_x+9,center_y-9,10,Math.PI/2,Math.PI);
	data_context.stroke();



}