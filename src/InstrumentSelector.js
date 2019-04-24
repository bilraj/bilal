import React from 'react';
import './Button.css';

export const InstrumentSelector = ({ Instruments, dispatch }) => {
  return (
    <>
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

    <button className="myButton">Add Instrument</button>
  </>
  );
};

export default InstrumentSelector;
