const downloadFolder = 'transcripts';
const sanitizeRegex = /[^a-z0-9à-ú .-]/gi;
const transcriptionsKey = 'transcriptions';

const downloadActionName = "downloadTranscriptAction";

function getTitle() {
    return dom.getCurrentTranscriptTitle();
}

function get() {
    return Array.from(dom.getTranscriptEl())
        .map(x => x.textContent)
        .join("\n");
}

async function download({key, transcript}) {
    
    // Sanitize filename
    const fileName = key.replace(sanitizeRegex, '_').trim();
    
    //Send to background and wait for download to complete
    const response = await browser.runtime.sendMessage({
        action: downloadActionName,
        fileName: `${downloadFolder}/${fileName}.txt`,
        transcriptContent: transcript
    });
    
    // Only save to storage if download was successful
    if (!response.success) {
        throw new Error(response.error || 'Download failed');
    }
    
    await saveToStorage(key, transcript);
}

async function checkAndPrepare(transcript) {
    if (!transcript) throw new Error("No transcript provided");

    const data = await storage.get(transcriptionsKey);
    const key = getTitle() || "Unknown Title";
    const storedTranscripts = data.transcriptions || {};
    
    // if already in the map throw exception
    if (storedTranscripts[key]) throw new Error("Transcript already exists");

    return { key, transcript }
}

async function saveToStorage(key, transcript) {
    const data = await storage.get(transcriptionsKey);
    const storedTranscripts = data.transcriptions || {};
    storedTranscripts[key] = transcript;
    await storage.save(transcriptionsKey, storedTranscripts);
}

const transcript = { download, downloadActionName, get, checkAndPrepare };

