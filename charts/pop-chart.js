function createBG(allratings1,allratings2){
	pop_initCanvas();
	center_x = 300; center_y = 500;
	draw_lines(center_x,center_y);
	color = "rgba(255, 0, 0, 0.5)";
	for (age=20;age<41;age++){create_bar(center_x,center_y,allratings1[age-20],age-20,color);write_text(age,age-20);}
	color = "rgba(0, 0, 255, 0.25)";	
	for (age=20;age<41;age++){create_bar(center_x,center_y,allratings2[age-20],age-20,color);}
	

}

function pop_initCanvas()
{
   

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
function create_bar(center_x, center_y,ratings,row,color){
	pop_context.fillStyle = color;
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
