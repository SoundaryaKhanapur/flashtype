import React from 'react';
import './TestContainer.css';
import TryAgain from "../TryAgain/TryAgain";
import TypingChallengeContainer from "../TypingChallengeContainer/TypingChallengeContainer";

const TestContainer = ({ selectedParagraph, words, characters, wpm, timeRemaining,
    timerStarted, testInfo, onInputChange, startAgain }) => {


    return (
        <div className="test-container">
            {
                timeRemaining > 0 ? (
                    <div data-aos="fade-up" className="typing-challenge-cont">
                        <TypingChallengeContainer onInputChange={onInputChange} selectedParagraph={selectedParagraph} timeRemaining={timeRemaining} timerStarted={timerStarted} words={words} characters={characters} wpm={wpm} testInfo={testInfo} />
                    </div>
                ) : (
                    <div className="try-again-container">
                        <TryAgain words={words} characters={characters} wpm={wpm} startAgain={startAgain} />
                    </div>
                )
            }


        </div>
    )
}

export default TestContainer;