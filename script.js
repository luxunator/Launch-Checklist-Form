// Write your JavaScript code here!
function init() {
   const launchForm = document.getElementById("launchForm");

   launchForm.addEventListener("submit", function(event){
      const pilotName = launchForm.querySelector("input[name=pilotName]");
      const copilotName = launchForm.querySelector("input[name=copilotName]");
      const fuelLevel = launchForm.querySelector("input[name=fuelLevel]");
      const cargoMass = launchForm.querySelector("input[name=cargoMass]");

      let empty = "";

      if (pilotName.value === empty || copilotName.value ===  empty || fuelLevel.value === empty || cargoMass.value === empty) {
         alert("All fields are required!");
         event.preventDefault();
      } else if (isNaN(Number(fuelLevel.value)) || isNaN(Number(cargoMass.value))) {
         alert("Fuel Level & Cargo Mass need to be numbers!");
         event.preventDefault();
      }

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