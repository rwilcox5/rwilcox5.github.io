teams = ['Header','Auburn','Penn State','Auburn','Penn State','Auburn','Penn State','Auburn','Penn State','Auburn','Penn State'];
conferences = ['Header','SEC','Big Ten','SEC','Big Ten','SEC','Big Ten','SEC','Big Ten','SEC','Big Ten','SEC'];
commits = ['Header',23,22,24,26,18,22,27,16,17,21];
rankings = ['Header',2873,2834,2701,2694,2654,2590,2545,2498,2467,2312];

top25 = [["alabama","SEC",99.1645003558,1,[25,25,25,25,25,25,25,25,25]],["penn-state","Big Ten",96.9669291047,2,[20,22,21,22,22,22,22,23,24]],["georgia","SEC",96.3021382943,3,[11,11,14,15,18,20,23,24,23]],["tcu","Big 12",94.8323100066,4,[0,3,8,11,16,18,20,22,22]],["wisconsin","Big Ten",92.4579148232,5,[17,17,16,18,17,16,18,21,21]],["ohio-state","Big Ten",91.4312797005,6,[24,24,15,16,15,15,17,20,20]],["notre-dame","Division I FBS Independents",91.399160488,9,[0,2,0,1,6,6,11,16,19]],["miami-fl","ACC",90.7295574336,8,[8,10,7,9,13,14,16,19,18]],["clemson","ACC",90.6824881745,7,[21,23,23,23,24,24,24,18,17]],["oklahoma","Big 12",89.6378485447,10,[19,21,24,24,23,23,14,17,16]],["virginia-tech","ACC",88.3686448006,13,[5,8,11,13,14,12,12,14,15]],["oklahoma-state","Big 12",88.0686529722,11,[16,15,18,20,11,10,10,15,14]],["washington","Pac-12",87.5559890514,12,[18,19,19,17,21,21,21,12,13]],["north-carolina-state","ACC",87.2624614474,14,[0,0,0,0,0,2,7,11,12]],["michigan-state","Big Ten",87.0871985152,16,[0,0,0,0,0,0,9,10,11]],["ucf","The American",86.1350429984,18,[0,0,0,0,0,5,4,8,10]],["washington-state","Pac-12",85.9292528598,15,[2,6,5,8,10,17,19,7,9]],["south-florida","The American",85.8562082184,17,[7,5,0,2,8,9,6,9,8]],["stanford","Pac-12",84.5517952502,20,[12,12,6,0,0,0,3,5,7]],["auburn","SEC",83.8965539707,19,[14,13,12,10,12,13,15,4,6]],["usc","Pac-12",82.9719987487,21,[22,20,22,21,20,11,13,13,5]],["iowa-state","Big 12",82.8245611925,25,[0,0,0,0,0,0,0,0,4]],["west-virginia","Big 12",82.7251678066,22,[4,0,0,0,1,1,0,3,3]],["memphis","The American",82.6628960559,24,[0,0,0,0,0,0,0,0,2]],["mississippi-state","SEC",82.4065425864,28,[0,0,1,12,3,0,1,0,1]]];


function getPoll(){
	var table = document.getElementById("myTable");
      var ii = 0;
      for (i=1;i<26;i++){
        table.insertRow(i); 
        if (i%2==1){table.rows[i].style.background = "#DDDDDD";}
        else {table.rows[i].style.background = "#FFFFFF";}
        table.rows[i].insertCell(0); table.rows[i].cells[0].innerHTML = top25[i-1][0];
        table.rows[i].insertCell(1); table.rows[i].cells[1].innerHTML = top25[i-1][1];
        table.rows[i].insertCell(2); table.rows[i].cells[2].innerHTML = top25[i-1][2].toFixed(1);
        table.rows[i].insertCell(3); table.rows[i].cells[3].innerHTML = top25[i-1][3];
        if (26-top25[i-1][4][top25[i-1][4].length-2]<26){table.rows[i].insertCell(4); table.rows[i].cells[4].innerHTML = 26-top25[i-1][4][top25[i-1][4].length-2];}
        else {table.rows[i].insertCell(4); table.rows[i].cells[4].innerHTML = 'NR';}
        
        table.rows[i].insertCell(5); table.rows[i].cells[5].innerHTML = '<canvas id="team'+i+'" width=100 height=20></canvas>';
        sparkline('team'+i, top25[i-1][4], true);

      }
}

