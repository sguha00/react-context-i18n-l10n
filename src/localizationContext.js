import React from "react";

const Context = React.createContext();

// create Context.Provider : the value prop is our toolbox
export const ContextProvider = props => {
  return (
    <Context.Provider
      value={{
        moment: props.moment,
        numeral: props.numeral,
        translate: props.translate,
        toggleLocale: props.toggleLocale,
      }}
    >
      {props.children}
    </Context.Provider>
  );
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
