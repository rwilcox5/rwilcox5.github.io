function createBG(){
	radar_initCanvas();
	center_x = 300; center_y = 300; side_step = 50;
	
	draw_ball(center_x,center_y);

}

function radar_initCanvas()
{
   baseball_canvas = document.getElementById('baseball_canvas');

   if (!baseball_canvas.getContext)
   {
      return false;
   }

   baseball_pie = baseball_canvas.getContext('2d');
   baseball_pie.font = "bold 18px sans-serif";
   baseball_pie.lineWidth = 1;

   return true;
}

function draw_ball(center_x,center_y,){
	baseball_pie.beginPath();
	baseball_pie.arc(center_x,center_y-174,160,Math.PI/3+.135,2*Math.PI/3-.135);
	baseball_pie.stroke();

	baseball_pie.beginPath();
	baseball_pie.arc(center_x,center_y+174,160,-Math.PI*2/3+.135,-Math.PI/3-.135);
	baseball_pie.stroke();

	baseball_pie.beginPath();
	baseball_pie.arc(center_x-69,center_y,27,Math.PI/2-.45,-Math.PI/2+.45);
	baseball_pie.stroke();

	baseball_pie.beginPath();
	baseball_pie.arc(center_x+69,center_y,27,-Math.PI/2-.45,Math.PI/2+.45);
	baseball_pie.stroke();
}

function write_text(){
	baseball_pie.textAlign = "center";
	baseball_pie.fillText("Your Label Here", 300, 37);

	baseball_pie.save();
 	baseball_pie.translate(530,162);
 	baseball_pie.rotate(Math.PI/3);
 	baseball_pie.textAlign = "center";
 	baseball_pie.fillText("Your Label Here", 0, 0);
 	baseball_pie.restore();

 	baseball_pie.save();
 	baseball_pie.translate(65,430);
 	baseball_pie.rotate(Math.PI/3+Math.PI);
 	baseball_pie.textAlign = "center";
 	baseball_pie.fillText("Your Label Here", 0, 0);
 	baseball_pie.restore();

 	baseball_pie.textAlign = "center";
 	baseball_pie.fillText("Your Label Here", 300, 575);

 	baseball_pie.save();
 	baseball_pie.translate(69,162);
 	baseball_pie.rotate(-Math.PI/3);
 	baseball_pie.textAlign = "center";
 	baseball_pie.fillText("Your Label Here", 0, 0);
 	baseball_pie.restore();

 	baseball_pie.save();
 	baseball_pie.translate(532,430);
 	baseball_pie.rotate(-Math.PI/3-Math.PI);
 	baseball_pie.textAlign = "center";
 	baseball_pie.fillText("Your Label Here", 0, 0);
 	baseball_pie.restore();
}
createBG();