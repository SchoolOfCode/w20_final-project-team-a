import * as Yup from 'yup';


export const submitValidationSchema = Yup.object().shape({
    projectName: Yup.string().required('A project name is required'),
    weekNumber:Yup.number()
        .required('A week number is required')
        .min(1, 'Week number must be greater than 0')
        .max(24, 'Week number must be less than 24'),
    contributors: Yup.lazy(email => (Array.isArray(email) ? 
        Yup.array().of(
            Yup.string()
            .required('Contributors emails are required')
            .email('Invalid Email')
        ) : 
        Yup.string()
            .required('At least one contributor is required')
            .email('Invalid Email')
        )),
    problemStatement: "",
    additionalInformation: "",
    githubUrl: "",
    builtUsing: builtUsingSVGObject,
    appImage: undefined,
    appDeploymentUrl:"",
    additionalAppImage1:undefined,
    additionalAppImage2:undefined,
    additionalAppImage3:undefined,
  }
})