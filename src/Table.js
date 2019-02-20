import React, { Component } from "react";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Notatki</th>
      </tr>
    </thead>
  );
};

const TableBody = props => {
  const rows = props.fileData.map((row, index) => {
    return (
      <tr key={index}>
        <td onClick={() => props.selectFile(index)}> {row.title}</td>
        <td className="td2" >
          <button className="button2" onClick={() => props.removeFile(index)}><i className="icon-trash-empty"></i></button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
};

class Table extends Component {
  render() {
    const { fileData, removeFile, selectFile } = this.props;

    return (
      <table>
        <TableHeader />
        <TableBody
          fileData={fileData}
          removeFile={removeFile}
          selectFile = {selectFile}
        />
      </table>
    );
  }
}

export default Table;
