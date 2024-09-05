/**
 * 
 * @param {String} id 
 */
const retrieveElementById = id => {
    return document.querySelector(`#${id}`)
}

/**
 *
 * @param {String} attribute
 */
const retrieveElementByAttribute = attribute => {
    return document.querySelector(`[${attribute}]`)
}

/**
 * 
 * @param {String} attribute
 */
const retrieveElementsByAttribute = attribute => {
    return document.querySelectorAll(`[${attribute}]`)
}

/**
 *
 * @param {String} attribute
 * @param {String} value
 */
const retrieveElementByAttributeValue = (attribute, value) => {
    return document.querySelector(`[${attribute}="${value}"]`)
}

/**
 *
 * @param {String} attribute
 * @param {String} value
 */
const retrieveElementsByAttributeValue = (attribute, value) => {
    return document.querySelectorAll(`[${attribute}="${value}"]`)
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {String} attribute 
 */
const retrieveIdsFromElementWithAttribute = (element, attribute) => {
    if (element == null || attribute == null) {
        return []
    }

    const list = element.getAttribute(attribute)
    if (list == null) {
        return []
    }

    return list.split(' ')
}

export {
    retrieveElementById,
    retrieveElementByAttribute,
    retrieveElementsByAttribute,
    retrieveElementByAttributeValue,
    retrieveElementsByAttributeValue,
    retrieveIdsFromElementWithAttribute
}