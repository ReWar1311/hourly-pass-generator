const express = require("express");
const crypto = require("crypto");
require("dotenv").config();

const app = express();

const SECRET = process.env.PASSWORD_SECRET;

// Function to generate hourly password
function generateHourlyPassword() {
    // Current UTC hour bucket
    const now = new Date();

    const hourKey = `${now.getUTCFullYear()}-${
        now.getUTCMonth() + 1
    }-${now.getUTCDate()}-${now.getUTCHours()}`;

    // Create HMAC hash
    const hash = crypto
        .createHmac("sha256", SECRET)
        .update(hourKey)
        .digest("hex");

    // Make it short + readable
    return hash.slice(0, 12);
}

// API endpoint
app.get("/password", (req, res) => {
    const password = generateHourlyPassword();

    const now = new Date();

    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1);
    nextHour.setMinutes(0);
    nextHour.setSeconds(0);
    nextHour.setMilliseconds(0);

    const validUntil = nextHour.toLocaleString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const html = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Hourly Password</title>

    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    />

    <style>
        /* REPLACE YOUR ENTIRE <style> WITH THIS */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

html,
body{
    width:100%;
    height:100%;
    overflow:hidden;
}

body{
    display:flex;
    justify-content:center;
    align-items:center;

    padding:14px;

    font-family:
        -apple-system,
        BlinkMacSystemFont,
        "SF Pro Display",
        "Segoe UI",
        sans-serif;

    background:
        linear-gradient(
            135deg,
            #74a9ff 0%,
            #c3d3ff 35%,
            #f1d6ff 70%,
            #ffc9df 100%
        );

    position:relative;
}

/* blurry gradient blobs */

body::before,
body::after{
    content:"";
    position:absolute;
    border-radius:50%;
    filter:blur(90px);
    z-index:0;
}

body::before{
    width:260px;
    height:260px;

    background:rgba(87,119,255,0.45);

    top:-80px;
    left:-80px;
}

body::after{
    width:300px;
    height:300px;

    background:rgba(255,120,200,0.35);

    bottom:-100px;
    right:-100px;
}

/* glass card */

.glass-card{

    width:100%;
    max-width:680px;

    max-height:96vh;

    padding:28px;

    border-radius:30px;

    background:rgba(255,255,255,0.16);

    border:1px solid rgba(255,255,255,0.28);

    backdrop-filter:blur(24px);
    -webkit-backdrop-filter:blur(24px);

    box-shadow:
        0 8px 32px rgba(31,38,135,0.12),
        inset 0 1px 1px rgba(255,255,255,0.35);

    position:relative;
    z-index:2;

    overflow:hidden;
}

/* top badge */

.badge{

    width:fit-content;

    margin:auto;

    padding:8px 16px;

    border-radius:999px;

    background:rgba(255,255,255,0.3);

    color:#5d6475;

    font-size:13px;
    font-weight:500;

    display:flex;
    align-items:center;
    gap:8px;
}

/* heading */

h1{

    margin-top:22px;

    text-align:center;

    font-size:clamp(2rem, 5vw, 4rem);

    line-height:1;

    letter-spacing:-2px;

    color:#101828;

    font-weight:700;
}

.subtitle{

    margin-top:14px;

    text-align:center;

    font-size:clamp(0.95rem, 2vw, 1.25rem);

    color:#5b6475;

    line-height:1.5;
}

/* password section */

.password-box{

    margin-top:28px;

    padding:20px;

    border-radius:24px;

    background:rgba(255,255,255,0.2);

    border:1px solid rgba(255,255,255,0.28);

    display:flex;
    align-items:center;
    justify-content:space-between;

    gap:12px;

    backdrop-filter:blur(18px);
}

.password-left{

    display:flex;
    align-items:center;

    gap:16px;

    min-width:0;
}

.icon-box{

    min-width:58px;
    width:58px;

    height:58px;

    border-radius:18px;

    display:flex;
    justify-content:center;
    align-items:center;

    background:rgba(255,255,255,0.25);

    color:#4f6cff;

    font-size:22px;
}

.password{

    font-size:clamp(1.5rem, 5vw, 3.2rem);

    font-weight:700;

    background:
        linear-gradient(
            90deg,
            #386cff,
            #8f4dff
        );

    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;

    letter-spacing:-1px;

    word-break:break-all;
}

.sparkle{

    color:#9f6bff;

    font-size:22px;

    flex-shrink:0;
}

/* validity section */

.valid-box{

    margin-top:18px;

    padding:18px 20px;

    border-radius:22px;

    background:rgba(255,255,255,0.18);

    border:1px solid rgba(255,255,255,0.25);

    display:flex;
    justify-content:space-between;
    align-items:center;

    gap:14px;
}

.valid-left{

    display:flex;
    align-items:center;
    gap:14px;
}

.clock{

    min-width:48px;

    width:48px;
    height:48px;

    border-radius:50%;

    background:rgba(86,255,150,0.15);

    display:flex;
    justify-content:center;
    align-items:center;

    color:#16a34a;

    font-size:20px;
}

.valid-title{

    color:#6b7280;

    font-size:14px;
}

.valid-time{

    font-size:clamp(1rem, 3vw, 1.4rem);

    color:#111827;

    margin-top:2px;

    font-weight:600;
}

.countdown{

    background:rgba(103,255,161,0.18);

    color:#16a34a;

    padding:10px 14px;

    border-radius:14px;

    font-weight:600;

    font-size:15px;

    white-space:nowrap;
}

/* buttons */

.buttons{

    margin-top:22px;

    display:flex;

    gap:14px;
}

.btn{

    flex:1;

    border:none;

    border-radius:20px;

    padding:16px;

    font-size:18px;

    cursor:pointer;

    transition:0.25s ease;

    display:flex;
    justify-content:center;
    align-items:center;
    gap:10px;
}

.btn-primary{

    background:
        linear-gradient(
            135deg,
            #3d6dff,
            #8b5dff
        );

    color:white;

    box-shadow:
        0 10px 25px rgba(80,102,255,0.25),
        inset 0 1px 1px rgba(255,255,255,0.3);
}

.btn-secondary{

    background:rgba(255,255,255,0.22);

    color:#4b5563;

    border:1px solid rgba(255,255,255,0.25);
}

.btn:hover{

    transform:translateY(-2px);
}

/* footer */

.footer{

    margin-top:24px;

    text-align:center;

    color:#6b7280;

    font-size:14px;

    display:flex;
    justify-content:center;
    align-items:center;

    gap:12px;

    flex-wrap:wrap;
}

/* MOBILE MAGIC ✨ */

@media(max-width:640px){

    body{
        padding:10px;
    }

    .glass-card{

        padding:20px;

        border-radius:24px;
    }

    .password-box{

        padding:16px;
    }

    .icon-box{

        width:50px;
        height:50px;

        min-width:50px;

        font-size:18px;

        border-radius:16px;
    }

    .valid-box{

        flex-direction:column;

        align-items:flex-start;
    }

    .countdown{

        width:100%;

        text-align:center;
    }

    .buttons{

        flex-direction:column;
    }

    .btn{

        width:100%;

        padding:15px;

        font-size:16px;
    }

    .footer{

        font-size:13px;

        gap:8px;
    }
}

/* very short screens */

@media(max-height:700px){

    .glass-card{
        padding:18px;
    }

    h1{
        margin-top:16px;
    }

    .subtitle{
        margin-top:10px;
    }

    .password-box{
        margin-top:20px;
    }

    .buttons{
        margin-top:18px;
    }

    .footer{
        margin-top:18px;
    }
}
    </style>
</head>

<body>

    <div class="glass-card">

        <div class="badge">
            <i class="fa-solid fa-lock"></i>
            Auto-updates every hour
        </div>

        <h1>Hourly Password</h1>

        <div class="subtitle">
            A secure password is generated automatically every hour.
        </div>

        <div class="password-box">

            <div class="password-left">

                <div class="icon-box">
                    <i class="fa-solid fa-shield-halved"></i>
                </div>

                <div class="password">
                    ${password}
                </div>

            </div>

            <div class="sparkle">
                ✦
            </div>

        </div>

        <div class="valid-box">

            <div class="valid-left">

                <div class="clock">
                    <i class="fa-regular fa-clock"></i>
                </div>

                <div>
                    <div class="valid-title">
                        Valid until
                    </div>

                    <div class="valid-time">
                        ${validUntil}
                    </div>
                </div>

            </div>

            <div
                class="countdown"
                id="countdown"
            >
                Loading...
            </div>

        </div>

        <div class="buttons">

            <button
                class="btn btn-primary"
                onclick="copyPassword()"
            >
                <i class="fa-regular fa-copy"></i>
                Copy Password
            </button>

            <button
                class="btn btn-secondary"
                onclick="location.reload()"
            >
                <i class="fa-solid fa-rotate"></i>
                Refresh
            </button>

        </div>

        <div class="footer">
            <span>🔒 Secure</span>
            <span>•</span>
            <span>☁️ No Storage</span>
            <span>•</span>
            <span>⚡ Fast</span>
        </div>

    </div>

    <script>

        function copyPassword(){

            navigator.clipboard.writeText("${password}");

            const btn =
                document.querySelector(".btn-primary");

            btn.innerHTML = \`
                <i class="fa-solid fa-check"></i>
                Copied!
            \`;

            setTimeout(() => {

                btn.innerHTML = \`
                    <i class="fa-regular fa-copy"></i>
                    Copy Password
                \`;

            }, 2000);
        }

        function updateCountdown(){

            const now = new Date();

            const nextHour = new Date();

            nextHour.setHours(
                now.getHours() + 1
            );

            nextHour.setMinutes(0);
            nextHour.setSeconds(0);

            const diff =
                nextHour - now;

            const mins =
                Math.floor(diff / 1000 / 60);

            const secs =
                Math.floor((diff / 1000) % 60);

            document.getElementById(
                "countdown"
            ).innerText =
                \`\${mins}m \${secs}s left\`;
        }

        updateCountdown();

        setInterval(
            updateCountdown,
            1000
        );

    </script>

</body>
</html>
`;

    res.send(html);
});

const PORT =  process.env.PORT || 4000

app.listen(PORT, () => {
    console.log("Server running on port ",PORT);
});