import React from 'react';

function PageNotFound() {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-background'>
            <h1 className='text-4xl font-bold'>404</h1>
            <p className='text-muted-text'>Page not found</p>
        </div>
    );
}

export default PageNotFound;