import express from 'express'
import { Project } from '../models/project.model.js'
import { User } from '../models/user.model.js'
import multer from 'multer'

const storage = multer.diskStorage({//these will be executed when a file is recieved
    //destinatiopn property
    destination: (req,file,cb)=>{
        cb(null, './uploads/') //first param is error
    },
    //filename
    filename: (req,file,cb)=>{
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req,file,cb) =>{
    // cb(null,false) // equals ignore the file without erroring
    //cb(null,true) //stores the file

    if (file.mimetype === 'image/jpeg'|| file.mimetype === 'image/png' ){
        cb(null, true)
    } else{
        cb(null,false)
    }
}

const upload = multer({storage: storage, limits:{
        fileSize: 1024 * 1024 * 5 //files up to 5mb
        },
        fileFilter: fileFilter
    }
);//initialise multer to store files here
//using our lcoal strategy


export const projectRouter = express.Router()

projectRouter.get('/all', async (req,res)=>{
    const allProjects = await Project.find({})
    res.status(200).send(allProjects)
})

projectRouter.post('/submit', upload.single('appImage'),(req,res)=>{
    console.log(req.file)
    const {
        projectName,
        weekNumber,
        contributors, 
        problemStatement,
        additionalInformation,
        githubUrl,
        techUsed,
        appDeploymentUrl,
        additionalAppData,
      } = req.body;
    
    const appDeploymentImage = req.file.path
    console.log(req.body)

    Project.findOne({githubUrl: githubUrl})
      .then(project=>{
        if(project){
            //project already exists
            res.status(500).send("Project already exists")
        } else{
            const newProject = new Project({
                projectName,
                weekNumber,
                contributors, 
                problemStatement,
                additionalInformation,
                githubUrl,
                techUsed,
                appDeploymentImage,
                appDeploymentUrl,
                additionalAppData,
            })
            //need to handle user not exisiting
            contributors.map(email=>{
                console.log(email)
                User.findOneAndUpdate({email:email}, {$push: {projects:githubUrl}},(err,sucess)=>{
                    if (err) console.log(err)
                    else console.log(sucess)
                })
                newProject.users.push(email)
                }
            )

            newProject
                .save()
                .then(project=>{
                    res.status(200).send("Project submitted sucessfully")
                })
                .catch(err=>console.error(err))
            
        }
      }
      )
      .catch(err=>console.error(err))
})