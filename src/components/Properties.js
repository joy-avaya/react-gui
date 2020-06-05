import * as React from 'react';

export default class PropertiesView extends React.Component {
    constructor(props) {
        super(props)
        this.state = { message: ""}
    }
    
    handleChange = (e) => {
        this.setState( { message: e.target.value })
    }

    onSubmit = () => {
        this.props.node.options.message = this.state.message;
    }

    render() {
        return (
            <div className="properties" style={{width: "25%", backgroundColor: "lightblue", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}}>
                 <input
                    type="text"
                    value={this.state.message}
                    onChange={this.handleChange}
                    placeholder="enter your message here..."
                    style={{height: "50px", fontSize: "15px", backgroundColor: "lightblue", border: 0, outline:0, borderBottom: "1px solid black"}}
                />
                <button style={{width: "100px"}} onClick= {() => this.onSubmit()}> submit</button>
            </div>
        )
    }
}