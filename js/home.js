 const border = document.getElementById('border');
    const submitButton = document.getElementById('submit-button');
    const discordInput = document.getElementById('discord-input');
    const notify = document.getElementById('notify');

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
            // Here you would fetch the data and check for the error
            // For demonstration purposes, I'm simulating an error here
            const error = {
                code: "user_not_monitored"
            };
            
            if (error && error.code === "user_not_monitored") {
                notify.style.display = 'block'; // Show the notification
            } else {
                notify.style.display = 'none'; // Hide the notification
            }
        }
    });
