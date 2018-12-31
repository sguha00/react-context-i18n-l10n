import React, { Component } from 'react';
import { render } from "react-dom";
import Localized from "./Localized";
import Toggle from "./Toggle";

// import context provider
import { LocaleProvider } from "./localizationContext";

const time = 1528206960000;
const data = { amount: 19879989776, fraction: 0.225 };
// change the language value to see the localization change!

// create function that will localize your subsequent calls


class App extends Component {
  render() {
    return (
      <LocaleProvider>
        <Toggle />
        <div style={{ fontFamily: "Helvetica" }}>
          <Localized data={data} time={time} />
        </div>
      </LocaleProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
