// Set default image source
const defaultImageUrl = 'https://i.ibb.co/g7P1k79/image-2024-02-27-172652050-removebg-preview.png';

// Function to fetch data and update UI
function fetchDataAndUpdateUI(discordId) {
    fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success == false) {
                window.location.href = "https://sye.lol/";
                return
            }
            // Extract Discord username, tag, and status
            const username = data.data.discord_user.display_name;
            const tag = data.data.discord_user.username;
            
            // Update Discord information
            document.getElementById("usernameLink").innerText = username;
            document.getElementById("tagLink").innerText = tag;

            // Extract avatar hash
            const avatarHash = data.data.discord_user.avatar;

            // Set profile avatar using the provided hash
            const avatarUrl = `https://cdn.discordapp.com/avatars/${data.data.discord_user.id}/${avatarHash}.png`;
            document.getElementById("profilePic").innerHTML = `<img class="w-[64px] h-[64px] object-cover rounded-full" src="${avatarUrl}" alt="Profile Picture">`;

            // Extract and display Spotify activity if available
            const spotifyActivity = data.data.activities.find(activity => activity.type === 2); // Find Spotify activity
            if (spotifyActivity) {
                // Show the timestamp
                document.getElementById("timestamp").style.display = "block";
                
                document.getElementById("state").innerText = spotifyActivity.state;
                document.getElementById("details").innerText = spotifyActivity.details;
                document.getElementById("large_text").innerText = spotifyActivity.assets.large_text;

                // Display album cover image
                const albumArtUrl = data.data.spotify ? data.data.spotify.album_art_url : "https://i.ibb.co/g7P1k79/image-2024-02-27-172652050-removebg-preview.png";
                document.getElementById("imgActivity").src = albumArtUrl;

                // Calculate and display timestamps
                const currentTime = new Date().getTime();
                const startTime = spotifyActivity.timestamps.start;
                const endTime = spotifyActivity.timestamps.end;
                const totalTime = endTime - startTime;
                const elapsedTime = currentTime - startTime;

                document.getElementById("currentTime").innerText = formatTime(elapsedTime);
                document.getElementById("totalTime").innerText = formatTime(totalTime);

                // Update trackbar width
                const trackbarWidth = (elapsedTime / totalTime) * 100;
                document.getElementById("trackbar").style.width = `${trackbarWidth}%`;
            } else {
                // If not listening to Spotify, display other activity
                const otherActivity = data.data.activities.find(activity => activity.type !== 2);
                if (otherActivity) {
                    // Hide the timestamp
                    document.getElementById("timestamp").style.display = "none";
                    
                    document.getElementById("state").innerText = otherActivity.state;
                    document.getElementById("details").innerText = otherActivity.details;
                    document.getElementById("large_text").innerText = otherActivity.assets.large_text;
    
                    // Display the default image
                    document.getElementById("imgActivity").src = defaultImageUrl;
                } else {
                    // If no activity is found, display "User is not doing anything"
                    document.getElementById("state").innerText = "User is not doing anything";
                    document.getElementById("details").innerText = "";
                    document.getElementById("large_text").innerText = "";
                    document.getElementById("imgActivity").src = defaultImageUrl;

                    // Hide the timestamp
                    document.getElementById("timestamp").style.display = "none";
                }
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Function to format time in mm:ss format
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Extract Discord ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const discordId = urlParams.get('id');

// Call the function initially
fetchDataAndUpdateUI(discordId);

// Set interval to fetch data and update UI every 2 seconds
let intervalId = setInterval(() => fetchDataAndUpdateUI(discordId), 1000);
