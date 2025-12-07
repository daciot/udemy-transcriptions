
const transcriptBtnSelector = '[data-purpose="transcript-toggle"]';
const transcriptPanelSelector = '[data-purpose="transcript-panel"]';

function transcriptBtnClickHandler(){
    const panel = document.querySelector(transcriptPanelSelector);        
    if (panel) {
        transcript.save(transcript.get())
            .then(transcript.download)
            .catch(showToast);
    }
}

function setupButtonListener() {
    const toggleBtn = document.querySelector(transcriptBtnSelector);

    if (toggleBtn) {
        if (!toggleBtn._listenerAdded) {
            toggleBtn.addEventListener('click', transcriptBtnClickHandler);
            toggleBtn._listenerAdded = true; 
            
            observer.disconnect();
        }
    }
}

const observer = new MutationObserver(setupButtonListener);
observer.observe(document.body, {
    childList: true,
    subtree: true
});

setupButtonListener();