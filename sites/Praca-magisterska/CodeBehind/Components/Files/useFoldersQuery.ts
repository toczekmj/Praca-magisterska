import { Genres } from "@/Generated/appwrite/types";
import { GetFolders } from "@/lib/Database/Services/FolderService";
import { queryKeys } from "@/lib/TanStack/queryKeys";
import { useQuery } from "@tanstack/react-query";

export type UseFoldersQueryResult = {
    data: Genres[] | null;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string | null;
}

export function useFoldersQuery(): UseFoldersQueryResult {
    const response = useQuery({
        queryKey: queryKeys.folders,
        queryFn: () => GetFolders(),
    });

    const result = {
        data: response.data ?? null,
        isLoading: response.isLoading,
        isError: response.isError,
        errorMessage: response.error?.message ?? null
    };

    return result;
}