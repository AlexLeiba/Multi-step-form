import * as z from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  age: z.string().min(1),
  gender: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  country: z.string().min(2),
  city: z.string().min(2),
  dateOfBirth: z.string().min(2),
  street: z.string().min(2),
});

export type PersonalInfoType = z.infer<typeof personalInfoSchema>;

const reasonLeavingPreviousJobSchema = z.discriminatedUnion(
  'reasonLeavingPreviousJob',
  [
    z.object({
      reasonLeavingPreviousJob: z.literal('other'),
      otherReasonForLeavingPreviousJob: z.string().min(2), //when the selection will be 'other' then 'otherReasonForLeavingPreviousJob' will be mandatory
    }),
    z.object({
      reasonLeavingPreviousJob: z.literal('smallSalary'),
    }),
    z.object({
      reasonLeavingPreviousJob: z.literal('noAmbition'),
    }),
    z.object({
      reasonLeavingPreviousJob: z.literal('poorWorkConditions'),
    }),
    z.object({
      reasonLeavingPreviousJob: z.literal('lackOfSupport'),
    }),
  ]
);

const otherEducationSchema = z.discriminatedUnion('education', [
  z.object({
    education: z.literal('other'),
    otherEducation: z.string().min(2), //when the selection will be 'other' then 'otherEducation' will be mandatory
  }),
  z.object({
    education: z.literal('highSchool'),
  }),
  z.object({
    education: z.literal('college'),
  }),
]);

const previousEmployersSchema = z.discriminatedUnion('hasPreviousEmployers', [
  z.object({
    hasPreviousEmployers: z.literal(false),
  }),
  z.object({
    hasPreviousEmployers: z.literal(true),
    previousEmployers: z.array(
      z.object({
        employerName: z.string().min(2),
        jobTitle: z.string().min(2),
        responsibility: z.string().optional(),
      })
    ),
  }),
]);

const educationalInstitutionsSchema = z.discriminatedUnion(
  'hasEducationalInstitutions',
  [
    z.object({
      hasEducationalInstitutions: z.literal(false).optional(),
    }),
    z.object({
      hasEducationalInstitutions: z.literal(true),
      educationalInstitutions: z.array(
        z.object({
          educationTitle: z.string().min(2),
          graduatedDate: z.string().min(2),
        })
      ),
    }),
  ]
);

export const historySchema = z
  .object({
    education: z.string().min(2),
    reasonLeavingPreviousJob: z.string().min(2),
    employmentStatus: z.string().min(2),
  })
  .and(reasonLeavingPreviousJobSchema)
  .and(otherEducationSchema)
  .and(previousEmployersSchema)
  .and(educationalInstitutionsSchema);
// .refine((data) => data.reasonLeavingPreviousJob === 'other', {
//   message: 'Please select education or reason for leaving previous job',
// });

export type HistoryType = z.infer<typeof historySchema>;

export type SkillsType = z.infer<typeof skillsSchema>;
export const skillsSchema = z.object({
  // coreCompetencies: z.string().min(2),
  // languagesSpoken: z.array(z.string().min(2)).optional(),
  projectManager: z.string().min(2),
  communications: z.string().min(2),
  technicalSkills: z.string().min(2),
  leadership: z.string().min(2),
  problemSolving: z.string().min(2),
  skillSets: z.array(
    z.object({
      skillSet: z.string().min(2),
      level: z.string().min(2),
    })
  ),
});
