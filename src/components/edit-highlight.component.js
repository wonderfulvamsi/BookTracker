import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditHighlight extends Component {
  constructor(props) {
    super(props);

    this.onChangeBookname = this.onChangeBookname.bind(this);
    this.onChangeInsight = this.onChangeInsight.bind(this);
    this.onChangeChapter = this.onChangeChapter.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      bookname: '',
      insight: '',
      chapter: 0,
      date: new Date(),
      books: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/hightlights/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          bookname: response.data.bookname,
          insight: response.data.insight,
          chapter: response.data.chapter,
          date: new Date(response.data.date)
        })
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/books/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            books: response.data.map(book => book.bookname),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeBookname(e) {
    this.setState({
      bookname: e.target.value
    })
  }

  onChangeInsight(e) {
    this.setState({
      insight: e.target.value
    })
  }

  onChangeChapter(e) {
    this.setState({
      chapter: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const highlight = {
      bookname: this.state.bookname,
      insight: this.state.insight,
      chapter: this.state.chapter,
      date: this.state.date
    }

    console.log(highlight);

    axios.post('http://localhost:5000/hightlights/update/' + this.props.match.params.id, highlight)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Highlight Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Book name: </label>
            <select ref="bookInput"
              required
              className="form-control"
              value={this.state.bookname}
              onChange={this.onChangeBookname}>
              {
                this.state.books.map(function (book) {
                  return <option
                    key={book}
                    value={book}>{book}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Insight: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.insight}
              onChange={this.onChangeInsight}
            />
          </div>
          <div className="form-group">
            <label>Chapter (number): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.chapter}
              onChange={this.onChangeChapter}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Highlight" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
