import React, { Component } from 'react';
import axios from 'axios';

export default class CreateBook extends Component {
  constructor(props) {
    super(props);

    this.onChangeBookname = this.onChangeBookname.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      bookname: ''
    }
  }

  onChangeBookname(e) {
    this.setState({
      bookname: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const book = {
      bookname: this.state.bookname
    }

    console.log(book);

    axios.post('http://localhost:5000/books/add', book)
      .then(res => console.log(res.data));

    this.setState({
      bookname: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New Book</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Bookname: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.bookname}
              onChange={this.onChangeBookname}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Book" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
