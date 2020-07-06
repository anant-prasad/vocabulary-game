import React, { Component } from "react";
import { Input, Button, Progress, Divider } from "antd";
import { level1 } from "../datas";

export default class Level1 extends Component {
  state = {
    value: " ",
    timeOut: "false",
    round: 0,
    timer: 10,
    randomTense: "",
    wrongAnswer: "",
    wrongAnswers: [],
  };
  componentDidMount() {
    this.startTimeOut();
    this.randomTense();

    // console.log("hello");
  }

  startTimeOut = () => {
    this.timeOut = setTimeout(() => {
      this.setState({ timeOut: true });
      console.log("timeout");
    }, 10000);

    this.interval = setInterval(() => {
      this.setState({ timer: this.state.timer - 1 });
    }, 1000);
  };

  componentDidUpdate() {
    if (this.state.timer === 0) {
      clearInterval(this.interval);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeOut);
    clearInterval(this.interval);
  }

  randomTense = async () => {
    let TenseArray = ["simple", "past"];

    let randomTense = await TenseArray[
      Math.floor(Math.random() * TenseArray.length)
    ];
    this.setState({ randomTense });
  };

  handleRestart = () => {
    this.setState({ timer: 10, timeOut: false, wrongAnswer: "" });

    this.startTimeOut();
  };

  render() {
    return (
      <div
        style={{
          padding: "1rem",
          border: "1px solid grey",
          borderRadius: "4px",
          maxWidth: 400,
          margin: "3rem auto",
        }}
      >
        <h1>Vocabulary Game</h1>
        <Progress successPercent={50} status="active" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Level 1</h2>
          <h2>1/5</h2>
        </div>

        <span style={{ marginBottom: 0, color: "grey" }}>Infinitive</span>
        <h2>Voca</h2>
        <div style={{ fontSize: "1rem" }}>
          Answer the voca's{" "}
          <span style={{ color: "red" }}>past participle</span>
        </div>
        <form style={{ padding: "1rem 0" }}>
          <div style={{ display: "flex" }}>
            <Input name="value" onChange value id="voca" type="text" />
            <Button className type="submit">
              Submit
            </Button>
          </div>
        </form>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button className={`${this.state.timer <= 8 && "disabled"}`}>
            5
          </Button>
          <Button className={`${this.state.timer <= 6 && "disabled"}`}>
            4
          </Button>
          <Button className={`${this.state.timer <= 4 && "disabled"}`}>
            3
          </Button>
          <Button className={`${this.state.timer <= 2 && "disabled"}`}>
            2
          </Button>
          <Button className={`${this.state.timer <= 0 && "disabled"}`}>
            1
          </Button>
          <Button
            onClick={this.handleRestart}
            style={{ display: this.state.timeOut ? "block" : "none" }}
          >
            Click to restart !
          </Button>
        </div>

        <Divider />

        <h3>Wrong! Correct answer</h3>
        <div>
          <li style={{ display: "block" }}>
            <p>icon answer</p>
          </li>
        </div>

        <h1>Reviews the wrong answers</h1>

        <div>
          <ul>
            <li>answer</li>
            <li>answer</li>
          </ul>
        </div>

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button>Retry</Button>
          <Button>Level2</Button>
        </div>
      </div>
    );
  }
}
