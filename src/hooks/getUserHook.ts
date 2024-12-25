"use client";

import { fetchUserByUID, fetchUsers, fetchUsersByPage } from '@/app/api/getUsers';
import { useQuery } from '@tanstack/react-query';

export const useUsers = () => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: [`users`],
        queryFn: fetchUsers,
    });

    return { data, isPending, isError, error };
};

export const useUsersByPage = (page: number, pageSize: number) => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: [`users - ${page} - ${pageSize}`, page, pageSize],
        queryFn: fetchUsersByPage
    });

    return { data, isPending, isError, error };
};

export const useUserByUID = (uid: string) => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: [`users - ${uid}`, uid],
        queryFn: fetchUserByUID
    });

    return { data, isPending, isError, error };
};