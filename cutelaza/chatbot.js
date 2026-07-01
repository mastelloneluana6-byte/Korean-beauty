document.addEventListener("DOMContentLoaded", () => {
    // Chatbot Toggle Logic
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');

    if (chatbotToggle && chatbotWindow && chatbotClose) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('open');
        });
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('open');
        });
    }
});
