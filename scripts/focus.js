/**
 * 
 * @param {HTMLElement} element 
 * @param {Number} delay 
 */
const focusDelayed = (element, delay) => {
    setTimeout(() => element.focus(), delay)
}

/**
 * Retrieve all focusable childs of an element no matter if they are disabled
 * 
 * @param {HTMLElement} element 
 * @returns An array that contains all focusable childs of an element no matter if they are disabled
 */
const retrieveAllFocusableChilds = element => {
    if (element == null) {
        return []
    }
    return element.querySelectorAll('[href]:not([tabindex="-1"]), button:not([tabindex="-1"]), *[role="button"]:not([tabindex="-1"]), input:not([tabindex="-1"]), textarea:not([tabindex="-1"]), select:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])')
}

/**
 * Retrieve all focusable childs of an element
 * 
 * @param {HTMLElement} element 
 * @returns An array that contains all focusable childs of an element
 */
const retrieveEnabledFocusableChilds = element => {
    if (element == null) {
        return []
    }
    return element.querySelectorAll('[href]:not([tabindex="-1"]):not([disabled]), button:not([tabindex="-1"]):not([disabled]), *[role="button"]:not([tabindex="-1"]):not([disabled]), input:not([tabindex="-1"]):not([disabled]), textarea:not([tabindex="-1"]):not([disabled]), select:not([tabindex="-1"]):not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])')
}

/**
 * Focus the next/previous focusable element on KeyboardEvent
 * 
 * @param {KeyboardEvent} event 
 * @param {HTMLElement} element 
 */
const focusInsideElementOnKeyDown = (event, element) => {
    if (event.key === 'Tab') {
        const focusableEls = retrieveEnabledFocusableChilds(element)

        if (focusableEls.length < 2) {
            event.preventDefault()
            return
        }

        if (event.target === focusableEls[0] && event.shiftKey) {
            focusableEls[focusableEls.length - 1].focus()
            event.preventDefault()
        } else if (event.target === focusableEls[focusableEls.length - 1] && !event.shiftKey) {
            focusableEls[0].focus()
            event.preventDefault()
        }
    }
}

/**
 * Focus the next/previous focusable element on KeyboardEvent when the window width is in specific bounds
 * 
 * @param {KeyboardEvent} event 
 * @param {HTMLElement} element 
 * @param {Number} minWidth 
 * @param {Number} maxWidth 
 */
const focusInsideElementBoundedOnKeyDown = (event, element, minWidth, maxWidth) => {
    const width = window.innerWidth
    if (width >= minWidth && width < maxWidth) {
        focusInsideElementOnKeyDown(event, element)
    }
}

export { focusDelayed, retrieveAllFocusableChilds, retrieveEnabledFocusableChilds, focusInsideElementOnKeyDown, 
    focusInsideElementBoundedOnKeyDown }