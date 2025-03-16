'use client';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown';
import React, { useEffect } from 'react';
import {
  Controller,
  FieldErrors,
  useForm,
  useFieldArray,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { historySchema, HistoryType } from '@/lib/schemas';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { Spacer } from '@/components/ui/spacer';
import { Plus, RefreshCcw, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/datePicker';

export function HistoryForm() {
  const { storedValue, onChangeValue } = useLocalStorage<HistoryType>({
    key: 'historyInfo',
  });
  const formMethods = useForm<HistoryType>({
    resolver: zodResolver(historySchema),
    defaultValues: {
      education: storedValue?.education || undefined,
      reasonLeavingPreviousJob:
        storedValue?.reasonLeavingPreviousJob || undefined,
      employmentStatus: storedValue?.employmentStatus || '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    reset,
    watch,
  } = formMethods;
  console.log('🚀 ~ HistoryForm ~ errors: \n\n\n', errors);

  function onSubmit(formData: HistoryType) {
    console.log('personalInfo=>>> \n\n', formData);

    onChangeValue(formData);
  }
  useEffect(() => {
    if (storedValue) {
      Object.keys(storedValue).forEach((key: string) => {
        formMethods.setValue(
          key as keyof HistoryType,
          storedValue[key as keyof HistoryType]
        );
      });
    }
  }, []);

  const errorsData: FieldErrors<
    Extract<HistoryType, { reasonLeavingPreviousJob: 'other' }> &
      Extract<HistoryType, { education: 'other' }> &
      Extract<HistoryType, { hasPreviousEmployers: true }> &
      Extract<HistoryType, { hasEducationalInstitutions: true }>
  > = formMethods.formState.errors;

  const {
    remove: removePrevEmployers,
    fields: PrevEmployersData,
    append: appendPrevEmployers,
  } = useFieldArray({
    control,
    name: 'previousEmployers',
  });
  const {
    remove: removeEducationalInstitutions,
    fields: EducationalInstitutionsData,
    append: appendEducationalInstitutions,
  } = useFieldArray({
    control,
    name: 'educationalInstitutions',
  });

  function handlePreviousExmployers() {
    formMethods.setValue('hasPreviousEmployers', true);
    appendPrevEmployers({
      employerName: '',
      jobTitle: '',
      responsibility: '',
    });
  }
  function handleEducationalInstitutions() {
    formMethods.setValue('hasEducationalInstitutions', true);
    appendEducationalInstitutions({
      educationTitle: '',
      graduatedDate: '',
    });
  }

  function handleRemoveEducationalInstitutions(index: number) {
    removeEducationalInstitutions(index);
    if (index === 0) formMethods.setValue('hasEducationalInstitutions', false);
  }

  function handleRemovePreviousEmployers(index: number) {
    removePrevEmployers(index);
    if (index === 0) formMethods.setValue('hasPreviousEmployers', false);
  }

  if (!storedValue) return;

  const otherReasonForLeavingPreviousJob =
    watch('reasonLeavingPreviousJob') === 'other';
  const otherEducation = watch('education') === 'other';
  return (
    <>
      <div className='flex gap-3 items-center'>
        <h4> History </h4>
        <div title='Reset form'>
          <RefreshCcw
            cursor={'pointer'}
            onClick={() => {
              reset();
              onChangeValue({});
            }}
          />
        </div>
      </div>
      <Spacer size={12} />

      <div className='h-full flex flex-col justify-between'>
        <div className='grid grid-cols-2 gap-6 '>
          <div className='flex flex-col gap-4'>
            <Controller
              name='employmentStatus'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Dropdown
                    defaultValue={
                      value ||
                      // storedValue?.employmentStatus ||
                      'employmentStatus'
                    }
                    options={[
                      {
                        label: 'Select employment status',
                        value: 'employmentStatus',
                        image: '',
                        id: '',
                      },
                      {
                        label: 'Employed',
                        value: 'employed',
                        image: '',
                        id: '1',
                      },
                      {
                        label: 'Unemployed',
                        value: 'unemployed',
                        image: '',
                        id: '2',
                      },
                    ]}
                    label='Employment Status'
                    onChange={(v) => {
                      onChange(v);
                    }}
                    error={errors.employmentStatus?.message}
                  />
                );
              }}
            />

            <div className='flex gap-2 items-center '>
              <p>Previous Employers:</p>
              <div
                className='w-6 h-6 flex items-center text-black  bg-green-400 rounded-full justify-center'
                onClick={() => handlePreviousExmployers()}
              >
                <Plus size={20} className='cursor-pointer' />
              </div>
            </div>

            {PrevEmployersData.map((_, index) => {
              return (
                <div
                  key={index}
                  className='flex flex-col gap-2  border border-gray-300 rounded-lg py-4 px-2'
                >
                  <div className='flex items-center justify-between'>
                    <p className='font-semibold'>Employer #{index + 1}</p>
                    <div
                      className='cursor-pointer'
                      onClick={() => handleRemovePreviousEmployers(index)}
                    >
                      <X />
                    </div>
                  </div>
                  <Input
                    label={`Employer Name ${index + 1}`}
                    placeholder='type here'
                    {...register(`previousEmployers.${index}.employerName`)}
                    error={
                      errorsData?.previousEmployers?.[index]?.employerName
                        ?.message
                    }
                  />

                  <Input
                    label={`Job Title ${index + 1}`}
                    placeholder='type here'
                    {...register(`previousEmployers.${index}.jobTitle`)}
                    error={
                      errorsData?.previousEmployers?.[index]?.jobTitle?.message
                    }
                  />

                  <Input
                    label={`Responsibility ${index + 1}`}
                    placeholder='type here'
                    {...register(`previousEmployers.${index}.responsibility`)}
                    error={
                      errorsData?.previousEmployers?.[index]?.responsibility
                        ?.message
                    }
                  />
                </div>
              );
            })}

            <div className='flex flex-col gap-4'>
              <Controller
                name='reasonLeavingPreviousJob'
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Dropdown
                      defaultValue={
                        value ||
                        // storedValue?.reasonLeavingPreviousJob ||
                        'reasonLeavingPreviousJob'
                      }
                      label='Reason leaving previous job'
                      options={[
                        {
                          label: 'Select reason',
                          value: 'reasonLeavingPreviousJob',
                          image: '',
                          id: '',
                        },
                        {
                          label: 'Small salary',
                          value: 'smallSalary',
                          image: '',
                          id: '1',
                        },
                        {
                          label: 'No ambition',
                          value: 'noAmbition',
                          image: '',
                          id: '2',
                        },
                        {
                          label: 'Poor work conditions',
                          value: 'poorWorkConditions',
                          image: '',
                          id: '2',
                        },
                        {
                          label: 'Lack of support',
                          value: 'lackOfSupport',
                          image: '',
                          id: '2',
                        },

                        { label: 'Other', value: 'other', image: '', id: '2' },
                      ]}
                      onChange={(v) => {
                        onChange(v);
                      }}
                      error={errorsData?.reasonLeavingPreviousJob?.message}
                    />
                  );
                }}
              />

              {otherReasonForLeavingPreviousJob && (
                <div className=' border border-gray-300 rounded-lg py-4 px-2'>
                  <Input
                    label='Other reason for leaving previous job'
                    placeholder='type here'
                    {...register('otherReasonForLeavingPreviousJob')}
                    error={
                      errorsData?.otherReasonForLeavingPreviousJob?.message
                    }
                  />
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <Controller
              name='education'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Dropdown
                    defaultValue={
                      value ||
                      // ||
                      // storedValue?.education
                      'selectEducation'
                    }
                    label='Your Education'
                    options={[
                      {
                        label: 'Select education',
                        value: 'selectEducation',
                        image: '',
                      },
                      {
                        label: 'High School',
                        value: 'highSchool',
                        image: '',
                      },
                      { label: 'College', value: 'college', image: '' },
                      { label: 'Other', value: 'other', image: '' },
                    ]}
                    onChange={(v) => {
                      onChange(v);
                    }}
                    error={errorsData?.education?.message}
                  />
                );
              }}
            />

            {otherEducation && (
              <div className=' border border-gray-300 rounded-lg py-4 px-2'>
                <Input
                  label='Other education'
                  placeholder='type here'
                  {...register('otherEducation')}
                  error={errorsData?.otherEducation?.message}
                />
              </div>
            )}

            <div className='flex gap-2 items-center '>
              <p>Educational Institutions:</p>
              <div
                className='w-6 h-6 flex items-center text-black  bg-green-400 rounded-full justify-center'
                onClick={() => handleEducationalInstitutions()}
              >
                <Plus size={20} className='cursor-pointer' />
              </div>
            </div>

            {EducationalInstitutionsData.map((_, index) => {
              return (
                <div
                  key={index}
                  className='flex flex-col gap-2  border border-gray-300 rounded-lg py-4 px-2'
                >
                  <div className='flex items-center justify-between'>
                    <p className='font-semibold'>Education #{index + 1}</p>
                    <div
                      className='cursor-pointer'
                      onClick={() => handleRemoveEducationalInstitutions(index)}
                    >
                      <X />
                    </div>
                  </div>
                  <Input
                    label={`Education Title ${index + 1}`}
                    placeholder='type here'
                    {...register(
                      `educationalInstitutions.${index}.educationTitle`
                    )}
                    error={
                      errorsData?.educationalInstitutions?.[index]
                        ?.educationTitle?.message
                    }
                  />

                  <div>
                    <Controller
                      name={`educationalInstitutions.${index}.graduatedDate`}
                      control={control}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <DatePicker
                            onSelect={(v) => {
                              onChange(v);
                            }}
                            value={value}
                            label={`Graduated Date ${index + 1}`}
                            error={
                              errorsData?.educationalInstitutions?.[index]
                                ?.graduatedDate?.message
                            }
                            name={`educationalInstitutions.${index}.graduatedDate`}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='flex flex-col gap-12'></div>

        <div className='flex justify-end absolute bottom-8 right-8'>
          <Button
            onClick={handleSubmit(onSubmit)}
            size={'lg'}
            className='cursor-pointer'
          >
            Next step
          </Button>
        </div>
      </div>
    </>
  );
}
