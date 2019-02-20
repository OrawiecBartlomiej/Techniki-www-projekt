import React, { Component } from 'react';
import Form from './Form.js';
import Table from './Table.js';
import TextArea from './TextArea.js';
import File from './File.js';
import "./fontello/css/gates.css";

class App extends Component {
  state = {
    files: [],
    selected: null,
  };

   getData(){
    const add = this.handleSubmit;
    fetch("/data" , {
        method: "GET"
    })
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(function (data) {
            //let result = "";
            for(let elem of data){
                add(new File(elem.Title, elem.text));
            }
        })
        .catch(err => {
            console.log("caught it!", err);
        });
}

  addData(selected) {
    if(this.state.selected === null) return;
    this.removeData(selected);
    var data = {
        title: selected.title,
        cDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
        lChange: new Date().toISOString().slice(0, 19).replace('T', ' '),
        text: selected.text,
        textPrev: 'brak'
    };

    fetch(`/data`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function () {
                console.log("success");
            })
            .catch(function (err) {
                console.log(err);
    });
  }

  removeData(selected) {
    if(this.state.selected === null) return;
    var data = {
        title: selected.title,
    };

    fetch(`/data/delete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function () {
                console.log("success");
            })
            .catch(function (err) {
                console.log(err);
    });
  }

  toggleNightMode() {
    const elem = document.getElementById("container");
    let backgroundColor = elem.style.backgroundColor;
 
    if (backgroundColor === "white") {
          elem.style.color="white";
          elem.style.backgroundColor="black";
          document.getElementById("left").style.backgroundColor="darkslategray";
          document.getElementById("right").style.backgroundColor="darkslategray";
          
      } else {
        elem.style.color="darkslategray";
        elem.style.backgroundColor="white";
        document.getElementById("left").style.backgroundColor="#FFFBC5";
        document.getElementById("right").style.backgroundColor="#FFFBC5";
      }
  }

  componentDidMount(){
    this.getData();
  }

  removeFile = index => {
    const { files, selected } = this.state;
    let newSelected = selected;
    let deleted = files.filter((file, i) => {
      return i === index;
    });
    if(selected===null || deleted[0].title === selected.title) newSelected = null;

    this.setState({
      files: files.filter((file, i) => {
        return i !== index;
      }),
      selected: newSelected
    });
    if(newSelected === null && selected !== null) {
      alert('Plik został usunięty z Bazy danych (tylko plik aktualnie wybrany jest usuwany permanentnie)');
      this.removeData(selected);
    }
  };

  selectFile = index => {
    const { files } = this.state;
    this.setState({ selected: files[index] });
  };

  handleChange = event => {
    const { value } = event.target;
    const { files, selected } = this.state;
    const f = new File(selected.title, selected.text).changeText(value)

    files.forEach(function (file) {
      if (file.title === selected.title)
        file.text = value;
    });

    this.setState({
      files: files,
      selected: f
    })
  }

  hasElement = elem => {
    let result = false;
    this.state.files.map(e => {
      if(e.title===elem.title) result = true;
      return null;
    });
    return result;
  }

  handleSubmit = file => {
    if (file.title !== '' && !this.hasElement(file)) {
      this.setState({ files: [...this.state.files, file] });
    }
  };

  render() {
    const { files, selected } = this.state;
    return (<div id="container">
      <div id="left" >
        <nav>
          <Form handleSubmit={this.handleSubmit} />
          <div id="save" className="menuItem" ><i onClick={() => { this.addData(selected) }} className="icon-floppy" ></i></div>
          <div id="nightMode" className="menuItem"><i onClick={() => { this.toggleNightMode() }} className="icon-moon-inv"></i></div>
        </nav>
        <TextArea
          selected={selected}
          handleChange={this.handleChange}
        />
      </div>
      <div id="right">
        <Table
          fileData={files}
          removeFile={this.removeFile}
          selectFile={this.selectFile}
        />
      </div>
      <footer style={{ clear: 'both' }}>
        2019 &copy; Bartłomiej Orawiec
    </footer>
    </div>
    );
  }
}

export default App;
