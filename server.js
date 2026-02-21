const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// CONFIGURATION
// ==========================================

// PASTE YOUR DISCORD WEBHOOK URL HERE:
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1474813685192069333/gcUEx4aDSW8UVq-F3B_PCWUDdszvwOzNFFdl2Z-XF2fMzGzR82TFtUMhDBHdnTkNayPP"; 

// ==========================================
// TRACKER ENDPOINT (Logs who uses script)
// ==========================================

app.post('/track_user', async (req, res) => {
    const { roblox_id, username, displayname } = req.body;

    // 1. Create the fancy message for Discord
    const discordPayload = {
        username: "Squid Game Logger",
        embeds: [
            {
                title: "🔴 New User Executed Script",
                color: 16711680, // Red Color
                fields: [
                    { name: "Username", value: username, inline: true },
                    { name: "Display Name", value: displayname, inline: true },
                    { name: "User ID", value: String(roblox_id), inline: false }
                ],
                footer: { text: "Secure Backend System" },
                timestamp: new Date().toISOString()
            }
        ]
    };

    // 2. Send to Discord safely (Users cannot see this URL)
    try {
        await axios.post(DISCORD_WEBHOOK_URL, discordPayload);
    } catch (err) {
        console.log("Discord Error:", err.message);
    }

    res.status(200).json({ status: "logged" });
});

// ==========================================
// START SERVER
// ==========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
