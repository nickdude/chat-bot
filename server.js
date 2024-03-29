// const express = require('express');
// const https = require('https');  // Import the https module
// const socketIo = require('socket.io');
// const axios = require('axios');
// const { google } = require('googleapis');
// const keyFile = require('./service-account-key.json');
// const fs = require('fs');  // Import the fs module
// const app = express();

// const io = socketIo(https.createServer({
//     key: fs.readFileSync('/etc/letsencrypt/live/nucleus.actofit.com/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/nucleus.actofit.com/cert.pem'),
//     ca: fs.readFileSync('/etc/letsencrypt/live/nucleus.actofit.com/chain.pem')
// }, app));  // Pass the sslOptions to create an HTTPS server

// const projectId = 'calm-cairn-397005';
// const modelId = 'text-bison@001';
// const token = 128;
// let accessToken;

// // Maintain user-specific conversations
// const userConversations = {};

// app.use(express.static(__dirname + '/public'));

// io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Generate a unique user identifier
//     const userId = socket.id;

//     // Initialize conversation array for this user
//     userConversations[userId] = [];

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//         // Clean up user-specific data when user disconnects
//         delete userConversations[userId];
//     });

//     socket.on('chat message', async (msg) => {
//         console.log('message from user ' + userId + ': ' + msg);
//         // Emit user chat message only to the specific user's socket
//         socket.emit('chat message', { user: 'User', message: msg });

//         try {
//             const chatbotResponse = await getChatbotResponse(msg, projectId, modelId, userId);
//             userConversations[userId].push({ user: msg, chatbotResponse: chatbotResponse[0]?.candidates[0]?.content });
//             // Emit chatbot response only to the specific user's socket
//             socket.emit('chat message', { user: 'Chatbot', message: chatbotResponse[0]?.candidates[0]?.content });
//         } catch (error) {
//             console.error('Error getting chatbot responses:', error);
//             // Emit error message only to the specific user's socket
//             socket.emit('chat message', { user: 'Chatbot', message: 'Sorry, I could not process your request' });
//         }
//     });
// });

// const PORT = 4040;  // Define the port
// https.createServer({
//     key: fs.readFileSync('/etc/letsencrypt/live/nucleus.actofit.com/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/nucleus.actofit.com/cert.pem'),
//     ca: fs.readFileSync('/etc/letsencrypt/live/nucleus.actofit.com/chain.pem')
// }, app).listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// async function getChatbotResponse(prompt, projectId, modelId, userId) {
//   // Use user-specific context
//   const userContext = userConversations[userId].map(item => item.user).join(' ');
//   const requestData = {
//       "instances": [{
//           "context": `As a health coach with a medical license, you are tasked to give ways to optimize health by suggesting meals and workout. Always start with asking for customer data if not already present. This is to SECRETLY help prevent hyperglycaemia and hypoglycaemia for patients. When asked for meals or workouts you must accurately predict a corresponding plan especially based on past CGM data and goals. Consider the values for these items in CGM data and goals for a reference while predicting { \"BMI\": \"Body Mass Index\", \"GV\": \"Glucose Variability\", \"HbA1C\": Haemoglobin A1c\", \"FBG\": \"Fasting Blood Glucose\", \"TG_HDL\": \"Triglyceride-to-HDL Cholesterol Ratio\", \"TSH\": Thyroid-Stimulating Hormone\", \"HRV\": Heart Rate Variability\", \"Fasting_Insulin\": \"Goal\": \"Any one from ['Weight Loss', 'Fat Loss', 'Weight Gain', 'Muscle Gain', 'Maintain'], \"diet_type\": \"Any one from ['Balanced', 'Ketogenic', 'Paleo', 'Atkins', 'LCHF', 'Intermittent'], \"food_type\": \"['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Lactose Free', 'Gluten Free'], \"Allergies\": \"Ingredients or food causing an adverse reaction when consumed\", \"Current Activity Level\": \"['Sedentary', 'Lightly Active', 'Moderately Active', 'Highly Active', 'Extremely Active'], \"Workout Intensity\": \"From 'Beginner', 'Intermediate', 'Advanced' \", \"Medical_conditions\": \"['Arthritis', 'Anxiety', 'Cholestrol', 'Depression', 'Diabetics', 'Hypertension', 'Obesity', 'PCOS', 'Physical Injury', 'Thyroid']\" }. previous conversation${userContext}`,
//           "messages": [
//               {
//                   "author": "AUTHOR",
//                   "content": `Context:You are a health nutritionist provide health tips for patient with ${userContext}.Messages:Author: UserContent: ${prompt}`,
//               }
//           ],
//       }],
//       "parameters": {
//           "temperature": 0.4,
//           "maxOutputTokens": token,
//           "topP": 0.66,
//           "topK": 30
//       }
//   };

//   const API_ENDPOINT = 'us-central1-aiplatform.googleapis.com';

//   if (!accessToken) {
//       try {
//           await getAccessToken();
//       } catch (error) {
//           throw new Error('Error getting access token: ' + error);
//       }
//   }

//   try {
//       const response = await axios.post(
//           `https://${API_ENDPOINT}/v1/projects/${projectId}/locations/us-central1/publishers/google/models/chat-bison-32k@002:predict`,
//           requestData,
//           {
//               headers: {
//                   Authorization: `Bearer ${accessToken}`,
//                   'Content-Type': 'application/json',
//               },
//           }
//       );
//       if (response && response.data && response.data.predictions) {
//           return response.data.predictions;
//       } else {
//           throw new Error('Unable to connect google');
//       }
//   } catch (error) {
//       console.error("Error:", error);
//       throw new Error('Error making prediction request: ' + error);
//   }
// }

// async function getAccessToken() {
//   return new Promise((resolve, reject) => {
//       const jwtClient = new google.auth.JWT(
//           keyFile.client_email,
//           null,
//           keyFile.private_key,
//           ['https://www.googleapis.com/auth/cloud-platform']
//       );

//       jwtClient.authorize((err, tokens) => {
//           if (err) {
//               reject(err);
//           } else {
//               accessToken = tokens.access_token;
//               resolve();
//           }
//       });
//   });
// }

// Rest of your functions (getChatbotResponse, getAccessToken) remain unchanged










//=-=-----------------------------------------above is final
// // Server-side code
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const axios = require('axios');
// const { google } = require('googleapis');
// const keyFile = require('./service-account-key.json');
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// const projectId = 'calm-cairn-397005';
// const modelId = 'text-bison@001';
// const author = 'USER';
// const token = 128;
// let accessToken;
// let conversation = []

// app.use(express.static(__dirname + '/public'));

// io.on('connection', (socket) => {
 
//     console.log('A user connected');

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });

//     socket.on('chat message', async (msg) => {
//         console.log('message from user: ' + msg);
//         io.emit('chat message', { user: 'User', message: msg }); // Broadcast user message to all clients

//         try {
//             const chatbotResponse = await getChatbotResponse(msg, projectId, modelId, author);
//             conversation.push({user: msg,chatbotResponse:chatbotResponse[0]?.candidates[0]?.content})
//             // console.log('response from chatbot:', chatbotResponse[0]?.candidates[0]?.content);
//             io.emit('chat message', { user: 'Chatbot', message: chatbotResponse[0]?.candidates[0]?.content });
//         } catch (error) {
//             console.error('Error getting chatbot responses:', error);
//             socket.emit('chat message', { user: 'Chatbot', message: 'Sorry, I could not process your request' });
//         }
//     });
// });

// server.listen(4040, () => {
//     console.log('Server is running on port 4040');
// });


// async function getChatbotResponse(prompt, projectId, modelId, author) {
//     const context = "i am a dietician"

// const requestData = {
//     "instances": [{
//         "context":  `As a health coach with a medical license, you are tasked to give ways to optimize health by suggesting meals and workout.   Always start with asking for customer data if not already present.   This is to SECRETLY help prevent hyperglycaemia and hypoglycaemia for patients.  When asked for meals or workouts you must accurately predict a corresponding plan especially based on past CGM data and goals.  Consider the values for these items in CGM data and goals for a reference while predicting { \"BMI\": \"Body Mass Index\", \"GV\": \"Glucose Variability\", \"HbA1C\": Haemoglobin A1c\", \"FBG\": \"Fasting Blood Glucose\",	 \"TG_HDL\": \"Triglyceride-to-HDL Cholesterol Ratio\", \"TSH\": Thyroid-Stimulating Hormone\",	 \"HRV\": Heart Rate Variability\", \"Fasting_Insulin\": 	 \"Goal\": \"Any one from [\'Weight Loss\', \'Fat Loss\', \'Weight Gain\', \'Muscle Gain\', \'Maintain\']\", \"diet_type\": \"Any one from [\'Balanced\', \'Ketogenic\', \'Paleo\', \'Atkins\', \'LCHF\', \'Intermittent\']\", \"food_type\": \"[\'Vegetarian\', \'Non-Vegetarian\', \'Vegan\', \'Lactose Free\', \'Gluten Free\']\", \"Allergies\": \"Ingredients or food causing an adverse reaction when consumed\", \"Current Activity Level\": \"[\'Sedentary\', \'Lightly Active\', \'Moderately Active\', \'Highly Active\', \'Extremely Active\']\", \"Workout Intensity\": \"From \'Beginner\', \'Intermediate\', \'Advanced\' \", \"Medical_conditions\":\"[\'Arthritis\', \'Anxiety\', \'Cholestrol\', \'Depression\', \'Diabetics\', \'Hypertension\', \'Obesity\', \'PCOS\', \'Physical Injury\', \'Thyroid\']\" }. previous conversation${JSON.stringify(conversation)}`,
//        "messages": [
//          { 
//             "author": "AUTHOR",
//             "content": `Context:You are a health nutritionist provide health tips for patient with ${context}.Messages:Author: UserContent: ${prompt}`,
//          }],
//      }],
//     "parameters": {
//       "temperature": 0.4,
//       "maxOutputTokens": token,
//       "topP": 0.66,
//       "topK": 30
  
//     }
//   }
  
//     const API_ENDPOINT = 'us-central1-aiplatform.googleapis.com'
  
//     if (!accessToken) {
//         try {
//             await getAccessToken();
//         } catch (error) {
//           return res.status(400).json({
//             code: 0,
//             msg: 'ERROR',
//             err: error,
//           });
//         }
//       }
       
//   try {
//     const response = await axios.post(
//       `https://${API_ENDPOINT}/v1/projects/${projectId}/locations/us-central1/publishers/google/models/chat-bison-32k@002:predict`,
//       requestData,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     if (response && response.data && response.data.predictions) {
//       return response.data.predictions
       
//     } else {
//       return 'Unable to connect google'
//     }
//   } catch (error) {
//     console.log("error",error)
//     if (error.response && error.response.status === 401) {
//       try {
//         await getAccessToken();
//         return await getChatbotResponse(prompt, projectId, modelId, author,msg);
//       } catch (err) {
//         return err.message
//       }
//     }

//   }
// }

// async function getAccessToken() {
  
//         return new Promise((resolve, reject) => {
//           const jwtClient = new google.auth.JWT(
//             keyFile.client_email,
//             null,
//             keyFile.private_key,
//             ['https://www.googleapis.com/auth/cloud-platform']
//           );
      
//           jwtClient.authorize((err, tokens) => {
//             if (err) {
//               reject(err);
//             } else {
//                 accessToken = tokens.access_token;
//               resolve();
//             }
//           });
//         });
// }

//===========================================working level A========================================
// Server-side code
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const axios = require('axios');
// const { google } = require('googleapis');
// const keyFile = require('./service-account-key.json');
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// const projectId = 'calm-cairn-397005';
// const modelId = 'text-bison@001';
// const token = 128;
// let accessToken;

// // Maintain user-specific conversations
// const userConversations = {};

// app.use(express.static(__dirname + '/public'));

// io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Generate a unique user identifier
//     const userId = socket.id;

//     // Initialize conversation array for this user
//     userConversations[userId] = [];

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//         // Clean up user-specific data when user disconnects
//         delete userConversations[userId];
//     });

//     socket.on('chat message', async (msg) => {
//         console.log('message from user ' + userId + ': ' + msg);
//         io.emit('chat message', { user: 'User', message: msg }); // Broadcast user message to all clients

//         try {
//             const chatbotResponse = await getChatbotResponse(msg, projectId, modelId, userId);
//             userConversations[userId].push({ user: msg, chatbotResponse: chatbotResponse[0]?.candidates[0]?.content });
//             io.to(userId).emit('chat message', { user: 'Chatbot', message: chatbotResponse[0]?.candidates[0]?.content });
//         } catch (error) {
//             console.error('Error getting chatbot responses:', error);
//             socket.emit('chat message', { user: 'Chatbot', message: 'Sorry, I could not process your request' });
//         }
//     });
// });

// server.listen(4040, () => {
//     console.log('Server is running on port 4040');
// });


// async function getChatbotResponse(prompt, projectId, modelId, userId) {
//     // Use user-specific context
//     const userContext = userConversations[userId].map(item => item.user).join(' ');
//     const requestData = {
//         "instances": [{
//             "context": `As a health coach with a medical license, you are tasked to give ways to optimize health by suggesting meals and workout. Always start with asking for customer data if not already present. This is to SECRETLY help prevent hyperglycaemia and hypoglycaemia for patients. When asked for meals or workouts you must accurately predict a corresponding plan especially based on past CGM data and goals. Consider the values for these items in CGM data and goals for a reference while predicting { \"BMI\": \"Body Mass Index\", \"GV\": \"Glucose Variability\", \"HbA1C\": Haemoglobin A1c\", \"FBG\": \"Fasting Blood Glucose\", \"TG_HDL\": \"Triglyceride-to-HDL Cholesterol Ratio\", \"TSH\": Thyroid-Stimulating Hormone\", \"HRV\": Heart Rate Variability\", \"Fasting_Insulin\": \"Goal\": \"Any one from ['Weight Loss', 'Fat Loss', 'Weight Gain', 'Muscle Gain', 'Maintain'], \"diet_type\": \"Any one from ['Balanced', 'Ketogenic', 'Paleo', 'Atkins', 'LCHF', 'Intermittent'], \"food_type\": \"['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Lactose Free', 'Gluten Free'], \"Allergies\": \"Ingredients or food causing an adverse reaction when consumed\", \"Current Activity Level\": \"['Sedentary', 'Lightly Active', 'Moderately Active', 'Highly Active', 'Extremely Active'], \"Workout Intensity\": \"From 'Beginner', 'Intermediate', 'Advanced' \", \"Medical_conditions\": \"['Arthritis', 'Anxiety', 'Cholestrol', 'Depression', 'Diabetics', 'Hypertension', 'Obesity', 'PCOS', 'Physical Injury', 'Thyroid']\" }. previous conversation${userContext}`,
//             "messages": [
//                 {
//                     "author": "AUTHOR",
//                     "content": `Context:You are a health nutritionist provide health tips for patient with ${userContext}.Messages:Author: UserContent: ${prompt}`,
//                 }
//             ],
//         }],
//         "parameters": {
//             "temperature": 0.4,
//             "maxOutputTokens": token,
//             "topP": 0.66,
//             "topK": 30
//         }
//     };

//     const API_ENDPOINT = 'us-central1-aiplatform.googleapis.com';

//     if (!accessToken) {
//         try {
//             await getAccessToken();
//         } catch (error) {
//             return res.status(400).json({
//                 code: 0,
//                 msg: 'ERROR',
//                 err: error,
//             });
//         }
//     }

//     try {
//         const response = await axios.post(
//             `https://${API_ENDPOINT}/v1/projects/${projectId}/locations/us-central1/publishers/google/models/chat-bison-32k@002:predict`,
//             requestData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//         if (response && response.data && response.data.predictions) {
//             return response.data.predictions;
//         } else {
//             return 'Unable to connect google';
//         }
//     } catch (error) {
//         console.log("error", error);
//         if (error.response && error.response.status === 401) {
//             try {
//                 await getAccessToken();
//                 return await getChatbotResponse(prompt, projectId, modelId, userId);
//             } catch (err) {
//                 return err.message;
//             }
//         }
//     }
// }

// async function getAccessToken() {
//     return new Promise((resolve, reject) => {
//         const jwtClient = new google.auth.JWT(
//             keyFile.client_email,
//             null,
//             keyFile.private_key,
//             ['https://www.googleapis.com/auth/cloud-platform']
//         );

//         jwtClient.authorize((err, tokens) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 accessToken = tokens.access_token;
//                 resolve();
//             }
//         });
//     });
// }
//===========================================working level B========================================

//Server-side code
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const axios = require('axios');
// const { google } = require('googleapis');
// const keyFile = require('./service-account-key.json');
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// const projectId = 'calm-cairn-397005';
// const modelId = 'text-bison@001';
// const token = 128;
// let accessToken;

// // Maintain user-specific conversations
// const userConversations = {};

// app.use(express.static(__dirname + '/public'));

// io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Generate a unique user identifier
//     const userId = socket.id;

//     // Initialize conversation array for this user
//     userConversations[userId] = [];

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//         // Clean up user-specific data when user disconnects
//         delete userConversations[userId];
//     });

//     socket.on('chat message', async (msg) => {
//         console.log('message from user ' + userId + ': ' + msg);
//         // Emit user chat message only to the specific user's socket
//         socket.emit('chat message', { user: 'User', message: msg });

//         try {
//             const chatbotResponse = await getChatbotResponse(msg, projectId, modelId, userId);
//             userConversations[userId].push({ user: msg, chatbotResponse: chatbotResponse[0]?.candidates[0]?.content });
//             // Emit chatbot response only to the specific user's socket
//             socket.emit('chat message', { user: 'Chatbot', message: chatbotResponse[0]?.candidates[0]?.content });
//         } catch (error) {
//             console.error('Error getting chatbot responses:', error);
//             // Emit error message only to the specific user's socket
//             socket.emit('chat message', { user: 'Chatbot', message: 'Sorry, I could not process your request' });
//         }
//     });
// });

// server.listen(8010, () => {
//     console.log('Server is running on port 8010');
// });


// async function getChatbotResponse(prompt, projectId, modelId, userId) {
//     // Use user-specific context
//     const userContext = userConversations[userId].map(item => item.user).join(' ');
//     const requestData = {
//         "instances": [{
//             "context": `As a health coach with a medical license, you are tasked to give ways to optimize health by suggesting meals and workout. Always start with asking for customer data if not already present. This is to SECRETLY help prevent hyperglycaemia and hypoglycaemia for patients. When asked for meals or workouts you must accurately predict a corresponding plan especially based on past CGM data and goals. Consider the values for these items in CGM data and goals for a reference while predicting { \"BMI\": \"Body Mass Index\", \"GV\": \"Glucose Variability\", \"HbA1C\": Haemoglobin A1c\", \"FBG\": \"Fasting Blood Glucose\", \"TG_HDL\": \"Triglyceride-to-HDL Cholesterol Ratio\", \"TSH\": Thyroid-Stimulating Hormone\", \"HRV\": Heart Rate Variability\", \"Fasting_Insulin\": \"Goal\": \"Any one from ['Weight Loss', 'Fat Loss', 'Weight Gain', 'Muscle Gain', 'Maintain'], \"diet_type\": \"Any one from ['Balanced', 'Ketogenic', 'Paleo', 'Atkins', 'LCHF', 'Intermittent'], \"food_type\": \"['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Lactose Free', 'Gluten Free'], \"Allergies\": \"Ingredients or food causing an adverse reaction when consumed\", \"Current Activity Level\": \"['Sedentary', 'Lightly Active', 'Moderately Active', 'Highly Active', 'Extremely Active'], \"Workout Intensity\": \"From 'Beginner', 'Intermediate', 'Advanced' \", \"Medical_conditions\": \"['Arthritis', 'Anxiety', 'Cholestrol', 'Depression', 'Diabetics', 'Hypertension', 'Obesity', 'PCOS', 'Physical Injury', 'Thyroid']\" }. previous conversation${userContext}`,
//             "messages": [
//                 {
//                     "author": "AUTHOR",
//                     "content": `Context:You are a health nutritionist provide health tips for patient with ${userContext}.Messages:Author: UserContent: ${prompt}`,
//                 }
//             ],
//         }],
//         "parameters": {
//             "temperature": 0.4,
//             "maxOutputTokens": token,
//             "topP": 0.66,
//             "topK": 30
//         }
//     };

//     const API_ENDPOINT = 'us-central1-aiplatform.googleapis.com';

//     if (!accessToken) {
//         try {
//             await getAccessToken();
//         } catch (error) {
//             throw new Error('Error getting access token: ' + error);
//         }
//     }

//     try {
//         const response = await axios.post(
//             `https://${API_ENDPOINT}/v1/projects/${projectId}/locations/us-central1/publishers/google/models/chat-bison-32k@002:predict`,
//             requestData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//         if (response && response.data && response.data.predictions) {
//             return response.data.predictions;
//         } else {
//             throw new Error('Unable to connect google');
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         throw new Error('Error making prediction request: ' + error);
//     }
// }

// async function getAccessToken() {
//     return new Promise((resolve, reject) => {
//         const jwtClient = new google.auth.JWT(
//             keyFile.client_email,
//             null,
//             keyFile.private_key,
//             ['https://www.googleapis.com/auth/cloud-platform']
//         );

//         jwtClient.authorize((err, tokens) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 accessToken = tokens.access_token;
//                 resolve();
//             }
//         });
//     });
// }

//==================================with user data

//Server-side code
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const { google } = require('googleapis');
const keyFile = require('./service-account-key.json');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const { URL } = require('url');

const projectId = 'calm-cairn-397005';
const modelId = 'text-bison@001';
const token = 128;
let accessToken;

// Maintain user-specific conversations
const userConversations = {};

app.use(express.static(__dirname + '/public'));

// Fetch userProfile and userData before connection
async function fetchUserData(userId) {
  let userProfile = null;
  let userData = null;

  try {
      const userProfileResponse = await axios.get(`https://nucleus.actofit.com:3000/smartscale/v1/user/user_get/${userId}`);
      console.log("===============",userProfileResponse)
      userProfile = userProfileResponse.data;
  } catch (error) {
      // console.error('Error fetching userProfile:', error);
      userProfile = null;
  }

  try {
      //const userDataResponse = await axios.get(`https://nucleus.actofit.com:3000/smartscale/v1/metrics/getlatest/${userId}`);
      const userDataResponse = await axios.get(`https://nucleus.actofit.com:3000/smartscale/v1/metrics/get/${userId}`);
      console.log("===============",userDataResponse)
      userData = userDataResponse.data;
  } catch (error) {
      // console.error('Error fetching userData:', error);
      userData = null;
  }

  return {
      userProfile,
      userData
  };
}

// async function fetchUserData(userId) {
//     try {
//      const userProfileResponse = await axios.get(`https://nucleus.actofit.com:3000/smartscale/v1/user/user_get/${userId}`);
//      const userDataResponse = await axios.get(`https://nucleus.actofit.com:3000/smartscale/v1/metrics/getlatest/${userId}`);
      
//       return {
//         userProfile: userProfileResponse?.data,
//         userData: userDataResponse?.data
//       };
//     } catch (error) {
     
//       let userProfile = null;
//       let userData = null;

//       if (error.config.url.includes('user_get')) {
//           userProfile = null;
//       } else if (error.config.url.includes('metrics/getlatest')) {
//           userData = null;
//       }

//       return {
//           userProfile,
//           userData
//       };
//     }
// }

io.on('connection', async (socket) => {
    console.log('A user connected');

    // Generate a unique user identifier
    const userId = socket.id;
    //const userID = '65dc850c6a86a49f9d1aa377'
    //const q = socket.handshake.headers.referer
      const q = socket.handshake.query.userID
        console.log(q)
    const userID = q
     // const url = q ? new URL(q): console.log("Error:",socket.handshake);
      //const userID = q ? url.searchParams.get('userID'): '';
   
  

    try {
        const { 
          userProfile, 
          userData } = await fetchUserData(userID);
        
        const contextData = {
            userProfile,
            userData,
            conversation: [] // Initialize conversation array for this user
        };
          console.log(contextData)
        // Store context data for the user
        userConversations[userId] = contextData;

        socket.on('disconnect', () => {
            console.log('User disconnected');
            // Clean up user-specific data when user disconnects
            delete userConversations[userId];
        });

        socket.on('chat message', async (msg) => {
            console.log('message from user ' + userId + ': ' + msg);
            // Emit user chat message only to the specific user's socket
            socket.emit('chat message', { user: 'User', message: msg });

            try {
                const chatbotResponse = await getChatbotResponse(msg, projectId, modelId, userId, contextData);
                userConversations[userId].conversation.push({ user: msg, chatbotResponse: chatbotResponse[0]?.candidates[0]?.content });
                // Emit chatbot response only to the specific user's socket
                socket.emit('chat message', { user: 'Chatbot', message: chatbotResponse[0]?.candidates[0]?.content });
            } catch (error) {
                console.error('Error getting chatbot responses:', error);
                // Emit error message only to the specific user's socket
                socket.emit('chat message', { user: 'Chatbot', message: 'Sorry, I could not process your request' });
            }
        });
    } catch (error) {
        console.error('Error initializing user context:', error);
        socket.emit('chat message', { user: 'Chatbot', message: 'Sorry, I could not initialize your context' });
    }
});

server.listen(8010, () => {
    console.log('Server is running on port 8010');
});

async function getChatbotResponse(prompt, projectId, modelId, userId, contextData) {
    // Use user-specific context
    const userContext = JSON.stringify(contextData);
    const requestData = {
        "instances": [{
            "context": `As a health coach with a medical license, you are tasked to give ways to optimize health by suggesting meals and workout. Always start with asking for customer data if not already present. This is to SECRETLY help prevent hyperglycaemia and hypoglycaemia for patients. When asked for meals or workouts you must accurately predict a corresponding plan especially based on past CGM data and goals. Consider the values for these items in CGM data and goals for a reference while predicting { \"BMI\": \"Body Mass Index\", \"GV\": \"Glucose Variability\", \"HbA1C\": Haemoglobin A1c\", \"FBG\": \"Fasting Blood Glucose\", \"TG_HDL\": \"Triglyceride-to-HDL Cholesterol Ratio\", \"TSH\": Thyroid-Stimulating Hormone\", \"HRV\": Heart Rate Variability\", \"Fasting_Insulin\": \"Goal\": \"Any one from ['Weight Loss', 'Fat Loss', 'Weight Gain', 'Muscle Gain', 'Maintain'], \"diet_type\": \"Any one from ['Balanced', 'Ketogenic', 'Paleo', 'Atkins', 'LCHF', 'Intermittent'], \"food_type\": \"['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Lactose Free', 'Gluten Free'], \"Allergies\": \"Ingredients or food causing an adverse reaction when consumed\", \"Current Activity Level\": \"['Sedentary', 'Lightly Active', 'Moderately Active', 'Highly Active', 'Extremely Active'], \"Workout Intensity\": \"From 'Beginner', 'Intermediate', 'Advanced' \", \"Medical_conditions\": \"['Arthritis', 'Anxiety', 'Cholestrol', 'Depression', 'Diabetics', 'Hypertension', 'Obesity', 'PCOS', 'Physical Injury', 'Thyroid']\" }. previous conversation${userContext}`,
            "messages": [
                {
                    "author": "AUTHOR",
                    "content": `Context:You are a health nutritionist provide health tips for patient with ${userContext}.Messages:Author: UserContent: ${prompt}`,
                }
            ],
        }],
        "parameters": {
            "temperature": 0.4,
            "maxOutputTokens": token,
            "topP": 0.66,
            "topK": 30
        }
    };

    const API_ENDPOINT = 'us-central1-aiplatform.googleapis.com';

    if (!accessToken) {
        try {
            await getAccessToken();
        } catch (error) {
            throw new Error('Error getting access token: ' + error);
        }
    }

    try {
        const response = await axios.post(
            `https://${API_ENDPOINT}/v1/projects/${projectId}/locations/us-central1/publishers/google/models/chat-bison-32k@002:predict`,
            requestData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
           
        if (response && response.data && response.data.predictions) {
            return response.data.predictions;
        } else {
            throw new Error('Unable to connect google');
        }
    } catch (error) {
        await getAccessToken()
        getChatbotResponse(prompt, projectId, modelId, userId, contextData)
        // console.error("Error:", error);
        // throw new Error('Error making prediction request: ' + error);
    }
}

async function getAccessToken() {
    return new Promise((resolve, reject) => {
        const jwtClient = new google.auth.JWT(
            keyFile.client_email,
            null,
            keyFile.private_key,
            ['https://www.googleapis.com/auth/cloud-platform']
        );

        jwtClient.authorize((err, tokens) => {
            if (err) {
                reject(err);
            } else {
                accessToken = tokens.access_token;
                resolve();
            }
        });
    });
}
