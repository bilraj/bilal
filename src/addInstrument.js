import React from 'react';
import ReactDOM from 'react-dom';

class AddInstrument extends React.Component {
    constructor(props) {
        super(props);
        this.state = { instrument: '' }
    }

    // Called when user starts typing
    handleInstrumentChange(event) {
        console.log("Changing instrument to " + event.target.value);
          this.setState({instrument: event.target.value});
          window.stop();
    }
    
    handleForm = () => {
        // Add button here
        
        
    }

    render() {
        console.log("DSNAJDASBJSA")
        return (
                <form>
                    <button className="myButton" onClick={this.handleForm}>Add instrument</button>
                    <div>   &nbsp; </div>
                    <input type="text" value={this.state.instrument} onChange={this.handleInstrumentChange} />
                </form>
        )
    }
}

export default AddInstrument;