
import { DOMautoquery } from '../DOMautoquery.js';

DOMautoquery.devices({
    unit: 'px',
    sizes: {
        1: { name: 'mobile', startPoint: 0},
        2: { name: 'tablet', startPoint: 768 },
        3: { name: 'desktop', startPoint: 1024 },
        4: { name: 'wide', startPoint: 1280 },
        5: { name: 'ultraWide', startPoint: 1600 },
    }
});
