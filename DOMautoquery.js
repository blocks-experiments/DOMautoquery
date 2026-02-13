import { breakpointsWatcher } from './breakpoints.watcher.js';

export const DOMautoquery = {
    devices: (_devices) => {

        // Use breakpoint watcher
        breakpointsWatcher(_devices, (activeDevice) => {
            console.clear();

            // TODO C1 [DOCvelop]: Feed activeDevice into "debug mode"
            console.log('Active Device:', activeDevice);

            // TODO B1 [Add non-existing]: Array of all devices (with each device object taking similar shape as the activeDevice object).
            // console.log('All Devices: ', allDevices);
        });
    },
};
