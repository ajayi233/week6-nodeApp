# week6-nodeapp

This is a simple web application built using Node.js as the part of the coursework for the Week 6 of the CodeYourFuture course.

The application allows the user to upload images, view images and delete them. The application uses AWS S3 bucket for storing the images.

The application can be run using the command `node index.js` and the application will be accessible on `http://localhost:5000`.

The application uses the following dependencies:

- express
- ejs
- multer
- aws-sdk

The application uses the following environment variables:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION
- AWS_BUCKET_NAME

The application expects theses environment variables to be set.

The application uses the ejs templating engine to render the webpages.

The application uses the multer package to handle the file uploads.

The application uses the aws-sdk package to interact with the AWS S3 bucket.

The application expects the AWS S3 bucket to be set up and the environment variables to be set.

The application is a simple example of how to use the AWS S3 bucket to store images.
# week6-nodeApp
# week6-nodeApp
