const border = document.getElementById('border');
const submitButton = document.getElementById('submit-button');
const discordInput = document.getElementById('discord-input');

discordInput.addEventListener('input', () => {
    if (discordInput.value.trim() !== '') {

        const requestdata = await servercheck.json()

        if (requestdata.success == false) {
            document.getElementById("notification").style.display = "flex"
            return
        }

        window.location.href = `profile.html?id=${discordId}`;
