// Simple and robust API URL configuration
const getApiBaseUrl = () => {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    console.log('Detecting API URL for:', { hostname, protocol, href: window.location.href });
    
    // Development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3000';
    }
    
    // Production - try the most common Coolify pattern first
    // Most Coolify deployments use the same hostname with different ports
    // or subdomains
    const apiUrl = `${protocol}//${hostname}:3000`;
    console.log('Using production API URL:', apiUrl);
    
    return apiUrl;
};

const API_BASE_URL = getApiBaseUrl();

class ProductService {
    constructor() {
        console.log('ProductService initialized with API_BASE_URL:', API_BASE_URL);
        // Test the API endpoint on initialization
        this.testConnection();
    }
    
    async testConnection() {
        try {
            console.log('Testing API connection to:', `${API_BASE_URL}/health`);
            const response = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
            if (response.ok) {
                console.log('✅ API connection successful');
            } else {
                console.warn('⚠️ API responded with status:', response.status);
            }
        } catch (error) {
            console.error('❌ API connection failed:', error.message);
            console.log('Will try alternative URL patterns...');
        }
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