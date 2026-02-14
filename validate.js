import { instructionAttribute } from './var.js';

const alert = {
    error: [],
    warining: {},
}

//----------------------------------------------------------------------
// VALIDATION: Return inappropriate usage errors and/or warnings to user
//----------------------------------------------------------------------
export function validateSiblingSwapPairs({ replacerElems }) {

    replacerElems.forEach(replacerElem => {
        const refAttribute = replacerElem.getAttribute(instructionAttribute);
        const refelems = document.querySelectorAll(`[refelem="${refAttribute}"]`);
        //-
        const directlyRelatedReplacerElements = document.querySelectorAll(`[${instructionAttribute}="${refAttribute}"]`);

        //------------------------------
        // Error type 1: Duplicate Error
        //------------------------------
        const isRefElemDuplicate = refelems.length !== 1 && refelems.length > 1;
        const isReplacerElemDuplicate = directlyRelatedReplacerElements.length !== 1 && directlyRelatedReplacerElements.length > 1;
        //-
        if (isRefElemDuplicate || isReplacerElemDuplicate) {
            let duplicateError = alert.error.find(errObj => errObj.type === 'duplicate');

            if (!duplicateError) {
                duplicateError = {
                    type: 'duplicate',
                    message: `Found more than one HTML elements using the same '[attribute="value"]' selector.`,
                    data: [],
                }
                alert.error.push(duplicateError);
            }

            if (isRefElemDuplicate) {
                const refElemDuplicateError = duplicateError.data.find(errData => errData.selector === `[refelem="${refAttribute}"]`);
                if (!refElemDuplicateError) {
                    duplicateError.data.push({
                        selector: `[refelem="${refAttribute}"]`,
                        elements: refelems,
                    });
                }
            }

            if (isReplacerElemDuplicate) {
                const replacerDuplicateError = duplicateError.data.find(errData => errData.selector === `[${instructionAttribute}="${refAttribute}"]`);

                if (!replacerDuplicateError) {
                    duplicateError.data = [
                        ...duplicateError.data,
                        {
                            selector: `[${instructionAttribute}="${refAttribute}"]`,
                            elements: directlyRelatedReplacerElements,
                        },
                    ];
                }
            }
        }

    });


    //----------------------------------------
    // Display error to user via console or UI
    //----------------------------------------
    const duplicateError = alert.error.find(errObj => errObj.type === 'duplicate');
    if (duplicateError) {
        console.error(`[DOMautoquery] ERROR: ${duplicateError.message}.\n See ERROR DATA in console below.`);
        console.error('ERROR DATA:', alert.error);
    }
}
