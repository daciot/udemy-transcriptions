function transcriptBtnClickHandler(){
    const panelEl = dom.getTranscriptPanelEl();        
    if (panelEl) {
        transcript.checkAndPrepare(transcript.get())
            .then(transcript.download)
            .catch(showToast);
    }
}

function setupButtonListener() {
    const toggleBtn = dom.getToggleTranscriptBtn();

    if (toggleBtn) {
        if (!toggleBtn._listenerAdded) {
            toggleBtn.addEventListener('click', transcriptBtnClickHandler);
            toggleBtn._listenerAdded = true;
        }
    }
}

const observer = new MutationObserver(setupButtonListener);
observer.observe(document.body, {
    childList: true,
    subtree: true
});

setupButtonListener();