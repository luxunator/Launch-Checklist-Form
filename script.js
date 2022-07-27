// Write your JavaScript code here!
function init() {
   const pilotName = document.querySelector("input[name=pilotName]");
   const copilotName = document.querySelector("input[name=copilotName]");
   const fuelLevel = document.querySelector("input[name=fuelLevel]");
   const cargoMass = document.querySelector("input[name=cargoMass]");

   const launchForm = document.getElementById("launchForm");
   let itemStatus = document.getElementById("itemStatus");
   let launchStatus = document.getElementById("launchStatus");

   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");

   launchForm.addEventListener("submit", function(event){
      

      let empty = "";

      if (pilotName.value === empty || copilotName.value ===  empty || fuelLevel.value === empty || cargoMass.value === empty) {
         alert("All fields are required!");
         event.preventDefault();
      } else if (isNaN(Number(fuelLevel.value)) || isNaN(Number(cargoMass.value))) {
         alert("Fuel Level & Cargo Mass need to be numbers!");
         event.preventDefault();
      }

      itemStatus.style.visibility = "visible";

      pilotStatus.innerHTML = `<b>Pilot <em>${pilotName.value}</b></em> is ready for launch`;
      copilotStatus.innerHTML = `<b>Copilot <em>${copilotName.value}</b></em> is ready for launch`;

      let shuttleReady = true;

      if (Number(fuelLevel.value) < 10000) {
         fuelStatus.innerHTML = "Fuel level too low";

         shuttleReady = false;
      } else {
         fuelStatus.innerHTML = "Fuel level check passed";
      }

      if (Number(cargoMass.value) > 10000) {
         cargoStatus.innerHTML = "Cargo mass too high for launch";

         shuttleReady = false;
      } else {
         cargoStatus.innerHTML = "Cargo mass check passed";
      }

      launchStatus.style.color = shuttleReady ? "green" : "red";
      launchStatus.innerHTML = shuttleReady ? "Shuttle is ready for launch" : "Shuttle not ready for launch";

      event.preventDefault();
   });
}

window.addEventListener("load", init);

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ul>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ul>
<img src="${}">
*/