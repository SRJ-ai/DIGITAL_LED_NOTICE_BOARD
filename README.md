# DIGITAL_LED_NOTICE_BOARD (Matrix Commander)

Matrix Commander is a premium web-based control panel optimized for communicating with ESP8266-driven digital LED display boards over MQTT protocol. Built in an Industry-Academia collaboration with real-world applications in mind, it provides a slick, animated UI to monitor and push customized or AI-generated messages globally.

## Features

- **Premium UI Redesign**: A dark-themed, glassmorphic UI featuring neon accents, animated gradients, and micro-interactions optimized for all screens — from ultra-wide desktop monitors to mobile phones.
- **MQTT Connectivity**: Provides secure WebSocket (WSS) and unencrypted WS support for connecting to any public or private MQTT broker (like broker.hivemq.com).
- **Control Center Console**: Offers a unified interface for defining Topics, dispatching quick static presets, and delivering arbitrary string payloads to your display directly.
- **AI Integration**: Plug in your Google Gemini API Key locally to generate witty, professional, or complex messages intelligently crafted specifically for scrolling LED hardware based on simple conversational prompts.
- **Transaction Logs & History**: Maintains a comprehensive console of payloads both actively received via subscription or transmitted outbound over the MQTT pipeline.

## Demo

Deploy automatically on GitHub pages. Live Version:
👉 **[https://srj-ai.github.io/DIGITAL_LED_NOTICE_BOARD/](https://srj-ai.github.io/DIGITAL_LED_NOTICE_BOARD/)**

## Setup Locally

If you wish to test or develop locally:

1. **Prerequisites:** Ensure you have Node.js installed on your machine.
2. Ensure you have cloned the repository.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. View the app at `http://localhost:3000` or the port selected by Vite.

## Architecture

* **Hardware Component**: Designed for arrays of P10 LED displays chained and driven by NodeMCU ESP8266 modules configured natively to subscribe to the specified custom MQTT Topic.
* **Frontend Component**: Built entirely with React + TypeScript, wrapped in Vite for extremely fast HMR compiling. Fully disconnected and edge-centric.
* **Collaboration**: An outcome of industrial collaboration bridging academia (*G. Pulla Reddy Engineering College*) with factory automation requirements (*Quality Technologies Pvt. Ltd.*) and mentored by *PALS*.

## Security Note
This frontend application NEVER stores secrets. Your `GEMINI_API_KEY` is exclusively scoped and stored locally inside your browser's persistent `localStorage`. If you fork or host this manually, never commit API keys inside the configuration code.

---
© Matrix Commander Contributors 2026
