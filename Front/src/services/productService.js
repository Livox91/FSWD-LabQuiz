// Simple and clean API service for product management
const getApiBaseUrl = () => {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;

    console.log('Detecting API URL for:', { hostname, protocol, href: window.location.href });

    // Development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3000';
    }

    // Production - use nginx proxy setup
    const apiUrl = `${protocol}//${hostname}/api`;
    console.log('Using nginx proxy API URL:', apiUrl);
    return apiUrl;
};

const API_BASE_URL = getApiBaseUrl();

class ProductService {
    constructor() {
        this.API_BASE_URL = API_BASE_URL;
        console.log('ProductService initialized with API_BASE_URL:', this.API_BASE_URL);
    }

    async getAllProducts() {
        try {
            console.log('Fetching all products...');
            const response = await fetch(`${this.API_BASE_URL}/products`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
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
            console.log('Fetching product by ID:', id);
            const response = await fetch(`${this.API_BASE_URL}/products/${id}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
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
            const response = await fetch(`${this.API_BASE_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
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