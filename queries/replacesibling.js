import { domState } from '../dom.state.js';
// import { validateSwapPairs } from '../validate.js';


const instructionAttribute = 'replacesibling';

// ------------------------------------------------------------------------
// INITIALIZATION: Build swap state in clientState BEFORE starting watchers
// ------------------------------------------------------------------------
export const initializeSiblingSwap = ({ deviceSizeAttributeType }) => {
    // validateSwapPairs();

    document.querySelectorAll(`[${instructionAttribute}][${deviceSizeAttributeType}]`).forEach(replacerElem => {
        const refAttribute = replacerElem.getAttribute(instructionAttribute);
        const refelem = document.querySelector(`[refelem="${refAttribute}"]`);

        if (refelem) {
            //---------------------------------------------------------
            // Store swap data in clientState with insertion point info
            //---------------------------------------------------------
            domState.update(`${deviceSizeAttributeType}_${refAttribute}`, {
                refelem,
                atsize: parseInt(replacerElem.getAttribute(deviceSizeAttributeType)),
                _replacerElem: replacerElem,
                _parentElem: refelem.parentNode,
                _nextSiblingElem: refelem.nextSibling,
                _refAttribute: refAttribute,
                _sizeAttributeType: deviceSizeAttributeType,
            });

            //---------------------------------------------------------
            // Remove replacer from DOM - we'll add it back when needed
            //---------------------------------------------------------
            replacerElem.remove();
        }
    });
}

export const performSiblingSwap = ({ activeDevice, deviceSizeAttributeType }) => {
    Object.values(domState.result).forEach(item => {
        // ----------------------------------------------------------------
        // Filter to only items that have specified deviceSizeAttributeType
        // ----------------------------------------------------------------
        if (item._sizeAttributeType !== deviceSizeAttributeType) return;

        const { refelem, atsize, _replacerElem, _parentElem, _nextSiblingElem } = item;

        // ---------------------------------------------------------
        // Determine which element should be visible
        // Show replacer ONLY when we're at the specified breakpoint
        // ---------------------------------------------------------
        const shouldShowReplacerElem = activeDevice.id === atsize;
        const elementToShow = shouldShowReplacerElem ? _replacerElem : refelem;
        const elementToHide = shouldShowReplacerElem ? refelem : _replacerElem;

        // ---------------------
        // Remove hidden element
        // ---------------------
        if (elementToHide.parentNode) {
            elementToHide.remove();
        }

        // --------------------------------------------
        // Insert visible element if not already in DOM
        // --------------------------------------------
        if (!elementToShow.parentNode) {
            _parentElem.insertBefore(elementToShow, _nextSiblingElem);
        }
    });
}
