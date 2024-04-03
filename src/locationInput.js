import React from 'react';

// The LocationInput component is a form that allows users to input a location and get the weather for that location.
// onGetWeather is a function that is called when the form is submitted. It takes the location as an argument.
function LocationInput({ onGetWeather }) {
  // The handleSubmit function is called when the form is submitted. It prevents the default form submission behavior, gets the location from the form input, and calls onGetWeather with the location.
  // It receives the event object as an argument.
  const handleSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Get the value of the location input and remove any leading or trailing whitespace
    const location = event.target.elements.location.value.trim();
    // If the location is not an empty string, call onGetWeather with the location
    if (location) {
      onGetWeather(location);
    }  
  };

  // The component returns a form element. When this form is submitted, handleSubmit will be called.
  // The form contains a single input field fo rthe location and a submit button.
  return (
    <form onSubmit={handleSubmit} className="input-container mt-5">
      <input
        type="text"
        id="location"
        name="location"
        className="form-control"
        placeholder="Enter another city"
        required
      />
      <button type="submit" className="btn btn-primary">Get Weather</button>
    </form>
  );
}

export default LocationInput;