# Discord KeyBot

Discord KeyBot is a simple bot that provides keys to users. This README will guide you through the setup and usage of the bot.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine. You can download it [here](https://nodejs.org/).
- A Discord account and a Discord bot token. You can create a bot and get a token from the [Discord Developer Portal](https://discord.com/developers/applications).

## Installation

1. Clone the repository:

2. Install the dependencies:

    ```bash
    npm install
    ```

## Configuration

1. In the `keyBot.js` file, replace `AUTHOR_ID` and `LOGIN_KEY` with the correct information you want to display:

    ```javascript
    const AUTHOR_ID = 'your_author_id_here';
    const LOGIN_KEY = 'your_login_key_here';
    ```

2. Rename the JSON configuration files by removing the `.template` suffix. For example:

    ```bash
    mv usedKeys.template.json
    mv users.template.json 
    mv keys.template.json 
    ```

## Usage

1. Once you have replaced the values and renamed the files, you can start the bot by running:

    ```bash
    npm run start
    ```

2. The bot should now be running and you can interact with it on your Discord server.


