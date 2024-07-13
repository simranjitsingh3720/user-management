import { useState, useEffect } from 'react';
import { COMMON_WORDS } from '../utils/constants';

const usePermissions = () => {
    const [permissions, setPermissions] = useState({
        read: [],
        create: [],
        update: []
    });

    useEffect(() => {
        const storedScopes = localStorage.getItem(COMMON_WORDS.SCOPES);
        if (storedScopes) {
            const parsedScopes = JSON.parse(storedScopes);
            setPermissions(parsedScopes);
        }
    }, []);

    const hasPermission = (type, route) => {
        return permissions[type]?.some(permission => permission.route === route);
    };

    return { permissions, hasPermission };
};

export default usePermissions;
