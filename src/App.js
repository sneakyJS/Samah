import React from "react";
import "./App.css";
import cheerio from "cheerio";
import request from "request";

export default class App extends React.Component {
  state = {
    phrase: "",
    pageNum: 1
  };
  handleOnMore = () => {
    let insults = [
      "اولاد الشرموطة",
      "اولاد القحبة",
      "المنايك",
      "العرصات",
      "الخولات",
      "لعيبة التنس",
      "كلاب ايران",
      "اولاد النايمة على بطنها",
      "سماح الشرموطة"
    ];
    let nums = [];
    for (let i = 1; i < 200; i++) {
      nums.push(i);
    }
    let randomNum = nums[Math.floor(Math.random() * nums.length)];
    let randomInsult = insults[Math.floor(Math.random() * insults.length)];
    this.setState(prevState => ({ pageNum: randomNum }));
    request(
      `https://arabic.rt.com/listing/tag.hamas/noprepare/tag/1/${
        this.state.pageNum
      }`,
      (err, res, html) => {
        if (!err && res.statusCode === 200) {
          const $ = cheerio.load(html);
          $(".heading").each((i, el) => {
            const text = $(el).text();

            if (text.includes("حماس")) {
              this.setState(() => ({
                phrase: text.replace("حماس", randomInsult)
              }));
            } else {
              this.setState(prevState => ({ phrase: "عص عجوجل كمان مرة" }));
            }
          });
        }
      }
    );
    console.log(this.state.pageNum);
  };
  componentDidMount() {
    let insults = [
      "اولاد الشرموطة",
      "اولاد القحبة",
      "المنايك",
      "العرصات",
      "الخولات",
      "لعيبة التنس",
      "كلاب ايران"
    ];
    let randomInsult = insults[Math.floor(Math.random() * insults.length)];
    let num = 1;
    request(
      `https://arabic.rt.com/listing/tag.hamas/noprepare/tag/1/${num}`,
      (err, res, html) => {
        if (!err && res.statusCode === 200) {
          const $ = cheerio.load(html);
          $(".heading").each((i, el) => {
            const text = $(el).text();
            if (text.includes("حماس")) {
              this.setState(() => ({
                phrase: text.replace("حماس", randomInsult)
              }));
            } else {
              this.setState(prevState => ({ phrase: "عص عجوجل كمان مرة" }));
            }
          });
        }
      }
    );
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.phrase}</p>
          <button id="more" onClick={this.handleOnMore}>
            عص عجوجل
          </button>
        </header>
      </div>
    );
  }
}
