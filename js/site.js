
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction(elementID) {
    document.getElementById(elementID).classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
  if (!e.target.matches('.dropnfl')) {
    var nflDropdown = document.getElementById("nflDropdown");
      if (nflDropdown.classList.contains('show')) {
        nflDropdown.classList.remove('show');
      }
  }
  if (!e.target.matches('.dropncaaf')) {
    var ncaafDropdown = document.getElementById("ncaafDropdown");
      if (ncaafDropdown.classList.contains('show')) {
        ncaafDropdown.classList.remove('show');
      }
  }
  if (!e.target.matches('.dropmlb')) {
    var mlbDropdown = document.getElementById("mlbDropdown");
      if (mlbDropdown.classList.contains('show')) {
        mlbDropdown.classList.remove('show');
      }
  }
  if (!e.target.matches('.dropolympic')) {
    var olympicDropdown = document.getElementById("olympicDropdown");
      if (olympicDropdown.classList.contains('show')) {
        olympicDropdown.classList.remove('show');
      }
  }
}


