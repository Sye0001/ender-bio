const border = document.getElementById('border');
const submitButton = document.getElementById('submit-button');
const discordInput = document.getElementById('discord-input');
const body = document.querySelector('body');

discordInput.addEventListener('input', () => {
    if (discordInput.value.trim() !== '') {
        border.style.borderColor = 'rgba(209, 213, 219, 0.4)';
        submitButton.style.opacity = '1'; // Set opacity to 1 when text is input
    } else {
        border.style.borderColor = 'rgba(209, 213, 219, 0.1)';
        submitButton.style.opacity = '0.6'; // Set opacity back to 0.6 when text is empty
    }
});

// Function to handle submission of Discord ID
function handleSubmission() {
    // Get the Discord ID from the input field
    const discordId = document.getElementById("discord-input").value.trim();
    
    // Check if the Discord ID is not empty
    if (discordId) {
        // Redirect to the specified URL with the Discord ID
        window.location.href = `https://sye.lol/${discordId}`;
    }
}

// Add event listener to the submit button
document.getElementById("submit-button").addEventListener("click", handleSubmission);

