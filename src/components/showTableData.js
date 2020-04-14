import React, {Component} from 'react';
import * as firebase from 'firebase';

class showTableData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      libraryData: [],
      dataKeys: []
    }

    this.deleteRef = React.createRef();

    this.removeRecord = this.removeRecord.bind(this);
  }

  retrieveDataFromDB = () => {
    var database = firebase.database();
    var ref = database.ref('libraryData');

    ref.on('value', this.getData);
  }

  getData = (data) => {
    if(data.val() === null) {
      alert("database is empty");
      return;
    }

    //document.querySelector('tbody').innerHTML = "";

    console.log('IN GET DATA ')
    var books = data.val();
    var keys = Object.keys(books);
    var retrievedData = [];

    this.setState({
      dataKeys: [...this.state.dataKeys.concat(keys)]
    });

    for(var key in keys) {
      var k = keys[key];
      var bookName = books[k].bookName;
      var authorName = books[k].authorName;
      var numPages = books[k].numPages;
      var isbnNum = books[k].isbnNum;

      retrievedData.push({
        bookName,
        authorName,
        numPages,
        isbnNum
      });

      this.setState({
        libraryData: []
      })

      this.setState({
        libraryData: [...this.state.libraryData.concat(retrievedData)]
      });
    }
    console.log("retrieved data : " + retrievedData);
  }

  componentDidMount() {
    console.log("component will mount called");

    this.retrieveDataFromDB();
  }

  generateHeader = () => {
    return (
      <React.Fragment>
        <th>book name</th>
        <th>author name</th>
        <th>pages</th>
        <th>isbn number</th>
        <th>delete record</th>
      </React.Fragment>
    )
  }

  generateTable = () => {
    console.log('INSIDE GENERATE TABLE');
    var table = [];
    var i = 0;
    var keys = this.state.dataKeys;
    
    var libData = this.state.libraryData;

    libData.map((libData) => {
      const {bookName, authorName, numPages, isbnNum} = libData;
     
      table.push(
        <tr className={isbnNum} key={isbnNum}>
          <td className="bookName">{bookName}</td>
          <td>{authorName}</td>
          <td>{numPages}</td>
          <td>{isbnNum}</td>
          <td>
            <button 
              id={keys[i]} 
              className='deleteBtn' 
              onClick={(e) => {
                  this.removeRecord(e); 
                }
              } 
              type="button">
              delete
            </button>
          </td>
        </tr>
      );
      i++;
    });
    return table;
  }

  removeRecord = (e) => {

    var database = firebase.database();
    var libRef = database.ref('libraryData');
    var currentDataFirebaseKey = e.currentTarget.id;


    // removing data from firebase database
    
    libRef.child(currentDataFirebaseKey).remove().then( () => {
      console.log("Removal Success");
    }).catch((error) => {
      console.log("Removal Failed : ", error);
    })

    document.querySelector('tbody').innerHTML = "";
  }

  render() {
    if(this.props.showData) {
      return(
        <div className="dataTable col-md-12">
          <table>
            <thead>
              <tr key="thead">
                {this.generateHeader()}
              </tr>
            </thead>
            <tbody>
              {this.generateTable()}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default showTableData;