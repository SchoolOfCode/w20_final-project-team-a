<h1 align="center"> Team Aztech - SoC Expo </h1>
<p align="center">
  <img src="https://github.com/SchoolOfCode/w20_final-project-team-a/blob/main/readme/Presentation%20(2).png?raw=true" alt="logo" width=400px />
</p>

## Cohort 6 Final Project

### Problem Statement  
Our Problem was to see how can we display and promote the work that School of Code bootcampers put into the course

###  Solution  
We created a showcase where: 
- School of Code bootcampers can create an account and upload information to display their projects
- School of Code admin can approve projects for display and select a project to feature on the landing page 
- External stakeholders can view all projects and bootcamper profiles  

---  

## Run Locally

### Installation

Clone the project

```bash
  git clone https://github.com/SchoolOfCode/w20_final-project-team-a.git
```

Go to the project directory

```bash
  cd w20_final-project-team-a
```

Install dependencies

```bash
  npm install
  cd server
  npm install
```

### Environment Variables

To run this project, you will need two .env files, one within the root folder, and one within the server folder.

#### Root .env (React)

```bash
    REACT_APP_PROD_HOST=https://${insert_your_domain_here}.com/api/
    REACT_APP_DEV_HOST=http://localhost:${port_of_the_server_instance}/api/
    REACT_APP_ENV=${dev || prod}
```

#### Server .env (Node)

```bash
    PORT=5000
    DB_USERNAME=${mongo_atlas_db_username}
    DB_PASSWORD=${mongo_atlas_db_password}
    SESSION_SECRET=${secret_phrase}
    DEV_HOST=http://localhost:${port_of_the_react_app}
    PROD_HOST=https://${insert_your_domain_here}
    NODE_ENV=${dev || prod}
    DEV_DB_NAME=${db_name_for_dev_db_instance}
    PROD_DB_NAME=${db_name_for_prod_db_instance}
```
If port numbers are changed, the proxy configuration in the package.json may also need to be updated for local deployment.

### Start the application

Ensure you are in the root directory of the application first, then run:

```bash
  npm run dev-chill
```
 
  
---  

### User Flow

1. You will start on the homepage. Here you can see the featured project which has been chosen by the admins to highlight a specific project.

2. Clicking on the Showcase page will take you to a page that contains all of the uploaded projects. Users are then able to click on a projectwhich will then bring up more detailed information about that project, including further images.

3. Clicking on the Bootcampers page will then take you to a page that contains a list of all the bootcampers that have signed up. You are then able to click on a profile which will bring up the user's profile and information, as well as what projects they have been involved in.

4. Users can also log in if they have an account or if they don't they are then able to register their own account.

5. Once logged in, the user is able to edit their profile, including uploading an image, adding a breif statement and editing social media links. 

6. Upon logging in a new tab will appear in the navigation bar, which is the upload page, this is where the user is able to upload their own project.

7. If the user is an admin, they are able to access the admin page where they can to approve projects, set them as featured or remove them if needed.


---
## Screenshots
<p align="center">
  <img  src="https://github.com/SchoolOfCode/w20_final-project-team-a/blob/main/readme/image%20(8).png?raw=true"
  src="Featured page" 
  width="300px" height="200px"
  />    <img  src="https://github.com/SchoolOfCode/w20_final-project-team-a/blob/main/readme/image%20(7).png?raw=true" 
  alt="Showcase Page"
  width="300px" height="200px" 
  />
</p>
<p align="center">
  <img  src="https://github.com/SchoolOfCode/w20_final-project-team-a/blob/main/readme/image%20(6).png?raw=true" 
  alt="Bootcamper Page"
  width="300px" height="200px" 
  />    <img  src="https://github.com/SchoolOfCode/w20_final-project-team-a/blob/main/readme/image%20(5).png?raw=true" 
  alt="Submit Page"
  width="300px" height="200px" 
  />
</p>
<p align="center">
  <img src="https://github.com/SchoolOfCode/w20_final-project-team-a/blob/main/readme/image%20(4).png?raw=true"
  alt="Admin Page"
  width="300px" height="200px" 
  />
</p>
    
---  

## API Reference

Where something is returned, the standard format is usually a return object with:  
```{msg:${ string | object }, success:${ boolean }}```  
Optionally a User object may be attached, containing data about the user.

### Users

#### Register a New User

```http
  POST /api/users/signup
```

#### User Login

```http
  GET /api/users/login
```
Sets a session cookie with authentication information for use with further authentication checks.
Stores a session in MongoDB for verification against the locally stored session ID.

#### User Logout
```http
  GET /api/users/logout
```
Request needs to be sent with credentials. Logs the user out and clears the session cookie, and removes the session from the database.

#### Get all Users

```http
  GET /api/users/all
```
Returns a list of all the users (without hashed passwords)

#### Get a User by ID

```http
  GET /api/users/individual/:${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String` | **Required**. MongoDB ObjectID of user to fetch |

  
---  


### Projects
#### Submit a Project

```http
  POST /api/projects/submit
```

Expects multipart/form data with at least one image (Less than 5mb and .png, jpg, .jpeg or .gif).
Images will be stored locally at ```${host}/uploads/projects/```, with a randomly generated uuid prefixing the file name to avoid clashes.

#### Get the Featured Project

```http
  GET /api/projects/featured
```
Returns the currently featured project.

#### Get all the Projects

```http
  GET /api/projects/all
```
Returns all the projects, cross-populating the users field with the data for all the contributors.

#### Get the Featured Project

```http
  GET /api/projects/update/:${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. MongoDB ObjectID of project to fetch |

Populates the projects field on the users document, and populates the users field on the projects.
Typically called during project submission, could also potentially be modified to populate during user signup.

  
---  


### Authenticated Routes
#### Check if the Current User is Authenticated

```http
  GET /api/auth/check
```
Returns the currently authenticated user or an error.

#### Get all the Projects for Administration

```http
  GET /api/auth/admin/list
```
Returns all the projects, cross-populating the users field with the data for all the contributors.

#### Update the Projects for Administration

```http
  PUT /api/auth/admin/update
```
Updates the approved and featured fields in the database.

#### Delete a Project

```http
  DELETE /api/auth/admin/delete
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. MongoDB ObjectID of project to delete |

Removes the selected project(s) from the database and application.
The ID will need to be sent as part of the request body.

#### Update the User Profile

```http
  PUT /api/auth/user/update
```
Updates the user with the supplied data.
Expects a multipart/form with optional image data.
If no image is supplied, a default profile picture will be applied.
  
---

## Tech Stack

**Client:** React(TypeScript), Sass

**Server:** Node, Express, MongoDB

**Testing:** Cypress

---  
---  

### Authors

- [@Becks](https://github.com/BecksMaybury)
- [@Victor](https://github.com/VicRenRen)
- [@Gurmukh](https://github.com/gschandan)
- [@Lewis](https://github.com/LewisMurray00)

