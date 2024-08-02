document.getElementById('question-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const question = document.getElementById('question').value;
    const encryptedQuestion = encrypt(question);
    document.getElementById('output').innerText = encryptedQuestion;
});

function encrypt(text) {
    let encrypted = "";
    for (let i = 0; i < text.length; i++) {
        encrypted += String.fromCharCode(text.charCodeAt(i) + 3);
    }
    return encrypted;
}
