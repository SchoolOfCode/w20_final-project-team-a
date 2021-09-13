import * as yup from 'yup';
import { VALID_IMAGE_TYPES } from '../../../config';
import { MAX_IMAGE_SIZE } from '../../../config';

export const submitValidationSchema = yup.object().shape({
    projectName: yup.string().required('A project name is required').min(2),
    weekNumber:yup.number()
        .required('A week number is required')
        .min(1, 'Week number must be greater than 0')
        .max(24, 'Week number must be less than 24'),
    contributors: yup.lazy(email => (Array.isArray(email) ? 
        yup.array().of(
            yup.string()
            .required('Contributors emails are required')
            .email('Invalid Email')
        ) : 
        yup.string()
            .required('At least one contributor is required')
            .email('Invalid Email')
        )),
    problemStatement: yup.string()
                            .required('A problem statement is required')
                            .min(1, 'An empty problem statement is invalid')
                            .max(140, '140 characters maximum'),
    additionalInformation: yup.string().optional()
                                .max(140, '140 characters maximum'),
    githubUrl: yup.string().required('A github url is required').url(),
    appDeploymentUrl:yup.string().required('A deployed project URL is required').url(),
    builtUsing: yup.object().nullable(),
    appImage:  yup.mixed()
                    .test('fileSize', "File Size is too large", 
                        (value) => value === null || (value && value.size <= MAX_IMAGE_SIZE))
                    .test('fileType', "Unsupported File Format", 
                        (value) => value === null || (value && VALID_IMAGE_TYPES.includes(value.type))),
    additionalAppImage1: yup.mixed()
                    .test('fileSize', "File Size is too large", 
                        (value) => value === null || (value && value.size <= MAX_IMAGE_SIZE))
                    .test('fileType', "Unsupported File Format", 
                        (value) => value === null || (value && VALID_IMAGE_TYPES.includes(value.type))),
    additionalAppImage2: yup.mixed()
                    .test('fileSize', "File Size is too large", 
                        (value) => value === null || (value && value.size <= MAX_IMAGE_SIZE))
                    .test('fileType', "Unsupported File Format", 
                        (value) => value === null || (value && VALID_IMAGE_TYPES.includes(value.type))),
    additionalAppImage3: yup.mixed()
                    .test('fileSize', "File Size is too large", 
                        (value) => value === null || (value && value.size <= MAX_IMAGE_SIZE))
                    .test('fileType', "Unsupported File Format", 
                        (value) => value === null || (value && VALID_IMAGE_TYPES.includes(value.type)))})