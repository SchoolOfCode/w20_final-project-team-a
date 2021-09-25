# Team Aztech - SoC Expo
### Cohort 6 Final Project

#### Problem Statement  
Our Problem was to see how can we display and promote the work that School of Code bootcampers put into the course

####  Solution  
We created a showcase where: 
- School of Code bootcampers can create an account and upload information to display their projects
- School of Code admin can approve projects for display and select a project to feature on the landing page 
- External stakeholders can view all projects and bootcamper profiles  
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


## API Reference

Where something is returned, the standard format is usually a return object with:  
```{msg:${ string | object }, success:${ boolean }}```  
Optionally a User object may be attached.

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
