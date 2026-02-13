
export const breakpointsWatcher = (devices, callback) => {

  // TODO B2 [Add non-existing]: if user does not specify device unit, default to "px" unit.


  //--------------------------------------------------------------------------
  // Convert object to a sorted array to ensure we calculate ranges correctly
  //--------------------------------------------------------------------------
  // TODO A1 [Validation | Error output to user]: What's the best way of ensur-
  // ing that the devices sizes keys added by user (& which we have turned into
  // an id) is always arranged from the smallest number to the highest number)?
  // The startpoints should also be arranged from smallest to highest number.
  // Is sorting needed at all? or its needed and just enough?
  //--------------------------------------------------------------------------
  const breakPointValues = Object.entries(devices.sizes).map(([ key, value]) => {
    value = { ...value, id: Number(key) };
    return value;
  }).sort((a, b) => a.value - b.value);
  //--------------------------------------------------------------------------

  breakPointValues.forEach((bp, index) => {

    const nextBp = breakPointValues[bp.id]; // "bp.id" instead of using "index + 1"
    
    //-------------------------------------------------------
    // Build the query: 
    // If there is a next breakpoint, set a max-width limit.
    // If it's the last one, it's just min-width to infinity.
    //-------------------------------------------------------
    let mQueryRange = `(min-width: ${bp.startPoint}${devices.unit})`;
    if (nextBp) {
      mQueryRange += ` and (max-width: ${nextBp.startPoint - 1}${devices.unit})`;
    }

    bp = { 
      ...bp,
      endPoint: nextBp ? nextBp.startPoint - 1 : null,
      unit: devices.unit,
      _mQueryRange: mQueryRange,
    };

    //-------------------------------------------------------
    const mQueryListener = window.matchMedia(mQueryRange);

    const handler = (e) => {
      if (e.matches) {
        callback(bp);
      }
    };

    //----------------
    // Attach listener
    //----------------
    mQueryListener.addEventListener('change', handler);

    //------------------------
    // Immediate check on load
    //------------------------
    if (mQueryListener.matches) callback(bp);

  });
}
