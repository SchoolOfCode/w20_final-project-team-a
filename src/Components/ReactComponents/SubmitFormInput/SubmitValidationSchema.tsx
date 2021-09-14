import * as yup from 'yup';
// import { VALID_IMAGE_TYPES } from '../../../config';
// import { MAX_IMAGE_SIZE } from '../../../config';

export const SubmitValidationSchema = yup.object().shape({
    projectName: yup.string().required('A project name is required'),
    weekNumber:yup.number()
        .required('A week number is required')
        .min(1, 'Week number must be greater than 0')
        .max(24, 'Week number must be less than 24'),
    // contributors: yup.lazy(email => (Array.isArray(email) ? 
    //     yup.array().of(
    //         yup.string()
    //         .required('Contributors emails are required')
    //         .email('Invalid Email')
    //     ) : 
    //     yup.string()
    //         .required('At least one contributor is required')
    //         .email('Invalid Email')
    //     )),
    problemStatement: yup.string()
                            .required('A problem statement is required')
                            .min(1, 'An empty problem statement is invalid')
                            .max(140, '140 characters maximum'),
    additionalInformation: yup.string().optional()
                                .max(140, '140 characters maximum'),
    githubUrl: yup.string().required('A github url is required').url(),
    appDeploymentUrl:yup.string().required('A deployed project URL is required').url(),
    // builtUsing: yup.object().nullable(),
    // appImage:  yup.mixed()
    //                 .test('fileExists', 'An image of your application is required',
    //                 file => file.length >= 1)
    //                 .test('fileSize', "File Size is too large. Max 5mb", 
    //                     (file) => file[0] === null || (file[0] && file[0].size <= MAX_IMAGE_SIZE))
    //                 .test('fileType', "Only .jpg .jpeg .png or .gif are allowed", 
    //                     (file) => !file[0] || (file[0] && VALID_IMAGE_TYPES.includes(file[0].type))),
    // additionalAppImage1: yup.lazy(value => {
    //                         if (value &&
    //                         Object.values(value).some(file => !(file === null || file === undefined || file === ""))){
    //                         return yup
    //                         .mixed()
    //                         .test('fileSize', "File Size is too large. Max 5mb", 
    //                             (file) => file[0] === null || (file[0] && file[0].size <= MAX_IMAGE_SIZE))
    //                         .test('fileType', "Only .jpg .jpeg .png or .gif are allowed", 
    //                         (file) => !file[0] || (file[0] && VALID_IMAGE_TYPES.includes(file[0].type)))},
    // additionalAppImage2: yup.mixed().notRequired()
    //                 .test('fileSize', "File Size is too large. Max 5mb", 
    //                 (file) => file[0] === null || (file[0] && file[0].size <= MAX_IMAGE_SIZE))
    //                 .test('fileType', "Only .jpg .jpeg .png or .gif are allowed", 
    //                 (file) => !file[0] || (file[0] && VALID_IMAGE_TYPES.includes(file[0].type))),
    // additionalAppImage3: yup.mixed().notRequired()
    //                 .test('fileSize', "File Size is too large. Max 5mb", 
    //                 (file) => file[0] === null || (file[0] && file[0].size <= MAX_IMAGE_SIZE))
    //                 .test('fileType', "Only .jpg .jpeg .png or .gif are allowed", 
    //                 (file) => !file[0] || (file[0] && VALID_IMAGE_TYPES.includes(file[0].type))),
})