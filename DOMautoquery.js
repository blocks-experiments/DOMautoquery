import { breakpointsWatcher } from './breakpoints.watcher.js';
import { initializeSiblingSwap, performSiblingSwap } from './queries/replacesibling.js';


// Initialize swaps when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {

        // Initialize all systems
        initializeSiblingSwap({ deviceSizeAttributeType: 'atsize' });

    });
} else {

    initializeSiblingSwap({ deviceSizeAttributeType: 'atsize' });

}


export const DOMautoquery = {
    devices: (_devices) => {

        // Use breakpoint watcher
        breakpointsWatcher(_devices, (activeDevice) => {
            console.clear();

            // TODO C1 [DOCvelop]: Feed activeDevice into "debug mode"
            console.log('Active Device:', activeDevice);

            document.body.setAttribute('data-swap-ready', 'true');

            // TODO B1 [Add non-existing]: Array of all devices (with each device object taking similar shape as the activeDevice object).
            // console.log('All Devices: ', allDevices);

            performSiblingSwap({ activeDevice, deviceSizeAttributeType: 'atsize' });
        });
    },
};
