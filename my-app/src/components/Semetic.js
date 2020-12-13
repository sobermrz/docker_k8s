import React, { Component } from "react"
import PropTypes from "prop-types"
class Semetic extends Component {
  propTypes = {
    sentence: PropTypes.string.isRequired,
    pyback: PropTypes.string.isRequired,
    polarity: PropTypes.number.isRequired
  }
  render() {
    return <div>Python: {this.props.pyback} </div>
  }
}
export default Semetic
