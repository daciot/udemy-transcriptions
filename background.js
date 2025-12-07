browser.runtime.onMessage.addListener(async (message, sender) => {
    if (message.action === "downloadTranscriptAction") {
        const { fileName, transcriptContent } = message;
        
        try {
            const blob = new Blob([transcriptContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            await browser.downloads.download({
                url: url,
                filename: fileName,
                saveAs: false,
                conflictAction: 'uniquify'
            });
            
            URL.revokeObjectURL(url);
            
        } catch (e) {
            console.error("Failed to download transcript:", e);
        }
    }
});

browser.webNavigation.onHistoryStateUpdated.addListener(async (details) => {
    if (details.url.includes("udemy.com") && details.frameId === 0) { 
        try {
            await browser.tabs.executeScript(details.tabId, {
                file: "content.js"
            });
        } catch (e) {
            console.error("Failed to reinject content.js:", e);
        }
    }
});

browser.runtime.onSuspend.addListener(() => {
    storage.remove('transcriptions')
});

self.setInterval(() => {
    browser.runtime.getPlatformInfo(); 
}, 20000);