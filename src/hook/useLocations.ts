"use client";
import { useEffect, useState } from "react";
import { PaginatedResponse, ILocation } from "@/types/index.types";
import { fetchLocations } from "@/services/location.api";

export function useLocations(initialLimit = 10) {
    const [locations, setLocations] = useState<ILocation[]>([]);
    const [pagination, setPagination] = useState<
        PaginatedResponse<ILocation>["pagination_State"]
    >({
        total: 0,
        page: 1,
        limit: initialLimit,
        totalPages: 0,
    });
    const [loading, setLoading] = useState(false);

    const fetchData = async (page: number, limit = pagination.limit) => {
        setLoading(true);
        try {
            const data = await fetchLocations(page, limit);
            setLocations(data.data);
            setPagination(data.pagination_State);
        } catch (err) {
            console.error(err);
            setLocations([]);
        } finally {
            setLoading(false);
        }
    };

    // premier rendu
    useEffect(() => {
        fetchData(1, pagination.limit);
    }, [pagination.limit]);

    return { locations, pagination, loading, fetchData, setPagination };
}