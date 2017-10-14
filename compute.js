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

loadModule('compute.wasm').then(instance => {
      const makeTable = instance.exports._makeTable;
      const sendTen = instance.exports._sendTen;
      makeTable(100,10);
      retdouble = sendTen(0);
      for (i=0;i<10;i++){console.log(sendTen(i));}
      runrem= 0;
      allchars = ['_','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','_','_','_','_','_','_','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
      my_string = '';
      back_string = '';
      maxi = Math.trunc(Math.log(retdouble)/Math.log(59));
      for (i=0;i<maxi+1;i++){runrem = retdouble%(59); retdouble=(retdouble-runrem)/59;  back_string +=allchars[runrem];}
      for (i=maxi;i>-1;i--){my_string += back_string[i];}
      console.log(my_string);

});