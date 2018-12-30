import React from "react";
import { withLocalization } from "./localizationContext";

// we gain access to localized moment and numeral as props !
const Toggle = ({ toggleLocale }) => {
  return (
    <button onClick={toggleLocale}>Change language</button>
  );
};

// we wrapped our component in the HOC to get access to the context in props
export default withLocalization(Toggle);
