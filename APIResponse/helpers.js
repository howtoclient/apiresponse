const
    forceArray = (mixed) => Array.isArray(mixed) ? mixed : [mixed],
    handleFunctionCall = (target, key, assignValue) => {
        if (Array.isArray(assignValue)) {
            return assignValue.forEach(
                applyValues => target[key].apply(target, forceArray(applyValues))
            );
        }
        if (typeof assignValue === "object") {
            return Object.keys(assignValue).forEach(
                valueKey =>
                    target[key].apply(target,
                        Array.isArray(assignValue[valueKey])
                            ? assignValue[valueKey]
                            : [valueKey, assignValue[valueKey]]
                    )
            );
        }
        target[key](assignValue);
    },
    assignSettings = (target, settings) => {
        if (typeof target !== 'object' || typeof settings !== 'object') {
            return
        }
        Object.keys(settings).forEach(key => {
            const
                targetValue = target[key],
                assignValue = settings[key];
            if (typeof targetValue === 'function') {
                return handleFunctionCall(target, key, assignValue);
            }
            if (Array.isArray(targetValue) && Array.isArray(assignValue)) {
                return target[key].push.apply(target[key], assignValue);
            }
            if (typeof targetValue === 'object' && typeof assignValue === 'object') {
                return assignSettings(targetValue, assignValue)
            }
            target[key] = assignValue;
        })
    },
    applySets = (res, sets) => {
        Object.keys(sets).forEach(
            key => {
                res.set(key, sets[key])
            }
        )
    };

module.exports = {
    applySets,
    assignSettings
};