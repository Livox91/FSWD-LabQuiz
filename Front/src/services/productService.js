// Robust API URL configuration for different deployment scenarios
const getApiBaseUrl = () => {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const port = window.location.port;

    console.log('Detecting API URL for:', { hostname, protocol, port, href: window.location.href });

    // Development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3000';
    }

    // Production deployment patterns
    // For Coolify and similar platforms, try multiple common patterns

    // Most common: Backend is on a subdomain
    if (hostname.includes('.')) {
        const domain = hostname.replace(/^[^.]+\./, ''); // Remove subdomain
        const backendUrl = `${protocol}//api.${domain}`;
        console.log('Trying API subdomain:', backendUrl);
        return backendUrl;
    }

    // Fallback: Same domain with /api path (reverse proxy setup)
    const fallbackUrl = `${protocol}//${hostname}/api`;
    console.log('Using fallback API URL:', fallbackUrl);
    return fallbackUrl;
};

const API_BASE_URL = getApiBaseUrl();

class ProductService {
    constructor() {
        this.API_BASE_URL = API_BASE_URL;
        this.fallbackUrls = this.getFallbackUrls();
        console.log('ProductService initialized with API_BASE_URL:', this.API_BASE_URL);
        console.log('Fallback URLs:', this.fallbackUrls);
        // Test the API endpoint on initialization
        this.testConnection();
    }

    getFallbackUrls() {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;

        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return ['http://localhost:3000'];
        }

        return [
            `${protocol}//api.${hostname.replace(/^[^.]+\./, '')}`, // API subdomain
            `${protocol}//${hostname}/api`, // Same domain with /api path
            `${protocol}//backend.${hostname.replace(/^[^.]+\./, '')}`, // Backend subdomain
            `${protocol}//${hostname}:3000`, // Same domain with port (last resort)
        ];
    }

    async testConnection() {
        for (const url of [this.API_BASE_URL, ...this.fallbackUrls]) {
            try {
                console.log('Testing API connection to:', `${url}/health`);
                const response = await fetch(`${url}/health`, {
                    method: 'GET',
                    signal: AbortSignal.timeout(5000) // 5 second timeout
                });
                if (response.ok) {
                    console.log('✅ API connection successful with:', url);
                    this.API_BASE_URL = url; // Update to working URL
                    return;
                }
            } catch (error) {
                console.warn('❌ API connection failed for:', url, error.message);
            }
        }
        console.error('❌ All API URLs failed. Using original URL:', this.API_BASE_URL);
    }

    async makeRequest(endpoint, options = {}) {
        const urls = [this.API_BASE_URL, ...this.fallbackUrls];

        for (const baseUrl of urls) {
            try {
                console.log(`Trying ${endpoint} with base URL:`, baseUrl);
                const response = await fetch(`${baseUrl}${endpoint}`, options);

                if (response.ok) {
                    // Update working URL for future requests
                    if (baseUrl !== this.API_BASE_URL) {
                        console.log('Switching to working API URL:', baseUrl);
                        this.API_BASE_URL = baseUrl;
                    }
                    return response;
                }
            } catch (error) {
                console.warn(`Request failed for ${baseUrl}${endpoint}:`, error.message);
                continue;
            }
        }

        throw new Error(`All API URLs failed for ${endpoint}`);
    }

    async getAllProducts() {
        try {
            console.log('Fetching all products...');
            const response = await this.makeRequest('/products');
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
            console.log('Fetching product by ID:', id);
            const response = await this.makeRequest(`/products/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    }

    async createProduct(productData) {
        try {
            console.log('Creating product:', productData);
            const response = await this.makeRequest('/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });
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