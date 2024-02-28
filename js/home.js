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

submitButton.addEventListener('click', async function() {
    const discordId = discordInput.value.trim();
    
    if (discordId !== '') {
        const servercheck = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
        const requestdata = await servercheck.json()

        if (requestdata.success === false) {
            // Add the animation class to the body
            body.classList.add('animate-fade-out');
            // Redirect to error page after animation
            setTimeout(() => {
                window.location.href = 'error.html'; // Redirect to error page
            }, 1000); // Adjust the delay time to match the animation duration
            return;
        }

        const username = requestdata.data.discord_user.username; // Extract the username
        console.log("Extracted username:", username); // Log the extracted username
        const profileUrl = `profile.html?username=${username}`; // Construct the URL
        console.log("Constructed URL:", profileUrl); // Log the constructed URL

        // Add the animation class to the body
        body.classList.add('animate-fade-out');
        // Redirect to profile page after animation
        setTimeout(() => {
            window.location.href = profileUrl; // Redirect to the profile page using the constructed URL
        }, 1000); // Adjust the delay time to match the animation duration
    }
});

