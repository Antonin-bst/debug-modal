/**
 * 
 * @param {HTMLElement} element 
 * @param {Function} action
 * @param {Boolean} preventEvent
 */
const registerActionEvent = (element, action, preventEvent = true) => {
    if (element == null || action == null) {
        return
    }

    element.addEventListener('click', event => {
        if (!element.hasAttribute('disabled')) {
            if (preventEvent) {
                event.preventDefault()
            }
            action()
        }
    })

    element.addEventListener('keydown', event => {
        if (!element.hasAttribute('disabled')) {
            if (event.key === 'Enter') {
                if (preventEvent) {
                    event.preventDefault()
                }
                action()
            }
        }
    })
}

export { registerActionEvent }