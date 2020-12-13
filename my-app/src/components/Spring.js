import React, { Component } from "react"

import PropTypes from "prop-types"
class Spring extends Component {
  propTypes = {
    sentence: PropTypes.string.isRequired,
    javaback: PropTypes.string.isRequired,
    polarity: PropTypes.number.isRequired
  }
  render() {
    return <div>Java: {this.props.javaback} </div>
  }
}
export default Spring
