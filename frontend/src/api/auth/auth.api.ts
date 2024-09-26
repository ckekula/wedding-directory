import request from '../../utils/request'; // Import the base Axios instance

// Function for login request (REST API)
export const login = async (email: string, password: string) => {
    try {
        const response = await request.post('/auth/login', { // No need to repeat the base URL
            email,
            password,
        });

        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};