import React from 'react';

export const InstrumentSelector = ({ Instruments, dispatch }) => {
  return (
    <ul>
      {Instruments &&
        Instruments.map((instrument, i) => {
          return (
            <button
              onClick={() =>
                dispatch({
                  type: 'SET_SELECTED_INSTRUMENT',
                  payload: instrument
                })
              }
              key={i}>
              {instrument.Symbol}
            </button>
          );
        })}
    </ul>
  );
};

export default InstrumentSelector;
