export function select(element) {
    const selectedElement = document.querySelector(element);
    return selectedElement;
}

export function selectAll(elements) {
    const selectedElements = document.querySelectorAll(elements);
    return selectedElements;
}

export function create(element, text = null) {
    const createdElement = document.createElement(element);
    if (text) {
        createdElement.textContent = text;
    }
    return createdElement;
}
