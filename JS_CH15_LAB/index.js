
        const questions = [
            {question: "What is HTML?", answer: "HTML stands for Hypertext Markup Language, the language of the Internet. It is the standard text formatting language used for creating and displaying pages on the Internet."},
            {question: "What does HTML stand for?", answer: "HTML stands for Hyper Text Markup Language."},
            {question: "What is the difference between HTML and CSS?", answer: "TML creates a web page's structure and content, while CSS defines its appearance and layout."},
            {question: "What are void elements in HTML?", answer: "Void elements in HTML are tags that do not require a closing tag. They are used to insert images, line breaks, and other content that does not require additional information."},
            {question: "What are HTML Entities?", answer: "HTML Entities are special characters used to represent characters that cannot be typed on a keyboard. They are often used to display special symbols and foreign characters."},
            {question: "How do you insert a copyright symbol in HTML?", answer: "To insert a copyright symbol in HTML, you can use the HTML entity &copy or the numeric code &#169;"},
            {question: " How do you create links to different sections within the same HTML web page?", answer: "We use the <a> tag and referencing through the # symbol to create several links to different sections within the same web page."},
            {question: "How do you create a hyperlink in HTML?", answer: "We use the anchor tag <a> to create a hyperlink in HTML that links one page to another. The hyperlink can be added to images, too."},
            {question: "How do you add JavaScript to an HTML webpage?", answer: "JavaScript is used to make HTML web pages more interactive and user-friendly. It is a scripting language that allows you to interact with some aspects of the page based on user input. As with CSS, there are three significant ways of including JavaScript:"},
            {question: "What is the ‘class' attribute in HTML?", answer: "The ‘class' attribute in HTML defines a class for an HTML element. It can be used to apply a specific style to a group of elements on a web page."}
        ];

        let viewedQuestions = JSON.parse(localStorage.getItem('viewQuestions')) || [];

        function saveViewedQuestion(questionIndex) {
            if (!viewedQuestions.includes(questionIndex)) {
                viewedQuestions.push(questionIndex);
                localStorage.setItem('viewedQuestions', JSON.stringify(viewedQuestions));
                updateProgressBar();
            }
        }

        function resetProgress() {
            localStorage.removeItem('viewedQuestions');
            viewedQuestions = [];
            questions.forEach((item, index) => {
                const completed = document.getElementById(`completed-${index}`);
                if(completed){
                    completed.style.display = 'none';
                }
                const answer = document.getElementById(`answer-${index}`);
                if(answer){
                    answer.style.display = 'none';
                }
            });
            updateProgressBar();
        }

        function updateProgressBar() {
            const progressBar = document.getElementById('progressBar');
            const progress = (viewedQuestions.length / questions.length) * 100;
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);
        }

        const questionsDiv = document.getElementById('questions');

        questions.map((item, index) => {
            const row = document.createElement('div');
            row.className = 'row centered-row mb-4';

            const card = document.createElement('div');
            card.className = 'col-md-8';

            card.innerHTML = `
             <div class="card">
                <div class="card-header" data-index="${index}">
                    ${item.question}
                    <span id="completed-${index}" class="float-right"
                    style="display: none;">&#10004;</span>
                    </div>
                    <div class="card-body" id="answer-${index}" style="display: none;">
                        <p class="text-primary">${item.answer}</p>
                        </div>
                    </div>`;

                    row.appendChild(card);
                    questionsDiv.appendChild(row);
        });

        questions.forEach((item, index) => {
            const header = document.querySelector(`.card-header[data-index="${index}"]`);
            const answer = document.getElementById(`answer-${index}`);
            const completed = document.getElementById(`completed-${index}`);

            if (viewedQuestions.includes(index)) {
                completed.style.display = 'inline';
            }

            header.addEventListener('click', () => {
                questions.forEach((otherItem, otherIndex) => {
                    if (otherIndex !== index) {
                        const otherAnswer = document.getElementById(`answer-${otherIndex}`);
                        if (otherAnswer) {
                            otherAnswer.style.display = 'none';
                        }
                    }
                });

                answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
                saveViewedQuestion(index);
                completed.style.display ='inline';
            });
        });
      

        document.getElementById('resetButton').addEventListener('click', resetProgress);
        updateProgressBar();