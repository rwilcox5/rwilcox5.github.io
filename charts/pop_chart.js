function createBG(){
	pop_initCanvas();
	center_x = 300; center_y = 500;
	colors = ['#f00','#0f0','#00f','#ff0','#0ff','#f0f'];
	draw_lines(center_x,center_y);
	allratings = [[50,50],[60,40],[30,40],[70,60],[50,60],[50,50],[60,40],[30,40],[70,60],[50,60],[50,50],[60,40],[30,40],[70,60],[50,60],[50,50],[60,40],[30,40],[70,60],[50,60],[30,20]];
	for (age=20;age<41;age++){create_bar(center_x,center_y,allratings[age-20],age-20);write_text(age,age-20);}
	

}

function pop_initCanvas()
{
   pop_canvas = document.getElementById('pop_canvas');

   if (!pop_canvas.getContext)
   {
      return false;
   }

   pop_context = pop_canvas.getContext('2d');
   pop_context.font = "bold 16px sans-serif";
   pop_context.lineWidth = 1;

   return true;
}

function draw_lines(center_x,center_y){
	pop_context.beginPath();
	pop_context.moveTo(center_x-10,center_y);
    pop_context.lineTo(center_x-10,center_y-400);
    pop_context.moveTo(center_x+10,center_y);
    pop_context.lineTo(center_x+10,center_y-400);
    pop_context.stroke();
}


function write_text(age,row){
	pop_context.textAlign = "center";
	pop_context.fillText(age, center_x, center_y-20*row);

}
function create_bar(center_x, center_y,ratings,row){
	pop_context.beginPath();
	pop_context.moveTo(center_x-10,center_y-20*row);
    	pop_context.lineTo(center_x-10,center_y-20*row-16);
	pop_context.lineTo(center_x-10-ratings[0]/100*(center_x-20),center_y-20*row-16);
	pop_context.lineTo(center_x-10-ratings[0]/100*(center_x-20),center_y-20*row);
	pop_context.closePath();
	pop_context.fill();

	pop_context.beginPath();
	pop_context.moveTo(center_x+10,center_y-20*row);
    	pop_context.lineTo(center_x+10,center_y-20*row-16);
	pop_context.lineTo(center_x+10+ratings[1]/100*(center_x-20),center_y-20*row-16);
	pop_context.lineTo(center_x+10+ratings[1]/100*(center_x-20),center_y-20*row);
	pop_context.closePath();
	pop_context.fill();


}
createBG();