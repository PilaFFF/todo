import React from 'react';

export default function FullIcon({ size, fill, className }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className={className}
                d="M7.692 18.278l2.015 2.015A1 1 0 019 22H3a1 1 0 01-1-1v-6a1 1 0 011.707-.707l1.864 1.864 3.682-3.682a1 1 0 011.414 0l.707.707a1 1 0 010 1.414l-3.682 3.682zM16.308 5.722l-2.015-2.015A1 1 0 0115 2h6a1 1 0 011 1v6a1 1 0 01-1.707.707l-1.864-1.864-3.682 3.682a1 1 0 01-1.414 0l-.707-.707a1 1 0 010-1.414l3.682-3.682z"
                fill={fill}
            />
        </svg>
    );
}
