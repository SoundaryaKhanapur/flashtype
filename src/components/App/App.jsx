import React from 'react';
import "./App.css";
import Nav from "../Nav/Nav";
import Landing from "../Landing/Landing";
import Footer from "../Footer/Footer";
import ChallengeSection from "../ChallengeSection/ChallengeSection";

const TotalTime = 60;
const ServiceUrl = "https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1&format=text";
const DefaultState = {
    selectedParagraph: "",
    timerStarted: false,
    timeRemaining: TotalTime,
    words: 0,
    characters: 0,
    wpn: 0,
    testInfo: []
};

class App extends React.Component {
    state = DefaultState;

    fetchNewParagraph = () => {
        fetch(ServiceUrl)
            .then(response => response.text())
            .then(data => {
                const selectedParagraphArray = data.split("");
                const testInfo = selectedParagraphArray.map(selectedLetter => {
                    return {
                        testLetter: selectedLetter,
                        status: "notAttempted"
                    };
                });

                this.setState({ ...DefaultState, testInfo, selectedParagraph: data })
            });
    }

    componentDidMount() {
        this.fetchNewParagraph();

    }

    startTimer = () => {
        this.setState({ timerStarted: true })
        const timer = setInterval(() => {
            if (this.state.timeRemaining > 0) {
                // change wpm
                const timeSpent = TotalTime - this.state.timeRemaining;
                const wpm = timeSpent > 0 ? (this.state.words / timeSpent) * TotalTime
                    : 0;
                this.setState({
                    timeRemaining: this.state.timeRemaining - 1,
                    wpm: parseInt(wpm)
                });
            } else {
                clearInterval(timer);
            }

        }, 1000)
    }

    startAgain = () => this.fetchNewParagraph();

    handleUserInput = (inputValue) => {
        if (!this.state.timerStarted) this.startTimer();

        // underflow case
        // overflow case
        // backspace
        // update status testInfo
        // speed can't be updated

        const characters = inputValue.length;
        const words = inputValue.split(" ").length;
        const index = characters - 1

        if (index < 0) {
            this.setState({
                testInfo: [
                    {
                        testLetter: this.state.testInfo[0].testLetter,
                        status: "notAttempted"
                    },
                    ...this.state.testInfo.slice(1)
                ],
                characters,
                words
            })
            return;
        }

        if (index >= this.state.selectedParagraph.length) {
            this.setState({ characters, words });
            return;
        }

        //make a copy of testInfo
        const testInfo = this.state.testInfo;
        if (!(index === this.state.selectedParagraph.length - 1))
            testInfo[index + 1].status = "notAttempted";

        //check for correct typed letters
        const isCorrect = inputValue[index] === testInfo[index].testLetter;

        //Update testInfo
        testInfo[index].status = isCorrect ? "correct" : "incorrect";

        //update the state
        this.setState({
            testInfo,
            words,
            characters
        })
    }

    render() {
        // fetch(ServiceUrl).then(response => response.text().then(infpormation => {
        //     console.log(infpormation)
        // }))
        return (
            <div className="app">
                {/* Nav Section */}
                <Nav />

                {/* Landing Page */}
                <Landing />

                {/* Challenge Section */}
                <ChallengeSection
                    selectedParagraph={this.state.selectedParagraph}
                    words={this.state.words}
                    characters={this.state.characters}
                    wpm={this.state.wpm}
                    timeRemaining={this.state.timeRemaining}
                    timerStarted={this.state.timerStarted}
                    testInfo={this.state.testInfo}
                    // handleUserInput={this.state.handleUserInput}
                    onInputChange={this.handleUserInput}
                    startAgain={this.startAgain}
                />

                {/* Footer */}
                <Footer />
            </div>
        )
    }
}

export default App;