// Detect environment and set appropriate API URL
const getApiBaseUrl = () => {
    // If running locally (development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:3000';
    }

    // If running in production (same domain, different path or subdomain)
    // For Coolify deployments, typically the backend is on the same host with /api prefix
    // or a subdomain like api.yourdomain.com
    const baseUrl = `${window.location.protocol}//${window.location.hostname}`;

    // Try common patterns for Coolify deployments
    if (window.location.port) {
        // If there's a port, it might be a direct backend access
        return `${baseUrl}:3000`;
    }

    // Default fallback - try relative API or subdomain
    return `${baseUrl}/api`;
};

const API_BASE_URL = getApiBaseUrl();

class ProductService {
    constructor() {
        console.log('ProductService initialized with API_BASE_URL:', API_BASE_URL);
    }

    async getAllProducts() {
        try {
            console.log('Fetching products from:', `${API_BASE_URL}/products`);
            const response = await fetch(`${API_BASE_URL}/products`);
            console.log('Response status:', response.status);
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const data = await response.json();
            console.log('Products fetched:', data);
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            console.log('Fetching product by ID from:', `${API_BASE_URL}/products/${id}`);
            const response = await fetch(`${API_BASE_URL}/products/${id}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    }

    async createProduct(productData) {
        try {
            console.log('Creating product:', productData);
            console.log('POST to:', `${API_BASE_URL}/products`);
            const response = await fetch(`${API_BASE_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });
            console.log('Create response status:', response.status);
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Create error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const result = await response.json();
            console.log('Product created:', result);
            return result;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }
}

export default new ProductService();