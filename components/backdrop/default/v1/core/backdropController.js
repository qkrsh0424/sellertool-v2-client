let backdropRef;

export function setBackdropRef(ref) {
    backdropRef = ref;
}

export function customBackdropController() {
    function showBackdrop() {
        if (!backdropRef || !backdropRef?.current) {
            return;
        }
        backdropRef.current.style.opacity = 1;
        backdropRef.current.style.visibility = 'visible';
    }

    function hideBackdrop() {
        if (!backdropRef || !backdropRef?.current) {
            return;
        }
        backdropRef.current.style.opacity = 0;
        backdropRef.current.style.visibility = 'hidden';
    }

    return {
        showBackdrop,
        hideBackdrop
    }
}