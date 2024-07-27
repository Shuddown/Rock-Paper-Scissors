const validChoices = ['Rock', 'Paper', 'Scissors'];
const losingBattles = {'Rock': 'Paper', 'Paper': 'Scissors', 'Scissors': 'Rock'};
let humanScore = 0;
let computerScore = 0;
let roundNumber = 1;
let resolveChoice;

function toTitleCase(string) {
  return string.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

function randInt(start, end) {
  const randVal = Math.random();
  const actualVal = start + (end - start) * randVal;
  return Math.floor(actualVal);
}

function getComputerChoice() {
  const choiceIndex = randInt(0, validChoices.length);
  return validChoices[choiceIndex];
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    console.log(`It's a draw! ${humanChoice} draws ${computerChoice}!`);
  } else if (losingBattles[humanChoice] === computerChoice) {
    console.log(`You lose! ${computerChoice} beats ${humanChoice}!`);
    computerScore += 1;
  } else {
    console.log(`You win! ${humanChoice} beats ${computerChoice}!`);
    humanScore += 1;
  }
  updateValues();
}

function updateValues() {
  const humanScorePara = document.getElementById('human-score');
  const computerScorePara = document.getElementById('computer-score'); 
  humanScorePara.textContent = humanScore.toString();
  computerScorePara.textContent = computerScore.toString();
}

function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
  document.getElementById('modal-text').textContent = `Round ${roundNumber}! Choose one of: ${validChoices.join(', ')}`;
  return new Promise(resolve => {
    resolveChoice = resolve;
  });
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function playGame() {
  humanScore = 0;
  computerScore = 0;
  roundNumber = 1;
  updateValues();

  const playNextRound = () => {
    if (roundNumber > 5) {
      alert(`Final Score: 
        Computer: ${computerScore}
        You: ${humanScore}
        ` + 
        (humanScore > computerScore ? 'You Won!' : 'Better Luck Next Time!')
      );
      return;
    }

    let computerChoice = getComputerChoice();
    openModal().then(humanChoice => {
      playRound(humanChoice, computerChoice);
      roundNumber++;
      playNextRound();
    });
  };

  playNextRound();
}

document.getElementById('start-button').addEventListener('click', playGame);

document.getElementById('rock-button').addEventListener('click', () => {
  resolveChoice('Rock');
  closeModal();
});

document.getElementById('paper-button').addEventListener('click', () => {
  resolveChoice('Paper');
  closeModal();
});

document.getElementById('scissors-button').addEventListener('click', () => {
  resolveChoice('Scissors');
  closeModal();
});

document.getElementById('close-button').addEventListener('click', closeModal);
