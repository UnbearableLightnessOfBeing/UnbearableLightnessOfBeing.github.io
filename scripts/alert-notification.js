let currentNotification = null;

export function launchNotificaiton() {
    let alertNote = document.querySelector('.success-note');
    alertNote.classList.add('seen');
    currentNotification = setTimeout(() => {        
    }, 4000);
}


export function getCurrentId() {
    return currentNotification;
};