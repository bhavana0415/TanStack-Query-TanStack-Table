
export const fetchUsers = async () => {
    const response = await fetch(`https://random-data-api.com/api/users/random_user?size=95`);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
};

export const fetchUsersByPage = async ({ queryKey }: { queryKey: [string, number, number] }) => {
    const page = queryKey[1];
    const pageSize = queryKey[2];
    const response = await fetch(`https://random-data-api.com/api/users/random_user?page=${page}&size=${pageSize}`);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
};

export const fetchUserByUID = async ({ queryKey }: { queryKey: [string, string] }) => {
    const uid = queryKey[1];
    const response = await fetch(`https://random-data-api.com/api/users/random_user?uid=${uid}`);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
};
