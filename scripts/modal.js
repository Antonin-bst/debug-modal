import { Callback } from './callback.js?@{buildNumber}'
import { registerActionEvent } from './event.js?@{buildNumber}'
import { focusDelayed, focusInsideElementOnKeyDown, retrieveAllFocusableChilds, retrieveEnabledFocusableChilds } from './focus.js?@{buildNumber}'
import { retrieveElementById, retrieveElementsByAttribute } from './selector.js?@{buildNumber}'
import { checkElementVisibility, hideElement, showElement } from './wai.js?@{buildNumber}'

const MODAL_TARGET_ATTRIBUTE = 'data-modal-target'
const MODAL_INPUT_ATTRIBUTE = 'data-modal-input'
const MODAL_SHOW_ATTRIBUTE = 'data-modal-show'

class Modal {

    static modals = new Map()

    #id = undefined

    #inputs = []

    #originInput = undefined

    constructor(id) {
        this.#id = id
        Modal.modals.set(id, this)
    }

    withInput(element) {
        let id = element.getAttribute('id')
        if (id == null) {
            id = `${this.#id}-${this.#inputs.length}`
            element.setAttribute('id', id)
        }

        this.#inputs.push(id)
    }

    show() {
        const containerEl = retrieveElementById(this.#id)

        showElement(containerEl)
        this.#updateInputsWai(true)

        const focusableEls = retrieveEnabledFocusableChilds(containerEl)
        if (focusableEls != null && focusableEls.length > 0) {
            focusDelayed(focusableEls[0], 1)
        }

        Callback.find('onModalShow', this.#id).forEach(callback => callback(this))
    }

    hide() {
        const containerEl = retrieveElementById(this.#id)

        hideElement(containerEl)
        this.#updateInputsWai(false)

        if (this.#originInput != null) {
            const originEl = retrieveElementById(this.#originInput)
            if (originEl != null) {
                focusDelayed(originEl, 1)
            }

            this.#originInput = undefined
        }

        Callback.find('onModalHide', this.#id).forEach(callback => callback(this))
    }

    toggle() {
        if (checkElementVisibility(retrieveElementById(this.#id))) {
            this.hide()
        } else {
            this.show()
        }
    }

    trigger(inputEl) {
        this.toggle()

        const inputId = inputEl.getAttribute('id')
        if (inputId != null) {
            this.#originInput = inputId
        }

        Callback.find('onModalTrigger', this.#id).forEach(callback => callback(inputEl.getAttribute(MODAL_INPUT_ATTRIBUTE), inputEl, this))
    }

    isVisible() {
        return checkElementVisibility(retrieveElementById(this.#id))
    }

    submitUri(uri) {
        const form = retrieveElementById(`${this.#id}-form`)
        if (form != null) {
            form.action = uri
            form.submit()
        }
    }

    #updateInputsWai(visible) {
        this.#inputs.forEach(inputId => {
            const inputEl = retrieveElementById(inputId)
            if (inputEl != null) {
                inputEl.setAttribute('aria-expanded', visible)
            }
        })
    }

    static retrieve(modalId) {
        return this.modals.get(modalId)
    }

}

window.addEventListener('load', event => {
    retrieveElementsByAttribute(MODAL_TARGET_ATTRIBUTE)
            .forEach(element => {
                const modalId = element.getAttribute(MODAL_TARGET_ATTRIBUTE)
                if (modalId == null) {
                    return
                }

                let modal = Modal.modals.get(modalId)
                if (modal == null) {
                    modal = new Modal(modalId)
                    Modal.modals.set(modalId, modal)

                    const modalEl = retrieveElementById(modalId)
                    if (modalEl != null && modalEl.hasAttribute(MODAL_SHOW_ATTRIBUTE)) {
                        modal.show()
                    }
                }

                modal.withInput(element)

                registerActionEvent(element, () => {
                    modal.trigger(element)
                })

                const modalEl = retrieveElementById(modalId)
                if (modalEl != null) {
                    retrieveAllFocusableChilds(modalEl).forEach(focusableEl => {
                        focusableEl.addEventListener('keydown', evt => {
                            focusInsideElementOnKeyDown(evt, modalEl)
                        })
                    })
                }
            })
})

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        Modal.modals.forEach((modal, id, map) => {
            if (modal.isVisible()) {
                event.preventDefault()
                modal.hide()
            }
        })
    }
})

export { Modal }