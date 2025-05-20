# RAGEMP & Ruby on Rails CEF UI - Proof of Concept Repository  This repository contains a Proof of Concept (POC) demonstrating how to serve a User Interface (UI) from a Ruby on Rails application directly into RAGEMP's Chromium Embedded Framework (CEF) browser. It also shows basic communication from this Rails-served UI back to the RAGEMP client-side scripts.  **Date:** May 18, 2025  ## Objective  To provide a working example where a Ruby on Rails application: 1. Serves HTML pages to RAGEMP's in-game CEF browser. 2. Executes JavaScript within the CEF page served by Rails. 3. Communicates events/data from the CEF page back to RAGEMP client-side scripts.  ## Repository Structure  This repository contains: 

.
├── rails_ragemp_poc/      # The Ruby on Rails application source code
├── server/                # Contains RAGEMP script(s) for this POC
│   └── client_packages/
│       └── index.js       # RAGEMP client-side script for this POC
└── README.md              # This file

**Important: You will need to download the core RAGEMP server files separately and place them into the `server/` directory.**

## Prerequisites

* Git installed.
* Ruby and Rails installed (This POC was developed with Rails 8+).
* RAGEMP Client installed on your GTA V installation.
* A local copy of Grand Theft Auto V.

## Setup Instructions

### 1. Clone the Repository
   ```bash
   git clone <your-github-repository-url>
   cd <repository-name> # Navigate into the cloned repository directory

2. Set up RAGEMP Server Core Files
The RAGEMP client-side script specific to this POC is provided in server/client_packages/index.js. However, you need the actual RAGEMP server executables and default resource files.

Download RAGEMP Server Files:
Get the latest server files from the official RAGEMP website:
https://rage.mp/gtav/serverfiles/
(Download the appropriate version for your operating system, e.g., "Server files (Windows)").

Populate the server/ Directory:

Extract the downloaded RAGEMP server archive (e.g., server-files-windows.zip).

Copy all files and folders from inside the extracted archive (e.g., ragemp-server.exe, conf.json, bin/, dotnet/, maps/, packages/, plugins/, and the default client_packages folder contents if you wish to merge) directly into the server/ directory of this cloned repository.

Crucially, ensure that the server/client_packages/index.js file provided by this repository is the one used. If the downloaded RAGEMP server files include their own client_packages/index.js, you might want to back it up or replace it with the one from this repository, as this POC's index.js contains the specific logic to load the Rails UI.

After this step, your <repository-name>/server/ directory should look something like this:

server/
├── ragemp-server.exe  # From downloaded RAGEMP server files
├── conf.json          # From downloaded RAGEMP server files
├── bin/               # From downloaded RAGEMP server files
├── dotnet/            # From downloaded RAGEMP server files
├── client_packages/   # This directory comes from the repo
│   └── index.js       # The POC client script (from this repo)
├── packages/          # From downloaded RAGEMP server files
└── ... (other default RAGEMP server files like maps/, plugins/)

3. Set up Ruby on Rails Application
Navigate to the Rails application directory:

cd rails_ragemp_poc

Install dependencies:

bundle install

Important (for Rails 7/8+): This POC requires a modification to Rails' default browser security policy to allow RAGEMP's CEF User-Agent. The easiest way for this POC was to comment out the allow_browser versions: :modern line if it exists in app/controllers/application_controller.rb (or a similar global configuration file like config/initializers/new_framework_defaults_8_0.rb).
Alternatively, ensure the following skip_before_action is present in rails_ragemp_poc/app/controllers/ragemp_poc_controller.rb (as provided in this POC's source):

class RagempPocController < ApplicationController
  skip_before_action :allow_browser_action, only: [:show]
  # ...
end

How to Use / Running the POC
Start the Ruby on Rails Server:

Navigate to the Rails app directory: cd path/to/your/repository-name/rails_ragemp_poc

Run: rails server

(The Rails server usually runs on http://localhost:3000)

Start the RAGEMP Server:

Navigate to the RAGEMP server directory within the repository: cd path/to/your/repository-name/server

Run: ragemp-server.exe (or ./ragemp-server on Linux).

Connect with RAGEMP Client:

Launch your RAGEMP client.

Connect to your local server (usually 127.0.0.1:22005 or localhost:22005).

In-Game Interaction:

Once connected and spawned in GTA V:

The server/client_packages/index.js script will automatically attempt to load the UI when specific commands are used.

Type /showui in the RAGEMP chat and press Enter. The UI served by your Rails application should appear.

Interact with elements on the UI (e.g., the button to send a message). You should see a confirmation message in the RAGEMP chat, indicating that communication from CEF (Rails page) to the RAGEMP client script is working.

Type /hideui in the chat to close the UI.

Functionality Demonstrated
A Ruby on Rails application successfully serves an HTML page to RAGEMP's in-game CEF browser.

The CEF browser renders the HTML and executes JavaScript embedded in the Rails view.

The JavaScript within the CEF page can use mp.trigger() to send data and events back to the RAGEMP client-side script (server/client_packages/index.js).

The RAGEMP client-