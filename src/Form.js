import React , { Component } from 'react';
import File from './File.js';

class Form extends Component {
    constructor(props) {
      super(props);
  
      this.file = new File();
    }
  
    handleChange = event => {
      const { value } = event.target;
      this.file = this.file.changeTitle(value);
    };
    
  
    submitForm = () => {
      this.props.handleSubmit(this.file);
      this.file = new File();
      document.getElementById('titleField').value='';
    };
  
    render() {
      const { title } = this.file.title;
      return (
        <form>
          <input className="inputField" placeholder=" Tytuł notatki" style = {{float: 'left'}}
            id = "titleField"
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <input className="button1" style = {{float: 'left'}} type="button" value="dodaj" onClick={this.submitForm} />
        </form>
      );
    }
  }
  
  export default Form;