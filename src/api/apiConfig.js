import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080', // Set the base URL for all requests
    headers: {
        // You can set default headers here, if needed
        'Content-Type': 'application/json',
        // Add any other headers you may need
    }
});