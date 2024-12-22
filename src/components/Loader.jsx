import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="hacker-loader">
        <div className="loader-text">
          <span data-text="Initializing Nutriscan..." className="text-glitch">Initializing Nutriscan...</span>
        </div>
        <div className="loader-bar">
          <div className="bar-fill" />
          <div className="bar-glitch" />
        </div>
        <div className="particles">
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
        </div>
       
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;

  .hacker-loader {
    position: relative;
    width: 24em;
    height: 8em;
    background-color: #0a0a0a;
    border: 0.2em solid #00ff00;
    border-radius: 0.5em;
    padding: 1em;
    overflow: hidden;
    box-shadow: 0 0 1.5em rgba(0, 255, 0, 0.5), 0 0 0.5em rgba(0, 255, 0, 0.2);
  }

  .loader-text {
    text-align: center;
    margin-bottom: 2em;
  }

  .text-glitch {
    color: #00ff00;
    font-family: monospace;
    font-size: 1.5em;
    position: relative;
    display: inline-block;
    text-shadow: 0 0 0.2em #00ff00, 0 0 0.5em #00ff00;
  }

  .text-glitch::before,
  .text-glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0a0a0a;
    clip: rect(0, 0, 0, 0);
  }

  .text-glitch::before {
    left: -0.1em;
    text-shadow: 0.1em 0 #ff00ff;
    animation: glitch-effect 3s infinite linear alternate-reverse;
  }

  .text-glitch::after {
    left: 0.1em;
    text-shadow: -0.1em 0 #00ffff;
    animation: glitch-effect 2s infinite linear alternate-reverse;
  }

  .loader-bar {
    width: 100%;
    height: 0.5em;
    background-color: #003300;
    border-radius: 0.25em;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 0.5em #00ff00 inset;
  }

  .bar-fill {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, #00ff00, #003300);
    animation: bar-fill-animation 2s infinite ease-in-out;
  }

  .bar-glitch {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(0, 255, 0, 0.2),
      transparent
    );
    background-size: 200% 200%;
    animation: bar-glitch-animation 2s infinite linear;
  }

  .particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .particle {
    position: absolute;
    width: 0.2em;
    height: 0.2em;
    background-color: #00ff00;
    border-radius: 50%;
    opacity: 0;
    animation: particle-animation 2s infinite linear;
  }

  .particle:nth-child(1) {
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }

  .particle:nth-child(2) {
    top: 30%;
    left: 60%;
    animation-delay: 0.5s;
  }

  .particle:nth-child(3) {
    top: 70%;
    left: 30%;
    animation-delay: 1s;
  }

  .particle:nth-child(4) {
    top: 90%;
    left: 90%;
    animation-delay: 1.5s;
  }

  .particle:nth-child(5) {
    top: 50%;
    left: 50%;
    animation-delay: 2s;
  }

  @keyframes glitch-effect {
    0% {
      clip: rect(42px, 9999px, 44px, 0);
    }
    50% {
      clip: rect(20px, 9999px, 85px, 0);
    }
    100% {
      clip: rect(4px, 9999px, 91px, 0);
    }
  }

  @keyframes bar-fill-animation {
    0%,
    100% {
      width: 0;
    }
    50% {
      width: 100%;
    }
  }

  @keyframes bar-glitch-animation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @keyframes particle-animation {
    0% {
      opacity: 0;
      transform: translate(0, 0);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(2em, 2em);
    }
  }
`;

export default Loader;
