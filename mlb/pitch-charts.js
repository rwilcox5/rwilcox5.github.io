


function runRating(){

  document.getElementById('canvas_spot').innerHTML = '<canvas id="pitch_canvas" width="400" height="1000" style="position:relative; border: 0px;"></canvas>';
  document.getElementById('data_spot').innerHTML = '<canvas id="data_canvas" width="200" height="200" style="position:relative; border: 0px;"></canvas>';
  pitch_canvas = document.getElementById('pitch_canvas');
  data_canvas = document.getElementById('data_canvas');
  draw_data();

  pitch_canvas.addEventListener('mousemove', map_mousemove, false);
  nabs = _getData(477132);
  console.log(nabs);
  for (ri=0;ri<nabs;ri++){
    lenab = _sendAb(ri);
    allpitches = [];
    for (ii=0;ii<lenab;ii++){
      pitch = _sendAge(ri,ii);
      allpitches.push([((pitch-pitch%100)/100)%10,((pitch-pitch%10)/10)%10,pitch%10,_sendX(ri,ii),_sendY(ri,ii)]);
    }
    createBG(100,50+25*ri,allpitches);
  }
  

}

