// Set default image source
const defaultImageUrl = 'https://i.ibb.co/g7P1k79/image-2024-02-27-172652050-removebg-preview.png';

// Function to fetch data and update UI
function fetchDataAndUpdateUI(discordId) {
    fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                window.location.href = "https://sye.lol/";
                return;
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

            // Extract Spotify data if available
            const spotifyData = data.data.spotify;
            if (spotifyData) {
                // Show the timestamp
                document.getElementById("timestamp").style.display = "block";
                
                // Display Spotify data
                document.getElementById("state").innerText = spotifyData.artist;
                document.getElementById("details").innerText = spotifyData.song;
                document.getElementById("details").style.display = "flex";
                document.getElementById("album").style.display = "flex";
                document.getElementById("album").innerText = spotifyData.album;
                document.getElementById("name").innerText = ""; // Clear the name element
            
                // Display album cover image
                document.getElementById("imgActivity").src = spotifyData.album_art_url;
            
                // Calculate and display timestamps
                const currentTime = new Date().getTime();
                const startTime = spotifyData.timestamps.start;
                const endTime = spotifyData.timestamps.end;
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
                    document.getElementById("details").style.display = "none";
                    document.getElementById("album").style.display = "none";
                    document.getElementById("state").innerText = otherActivity.details;
                    document.getElementById("name").innerText = otherActivity.name;
                    
                    // Check if 'large_text' exists and is not undefined before setting its value
                    if (otherActivity.assets && otherActivity.assets.large_text !== undefined) {
                        document.getElementById("large_text").innerText = otherActivity.assets.large_text;
                    }
                    
                    // Display the default image
                    document.getElementById("imgActivity").src = defaultImageUrl;
                } else {
                    // If no activity is found, display "User is not doing anything"
                    document.getElementById("state").innerText = "User is not doing anything";
                    document.getElementById("details").style.display = ""; // Clear the details element
                    document.getElementById("large_text").innerText = "";
                    document.getElementById("details").style.display = "none";
                    document.getElementById("album").style.display = "none";
                    document.getElementById("name").innerText = ""; // Clear the name element
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
const discordId = urlParams.get(':id');

// Call the function initially
fetchDataAndUpdateUI(discordId);

// Set interval to fetch data and update UI every 2 seconds
let intervalId = setInterval(() => fetchDataAndUpdateUI(discordId), 1000);
