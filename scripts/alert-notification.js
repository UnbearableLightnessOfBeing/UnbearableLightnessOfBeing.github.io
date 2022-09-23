// managing success notification tab

let currentNotificationId = null;
const alertNote = document.querySelector('.success-note');

export function launchNotificaiton(notificationDuraton) {
    showNotification();
    currentNotificationId = setTimeout(() => {     
        removeNotification();
    }, notificationDuraton);
}

function showNotification() {
    alertNote.classList.add('seen');
}

export function removeNotification() {
    alertNote.classList.remove('seen');   
}

export function getCurrentId() {
    return currentNotificationId;
};