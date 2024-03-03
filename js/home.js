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
            body.classList.add('animate-fade-out');

            setTimeout(() => {
                window.location.href = 'error.html'; 
            }, 1000);
            return;
        }

        // Add the animation class to the body
        body.classList.add('animate-fade-out');

        // Fetch the content of profile.html and load it into the current page
        fetch(`profile.html?id=${discordId}`)
            .then(response => response.text())
            .then(html => {
                document.body.innerHTML = html;
            })
            .catch(error => {
                console.error('Error fetching profile page:', error);
                window.location.href = 'error.html'; // Redirect to error page if profile page can't be loaded
            });
    }
});
