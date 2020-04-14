import React, { Component } from 'react'
import * as firebase from 'firebase';
import './styleFolder/mainContent-style.css';

class bookForm extends Component {

  constructor(props) {
    super(props);
    
    this.submitData = this.submitData.bind(this);

    this.bookName = React.createRef();
    this.authorName = React.createRef();
    this.numPages = React.createRef();
    this.isbnNum = React.createRef();
    this.delete = "delete";
  }

  submitData = (e) => {
    var database = firebase.database();
    var ref = database.ref('libraryData');

    document.querySelector('tbody').innerHTML = "";
    var data = {
      bookName: this.bookName.value,
      authorName: this.authorName.value,
      numPages: this.numPages.value,
      isbnNum: this.isbnNum.value,
      delete: this.delete
    };

    if (this.bookName.value === "" || this.authorName.value === "" || this.numPages.value === "" || this.isbnNum.value === ""){
      alert("Please fill all the fields");
    } else {
      ref.push(data);
      alert('Data Saved');
      this.clearFields();
    }
    e.preventDefault();
  }

  clearFields() {
    this.bookName.value = "";
    this.authorName.value = "";
    this.numPages.value = "";
    this.isbnNum.value = "";
  }

  render() {
    if(this.props.showForm) {
      return (
        <div className="mainContent col-md-8">
          <form>
            <label htmlFor="bookName">enter book name</label>
            <input ref={(input) => this.bookName = input} type="text" id="bookName" placeholder="book name" required></input>

            <label htmlFor="authorName">enter author name</label>
            <input ref={(input) => this.authorName = input} type="text" id="authorName" placeholder="author name" required></input>

            <label htmlFor="numPages">number of pages</label>
            <input ref={(input) => this.numPages = input} type="text" id="numPages" placeholder="page count" required></input>

            <label htmlFor="isbnNum">enter the ISBN number</label>
            <input ref={(input) => this.isbnNum = input} type="text" pattern="(97(8|9))?\d{9}(\d|X)" id="isbnNum" placeholder="isbn number" required></input>

            <button type="submit" onClick={this.submitData}>submit</button>
          </form>
        </div>
      );
    }
  }
}

export default bookForm;
