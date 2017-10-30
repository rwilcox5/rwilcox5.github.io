teams = ['Penn State','Texas'];


function getGames(){
  console.log(_makeTable());

	var table = document.getElementById("myTable");
      var ii = 0;
      for (i=0;i<teams.length/2;i++){
        table.insertRow(i); 
        if (i%2==1){table.rows[i].style.background = "#DDDDDD";}
        else {table.rows[i].style.background = "#FFFFFF";}
        table.rows[i].insertCell(0); table.rows[i].cells[0].innerHTML = 'Kansas City Chiefs (5-2,3-1) +12</br><canvas id="radar_canvas" width="400" height="400" style="position:relative; border: 0px;"></canvas>';
        table.rows[i].insertCell(1); table.rows[i].cells[1].innerHTML = 'New England Patriots (4-3,2-2) -12</br><canvas id="radar2_canvas" width="400" height="400" style="position:relative; border: 0px;"></canvas>';
      }

      createBG('radar_canvas',400,[_sendElo(0,0),_sendElo(0,1),_sendElo(0,5),_sendElo(0,3),_sendElo(0,4),_sendElo(0,2)]);
      createBG('radar2_canvas',400,[_sendElo(1,0),_sendElo(1,1),_sendElo(1,5),_sendElo(1,3),_sendElo(1,4),_sendElo(1,2)]);
}



