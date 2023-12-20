# Gurucool Quiz Application
  #### The Quiz Application is an interactive platform for seamless quiz creation and participation. With robust authentication, automated status updates, and thoughtful rate limiting, it offers an engaging experience. Ideal for educators, businesses, and quiz enthusiasts, it fosters dynamic learning and knowledge sharing in a secure and user-friendly environment.

## Table of Contents
 * [Authentication](#authentication)

 * [Rate Limiting](#rate-limiting)
 * [User Routes](#user-routes)
    1. Register User
    2. Login User

 * [Quiz Routes](#quiz-routes)
   1. Create Quiz
   2. Get Active Quizzes
   3. Get All Quizzes
   4. Get Active Quiz by ID

 * [Middleware](#middleware)

 * [Rate Limiter](#rate-limiter)

 * [Job Schedulings](#job-scheduling)

 * [Deployment](#deployment-link)

## Authentication
To access certain endpoints, you need to include a valid JSON Web Token (JWT) in the Authorization header of your requests. The token can be obtained by logging in using the Login User endpoint.

## Rate Limiting
For security reasons, the API enforces rate limiting. This means that a client is allowed a limited number of requests within a specific time window. If the limit is exceeded, further requests will be denied with a 429 Too Many Requests status code.

## User Routes
  `Register User`

* Endpoint: POST /user/register
 * Description: Registers a new user.
 * Request Body:

            {
            "name": "John Doe",
            "email": "john@example.com",
            "password": "securepassword"
            }
 * Success Response:

        {
        "message": "User Register Successfully"
        }
 * Error Response (if email already exists):

            {
            "message": "Email already exists"
            } 
            
  `Login User`

 * Endpoint: POST /user/login
 * Description: Logs in an existing user.
* Request Body:

        {
        "email": "john@example.com",
        "password": "securepassword"
        }
 * Success Response:

        {
        "message": "Login Successfully",
        "token": "[JWT Token]"
        }
* Error Response (if credentials are incorrect):

        {
        "message": "Wrong credentials"
        }
## Quiz Routes
`Create Quiz`

 * Endpoint: POST /quizzes
 * Description: Creates a new quiz.
* Request Body:

        {
        "question": "What is the capital of France?",
        "option": ["Berlin", "Paris", "London"],
        "rightAnswer": "Paris",
        "startDate": "2023-01-01T00:00:00Z",
        "endDate": "2023-01-02T00:00:00Z"
     }

 * Success Response:

        {
        "message": "Quiz created successfully"
        }
 * Error Response (if there is an error):

        {
        "message": "Getting error while creating question"
        }
`Get Active Quizzes`

 * Endpoint: GET /quizzes/active
 * Description: Retrieves a list of active quizzes.
 * Success Response:

        [
        {
            "question": "What is the capital of France?",
            "option": ["Berlin", "Paris", "London"],
            "rightAnswer": "Paris",
            "startDate": "2023-01-01T00:00:00Z",
            "endDate": "2023-01-02T00:00:00Z",
            "status": "active"
        },
         {
            "question": "What is the capital of France?",
            "option": ["Berlin", "Paris", "London"],
            "rightAnswer": "Paris",
            "startDate": "2023-01-01T00:00:00Z",
            "endDate": "2023-01-02T00:00:00Z",
            "status": "active"
        },
        ]
 * Error Response (if there are no active quizzes):

         {"message":"No active quiz"}
`Get All Quizzes`

 * Endpoint: GET /quizzes/all
 * Description: Retrieves a list of all quizzes.
 * Success Response:

        [
        {
            "question": "What is the capital of France?",
            "option": ["Berlin", "Paris", "London"],
            "rightAnswer": "Paris",
            "startDate": "2023-01-01T00:00:00Z",
            "endDate": "2023-01-02T00:00:00Z"
        },
        // Additional quizzes...
        ]
`Get Active Quiz by ID`

 * Endpoint: GET /quizzes/:id
 * Description: Retrieves the details of an active quiz by ID.
 * Success Response (if quiz has ended):

        {
        "correct": "Paris"
        }
* Error Response (if quiz is not found):

        {
        "message": "Quiz not found"
        }
 * Error Response (if quiz has not ended):

        {
        "message": "Quiz not ended"
        }
## Middleware
 ### Authentication Middleware 

Purpose: Ensures that the user is authenticated by checking for a valid JWT token in the Authorization header.
 * Success Response: Continues to the next middleware or route.
 * Error Response (if not authenticated):

        {
        "message": "Please login first"
        }
### Rate Limiter
Purpose: Limits the number of requests a client can make within a specific time window.
Error Response (if rate limit exceeded):

## Job Scheduling
 * Purpose: Updates the status of quizzes based on their start and end dates.
 * Response: This is a background job that runs periodically and doesn't provide direct responses.


 ### Deployment Link
  [Link](https://kind-pink-caridea-cape.cyclic.app/)
