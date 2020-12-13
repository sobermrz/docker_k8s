import React, { Component } from "react"
import "./App.css"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"
import Paper from "material-ui/Paper"
import Polarity from "./components/Polarity"
import Semetic from "./components/Semetic"
import Spring from "./components/Spring"

const style = {
  marginLeft: 12
}

//get the imported string
const qs = (function (a) {
  if (a === "") return {}
  let b = {}
  for (let i = 0; i < a.length; ++i) {
    let p = a[i].split("=", 2)

    if (p.length === 1) b[p[0]] = ""
    else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "))
    console.log(b[p[0]])
  }
  return b
})(window.location.search.substr(1).split("&"))

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sentence: "",
      polarity: undefined,
      pyback: "",
      javaback: ""
    }
  }

  analyzeSentence() {
    console.log(qs["webapp"])
    fetch(qs["webapp"] + "/sentiment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sentence: this.textField.getValue() })
    })
      .then(response => response.json())
      .then(data => this.setState(data))
  }

  // analyzeSentence() {
  //   fetch("http://java:8080/sentiment", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ sentence: this.textField.getValue() })
  //   })
  //     .then(response => response.json())
  //     .then(data => this.setState(data))
  // }

  testCommsSpringboot() {
    console.log(qs["webapp"])
    fetch(qs["webapp"] + "/testHealth", { mode: "cors" })
      .then(function (response) {
        return response.text()
      })
      .then(function (text) {
        console.log("Request successful", text)
        alert(text)
      })
      .catch(function (error) {
        console.log("Request failed", error)
      })
  }

  // testCommsSpringboot() {
  //   console.log(qs["webapp"])
  //   fetch(qs["webapp"] + "/testHealth", { mode: "cors" })
  //     .then(function (response) {
  //       return response.text()
  //     })
  //     .then(function (text) {
  //       console.log("Request successful", text)
  //       alert(text)
  //     })
  //     .catch(function (error) {
  //       console.log("Request failed", error)
  //     })
  // }

  analyzeSentence() {
    console.log(qs["webapp"])
    fetch(qs["webapp"] + "/sentiment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sentence: this.textField.getValue() })
    })
      .then(response => response.json())
      .then(data => this.setState(data))
  }

  //test Point
  testingpy() {
    fetch("http://python:5000/testHealth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.text())
      .then(data => {
        console.log("======================")
        console.log(data)
        console.log(this.state)
        this.setState({
          pyback: data
        })
        console.log(this.state)
      })
  }

  //testing java
  testingJava() {
    fetch("http://java:8080/testHealth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.text())
      .then(data => {
        this.setState({
          javaback: data
        })
      })
  }

  onEnterPress = e => {
    if (e.key === "Enter") {
      this.analyzeSentence()
    }
  }
  render() {
    const polarityComponent = this.state.polarity !== undefined ? <Polarity sentence={this.state.sentence} polarity={this.state.polarity} /> : null
    const testpy = <Semetic pyback={this.state.pyback} />
    const testjava = <Spring javaback={this.state.javaback} />

    return (
      <MuiThemeProvider>
        <div className="centerize">
          <Paper zDepth={1} className="content">
            <h2>CSYE 7220 Sentiment Analyser</h2>
            <TextField ref={ref => (this.textField = ref)} onKeyUp={this.onEnterPress.bind(this)} hintText="Type your sentence." />
            <RaisedButton label="Send" style={style} onClick={this.analyzeSentence.bind(this)} />
            {polarityComponent}

            <h2>Test Python</h2>
            <RaisedButton label="Send" style={style} onClick={this.testingpy.bind(this)} />
            {testpy}

            <h2>Test Java</h2>
            <RaisedButton label="Send" style={style} onClick={this.testingJava.bind(this)} />
            {testjava}
          </Paper>
        </div>
      </MuiThemeProvider>
    )
  }
}
export default App
