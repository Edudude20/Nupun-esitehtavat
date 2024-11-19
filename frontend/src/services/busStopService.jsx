import axios from 'axios'

const baseURL = "https://data.foli.fi/siri/sm/"; //SM = Stop monitoring = Pysäkkimonitorointi

const getAllBuses = (id) => {
    const request = axios.get(`${baseURL}/${id}`);
    return (
        request.then((response) => response.data.result)
    );
}

export default {
    getAllBuses
}