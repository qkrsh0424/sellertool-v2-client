let backdropRef;

export function setBackdropRef(ref) {
    backdropRef = ref;
}

export function customBackdropController() {
    function hideBackdrop() {
        backdropRef.current.style.opacity = 0;
        backdropRef.current.style.visibility = 'hidden';
    }

    function showBackdrop() {
        backdropRef.current.style.opacity = 1;
        backdropRef.current.style.visibility = 'visible';
    }

    return {
        hideBackdrop,
        showBackdrop
    }
}