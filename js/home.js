const border = document.getElementById('border');
const submitButton = document.getElementById('submit-button');
const discordInput = document.getElementById('discord-input');

discordInput.addEventListener('input', () => {
    if (discordInput.value.trim() !== '') {
        border.style.borderColor = 'rgba(209, 213, 219, 0.4)';
        submitButton.style.opacity = '1'; // Set opacity to 1 when text is input
    } else {
        border.style.borderColor = 'rgba(209, 213, 219, 0.1)';
        submitButton.style.opacity = '0.6'; // Set opacity back to 0.6 when text is empty
    }
});

submitButton.addEventListener('click', () => {
    const discordId = discordInput.value.trim();
    if (discordId !== '') {
        // Redirect to the URL with the Discord ID
        window.location.href = `https://sye.lol/${discordId}`;
    }
});