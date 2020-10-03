import React from 'react';

const Forms = props => (
    // used props to return the getWeather function in the App Component
    <form onSubmit={props.getWeather}>
        <input type="text" name="city" placeholder="City..." />
        <input type="text" name="country" placeholder="Country..."/>
        <button>Get Weather</button>
    </form>
);

export default Forms;