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
function formErrorAction(err,  itemStatus, launchStatus) {
   itemStatus.style.visibility = "hidden";
   launchStatus.style.color = "black";
   launchStatus.innerHTML = "Awaiting Information Before Launch";
   
   alert(err);
}

// Execute main function on load
function init() {

   // Display mission target contents
   let missionTarget = document.getElementById("missionTarget");
   displayDestination(missionTarget);

   // Handle launch form events and data
   let launchForm = document.getElementById("launchForm");

   launchForm.addEventListener("submit", function(event){
      
      // Prevent form submission
      event.preventDefault();
      
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
      let hasAlphabetical = !/[^a-zA-Z]/.test(pilotName) && !/[^a-zA-Z]/.test(copilotName);
      let hasNaNMeasurements = isNaN(fuelLevelNum) || isNaN(cargoMassNum);

      if (hasEmptyValues) {
         formErrorAction("All fields are required!", itemStatus, launchStatus);

         return;
      } else if (!hasAlphabetical) {
         formErrorAction("Pilot and Copilot names need to be alphabetical!", itemStatus, launchStatus);

         return;
      } else if (hasNaNMeasurements) {
         formErrorAction("Fuel Level & Cargo Mass need to be numbers!", itemStatus, launchStatus);
         
         return;
      }

      // Display shuttle launch status
      itemStatus.style.visibility = "visible";

      pilotStatus.innerHTML = `<b>Pilot <em>${pilotName}</b></em> is ready for launch`;
      copilotStatus.innerHTML = `<b>Copilot <em>${copilotName}</b></em> is ready for launch`;
      fuelStatus.innerHTML = fuelLevelNum >= 10000 ? "Fuel level check passed" : "Fuel level too low";
      cargoStatus.innerHTML = cargoMassNum <= 10000 ? "Cargo mass check passed" : "Cargo mass too high for launch";


      let shuttleReady = (fuelLevelNum >= 10000) && (cargoMassNum <= 10000);

      launchStatus.style.color = shuttleReady ? "green" : "red";
      launchStatus.innerHTML = shuttleReady ? "Shuttle is ready for launch" : "Shuttle not ready for launch";

      
   });
}

window.addEventListener("load", init);