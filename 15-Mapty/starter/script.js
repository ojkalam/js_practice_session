'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
// let map, mapEvent;
//GEO location : modern web API
//The Geolocation API was first published by the W3C (World Wide Web Consortium) on December 22, 2008
//Functionality: It provides methods to retrieve a device's current location, including latitude and longitude coordinates.

// The navigator object contains information about the visitor's browser.
// It can be written with or without the window prefix like:
// windows.navigator or just navigator
// console.log(navigator);
class Workout {
  id = Date.now();
  date = new Date();
  // clicks = 0;
  constructor(distance, duration, coords) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
    // this.id = id
    // this.date = date
  }
  _setDescription() {
    //prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
  // click() {
  //   this.clicks++;
  // }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.calcPace();
    this.type = 'running';
    this._setDescription();
  }
  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this.type = 'cycling';
    this._setDescription();
  }
  calcSpeed() {
    this.speed = this.distance / this.duration;
  }
}

class App {
  #map; //private instance property
  #mapEvent; ///private instance property
  constructor() {
    this.workouts = [];
    this._getPosition();
    //get data from local storage
    this._getLocalStorage();
    //Event handlers
    form.addEventListener('submit', this._newWorkout.bind(this)); //in here (this) keyword will indicate the form Element
    inputType.addEventListener('change', this._toggleElevationField);
    //use event delegation when nothing to attach a event listener which is a parent element
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        //on success
        //here _loadMap is treated as regular function call not method call thats why we need to Bind this in this callback function
        this._loadMap.bind(this), //a callback function receive position
        //on failed to get position
        function () {
          alert('Could not get your positions');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(latitude, longitude);
    // console.log(`https://www.google.com/maps/@${latitude},${longitude},14z`);

    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 13);

    // console.log(this.#map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(coords)
      .addTo(this.#map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();

    //handling click on map
    this.#map.on('click', this._showForm.bind(this));

    this.workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();
    //get data from form
    const type = inputType.value; //using + covert to number its shortcut
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    // if workout running create running object
    if (type == 'running') {
      const cadence = +inputCadence.value;
      // console.log('cadence', cadence);

      //check if data valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');
      // Add new object to workout array
      workout = new Running([lat, lng], distance, duration, cadence);
      this.workouts.push(workout);
    }
    // if workout cycling create cycling object
    if (type == 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration) //elevation can be negative value
      )
        return alert('Inputs have to be positive numbers!');
      // Add new object to workout array
      workout = new Cycling([lat, lng], distance, duration, elevation);
      this.workouts.push(workout);
    }
    // console.log('this.workouts', this.workouts);

    // Render workout on map as market
    this._renderWorkoutMarker(workout);

    //Render workout on list
    this._renderWorkout(workout);

    //Hide from and clear input fields
    this._hideForm();

    //set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(workout.description)
      .openPopup();
  }
  _renderWorkout(workout) {
    let html = `<li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type == 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;
    if (workout.type == 'running') {
      html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;
    } else {
      html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;
    }
    form.insertAdjacentHTML('afterend', html);
  }
  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(function () {
      form.style.display = 'grid';
    }, 1000);
  }
  _moveToPopup(e) {
    //closest() start search from element itselft and goes up to preant and grandparent until finding the match.. if no match found then its just return null
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    const workout = this.workouts.find(work => work.id == workoutEl.dataset.id);
    this.#map.setView(workout.coords, 13, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    // workout.click();
    // console.log(workout);
  }
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.workouts)); //key value store //stringify convert any object to string
  }
  _getLocalStorage() {
    let data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;
    this.workouts = data;
    //here market will not work as map is not ready yet
    this.workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }
  //resetting the storage and reload page
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
// app._getPosition(); //  we can initialize this call under constructor method that will be called when object is created
/* 
  if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    //on success
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      // console.log(latitude, longitude);
      // console.log(`https://www.google.com/maps/@${latitude},${longitude},14z`);

      const coords = [latitude, longitude];
      map = L.map('map').setView(coords, 13);

      console.log(map);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();

      //handling click on map
      map.on('click', function (mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    //on failed to get position
    function () {
      alert('Could not get your positions');
    }
  );
//Display a map using leaflet library (open source)

form.addEventListener('submit', function (e) {
  e.preventDefault();
  //clear input fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';
  console.log('mapEvent', mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
 */
