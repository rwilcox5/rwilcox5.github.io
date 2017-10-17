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
loadModule('oly_compute.wasm').then(instance => {
      const makeTable = instance.exports._makeTable;
      const sendTen = instance.exports._sendTen;
      wAqua = document.getElementById('wAqua').value;
      wAth = document.getElementById('wAth').value;
      wTeam = document.getElementById('wTeam').value;
      wCombat = document.getElementById('wCombat').value;
      wWeapons = document.getElementById('wWeapons').value;
      wRaquet = document.getElementById('wRaquet').value;
      wRiding = document.getElementById('wRiding').value;
      wGym = document.getElementById('wGym').value;
      wMultiple = document.getElementById('wMultiple').value;
      wWater = document.getElementById('wWater').value;

});
}

function myDefault(){
  document.getElementById('wAqua').value = 15;
  document.getElementById('wAth').value = 20;
  document.getElementById('wTeam').value = 15;
  document.getElementById('wCombat').value = 10;
  document.getElementById('wWeapons').value = 5;
  document.getElementById('wRaquet').value = 5;
  document.getElementById('wRiding').value = 5;
  document.getElementById('wGym').value = 10;
  document.getElementById('wMultiple').value = 5;
  document.getElementById('wWater').value = 10;
}

function editAquatics(){
  document.getElementById('editAquatics').style.display = "block";
  document.getElementById('editAthletics').style.display = "none";
  document.getElementById('editTeam').style.display = "none";
  document.getElementById('editCombat').style.display = "none";
  document.getElementById('editWeapons').style.display = "none";
}
function editAthletics(){
  document.getElementById('editAthletics').style.display = "block";
  document.getElementById('editAquatics').style.display = "none";
  document.getElementById('editTeam').style.display = "none";
  document.getElementById('editCombat').style.display = "none";
  document.getElementById('editWeapons').style.display = "none";
}
function editTeam(){
  document.getElementById('editTeam').style.display = "block";
  document.getElementById('editAthletics').style.display = "none";
  document.getElementById('editAquatics').style.display = "none";
  document.getElementById('editCombat').style.display = "none";
  document.getElementById('editWeapons').style.display = "none";
}
function editCombat(){
  document.getElementById('editCombat').style.display = "block";
  document.getElementById('editWeapons').style.display = "none";
  document.getElementById('editTeam').style.display = "none";
  document.getElementById('editAthletics').style.display = "none";
  document.getElementById('editAquatics').style.display = "none";
}
function editWeapons(){
  document.getElementById('editWeapons').style.display = "block";
  document.getElementById('editCombat').style.display = "none";
  document.getElementById('editTeam').style.display = "none";
  document.getElementById('editAthletics').style.display = "none";
  document.getElementById('editAquatics').style.display = "none";
}


