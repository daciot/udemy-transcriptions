function showToast(msg, duration = 4000) {

    let container = document.querySelector('.extension-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'extension-toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'extension-toast';
    toast.textContent = `${msg}`; 
    container.prepend(toast); 

    void toast.offsetWidth; 

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        
        setTimeout(() => {
            container.removeChild(toast);
            if (!container.hasChildNodes()) {
                document.body.removeChild(container);
            }
        }, 500); 

    }, duration);
}