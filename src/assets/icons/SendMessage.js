import React from 'react';

export default function ArrowDown({ size }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.394 2.205a1 1 0 011.074-.089l17 9a1 1 0 010 1.768l-17 9a1 1 0 01-1.444-1.1L4.976 12 3.024 3.217a1 1 0 01.37-1.012zM6.802 13l-1.356 6.103L16.974 13H6.802zm10.172-2H6.802L5.446 4.897 16.974 11z"
                fill={'#3e58eb'}
            />
        </svg>
    );
}
