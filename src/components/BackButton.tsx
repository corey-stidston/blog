import React from 'react';
import Link from 'next/link';

const BackButton: React.FC = () => {
  return (
    <Link href="/" className="flex items-center text-secondary hover:text-secondary-light mb-4" aria-label="Back to home">
      <span className="mr-1">&lt;</span>Back
    </Link>
  );
};

export default BackButton;
