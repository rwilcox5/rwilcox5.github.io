function createBG(){
	pop_initCanvas();
	center_x = 300; center_y = 500;
	draw_lines(center_x,center_y);
	color = "rgba(255, 0, 0, 0.5)";
	allratings1= [[4.365708202789505, 1.1892479521392618], [7.043923209987054, 2.949750379105244], [18.136620416853148, 10.246227989391985], [26.990213749138103, 25.85186159715828], [33.95792758900164, 34.34624253041496], [43.52159870323106, 47.82611706215948], [53.05986669408587, 60.435261288334665], [60.45580461369103, 62.38618187357612], [48.96875415824936, 53.14051475221408], [48.65665864250548, 45.81114673277062], [46.30142620392657, 34.406830126229906], [31.891806887875454, 31.24588869885545], [25.752718739037345, 22.297966334069613], [16.761222737005095, 15.896454067678071], [11.421728138192986, 16.234013530075682], [11.051568340450238, 8.695185536529129], [5.023770065443283, 9.39627057381646], [3.4838569199317737, 4.194392704561037], [1.3439461937653479, 4.043789252106717], [0.7124971270277134, 1.6324029386715049], [0.6979810565279976, 4.585615466109032]];
	allratings2= [[1.8467119168326778, 5.601251744501088], [6.05559224569743, 9.93911743142915], [14.277502785488789, 17.767232621858692], [24.071370779590506, 27.344630262780402], [34.61419764497283, 35.100124315192396], [44.5975917343271, 43.82242191495282], [50.11739331957489, 49.26720559681685], [52.45514127477512, 48.29056216244687], [49.112749346485145, 45.13237419843035], [46.87151570673193, 40.98465393394524], [40.972272760352126, 35.55511514746657], [34.89916783644873, 30.239081536629993], [28.166613285429, 25.012022678860724], [22.338004807813952, 20.446730870774537], [16.583046871321137, 15.895852418325484], [12.401700364302629, 11.919845111862886], [8.208678738480053, 9.762831004791051], [5.2970986940601295, 6.244170559889565], [2.864782276546983, 5.231909506300988], [1.8669487894263892, 3.5916973527932097], [1.7821095927835309, 7.166209550788364]];	
	for (age=20;age<41;age++){create_bar(center_x,center_y,allratings1[age-20],age-20,color);write_text(age,age-20);}
	color = "rgba(0, 0, 255, 0.25)";	
	for (age=20;age<41;age++){create_bar(center_x,center_y,allratings2[age-20],age-20,color);}
	

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
createBG();