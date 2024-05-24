import { useState, useEffect, useRef } from 'react';

export function useResizeObserver() {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const ref = useRef(null);

    useEffect(() => {
        const observeTarget = ref.current;
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height
                });
            });
        });

        if (observeTarget) {
            resizeObserver.observe(observeTarget);
        }

        return () => {
            resizeObserver.unobserve(observeTarget);
        };
    }, [ref]);

    return [ref, dimensions];
}