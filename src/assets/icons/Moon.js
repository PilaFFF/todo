import React from 'react';

export default function Moon({ size, fill }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="-5 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M586.256 845c0-6.9 4.479-12.764 10.744-15.009a16.63 16.63 0 00-5.628-.991C582.33 829 575 836.164 575 845c0 8.837 7.33 16 16.372 16a16.63 16.63 0 005.628-.991c-6.265-2.245-10.744-8.108-10.744-15.009"
                transform="translate(-575 -829)"
                fill={fill ? fill : 'black'}
                stroke="none"
                strokeWidth={1}
                fillRule="evenodd"
            />
        </svg>
    );
}
