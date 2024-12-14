# no-one-uses-kebab-case-except-web-devs

Survey App for Experiment 2 of the course "Experimental and Evaluation" of Università della Svizzera Italiana

## How to Start the Application

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Setting Up the Backend

1.  **Navigate to the backend directory:**

    ```sh
    cd backend
    ```

2.  **Create a .env file in the backend directory with the following content:**

    ```
    MONGODB_URI=your_mongodb_connection_string
    CORS_ORIGIN=http://localhost:5173
    ```

3.  **Install the required packages:**

    ```sh
    npm install
    ```

4.  **For local development, ensure the following lines in server.js are commented out:**

    ```js
    // Remove or comment out this line in production
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

    // Export the app for Vercel
    // module.exports = app;
    ```

5.  **For deployment on Vercel, ensure the following lines in server.js are commented out:**

    ```js
    // Remove or comment out this line in production
    // app.listen(PORT, () => {
    //   console.log(`Server listening on port ${PORT}`);
    // });

    // Export the app for Vercel
    module.exports = app;
    ```

6.  **Start the backend server:**

    ```sh
    node server.js
    ```

### Setting Up the Frontend

1. **Navigate to the frontend directory:**

   ```sh
   cd survey-app
   ```

2. **Create a .env file in the survey-app directory with the following content:**
   ```
   VITE_API_BASE_URL=http://localhost:3001
   ```
3. **Create a .env.production file in the survey-app directory with the following content for production:**
   ```
   VITE_API_BASE_URL=https://your-production-url
   ```
4. **Install the dependencies:**

   ```sh
   npm install
   ```

5. **Start the frontend development server:**

   ```sh
    npm run dev
   ```

### Running the Application

1. Ensure both the backend and frontend servers are running.
2. Open your browser and navigate to http://localhost:5173 to access the application.

### Deployment on Vercel

1. Ensure the backend server.js file is configured for Vercel deployment as mentioned above.
2. Push your code to a Git repository.
3. Connect your repository to Vercel and deploy the application.

### Additional Information

- As ui framework we used [shacn/ui](https://ui.shadcn.com/).
- The frontend uses Vite for development and build processes.
- The backend uses Express and [MongoDB with Atlas](https://www.mongodb.com/atlas) for handling API requests and data storage.
- For the deployment of the frontend and backend, we used [Vercel](https://vercel.com).

## Adapt with Your Own Questions

If you want to conduct a similar survey but with different identifiers, follow these steps:

### 1. Modify the Questions

1. **Navigate to the `survey-app/src/components/views/SurveyQuestions.tsx` file:**

   ```sh
   cd survey-app/src/components/views
   ```

2. **Update the predefinedQuestionsEven and predefinedQuestionsOdd arrays:**

These arrays contain the questions and their corresponding identifiers. Modify the existing questions or add new ones as needed.

```tsx
const predefinedQuestionsEven = [
  {
    index: 0,
    sentence: "your new sentence",
    style: "camelCase",
    correctIdentifier: "yourNewIdentifier",
    distractors: ["wrongIdentifier1", "wrongIdentifier2", "wrongIdentifier3"],
  },
  // Add more questions...
];

const predefinedQuestionsOdd = [
  {
    index: 1,
    sentence: "another new sentence",
    style: "kebab-case",
    correctIdentifier: "another-new-identifier",
    distractors: [
      "wrong-identifier1",
      "wrong-identifier2",
      "wrong-identifier3",
    ],
  },
  // Add more questions...
];
```

### 2. Update the Try Page

1. Navigate to the survey-app/src/components/views/TryQuestionPage.tsx file:

```sh
cd survey-app/src/components/views
```

2. Update the tryQuestions array:
   Modify the existing questions or add new ones for the try page.

```tsx
const tryQuestions = [
  {
    sentence: "your try sentence",
    style: "camelCase",
    correctIdentifier: "yourTryIdentifier",
    distractors: [
      "wrongTryIdentifier1",
      "wrongTryIdentifier2",
      "wrongTryIdentifier3",
    ],
  },
  // Add more try questions...
];
```

### 3 Update the General Information Form (Optional)

If you need to collect different information from the participants, you can update the form fields.

1. Navigate to the survey-app/src/components/views/GeneralInfoForm.tsx file:

```sh
cd survey-app/src/components/views
```

2. Update the form schema and fields:
   Modify the existing fields or add new ones as needed.

```tsx
const generalInfoSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    surname: z.string().min(1, "Surname is required"),
    age: z.string().min(1, "Age is required"),
    hasCodingExperience: z.string().min(1, "This field is required"),
    codingFrequency: z.string().optional(),
    // Add more fields...
  })
  .superRefine((data, ctx) => {
    if (data.hasCodingExperience === "Yes" && !data.codingFrequency) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Coding frequency is required if you have coding experience.",
        path: ["codingFrequency"],
      });
    }
  });

// Update the form fields in the render method...
```

### 4 Test the Application

1. Ensure both the backend and frontend servers are running:

```sh
cd backend
npm start

cd ../survey-app
npm run dev
```

2. Open your browser and navigate to http://localhost:5173 to access the application

## Thank you for using our survey app!
