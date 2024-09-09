const totalQuestions = 50;
let currentQuestionIndex = 0;
let attemptedQuestions = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timer;
let timeLeft = 60;

// Sample questions and correct answers
const questions = [
    { question: 'What is the capital of France?', options: ['Paris', 'London', 'Rome', 'Berlin'], correctOption: 0 },
    { question: 'What is the largest planet in our solar system?', options: ['Earth', 'Jupiter', 'Saturn', 'Mars'], correctOption: 1 },
    { question: 'Who wrote "To Kill a Mockingbird"?', options: ['Harper Lee', 'Mark Twain', 'J.K. Rowling', 'Ernest Hemingway'], correctOption: 0 },
    { question: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Pb', 'Fe'], correctOption: 0 },
    { question: 'What is the hardest natural substance on Earth?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], correctOption: 2 },
    { question: 'Which planet is known as the Red Planet?', options: ['Mars', 'Venus', 'Earth', 'Jupiter'], correctOption: 0 },
    { question: 'What is the smallest unit of life?', options: ['Atom', 'Cell', 'Molecule', 'Organ'], correctOption: 1 },
    { question: 'What gas do plants use for photosynthesis?', options: ['Oxygen', 'Hydrogen', 'Carbon Dioxide', 'Nitrogen'], correctOption: 2 },
    { question: 'Who painted the Mona Lisa?', options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'], correctOption: 1 },
    { question: 'In what year did the Titanic sink?', options: ['1912', '1905', '1898', '1923'], correctOption: 0 },
    { question: 'What is the capital of Japan?', options: ['Seoul', 'Beijing', 'Tokyo', 'Hanoi'], correctOption: 2 },
    { question: 'What is the largest ocean on Earth?', options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], correctOption: 3 },
    { question: 'What is the smallest country in the world?', options: ['Liechtenstein', 'San Marino', 'Vatican City', 'Monaco'], correctOption: 2 },
    { question: 'What is the largest continent?', options: ['Africa', 'Asia', 'Europe', 'North America'], correctOption: 1 },
    { question: 'Who is known as the Father of Computers?', options: ['Alan Turing', 'Charles Babbage', 'Ada Lovelace', 'John von Neumann'], correctOption: 1 },
    { question: 'What is the main ingredient in guacamole?', options: ['Tomato', 'Onion', 'Avocado', 'Pepper'], correctOption: 2 },
    { question: 'Which planet is closest to the Sun?', options: ['Venus', 'Mercury', 'Earth', 'Mars'], correctOption: 1 },
    { question: 'Who discovered penicillin?', options: ['Marie Curie', 'Alexander Fleming', 'Louis Pasteur', 'Joseph Lister'], correctOption: 1 },
    { question: 'What is the largest desert in the world?', options: ['Sahara', 'Arabian', 'Gobi', 'Antarctic'], correctOption: 3 },
    { question: 'Who wrote the play "Romeo and Juliet"?', options: ['William Shakespeare', 'George Bernard Shaw', 'Tennessee Williams', 'Arthur Miller'], correctOption: 0 },
    { question: 'Which element has the atomic number 1?', options: ['Helium', 'Hydrogen', 'Oxygen', 'Nitrogen'], correctOption: 1 },
    { question: 'What is the longest river in the world?', options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'], correctOption: 1 },
    { question: 'What is the largest organ in the human body?', options: ['Heart', 'Liver', 'Skin', 'Lung'], correctOption: 2 },
    { question: 'Which planet is known as the Morning Star or Evening Star?', options: ['Venus', 'Mars', 'Saturn', 'Mercury'], correctOption: 0 },
    { question: 'Who is the Greek god of the sea?', options: ['Zeus', 'Poseidon', 'Hades', 'Apollo'], correctOption: 1 },
    { question: 'What is the chemical symbol for silver?', options: ['Si', 'Au', 'Ag', 'Pb'], correctOption: 2 },
    { question: 'In what year did World War II end?', options: ['1942', '1945', '1947', '1950'], correctOption: 1 },
    { question: 'What is the main language spoken in Brazil?', options: ['Spanish', 'Portuguese', 'English', 'French'], correctOption: 1 },
    { question: 'What is the smallest planet in our solar system?', options: ['Mercury', 'Mars', 'Venus', 'Pluto'], correctOption: 0 },
    { question: 'What is the most abundant gas in Earth’s atmosphere?', options: ['Oxygen', 'Hydrogen', 'Nitrogen', 'Carbon Dioxide'], correctOption: 2 },
    { question: 'Who is the author of "1984"?', options: ['George Orwell', 'Aldous Huxley', 'Ray Bradbury', 'Philip K. Dick'], correctOption: 0 },
    { question: 'What is the capital city of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], correctOption: 2 },
    { question: 'What is the currency of Japan?', options: ['Yuan', 'Won', 'Dollar', 'Yen'], correctOption: 3 },
    { question: 'What is the chemical formula for water?', options: ['H2O', 'CO2', 'O2', 'CH4'], correctOption: 0 },
    { question: 'Who painted the Sistine Chapel ceiling?', options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Caravaggio'], correctOption: 0 },
    { question: 'Which country is known as the Land of the Rising Sun?', options: ['China', 'South Korea', 'Japan', 'Thailand'], correctOption: 2 },
    { question: 'What is the largest island in the world?', options: ['Australia', 'Greenland', 'New Guinea', 'Borneo'], correctOption: 1 },
    { question: 'Who wrote "Pride and Prejudice"?', options: ['Jane Austen', 'Charlotte Brontë', 'Emily Dickinson', 'Louisa May Alcott'], correctOption: 0 },
    { question: 'What is the hardest natural substance on Earth?', options: ['Diamond', 'Gold', 'Iron', 'Platinum'], correctOption: 0 },
    { question: 'What is the chemical symbol for potassium?', options: ['P', 'Pt', 'K', 'Pa'], correctOption: 2 },
    { question: 'What is the freezing point of water in Celsius?', options: ['0°C', '32°C', '100°C', '273°C'], correctOption: 0 },
    { question: 'Who is known as the "Queen of Pop"?', options: ['Madonna', 'Lady Gaga', 'Beyoncé', 'Britney Spears'], correctOption: 0 },
    { question: 'What is the capital of Canada?', options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'], correctOption: 2 },
    { question: 'Which planet is known for its rings?', options: ['Mars', 'Jupiter', 'Saturn', 'Uranus'], correctOption: 2 },
    { question: 'What is the main ingredient in traditional sushi?', options: ['Beef', 'Chicken', 'Fish', 'Pork'], correctOption: 2 },
    { question: 'What is the capital city of Germany?', options: ['Munich', 'Berlin', 'Frankfurt', 'Hamburg'], correctOption: 1 },
    { question: 'Which organ is responsible for pumping blood throughout the body?', options: ['Liver', 'Kidney', 'Heart', 'Lung'], correctOption: 2 },
    { question: 'What is the largest land animal?', options: ['Elephant', 'Hippopotamus', 'Rhinoceros', 'Giraffe'], correctOption: 0 },
    { question: 'Who discovered America?', options: ['Christopher Columbus', 'Ferdinand Magellan', 'Vasco da Gama', 'Marco Polo'], correctOption: 0 },
    { question: 'What is the main function of the respiratory system?', options: ['Digest food', 'Circulate blood', 'Exchange gases', 'Provide support'], correctOption: 2 },
    { question: 'Who wrote "The Great Gatsby"?', options: ['F. Scott Fitzgerald', 'Ernest Hemingway', 'William Faulkner', 'John Steinbeck'], correctOption: 0 },
    { question: 'What is the longest river in Africa?', options: ['Nile River', 'Congo River', 'Zambezi River', 'Niger River'], correctOption: 0 },
    { question: 'What is the smallest bone in the human body?', options: ['Stapes', 'Femur', 'Tibia', 'Humerus'], correctOption: 0 },
    { question: 'What is the chemical symbol for oxygen?', options: ['O', 'O2', 'Oz', 'Om'], correctOption: 0 },
    { question: 'What is the largest planet in the solar system?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctOption: 2 },
    { question: 'Which country is known for inventing pizza?', options: ['France', 'Italy', 'Greece', 'Turkey'], correctOption: 1 },
    { question: 'What is the main source of energy for the Earth?', options: ['The Moon', 'The Sun', 'Volcanoes', 'Wind'], correctOption: 1 },
    { question: 'What is the capital of Italy?', options: ['Rome', 'Milan', 'Venice', 'Florence'], correctOption: 0 },
    { question: 'Who wrote "The Catcher in the Rye"?', options: ['J.D. Salinger', 'J.K. Rowling', 'F. Scott Fitzgerald', 'Ernest Hemingway'], correctOption: 0 },
    { question: 'Which planet is known for its rings?', options: ['Mars', 'Jupiter', 'Saturn', 'Uranus'], correctOption: 2 },
    { question: 'What is the chemical symbol for sodium?', options: ['Na', 'S', 'K', 'Cl'], correctOption: 0 }
];

document.addEventListener('DOMContentLoaded', () => {
    showQuestion();
    document.getElementById('next').addEventListener('click', nextQuestion);
    document.getElementById('finish').addEventListener('click', finishQuiz);
    document.getElementById('generateResult').addEventListener('click', generateResult);
});

function showQuestion() {
    if (currentQuestionIndex >= totalQuestions) return;
    const question = questions[currentQuestionIndex];
    document.getElementById('questionNumber').innerText = `Question ${currentQuestionIndex + 1}:`;
    document.getElementById('question').innerText = question.question;
    question.options.forEach((option, index) => {
        document.getElementById(`option${index + 1}`).innerText = option;
        document.getElementById(`option${index + 1}`).onclick = () => checkAnswer(index);
    });
    document.getElementById('next').classList.add('hidden');
    document.getElementById('finish').classList.remove('hidden');
    startTimer();
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.correctOption) {
        correctAnswers++;
    } else {
        incorrectAnswers++;
    }
    attemptedQuestions++;
    document.getElementById('next').classList.remove('hidden');
    document.getElementById('finish').classList.add('hidden');
    clearInterval(timer);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

function startTimer() {
    timeLeft = 60;
    document.getElementById('time').innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function finishQuiz() {
    clearInterval(timer);
    generateResult();
}

function generateResult() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('attempted').innerText = attemptedQuestions;
    document.getElementById('correct').innerText = correctAnswers;
    document.getElementById('incorrect').innerText = incorrectAnswers;
    const score = (correctAnswers - incorrectAnswers * 0.5).toFixed(2);
    document.getElementById('score').innerText = score;
}
