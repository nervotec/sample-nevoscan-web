import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Create an axios instance with default config
const api = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
    async (config) => {
        let accessToken = localStorage.getItem('accessToken');
        
        if (accessToken) {
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            await getAccessToken();
        }
        return Promise.reject(error);
    }
);

export const uploadVideo = async (videoBlob, setJobID) => {
    const accessToken = await getAccessToken();
    const apiKey = await getAPIKey(accessToken);
    setJobID(apiKey);
    uploadVideoToServer(videoBlob, accessToken, apiKey);
};


const getAccessToken = async () => {
    const response = await axios.post(backendUrl.concat('/clientlogin'),{username: 'chathuranga', password: '123'});
    const accessToken = response.data.access_token;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
};

const uploadVideoToServer = async (videoBlob, accessToken, apiKey) => {
    try {
      const formData = new FormData();
  
      formData.append('file', videoBlob, 'recording.webm'); 
      formData.append(
        'data',
        JSON.stringify({
          uuid: apiKey, 
          meta_data: {},
        })
      );
  
      const response = await api.post('/submitscan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      console.log('Video uploaded successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error uploading video:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      throw error;
    }
  };

const getAPIKey = async (accessToken) => {
    const response = await api.post('/clientgeturl',{
        "host_name": "www.nervoscan.com"
    },{
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    const url = response.data.url;
    const apiKey = url.split('?api_key=')[1];
    return apiKey;
};

export const checkResults = async (jobID, setJobStatus) => {
    try {
      const response = await api.post(`/check`, {api_key: jobID},{
      });
      const data = response.data;
      console.log(data);
      const jobStatus = data.job_status;
      console.log(jobStatus);
      if (jobStatus === "Completed" || jobStatus === "Failed") {
        setJobStatus(jobStatus);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };


export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        console.log("No refresh token available");
        return null;
    }

    try {
        const response = await axios.post(backendUrl.concat('/refresh'), {}, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });

        if (response.data.success) {
            localStorage.setItem('accessToken', response.data.access_token);
            return { success: response.data.success, accessToken: response.data.access_token };
        } else {
            return { success: false, message: 'refreshing failed!' };
        }
    } catch (error) {
        return { success: false, message: 'refreshing failed!' };
    }
};

export const getResults = async (jobID) => {
    const response = await api.post(`/getcustomerinfo`, {
        "mode": "selection",
        "api_keys": [jobID]
    },);
    const data = await response.data;
    return data;
};
