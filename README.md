# Full Stack Apps on AWS Project

You have been hired as a software engineer to develop an application that will help the FBI find missing people.  The application will upload images to the FBI cloud database hosted in AWS. This will allow the FBI to run facial recognition software on the images to detect a match. You will be developing a NodeJS server and deploying it on AWS Elastic Beanstalk. 
You will build upon the application we've developed during the lessons in this course. You'll complete a REST API endpoint in a backend service that processes incoming image URLs.

## Getting Started

You can clone this repo to run the project locally, or navigate to the workspace in the Udacity course.

## Project Instructions

To complete this project, you will need to:

* Set up node environment
* Create a new endpoint in the server.js file
* Deploying your system

## Testing

Successful URL responses should have a 200 code. Ensure that you include error codes for the scenario that someone uploads something other than an image and for other common errors.

## Live Deployment

The application is deployed on AWS Elastic Beanstalk and can be accessed at:

**Endpoint URL:** [http://image-filter-env.eba-x3fb9htf.us-east-1.elasticbeanstalk.com](http://image-filter-env.eba-x3fb9htf.us-east-1.elasticbeanstalk.com)

### Example Usage

```bash
# Test the root endpoint
curl http://image-filter-env.eba-x3fb9htf.us-east-1.elasticbeanstalk.com/
  
# Filter an image (provide a valid image URL)
curl "http://image-filter-env.eba-x3fb9htf.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg"
```

### Expected Responses

- **200 OK** - Successfully filtered and returned the image
- **400 Bad Request** - Missing or invalid `image_url` query parameter
- **422 Unprocessable Entity** - Unable to process the provided image

## License

[License](LICENSE.txt)
