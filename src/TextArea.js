import React, { Component } from 'react';


const WritingArea = props => {
    return(
        <div id="textArea">
                 <h2>{props.selected.title}</h2>
                     <textarea 
                     placeholder = 'Tu można notować ;)'
                     value = {props.selected.text} //value?
                     onChange={props.handleChange}
                     >
                     </textarea>
                 </div>
    );
}


class TextArea extends Component {
    render() {
        const { selected, handleChange } = this.props;
        //console.log(selected);
        if(selected === null){
            return(
                <div id="textArea">
                <h2>Wybierz plik</h2>
                <p>Lub utwórz nowy!</p>
                
            </div>
            )
        }
        else{
            return (
                <WritingArea
                    selected = {selected}
                    handleChange = {handleChange}
                />
            );
        }
        

    }
}

export default TextArea;