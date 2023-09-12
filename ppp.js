document.addEventListener('DOMContentLoaded', function () {
    const wordList = document.querySelectorAll('#word-list li');
    const wordGrid = document.getElementById('word-grid');
    const startButton = document.getElementById('start-button');

    startButton.addEventListener('click', function () {
        wordList.forEach(function (word) {
            word.style.color = '#333';
        });
        wordGrid.innerHTML = ''; // Clear the grid
        const words = Array.from(wordList).map(li => li.textContent);

        // Shuffle the words for variety
        shuffleArray(words);

        // Generate the grid
        const gridSize = 10; // Change this to adjust grid size
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('div');
                cell.textContent = randomLetter();
                wordGrid.appendChild(cell);
            }
        }

        // Place words on the grid
        words.forEach(function (word) {
            placeWord(word);
        });
    });

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function randomLetter() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    function placeWord(word) {
        const cells = Array.from(wordGrid.children);
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';

        let row, col;
        if (direction === 'horizontal') {
            row = Math.floor(Math.random() * gridSize);
            col = Math.floor(Math.random() * (gridSize - word.length + 1));
        } else {
            row = Math.floor(Math.random() * (gridSize - word.length + 1));
            col = Math.floor(Math.random() * gridSize);
        }

        const wordCells = [];
        for (let i = 0; i < word.length; i++) {
            const index = direction === 'horizontal' ? row * gridSize + (col + i) : (row + i) * gridSize + col;
            const cell = cells[index];
            cell.textContent = word[i];
            wordCells.push(cell);
        }

        wordCells.forEach(cell => cell.style.backgroundColor = '#4CAF50');

        wordList.forEach(function (li) {
            if (li.textContent === word) {
                li.style.color = '#4CAF50';
            }
        });
    }
});
