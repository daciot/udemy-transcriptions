# Udemy Transcriptor

A Firefox extension designed to automatically extract and download transcripts from Udemy courses as text files.

## Features

- **Seamless Integration**: Automatically detects the transcript panel on Udemy course pages.
- **One-Click Download**: Captures the visible transcript and downloads it immediately as a `.txt` file.

## Installation

1. Clone this repository to your local machine.
2. Open Firefox and navigate to `about:debugging`.
3. Click on **"This Firefox"** in the sidebar.
4. Click **"Load Temporary Add-on..."**.
5. Select the `manifest.json` file from the cloned directory.

## Usage

1. Navigate to any Udemy course player.
2. Open the **Transcript** tab in the course interface.
3. The extension automatically detects the transcript button interaction. When you view the transcript, the extension will attempt to extract and download it.
4. Check your default downloads folder for the `transcripts/` directory (or wherever your browser saves files).
