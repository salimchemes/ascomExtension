document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    var env = document.getElementById('env');
    env.innerHTML = "Environment: LocalHost";
    checkPageButton.addEventListener('click', function() { 
    console.log("ASCOM chrome extension")
    }, false);
  }, false);