function createBG(canvas_id,size_canvas,ratings){
	center_x = size_canvas/2;
	center_y = size_canvas/2;
	side_step= size_canvas/13;
	radar_initCanvas(canvas_id);
	colors = ['#f00','#00f','#0f0','#f00','#00f','#0f0'];
	fill_hex(ratings,colors,center_x,center_y,side_step,6*side_step);
	for (i=1;i<7;i++){draw_hex(center_x,center_y,side_step*i);}
	
	draw_lines(center_x,center_y,side_step,side_step*6);
	write_text(center_x,center_y);
	


}

function radar_initCanvas(canvas_id)
{
	console.log(canvas_id);
   radar_canvas = document.getElementById(canvas_id);

   if (!radar_canvas.getContext)
   {
      return false;
   }

   radar_context = radar_canvas.getContext('2d');
   radar_context.font = "bold 18px sans-serif";
   radar_context.lineWidth = 1;

   return true;
}

function draw_hex(center_x,center_y,side_length){
	radar_context.beginPath();
    radar_context.moveTo(center_x-side_length/2, center_y-side_length/2*Math.sqrt(3));
    radar_context.lineTo(center_x+side_length/2, center_y-side_length/2*Math.sqrt(3));
    radar_context.lineTo(center_x+side_length, center_y);
    radar_context.lineTo(center_x+side_length/2, center_y+side_length/2*Math.sqrt(3));
    radar_context.lineTo(center_x-side_length/2, center_y+side_length/2*Math.sqrt(3));
    radar_context.lineTo(center_x-side_length, center_y);
    radar_context.lineTo(center_x-side_length/2, center_y-side_length/2*Math.sqrt(3));
    radar_context.stroke();
}
function draw_lines(center_x,center_y,side_start,side_length){
	radar_context.beginPath();
	radar_context.moveTo(center_x-side_start/2,center_y-side_start/2*Math.sqrt(3));
    radar_context.lineTo(center_x-side_length/2, center_y-side_length/2*Math.sqrt(3));
    radar_context.moveTo(center_x+side_start/2,center_y-side_start/2*Math.sqrt(3));
    radar_context.lineTo(center_x+side_length/2, center_y-side_length/2*Math.sqrt(3));
    radar_context.moveTo(center_x+side_start,center_y);
    radar_context.lineTo(center_x+side_length, center_y);
    radar_context.moveTo(center_x+side_start/2,center_y+side_start/2*Math.sqrt(3));
    radar_context.lineTo(center_x+side_length/2, center_y+side_length/2*Math.sqrt(3));
    radar_context.moveTo(center_x-side_start/2,center_y+side_start/2*Math.sqrt(3));
    radar_context.lineTo(center_x-side_length/2, center_y+side_length/2*Math.sqrt(3));
    radar_context.moveTo(center_x-side_start,center_y);
    radar_context.lineTo(center_x-side_length, center_y);
    radar_context.stroke();
}

function fill_hex(ratings,colors,center_x,center_y,side_start,side_length){
	radar_context.fillStyle = colors[0];
	radar_context.beginPath();
	radar_context.moveTo(center_x-side_start/2,center_y-side_start/2*Math.sqrt(3));
	radar_context.lineTo(center_x-side_start/2-(side_length/2-side_start/2)*ratings[0]/100, center_y-side_start/2*Math.sqrt(3)-(side_length-side_start)/2*Math.sqrt(3)*ratings[0]/100);
    radar_context.lineTo(center_x+side_start/2+(side_length/2-side_start/2)*ratings[0]/100, center_y-side_start/2*Math.sqrt(3)-(side_length-side_start)/2*Math.sqrt(3)*ratings[0]/100);
    radar_context.lineTo(center_x+side_start/2,center_y-side_start/2*Math.sqrt(3));
    radar_context.lineTo(center_x-side_start/2,center_y-side_start/2*Math.sqrt(3));
	radar_context.closePath();
	radar_context.fill();

	radar_context.fillStyle = colors[1];
	radar_context.beginPath();
	radar_context.moveTo(center_x+side_start/2,center_y-side_start/2*Math.sqrt(3));
	radar_context.lineTo(center_x+side_start/2+(side_length/2-side_start/2)*ratings[1]/100, center_y-side_start/2*Math.sqrt(3)-(side_length-side_start)/2*Math.sqrt(3)*ratings[1]/100);
    radar_context.lineTo(center_x+side_start+(side_length-side_start)*ratings[1]/100, center_y);
    radar_context.lineTo(center_x+side_start,center_y);
    radar_context.lineTo(center_x+side_start/2,center_y-side_start/2*Math.sqrt(3));
	radar_context.closePath();
	radar_context.fill();

	radar_context.fillStyle = colors[2];
	radar_context.beginPath();
	radar_context.moveTo(center_x+side_start,center_y);
	radar_context.lineTo(center_x+side_start+(side_length-side_start)*ratings[2]/100, center_y);
    radar_context.lineTo(center_x+side_start/2+(side_length-side_start)/2*ratings[2]/100, center_y+side_start/2*Math.sqrt(3)+(side_length-side_start)/2*Math.sqrt(3)*ratings[2]/100);
    radar_context.lineTo(center_x+side_start/2,center_y+side_start/2*Math.sqrt(3));
    radar_context.lineTo(center_x+side_start,center_y);
	radar_context.closePath();
	radar_context.fill();

	radar_context.fillStyle = colors[3];
	radar_context.beginPath();
	radar_context.moveTo(center_x+side_start/2,center_y+side_start/2*Math.sqrt(3));
	radar_context.lineTo(center_x+side_start/2+(side_length-side_start)/2*ratings[3]/100, center_y+side_start/2*Math.sqrt(3)+(side_length-side_start)/2*Math.sqrt(3)*ratings[3]/100);
    radar_context.lineTo(center_x-side_start/2-(side_length-side_start)/2*ratings[3]/100, center_y+side_start/2*Math.sqrt(3)+(side_length-side_start)/2*Math.sqrt(3)*ratings[3]/100);
    radar_context.lineTo(center_x-side_start/2,center_y+side_start/2*Math.sqrt(3));
    radar_context.lineTo(center_x+side_start/2,center_y+side_start/2*Math.sqrt(3));
	radar_context.closePath();
	radar_context.fill();

	radar_context.fillStyle = colors[4];
	radar_context.beginPath();
	radar_context.moveTo(center_x-side_start/2,center_y+side_start/2*Math.sqrt(3));
	radar_context.lineTo(center_x-side_start/2-(side_length-side_start)/2*ratings[4]/100, center_y+side_start/2*Math.sqrt(3)+(side_length-side_start)/2*Math.sqrt(3)*ratings[4]/100);
    radar_context.lineTo(center_x-side_start-(side_length-side_start)*ratings[4]/100, center_y);
    radar_context.lineTo(center_x-side_start,center_y);
    radar_context.lineTo(center_x-side_start/2,center_y+side_start/2*Math.sqrt(3));
	radar_context.closePath();
	radar_context.fill();

	radar_context.fillStyle = colors[5];
	radar_context.beginPath();
	radar_context.moveTo(center_x-side_start,center_y);
	radar_context.lineTo(center_x-side_start-(side_length-side_start)*ratings[5]/100, center_y);
    radar_context.lineTo(center_x-side_start/2-(side_length-side_start)/2*ratings[5]/100, center_y-side_start/2*Math.sqrt(3)-(side_length-side_start)/2*Math.sqrt(3)*ratings[5]/100);
    radar_context.lineTo(center_x-side_start/2,center_y-side_start/2*Math.sqrt(3));
    radar_context.lineTo(center_x-side_start,center_y);
	radar_context.closePath();
	radar_context.fill();
}

function write_text(center_x,center_y){
	radar_context.fillStyle = 'black';
	radar_context.textAlign = "center";
	radar_context.fillText("Off Pass Yards", center_x, 44*center_y/300);

	radar_context.save();
 	radar_context.translate(520*center_x/300,170*center_y/300);
 	radar_context.rotate(Math.PI/3);
 	radar_context.textAlign = "center";
 	radar_context.fillText("Off Rush Yards", 0, 0);
 	radar_context.restore();

 	radar_context.save();
 	radar_context.translate(78*center_x/300,430*center_y/300);
 	radar_context.rotate(Math.PI/3+Math.PI);
 	radar_context.textAlign = "center";
 	radar_context.fillText("Def Rush Yards", 0, 0);
 	radar_context.restore();

 	radar_context.textAlign = "center";
 	radar_context.fillText("Def Pass Yards", center_x, 555*center_y/300+10);

 	radar_context.save();
 	radar_context.translate(78*center_x/300,170*center_y/300);
 	radar_context.rotate(-Math.PI/3);
 	radar_context.textAlign = "center";
 	radar_context.fillText("Off Points", 0, 0);
 	radar_context.restore();

 	radar_context.save();
 	radar_context.translate(520*center_x/300,432*center_y/300);
 	radar_context.rotate(-Math.PI/3-Math.PI);
 	radar_context.textAlign = "center";
 	radar_context.fillText("Def Points", 0, 0);
 	radar_context.restore();
}
