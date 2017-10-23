teams = ['Header','Auburn','Penn State','Auburn','Penn State','Auburn','Penn State','Auburn','Penn State','Auburn','Penn State'];
conferences = ['Header','SEC','Big Ten','SEC','Big Ten','SEC','Big Ten','SEC','Big Ten','SEC','Big Ten','SEC'];
commits = ['Header',23,22,24,26,18,22,27,16,17,21];
rankings = ['Header',2873,2834,2701,2694,2654,2590,2545,2498,2467,2312];

function getPoll(){
	var table = document.getElementById("myTable");
      var ii = 0;
      for (i=1;i<10;i++){
        table.insertRow(i); 
        if (i%2==1){table.rows[i].style.background = "#DDDDDD";}
        else {table.rows[i].style.background = "#FFFFFF";}
        table.rows[i].insertCell(0); table.rows[i].cells[0].innerHTML = teams[i];
        table.rows[i].insertCell(1); table.rows[i].cells[1].innerHTML = conferences[i];
        table.rows[i].insertCell(2); table.rows[i].cells[2].innerHTML = commits[i];
        table.rows[i].insertCell(3); table.rows[i].cells[3].innerHTML = rankings[i];

      }
}

