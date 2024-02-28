// Get DOM elements
submitButton.addEventListener('click', function() {
    console.log("Submit button clicked"); // Add this line to check if the event listener is triggered

    const discordId = discordInput.value.trim();
const discordInput = document.getElementById('discordInput');
const body = document.body;

// Add event listener to submit button
submitButton.addEventListener('click', async function() {
    const discordId = discordInput.value.trim();
    
    if (discordId !== '') {
        const servercheck = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
        const requestdata = await servercheck.json()

        if (requestdata.success === false) {
            // Add the animation class to the body
            body.classList.add('animate-fade-out');

            // Delay the redirect to allow time for the animation
            setTimeout(() => {
                window.location.href = 'error.html'; // Redirect to error page
            }, 1000); // Adjust the delay time to match the animation duration
            return;
        }

        // Extract Discord username from API response
        const username = requestdata.data.discord_user.display_name;
        console.log("Username:", username); // Log extracted username
        const usernameForLink = encodeURIComponent(username.replace(/\s+/g, '')); // Encode username for URL

        // Construct redirection link with username
        const redirectionLink = `profile.html?username=${usernameForLink}`;

        // Add the animation class to the body
        body.classList.add('animate-fade-out');

        // Delay the redirect to allow time for the animation
        setTimeout(() => {
            window.location.href = redirectionLink; // Redirect to profile page with username
        }, 1000); // Adjust the delay time to match the animation duration
    }
});
