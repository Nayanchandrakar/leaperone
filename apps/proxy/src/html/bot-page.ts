import { html } from "hono/html"

export const BotPage = html`
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Automated Node | System Interface</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
    <style>
        /* --- CSS VARIABLES --- */
        :root {
            --brand-oklch: oklch(0.5825 0.1853 144.07);
            --brand-light: oklch(0.95 0.03 144.07);
            --bg-page: #ffffff;
            --bg-subtle: #f8fafc;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border-color: rgba(0, 0, 0, 0.06);
            --card-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
        }

        /* --- RESET & BASE --- */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-page);
            background-image: radial-gradient(circle at 50% -20%, var(--brand-light), transparent 50%);
            color: var(--text-main);
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            -webkit-font-smoothing: antialiased;
        }

        /* --- MAIN CARD --- */
        .system-card {
            position: relative;
            z-index: 10;
            width: 90%;
            max-width: 460px;
            background: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 32px;
            padding: 3.5rem 2.5rem;
            text-align: center;
            box-shadow: var(--card-shadow);
            animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Scanning beam effect */
        .system-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--brand-oklch), transparent);
            animation: scan 4s linear infinite;
        }

        /* --- ICONOGRAPHY --- */
        .icon-container {
            position: relative;
            width: 72px;
            height: 72px;
            margin: 0 auto 2rem auto;
            background: var(--brand-light);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .pulse-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid var(--brand-oklch);
            border-radius: 20px;
            opacity: 0;
            animation: pulse 2s cubic-bezier(0.24, 0, 0.38, 1) infinite;
        }

        .bot-icon {
            width: 32px;
            height: 32px;
            color: var(--brand-oklch);
            stroke-width: 2.5;
        }

        /* --- TYPOGRAPHY --- */
        h1 {
            font-size: 1.4rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            letter-spacing: -0.03em;
        }

        p {
            font-size: 0.95rem;
            color: var(--text-muted);
            line-height: 1.6;
            margin-bottom: 2.5rem;
        }

        /* --- PROGRESS INDICATOR --- */
        .progress-wrapper {
            width: 100%;
            height: 6px;
            background: var(--bg-subtle);
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 2.5rem;
        }

        .progress-line {
            height: 100%;
            width: 30%;
            background: var(--brand-oklch);
            border-radius: 10px;
            animation: moveLine 2.5s ease-in-out infinite;
        }

        /* --- TECH INFO --- */
        .data-footer {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            padding-top: 2rem;
            border-top: 1px solid var(--bg-subtle);
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.7rem;
            color: var(--text-muted);
            text-transform: uppercase;
        }

        .data-point {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .dot {
            width: 6px;
            height: 6px;
            background: var(--brand-oklch);
            border-radius: 50%;
            display: inline-block;
        }

        /* --- ANIMATIONS --- */
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scan {
            0% { top: 0%; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.4); opacity: 0; }
        }

        @keyframes moveLine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(350%); }
        }
    </style>
</head>
<body>

    <main class="system-card">
        
        <div class="icon-container">
            <div class="pulse-ring"></div>
            <svg class="bot-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
            </svg>
        </div>

        <h1>Automated Node Optimized</h1>
        <p>
            System recognized as an automated crawler. Handshaking with edge proxy for structured data delivery. Human interaction restricted.
        </p>

        <div class="progress-wrapper">
            <div class="progress-line"></div>
        </div>

        <div class="data-footer">
            <div class="data-point">
                <span class="dot"></span>
                <span>Type: Proxy</span>
            </div>
            <div class="data-point">
                <span>CID: 882-AX</span>
            </div>
        </div>
    </main>

</body>
</html>
`
