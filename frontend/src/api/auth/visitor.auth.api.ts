import request from '../../utils/request'; // Import the base Axios instance

// Function for login request (REST API)
export const loginVisitor = async (email: string, password: string) => {
    try {
        const response = await request.post('/auth/loginVisitor', { // No need to repeat the base URL
            email,
            password,
        },{
            withCredentials: true, // Include cookies in every request
        });

        return response.data;
    } catch (error) {
        //console.error('Login failed:', error);
        throw error;
    }
};