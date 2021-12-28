import React from 'react';

export default function useLocalStorage(key, initialValue) {

    // Get value from local storage
    const [value, setValue] = React.useState(() => {
        const json = localStorage.getItem(key);

        try {
            if (json && json !== null) {
                return JSON.parse(json);
            }
        } catch (e) {
            return null;
        }

        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    // Add value to local storage
    React.useEffect(() => {
        const result = JSON.stringify(value);
        localStorage.setItem(key, result);

    }, [key, value]);

    return [value, setValue];
}
