import React, { useRef, useEffect } from 'react';

export const usePrevious = (value: number) => {
    const ref = useRef<number | null>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}