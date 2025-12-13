browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "downloadTranscriptAction") {
        const { fileName, transcriptContent } = message;
        
        (async () => {
            try {
                const blob = new Blob([transcriptContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                
                const downloadId = await browser.downloads.download({
                    url: url,
                    filename: fileName,
                    saveAs: false,
                    conflictAction: 'uniquify'
                });
                
                await new Promise((resolve, reject) => {
                    const listener = (delta) => {
                        if (delta.id !== downloadId) return;
                        
                        if (delta.state) {
                            if (delta.state.current === 'complete') {
                                browser.downloads.onChanged.removeListener(listener);
                                resolve();
                            } else if (delta.state.current === 'interrupted') {
                                browser.downloads.onChanged.removeListener(listener);
                                reject(new Error('Download interrupted'));
                            }
                        }
                        
                        if (delta.error) {
                            browser.downloads.onChanged.removeListener(listener);
                            reject(new Error(delta.error.current));
                        }
                    };
                    
                    browser.downloads.onChanged.addListener(listener);
                });
                
                URL.revokeObjectURL(url);
                sendResponse({ success: true });
                
            } catch (e) {
                console.error("Failed to download transcript:", e);
                sendResponse({ success: false, error: e.message });
            }
        })();
        
        return true;
    }
});

browser.webNavigation.onHistoryStateUpdated.addListener(async (details) => {
    if (details.url.includes("udemy.com") && details.frameId === 0) { 
        try {
            await browser.scripting.executeScript({
                target: { tabId: details.tabId },
                files: ["content.js"] 
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