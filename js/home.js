const border = document.getElementById('border');
const submitButton = document.getElementById('submit-button');
const discordInput = document.getElementById('discord-input');
const body = document.querySelector('body');

discordInput.addEventListener('input', () => {
    if (discordInput.value.trim() !== '') {
        border.style.borderColor = 'rgba(209, 213, 219, 0.4)';
        submitButton.style.opacity = '1'; 
    } else {
        border.style.borderColor = 'rgba(209, 213, 219, 0.1)';
        submitButton.style.opacity = '0.6'; 
    }
});

submitButton.addEventListener('click', async function() {
    const discordId = discordInput.value.trim();
    
    if (discordId !== '') {
        const servercheck = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
        const requestdata = await servercheck.json()

        if (requestdata.success === false) {
            body.classList.add('animate-fade-out');

            setTimeout(() => {
                window.location.href = 'error.html';
            }, 1000); 
            return;
        }

        // Removing query parameters from URL
        const urlWithoutParams = window.location.href.split('?')[0];

        body.classList.add('animate-fade-out');

        setTimeout(() => {
            // Redirecting without query parameters
            window.history.replaceState({}, document.title, urlWithoutParams);
            window.location.href = `profile.html?id=${discordId}`;
        }, 1000); 
    }
});
