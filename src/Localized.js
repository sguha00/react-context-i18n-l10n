import React from "react";
import { withLocalization } from "./localizationContext";

// we gain access to localized moment and numeral as props !
const Localized = ({ data, time, moment, numeral, translate }) => {
  const localizedDate = moment(time).format("LLL");
  const localizedAmount = numeral(data.amount).format();
  const formattedFraction = numeral(data.fraction).format("0.0%");
  return (
    <React.Fragment>
      <h1>{translate('date')} : {localizedDate}</h1>
      <h1>{translate('amount')} : {localizedAmount}</h1>
      <h1>{translate('percent')} : {formattedFraction}</h1>
    </React.Fragment>
  );
};

// we wrapped our component in the HOC to get access to the context in props
export default withLocalization(Localized);
