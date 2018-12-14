/*
 * dom operate
 */

/**
 * @function getStyle
 * @description **getStyle(el, property)** get DOM style
 * @param {DOM Object} el element
 * @param {String} property css property
 */
export function getStyle(el, property) {
    let value = el.currentStyle ?
        el.currentStyle[property] :
        document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
    let matches = value && value.match(/^(\d+)(\.\d+)?px$/);
    return matches ? Number(matches[1]) : undefined;
}