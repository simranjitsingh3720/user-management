import { useState } from 'react';

const tabs = [
    {
        id: 'jwt',
        title: 'JWT',
        logo: 'assets/images/logo/jwt.svg',
        logoClass: 'h-40 p-4 bg-black rounded-12'
    },
    {
        id: 'firebase',
        title: 'Firebase',
        logo: 'assets/images/logo/firebase.svg',
        logoClass: 'h-40'
    }
];

/**
 * The sign in page.
 */
function SignInPage() {
    const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

    function handleSelectTab(id) {
        setSelectedTabId(id);
    }

    return (
        <div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start" />
    );
}

export default SignInPage;
