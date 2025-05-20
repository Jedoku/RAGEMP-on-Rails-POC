// D:\server-files\client_packages\rails_ui\index.js

// ADD THESE LINES AT THE VERY TOP:
mp.gui.chat.push("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
mp.gui.chat.push("!!! CLIENT SCRIPT: rails_ui/index.js IS RUNNING !!!");
mp.gui.chat.push("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
mp.console.logInfo("CLIENT SCRIPT: rails_ui/index.js IS RUNNING", false); // This logs to the F1 client console

// Your existing code follows:
let uiBrowser = null;
const railsAppUrl = 'http://localhost:3000/ragemp_poc'; // We'll create this Rails page next

mp.events.add('playerCommand', (command) => {
    if (command.toLowerCase() === 'showui') {
        if (uiBrowser) {
            mp.gui.chat.push('UI is already open. Use /hideui to close it.');
            return;
        }
        mp.gui.chat.push('Attempting to load UI from Rails...');
        uiBrowser = mp.browsers.new(railsAppUrl);
        mp.gui.cursor.show(true, true);
        mp.gui.chat.push(`CEF browser created for ${railsAppUrl}.`);
    } else if (command.toLowerCase() === 'hideui') {
        if (uiBrowser) {
            uiBrowser.destroy();
            uiBrowser = null;
            mp.gui.cursor.show(false, false);
            mp.gui.chat.push('UI hidden.');
        } else {
            mp.gui.chat.push('UI is not currently open.');
        }
    }
});

mp.events.add('cef_event_to_ragemp', (message) => {
    mp.gui.chat.push(`Message from CEF (via Rails): ${message}`);
    if (uiBrowser) {
        // Optional: Execute JavaScript in CEF from RAGEMP
        // uiBrowser.execute(`alert('RAGEMP acknowledges: ${message}');`);
    }
});

mp.events.add('browserDomReady', (browser) => {
    if (browser === uiBrowser) {
        mp.gui.chat.push('CEF Browser DOM is ready for Rails page!');
    }
});

mp.events.add('browserLoadingFailed', (browser, error) => {
    if (browser === uiBrowser) {
        mp.gui.chat.push(`! CEF Browser FAILED to load: ${error}`);
        mp.console.logError(`CEF Load Error: ${error}`, false); // Log to F1 console
         if (uiBrowser) {
            uiBrowser.destroy();
            uiBrowser = null;
            mp.gui.cursor.show(false, false);
        }
    }
});

// This message will now be redundant if the top ones show, but leave it for now.
// mp.gui.chat.push('RAGEMP Rails UI script loaded. Type /showui to open.');