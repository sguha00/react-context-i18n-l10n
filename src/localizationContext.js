import React from "react";
import moment from "moment";
import numeral from "numeral";
import i18next from 'i18next';
import "numeral/locales";
import "moment/locale/es";
import "moment/locale/de";
import "moment/locale/fr";
import "moment/locale/it";

import * as en from "./i18n/en.json";
import * as es from "./i18n/es.json";

const Context = React.createContext();

// create Context.Provider : the value prop is our toolbox
export class LocaleProvider extends React.Component {
  constructor() {
    super();
    debugger;
    this.state = {
      lang: 'es',
    }
    console.log(es, en);
    i18next.init({
      lng: this.state.lang,
      resources: {
        ...en,
        ...es,
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
      <Context.Provider
        value={{
          moment: this.localizedMoment,
          numeral: this.localizedNumeral,
          translate: this.translate,
          toggleLocale: this.toggleLocale,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
};

// a higher order component to save us the hassle of calling Context.Consumer
export function withLocalization(Component) {
  return function LocalizedComponent(props) {
    return (
      <Context.Consumer>
        {context => {
          return (
            <Component
              {...props}
              moment={context.moment}
              numeral={context.numeral}
              translate={context.translate}
              toggleLocale={context.toggleLocale}
            />
          );
        }}
      </Context.Consumer>
    );
  };
}
