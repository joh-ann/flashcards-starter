const chai = require('chai');
const expect = chai.expect;

const { createCard } = require('../src/card');
const { createDeck } = require('../src/deck');
const { createRound } = require('../src/round');
const { takeTurn, giveFeedback, calculatePercentCorrect } = require('../src/turn');

describe('turn', function() {
  it('should increment turn', function() {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder'); 
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck, 0, 0, []);   
    
    takeTurn('sea otter', round);

    expect(round.turns).to.equal(1);
  });

  it('should store id of incorrect guess', function() {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder'); 
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck, 0, 0, []);   
    
    takeTurn('pug', round);

    expect(round.incorrectGuesses).to.deep.equal([1]);
  });
  
  it('should move to the next card after each guess', function() {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder'); 
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck, 0, 0, []);   
    
    takeTurn('pug', round);

    expect(round.turns).to.equal(1);
    expect(round.incorrectGuesses).to.deep.equal([1]);
    expect(round.currentCardIndex).to.equal(1);

    takeTurn('spleen', round);

    expect(round.currentCardIndex).to.equal(2);
    expect(round.currentCardIndex).to.equal(2);
  });

  it('should give feedback for correct guess', function() {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');  
    const deck = createDeck([card1]);
    const round = createRound(deck, 0, 0, []);   

    const correctFeedback = giveFeedback('sea otter', 'correct')
    const result = takeTurn('sea otter', round);

    expect(result).to.equal(correctFeedback);
  });

  it('should give feedback for incorrect guess', function() {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');  
    const deck = createDeck([card1]);
    const round = createRound(deck, 0, 0, []);   

    const correctFeedback = giveFeedback('pug', 'incorrect')
    const result = takeTurn('pug', round);

    expect(result).to.equal(correctFeedback);
  });

  it('should return the percentage of correct guesses', function() {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder'); 
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    
    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck, 0, 0, []);  

    takeTurn('capybara', round);
    takeTurn('spleen', round);
    takeTurn('Fitzgerald', round);

    const correctPercentage = calculatePercentCorrect(round);
    expect(correctPercentage).to.equal(33)
  });
});