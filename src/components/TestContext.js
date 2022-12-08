import React  from 'react';
class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            number: 1,
        };
    }

    handleChange = (event) => {
        this.setState({ text: event.target.value });
    };

    increaseNumber = () => {
        console.log(this.state.number)
        this.setState({number: this.state.number + 1})
    };

    returnText = () => this.state.text

    render() {
        return (
            <div>
                <input type="text"  onChange={this.handleChange} />
                <p>{this.state.number}</p>
            </div>
        );
    }
}

class Father extends React.Component {
    constructor(props) {
        super(props);
        this.childRef = React.createRef();
    }

    showTextInChild = ()=>{
        alert('Text in Child : ' + this.childRef.current.returnText())
    }

    increaseNumberInChild = ()=>{
        this.childRef.current.increaseNumber()
    }

    render() {
        return (
            <>
                <Child ref={this.childRef} />
                <button onClick={this.showTextInChild}>Show Text in Child compoent</button>
                <p></p>
                <button onClick={this.increaseNumberInChild}>Increase number in Child compoent</button>
            </>
        );
    }
}

export default Father