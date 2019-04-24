import React from 'react';
import './Button.css';

class InstrumentSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { instrument: '' };
    console.log("PROPS" + props);
    //alert(JSON.stringify(this.state, null, 4));
  };



  render(){
    const {Instruments, dispatch} = this.props;
    //alert(JSON.stringify(Instruments, null, 4));
  return (
    <>
    
    <ul>
      {Instruments &&
        Instruments.map((instrument, i) => {
          return (
            <>
              <button
                className="newInstrument"
                onClick={() =>
                  dispatch({
                    type: 'SET_SELECTED_INSTRUMENT',
                    payload: instrument
                  })
                }
                key={i}>
                {instrument.Symbol}
              </button>
              <div>   &nbsp;
              </div>
              </>
          );
        })}
    </ul>

  </>
  );
  }
}

export default InstrumentSelector;
