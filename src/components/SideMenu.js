import React, {Component} from 'react';
import BookForm from './bookForm';
import ShowTableData from './showTableData';
import FlipMove from 'react-flip-move';
import './styleFolder/sideMenu-style.css';

class SideMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      showSavedData: false
    };

    this.changeFormState = this.changeFormState.bind(this);
    this.changeShowDataState = this.changeShowDataState.bind(this);
  }

  changeFormState = () => {
    if(this.state.showForm === false) {
      this.setState({
        showForm: true
      });
    }
    else {
      this.setState({
        showForm: false
      });
    }
    console.log('add record clicked!');
  } 

  changeShowDataState = () => {
    if(this.state.showSavedData === false) {
      this.setState({
        showSavedData: true
      });
    } else {
      this.setState({
        showSavedData: false
      });
    }
    console.log("Show Record Clicked");
  }

  render() {
    return(
      <div className="container">
        <div className="row">
          
          <div className="sideMenu col-md-12">
            <button type="button" onClick={this.changeFormState}>add record</button>
            <button type="button" onClick={this.changeShowDataState}>show record</button>
          </div>
          
          <FlipMove className="formDiv" duration={250} easing="ease-out">
            {this.state.showForm && <BookForm showForm={this.state.showForm} />}
          </FlipMove>

          {this.state.showSavedData && <ShowTableData showData={this.state.showSavedData} />}
        </div>
      </div>
    );
  }
};

export default SideMenu;