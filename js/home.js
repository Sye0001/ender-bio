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

        // Add the animation class to the body
        body.classList.add('animate-fade-out');

        // Delay the redirect to allow time for the animation
        setTimeout(() => {
            // Redirect to discordId
            window.location.href = `${discordId}`;
            
            // Load specific HTML content
            window.onload = function() {
                // You can load specific HTML content here
                // For example, using fetch or XMLHttpRequest to fetch HTML content dynamically
            };
        }, 1000); // Adjust the delay time to match the animation duration
    }
});
