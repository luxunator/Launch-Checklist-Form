// Display Destination and Attach Corresponding Event Listeners
function displayDestination(element) {

   // Get contents of page with destination details
   const fetchPromise = fetch("https://handlers.education.launchcode.org/static/planets.json");

   fetchPromise
      .then( function(response) {
         // Parse page contents as JSON
         const jsonPromise = response.json();

         jsonPromise
            .then( function(json) {

               // Select random mission destination
               let index = Math.floor(Math.random() * json.length);
               
               // Populate mission target
               element.innerHTML = `
                  <h2>Mission Destination</h2>
                  <ul>
                     <li>Name: ${json[index].name}</li>
                     <li>Diameter: ${json[index].diameter}</li>
                     <li>Star: ${json[index].star}</li>
                     <li>Distance from Earth: ${json[index].distance}</li>
                     <li>Number of Moons: ${json[index].moons}</li>
                  </ul>
                  <img src="${json[index].image}">
                  <br>
                  <button id="missionRefresh">Refresh Destination</button>
               `;

               // Event for refresh button
               let missionRefresh = document.getElementById("missionRefresh");

               missionRefresh.addEventListener("click", function(){
                  displayDestination(element)
               });
            });
      });
}

// Show form error and prevent submission
function formErrorAlert(event, err) {
   alert(err);
   event.preventDefault();
}

// Execute main function on load
function init() {

   // Display mission target contents
   let missionTarget = document.getElementById("missionTarget");
   displayDestination(missionTarget);

   // Handle launch form events and data
   let launchForm = document.getElementById("launchForm");

   launchForm.addEventListener("submit", function(event){
      
      // Select inputs fields and outputs
      let pilotName = document.querySelector("input[name=pilotName]").value;
      let copilotName = document.querySelector("input[name=copilotName]").value;
      let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
      let cargoMass = document.querySelector("input[name=cargoMass]").value;

      let fuelLevelNum = Number(fuelLevel);
      let cargoMassNum = Number(cargoMass);

      let itemStatus = document.getElementById("itemStatus");
      let launchStatus = document.getElementById("launchStatus");
   
      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");

      // Validate input values
      let hasEmptyValues = !(pilotName) || !(copilotName) || !(fuelLevel) || !(cargoMass);
      let hasNaNMeasurements = isNaN(fuelLevelNum) || isNaN(cargoMassNum);

      if (hasEmptyValues) {
         formErrorAlert(event, "All fields are required!");

         return;
      } else if (hasNaNMeasurements) {
         formErrorAlert(event, "Fuel Level & Cargo Mass need to be numbers!");
         
         return;
      }


      // Display shuttle launch status
      itemStatus.style.visibility = "visible";

      pilotStatus.innerHTML = `<b>Pilot <em>${pilotName}</b></em> is ready for launch`;
      copilotStatus.innerHTML = `<b>Copilot <em>${copilotName}</b></em> is ready for launch`;
      fuelStatus.innerHTML = fuelLevelNum > 10000 ? "Fuel level check passed" : "Fuel level too low";
      cargoStatus.innerHTML = cargoMassNum < 10000 ? "Cargo mass check passed" : "Cargo mass too high for launch";


      let shuttleReady = (fuelLevelNum > 10000) && (cargoMassNum < 10000);

      launchStatus.style.color = shuttleReady ? "green" : "red";
      launchStatus.innerHTML = shuttleReady ? "Shuttle is ready for launch" : "Shuttle not ready for launch";

      // Prevent default (can be removed to allow form submission)
      event.preventDefault();
   });
}

window.addEventListener("load", init);