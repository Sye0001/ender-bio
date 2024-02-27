
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

    submitButton.addEventListener('click', async function() {
        const discordId = discordInput.value.trim();
        
        if (discordId !== '') {
            const servercheck = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
            const requestdata = await servercheck.json()

            if (requestdata.success == false) {
                return console.log('non existant')
            }
            
            window.location.href = `profile.html?id=${discordId}`;
        }
    });
