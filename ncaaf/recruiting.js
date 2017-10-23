teams = ['Heading','Penn State','Texas','Ohio State','Miami (FL)','Oregon','Tennessee','Florida State','Oklahoma','UCLA','Mississippi State','Notre Dame','TCU','Texas A&M','Florida','LSU','Baylor','Minnesota','Maryland','Georgia','Oklahoma State','Virginia Tech','Washington','Michigan State','Louisville','Michigan','South Florida','USC','Navy','Clemson','Kentucky','South Carolina','Wisconsin','Houston','Auburn','Alabama','North Carolina State','West Virginia','Northwestern','California','Duke','Virginia','Texas Tech','Army','Purdue','Brigham Young','North Carolina','Vanderbilt','Cincinnati','Georgia Tech','Rutgers','Nebraska','Boston College','Indiana','Colorado','Pittsburgh','Washington State','Temple','Southern Methodist','Missouri','Arkansas','Iowa','Western Kentucky','Syracuse','Iowa State','Illinois','Arizona State','Wake Forest','East Carolina','Appalachian State','Texas-San Antonio','Northern Illinois','Mississippi','Kansas','San Diego State','Rice','Western Michigan','Arkansas State','Memphis','Connecticut','UCF','Arizona','Tulane','Boise State','Colorado State','Louisiana Tech','Kansas State','Harvard','Toledo','Oregon State','Tulsa','Texas State','Utah','Bowling Green','Florida International','Fresno State','UAB','North Texas','Nevada','Southern Miss','Princeton'];
conferences = ['Heading','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC','SEC'];
commits = ['Heading',23,18,18,19,22,23,18,19,23,25,16,19,16,17,18,18,23,20,14,18,19,12,18,19,14,25,11,59,11,18,18,19,22,13,11,18,17,15,16,15,18,19,59,22,20,11,14,19,15,19,10,20,15,17,14,17,21,19,13,11,13,19,15,16,14,13,15,19,22,17,20,8,10,12,14,17,17,16,16,13,12,15,11,14,12,9,13,13,9,11,16,5,10,8,11,8,13,12,10,6];
ratings = ['Heading',2895,2807,2767,2757,2704,2694,2649,2597,2585,2574,2552,2523,2518,2505,2465,2451,2450,2442,2430,2427,2422,2421,2414,2401,2398,2387,2385,2385,2384,2383,2380,2377,2345,2344,2330,2314,2309,2304,2293,2274,2271,2264,2264,2264,2260,2254,2245,2240,2235,2230,2220,2219,2212,2203,2193,2193,2191,2182,2179,2172,2153,2146,2133,2124,2107,2091,2090,2085,2082,2071,2033,2008,2005,2000,1970,1964,1960,1959,1954,1953,1953,1949,1946,1937,1929,1927,1911,1879,1825,1823,1806,1794,1759,1753,1747,1734,1731,1721,1717,1685];


function getPoll(nrows){
	var table = document.getElementById("myTable");
      var ii = 0;
      for (i=1;i<nrows+1;i++){
        table.insertRow(i); 
        if (i%2==1){table.rows[i].style.background = "#DDDDDD";}
        else {table.rows[i].style.background = "#FFFFFF";}
        table.rows[i].insertCell(0); table.rows[i].cells[0].innerHTML = teams[i];
        table.rows[i].insertCell(1); table.rows[i].cells[1].innerHTML = conferences[i];
        table.rows[i].insertCell(2); table.rows[i].cells[2].innerHTML = commits[i];
        table.rows[i].insertCell(3); table.rows[i].cells[3].innerHTML = ratings[i];

      }
}

