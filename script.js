function displayMission(element) {
   const fetchPromise = fetch("https://handlers.education.launchcode.org/static/planets.json");

   fetchPromise
      .then( function(response) {
         const jsonPromise = response.json();

         jsonPromise
            .then( function(json) {

               let index = Math.floor(Math.random() * json.length);
               
               element.innerHTML +=`
                  <h2>Mission Destination</h2>
                  <ul>
                     <li>Name: ${json[index].name}</li>
                     <li>Diameter: ${json[index].diameter}</li>
                     <li>Star: ${json[index].star}</li>
                     <li>Distance from Earth: ${json[index].distance}</li>
                     <li>Number of Moons: ${json[index].moons}</li>
                  </ul>
                  <img src="${json[index].image}">
               `;
            });
      });
}

function formErrorAlert(event, err) {
   alert(err);
   event.preventDefault();
}

function init() {

   let missionTarget = document.getElementById("missionTarget");
   displayMission(missionTarget);

   let launchForm = document.getElementById("launchForm");

   launchForm.addEventListener("submit", function(event){
      
      const pilotName = document.querySelector("input[name=pilotName]");
      const copilotName = document.querySelector("input[name=copilotName]");
      const fuelLevel = document.querySelector("input[name=fuelLevel]");
      const cargoMass = document.querySelector("input[name=cargoMass]");

      
      let itemStatus = document.getElementById("itemStatus");
      let launchStatus = document.getElementById("launchStatus");
   
      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");

      let hasEmptyValues = pilotName.value === "" || copilotName.value ===  "" || fuelLevel.value === "" || cargoMass.value === "";
      let hasNaNMeasurements = isNaN(Number(fuelLevel.value)) || isNaN(Number(cargoMass.value));

      if (hasEmptyValues) {
         formErrorAlert(event, "All fields are required!");

         return;
      } else if (hasNaNMeasurements) {
         formErrorAlert(event, "Fuel Level & Cargo Mass need to be numbers!");
         
         return;
      }

      itemStatus.style.visibility = "visible";

      pilotStatus.innerHTML = `<b>Pilot <em>${pilotName.value}</b></em> is ready for launch`;
      copilotStatus.innerHTML = `<b>Copilot <em>${copilotName.value}</b></em> is ready for launch`;
      fuelStatus.innerHTML = Number(fuelLevel.value) > 10000 ? "Fuel level check passed" : "Fuel level too low";
      cargoStatus.innerHTML = Number(cargoMass.value) < 10000 ? "Cargo mass check passed" : "Cargo mass too high for launch";


      let shuttleReady = (Number(fuelLevel.value) > 10000) && (Number(cargoMass.value) < 10000);

      launchStatus.style.color = shuttleReady ? "green" : "red";
      launchStatus.innerHTML = shuttleReady ? "Shuttle is ready for launch" : "Shuttle not ready for launch";

      event.preventDefault();
   });
}

window.addEventListener("load", init);