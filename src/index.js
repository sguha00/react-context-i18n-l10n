import React, { Component } from 'react';
import { render } from "react-dom";
import Localized from "./Localized";
import Toggle from "./Toggle";

// import localization libraries
import moment from "moment";
import numeral from "numeral";
import i18next from 'i18next';
import "numeral/locales";
import "moment/locale/es";
import "moment/locale/de";
import "moment/locale/fr";
import "moment/locale/it";

// import context provider
import { ContextProvider } from "./localizationContext";

const time = 1528206960000;
const data = { amount: 19879989776, fraction: 0.225 };
// change the language value to see the localization change!

// create function that will localize your subsequent calls


class App extends Component {

  constructor() {
    super();
    this.state = {
      lang: 'es',
    }
    i18next.init({
      lng: this.state.lang,
      resources: {
        en: {
          translation: {
            "date": "Date",
            "amount": "Amount",
            "percent": "Percent",
          }
        },
        es: {
          translation: {
            "date": "Fecha",
            "amount": "Cantidad",
            "percent": "Por Ciento",
          }
        }
    
      }
    });
  }

  localizedMoment = (...args) => {
    return moment(...args).locale(this.state.lang);
  };

  localizedNumeral = (...args) => {
    numeral.locale(this.state.lang);
    return numeral(...args);
  };

  translate = (...args) => {
    return i18next.t(args);
  };

  toggleLocale = () => {
    let lang;
    if (this.state.lang === 'en') {
      lang = 'es';
    } else {
      lang = 'en';
    }
    this.setState({lang});
    i18next.changeLanguage(lang);
  }

  render() {
    return (
      <ContextProvider 
        moment={this.localizedMoment}
        numeral={this.localizedNumeral}
        translate={this.translate}
        toggleLocale={this.toggleLocale}
      >
        <Toggle />
        <div style={{ fontFamily: "Helvetica" }}>
          <Localized data={data} time={time} />
        </div>
      </ContextProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
