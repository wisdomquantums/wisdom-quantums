import { useState, useEffect } from 'react';
import { apiService } from '../api/api';

/**
 * Custom hook to fetch data from API
 * @param {string} endpoint - API endpoint name (e.g., 'services', 'projects')
 * @param {boolean} fetchOnMount - Whether to fetch data on component mount
 */
export const useAPI = (endpoint, fetchOnMount = true) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            let response;
            switch (endpoint) {
                case 'services':
                    response = await apiService.getServices();
                    break;
                case 'projects':
                    response = await apiService.getProjects();
                    break;
                case 'blogs':
                    response = await apiService.getBlogs();
                    break;
                case 'testimonials':
                    response = await apiService.getTestimonials();
                    break;
                case 'careers':
                    response = await apiService.getCareers();
                    break;
                case 'technologies':
                    response = await apiService.getTechnologies();
                    break;
                case 'team':
                    response = await apiService.getTeam();
                    break;
                case 'gallery':
                    response = await apiService.getGallery();
                    break;
                case 'hero-sections':
                    response = await apiService.getHeroSections();
                    break;
                case 'business-solutions':
                    response = await apiService.getBusinessSolutions();
                    break;
                case 'about-page':
                    response = await apiService.getAboutPage();
                    break;
                case 'how-we-work':
                    response = await apiService.getHowWeWork();
                    break;
                case 'founders':
                    response = await apiService.getFounders();
                    break;
                case 'why-choose-us':
                    response = await apiService.getWhyChooseUs();
                    break;
                case 'business-development':
                    response = await apiService.getBusinessDevelopment();
                    break;
                case 'vision-mission':
                    response = await apiService.getVisionMission();
                    break;
                case 'it-solutions':
                    response = await apiService.getITSolutions();
                    break;
                default:
                    throw new Error(`Unknown endpoint: ${endpoint}`);
            }

            setData(response.data.data || []);
        } catch (err) {
            console.error(`Error fetching ${endpoint}:`, err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (fetchOnMount) {
            fetchData();
        }
    }, [endpoint, fetchOnMount]);

    return { data, loading, error, refetch: fetchData };
};

/**
 * Hook to fetch single item by ID
 */
export const useAPIItem = (endpoint, id) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            if (!id) return;

            try {
                setLoading(true);
                setError(null);

                let response;
                switch (endpoint) {
                    case 'services':
                        response = await apiService.getServiceById(id);
                        break;
                    case 'projects':
                        response = await apiService.getProjectById(id);
                        break;
                    case 'blogs':
                        response = await apiService.getBlogById(id);
                        break;
                    case 'careers':
                        response = await apiService.getCareerById(id);
                        break;
                    default:
                        throw new Error(`Unknown endpoint: ${endpoint}`);
                }

                setData(response.data.data);
            } catch (err) {
                console.error(`Error fetching ${endpoint} item:`, err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [endpoint, id]);

    return { data, loading, error };
};
