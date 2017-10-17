function loadModule(filename) {
  return fetch(filename)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer))
    .then(module => {
      const imports = {
        env: {
          memoryBase: 0,
          tableBase: 0,
          memory: new WebAssembly.Memory({
            initial: 1024
          }),
          table: new WebAssembly.Table({
            initial: 0,
            element: 'anyfunc'
          })
        }
      };
      
      return new WebAssembly.instantiate(module, imports);
    });
}

function runRating(){
loadModule('compute.wasm').then(instance => {
      const makeTable = instance.exports._makeTable;
      const sendTen = instance.exports._sendTen;
      compr = document.getElementById('compWeight').value;
      yardr = document.getElementById('yardsWeight').value;
      tdr = document.getElementById('tdWeight').value;
      intr = document.getElementById('intWeight').value;
      nrows = document.getElementById('nRows').value;
      minAtt = document.getElementById('minAtt').value;
      minComp = document.getElementById('compMin').value*10;
      maxComp = document.getElementById('compMax').value*10;
      minYards = document.getElementById('yardsMin').value*10;
      maxYards = document.getElementById('yardsMax').value*10;
      minInt = document.getElementById('intMin').value*10;
      maxInt = document.getElementById('intMax').value*10;
      minTd = document.getElementById('tdMin').value*10;
      maxTd = document.getElementById('tdMax').value*10;
      lengthType = document.getElementById('lengthType').value;
      makeTable(compr,yardr,tdr,intr,nrows,minAtt,minComp,maxComp,minYards,maxYards,minInt,maxInt,minTd,maxTd,lengthType);
      retdouble = sendTen(5,0);
      var table = document.getElementById("myTable");
      var ii = 0;
      for (i=0;i<10;i++){
        table.insertRow(i); 
        table.rows[i].insertCell(0); table.rows[i].cells[0].innerHTML = sendTen(7,i,lengthType);
        for (ii=0;ii<6;ii++){table.rows[i].insertCell(ii+1); table.rows[i].cells[ii+1].innerHTML = sendTen(ii,i,lengthType);}
        table.rows[i].insertCell(6); table.rows[i].cells[6].innerHTML = sendTen(6,i,lengthType)*1./10.;

      }


      runrem= 0;
      allchars = ['_','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','_','_','_','_','_','_','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
      my_string = '';
      back_string = '';
      maxi = Math.trunc(Math.log(retdouble)/Math.log(59));
      for (i=0;i<maxi+1;i++){runrem = retdouble%(59); retdouble=(retdouble-runrem)/59;  back_string +=allchars[runrem];}
      for (i=maxi;i>-1;i--){my_string += back_string[i];}


});
}

function nflDefault(){
  document.getElementById('compWeight').value=10;
  document.getElementById('yardsWeight').value=50;
  document.getElementById('tdWeight').value=40;
  document.getElementById('intWeight').value=50;
  document.getElementById('compMin').value=30;
  document.getElementById('compMax').value=77.5;
  document.getElementById('yardsMin').value=3;
  document.getElementById('yardsMax').value=12.5;
  document.getElementById('intMin').value=0;
  document.getElementById('intMax').value=9.5;
  document.getElementById('tdMin').value=0;
  document.getElementById('tdMax').value=11.875;
}

function ncaaDefault(){
  document.getElementById('compWeight').value=12;
  document.getElementById('yardsWeight').value=100;
  document.getElementById('tdWeight').value=40;
  document.getElementById('intWeight').value=25;
  document.getElementById('compMin').value=0;
  document.getElementById('compMax').value=100;
  document.getElementById('yardsMin').value=0;
  document.getElementById('yardsMax').value=100;
  document.getElementById('intMin').value=0;
  document.getElementById('intMax').value=100;
  document.getElementById('tdMin').value=0;
  document.getElementById('tdMax').value=100;
}



