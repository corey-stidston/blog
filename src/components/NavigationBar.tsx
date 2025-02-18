import React from 'react';
import Link from 'next/link';

const NavigationBar: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 w-full p-4 bg-white">
            <ul className="flex justify-center space-x-4">
                <li className="text-gray-600 dark:text-gray-400">
                    <Link href="/">Home</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar;
