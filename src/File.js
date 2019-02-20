class File{
    constructor(title="", text="") {
        this.title = title;
        this.text = text;
    }
  
    
    changeTitle = newTitle => {
        return new File(newTitle, this.text);
    }

    changeText = data => {
      return new File(this.title, data);
    };
}

export default File;