import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Highlight = props => (
  <tr>
    <td>{props.highlight.bookname}</td>
    <td>{props.highlight.insight}</td>
    <td>{props.highlight.chapter}</td>
    <td>{props.highlight.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.highlight._id}>edit</Link> | <a href="#" onClick={() => { props.deleteHighlight(props.highlight._id) }}>delete</a>
    </td>
  </tr>
)

export default class HighlightsList extends Component {
  constructor(props) {
    super(props);

    this.deleteHighlight = this.deleteHighlight.bind(this)

    this.state = { highlights: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/hightlights/')
      .then(response => {
        this.setState({ highlights: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteHighlight(id) {
    axios.delete('http://localhost:5000/hightlights/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      highlights: this.state.highlights.filter(el => el._id !== id)
    })
  }

  highlightList() {
    return this.state.highlights.map(currenthighlight => {
      return <Highlight highlight={currenthighlight} deleteHighlight={this.deleteHighlight} key={currenthighlight._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Hightlights So Far..</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Book name</th>
              <th>Insight</th>
              <th>Chapter</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.highlightList()}
          </tbody>
        </table>
      </div>
    )
  }
}
