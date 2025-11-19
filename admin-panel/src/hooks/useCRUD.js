import { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function useCRUD(endpoint) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10, // Changed from 100 to 10 for better pagination
        total: 0,
        pages: 0,
    });

    const fetchData = async (page = 1, limit = 10) => {
        try {
            setLoading(true);
            const response = await api.get(`/${endpoint}?page=${page}&limit=${limit}`);
            setData(response.data.data);
            if (response.data.pagination) {
                setPagination(response.data.pagination);
            }
        } catch (error) {
            toast.error(`Failed to fetch ${endpoint}`);
        } finally {
            setLoading(false);
        }
    };

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.pages) {
            fetchData(newPage, pagination.limit);
        }
    };

    const createItem = async (itemData, isMultipart = false) => {
        try {
            const config = isMultipart ? {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            } : {};

            const response = await api.post(`/${endpoint}`, itemData, config);
            toast.success(response.data.message || 'Created successfully');
            fetchData(pagination.page, pagination.limit);
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to create';
            toast.error(message);
            return { success: false, message };
        }
    };

    const updateItem = async (id, itemData, isMultipart = false) => {
        try {
            const config = isMultipart ? {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            } : {};

            const response = await api.put(`/${endpoint}/${id}`, itemData, config);
            toast.success(response.data.message || 'Updated successfully');
            fetchData(pagination.page, pagination.limit);
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update';
            toast.error(message);
            return { success: false, message };
        }
    };

    const deleteItem = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) {
            return { success: false };
        }

        try {
            const response = await api.delete(`/${endpoint}/${id}`);
            toast.success(response.data.message || 'Deleted successfully');
            fetchData(pagination.page, pagination.limit);
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to delete';
            toast.error(message);
            return { success: false, message };
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        data,
        loading,
        pagination,
        fetchData,
        changePage,
        createItem,
        updateItem,
        deleteItem,
    };
}
