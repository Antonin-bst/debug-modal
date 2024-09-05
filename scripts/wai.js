/**
 * 
 * @param {HTMLElement} element 
 * @returns True if the element is visible, false otherwise
 */
const checkElementVisibility = element => {
    if (element == null) {
        return false
    }

    const display = window.getComputedStyle(element).display
    return !(display === 'none' || display === 'hidden')
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {HTMLElement} sourceEl 
 */
const updateWaiVisibility = (element, sourceEl = undefined) => {
    const visible = checkElementVisibility(element)

    if (element != null) {
        element.setAttribute('aria-hidden', !visible)
    }

    if (sourceEl != null) {
        sourceEl.setAttribute('aria-expanded', visible)
    }
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {Array<String>} ids 
 */
const updateWaiControls = (element, ids) => {
    if (element != null) {
        element.setAttribute('aria-controls', `${element.getAttribute('aria-controls')} ${ids.join(' ')}`)
    }
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {HTMLElement} sourceEl
 * @param {Boolean} keepHitbox
 */
const hideElement = (element, sourceEl = undefined, keepHitbox = false) => {
    if (keepHitbox) {
        element.style.visibility = 'hidden'
    } else {
        element.style.display = 'none'
    }

    updateWaiVisibility(element, sourceEl)
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {HTMLElement} sourceEl
 * @param {Boolean} keepHitbox
 */
const showElement = (element, sourceEl = undefined, keepHitbox = false) => {
    if (keepHitbox) {
        element.style.visibility = 'visible'
    } else {
        element.style.display = 'block'
    }

    updateWaiVisibility(element, sourceEl)
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {HTMLElement} sourceEl 
 */
const toggleElementVisibility = (element, sourceEl = undefined) => {
    if (checkElementVisibility(element)) {
        hideElement(element, sourceEl)
    } else {
        showElement(element, sourceEl)
    }
}

export { checkElementVisibility, updateWaiVisibility, updateWaiControls, hideElement, showElement, toggleElementVisibility }