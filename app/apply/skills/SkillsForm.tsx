'use client';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { skillsSchema, SkillsType } from '@/lib/schemas';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { Spacer } from '@/components/ui/spacer';
import { Plus, RefreshCcw } from 'lucide-react';
import { IconCheck, IconChevronDown } from '@tabler/icons-react';

export function SkillsForm() {
  const [selectLanguages, setSelectedLanguages] = useState(['Romanian']);
  const [selectCompentencies, setSelectedCompentencies] = useState(['']);
  const [openLanguages, setOpenLanguages] = useState(false);
  const [openCompetencies, setOpenCompetencies] = useState(false);
  const formMethods = useForm<SkillsType>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      coreCompetencies: '',
      languagesSpoken: ['Romanian'],
      projectManager: '',
      communications: '',
      technicalSkills: '',
      leadership: '',
      problemSolving: '',

      skillSets: [{}],
    },
  });

  const { storedValue, onChangeValue } = useLocalStorage<SkillsType>({
    key: 'personalInfo',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = formMethods;

  console.log('🚀 ~ SkillsForm ~ errors:', errors);

  function onSubmit(formData: SkillsType) {
    console.log('personalInfo=>>> \n\n', formData);

    onChangeValue(formData);
  }
  useEffect(() => {
    if (storedValue) {
      Object.keys(storedValue).forEach((key: string) => {
        formMethods.setValue(
          key as keyof SkillsType,
          storedValue[key as keyof SkillsType]
        );
      });
    }
  }, [storedValue]);

  function handleOpenLanguages() {
    setOpenLanguages(!openLanguages);
  }
  function handleOpenCompetencies() {
    setOpenCompetencies(!openCompetencies);
  }

  const handleLanguages = (language: string) => {
    if (selectLanguages?.includes(language)) {
      setSelectedLanguages((prev) => prev.filter((item) => item !== language));
    } else {
      setSelectedLanguages((prev) => [...prev, language]);
    }
    console.log('ssss', getValues('languagesSpoken'));
  };
  const handleCompetencies = (language: string) => {
    if (selectCompentencies?.includes(language)) {
      setSelectedCompentencies((prev) =>
        prev.filter((item) => item !== language)
      );
    } else {
      setSelectedCompentencies((prev) => [...prev, language]);
    }
    console.log('ssss', getValues('languagesSpoken'));
  };

  if (!storedValue) return;
  return (
    <>
      <div className='flex gap-3 items-center'>
        <h4> Skills</h4>
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
        <div>
          <div className='grid grid-cols-2 gap-6 '>
            <div className='relative'>
              <p className='body-sm'>Core competencies:</p>
              <Spacer size={1} />
              <Button
                size={'lg'}
                className='bg-white text-black w-full'
                onClick={handleOpenCompetencies}
              >
                Competencies {selectCompentencies.length} <IconChevronDown />
              </Button>
              {openCompetencies && (
                <div className='bg-white text-black rounded-md py-2 absolute  left-0 z-10 w-[200px]'>
                  <div className='flex gap-2 flex-col items-center '>
                    <p
                      onClick={() => setSelectedCompentencies([])}
                      className='cursor-pointer'
                    >
                      Clear filters
                    </p>
                    {coreCompetenciesData.map((language, index) => {
                      return (
                        <div
                          onClick={() => {
                            handleCompetencies(language.label);
                          }}
                          key={index}
                          className='flex flex-col gap-2  w-full rounded-lg  px-2 cursor-pointer'
                        >
                          <div className='flex items-center justify-between w-full gap-4 hover:bg-gray-300 p-2 rounded-md'>
                            <p className='font-semibold'>{language.label}</p>
                            {selectCompentencies?.includes(language.label) && (
                              <IconCheck />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className='relative'>
              <p className='body-sm'>Languages:</p>
              <Spacer size={1} />

              <Button
                size={'lg'}
                className='bg-white text-black w-full'
                onClick={handleOpenLanguages}
              >
                Languages {selectLanguages.length} <IconChevronDown />
              </Button>
              {openLanguages && (
                <div className='bg-white text-black rounded-md py-2 absolute top-16 left-0 z-10 w-[200px]'>
                  <div className='flex gap-2 flex-col items-center '>
                    <p
                      onClick={() => setSelectedLanguages([])}
                      className='cursor-pointer'
                    >
                      Clear filters
                    </p>
                    {languagesData.map((language, index) => {
                      return (
                        <div
                          onClick={() => {
                            handleLanguages(language.title);
                          }}
                          key={index}
                          className='flex flex-col gap-2  w-full rounded-lg  px-2 cursor-pointer'
                        >
                          <div className='flex items-center justify-between w-full gap-4 hover:bg-gray-300 p-2 rounded-md'>
                            <p className='font-semibold'>{language.title}</p>
                            {selectLanguages?.includes(language.title) && (
                              <IconCheck />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Spacer size={12} />
          <p>Proficiency Levels:</p>
          <Spacer size={2} />
          <div className=' grid grid-cols-5 gap-6'>
            <Controller
              name='projectManager'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Dropdown
                    defaultValue={
                      value || storedValue?.projectManager || 'selectCity'
                    }
                    label='Project manager'
                    options={[
                      {
                        label: 'Select city',
                        value: 'selectCity',
                        image: '',
                        id: '',
                      },
                      {
                        label: 'Timisoara',
                        value: 'timisoara',
                        image: '',
                        id: '1',
                      },
                      { label: 'Oradea', value: 'oradea', image: '', id: '2' },
                    ]}
                    onChange={(v) => {
                      onChange(v);
                    }}
                    error={errors.projectManager?.message}
                  />
                );
              }}
            />
            <Controller
              name='communications'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Dropdown
                    defaultValue={
                      value || storedValue?.communications || 'selectCity'
                    }
                    label='Communications'
                    options={[
                      {
                        label: 'Select city',
                        value: 'selectCity',
                        image: '',
                        id: '',
                      },
                      {
                        label: 'Timisoara',
                        value: 'timisoara',
                        image: '',
                        id: '1',
                      },
                      { label: 'Oradea', value: 'oradea', image: '', id: '2' },
                    ]}
                    onChange={(v) => {
                      onChange(v);
                    }}
                    error={errors.communications?.message}
                  />
                );
              }}
            />
            <Controller
              name='technicalSkills'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Dropdown
                    defaultValue={
                      value || storedValue?.technicalSkills || 'selectCity'
                    }
                    label='Technical Skills'
                    options={[
                      {
                        label: 'Select city',
                        value: 'selectCity',
                        image: '',
                        id: '',
                      },
                      {
                        label: 'Timisoara',
                        value: 'timisoara',
                        image: '',
                        id: '1',
                      },
                      { label: 'Oradea', value: 'oradea', image: '', id: '2' },
                    ]}
                    onChange={(v) => {
                      onChange(v);
                    }}
                    error={errors.technicalSkills?.message}
                  />
                );
              }}
            />
            <Controller
              name='problemSolving'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Dropdown
                    defaultValue={
                      value || storedValue?.problemSolving || 'selectCity'
                    }
                    label='Problem Solving'
                    options={[
                      {
                        label: 'Select city',
                        value: 'selectCity',
                        image: '',
                        id: '',
                      },
                      {
                        label: 'Timisoara',
                        value: 'timisoara',
                        image: '',
                        id: '1',
                      },
                      { label: 'Oradea', value: 'oradea', image: '', id: '2' },
                    ]}
                    onChange={(v) => {
                      onChange(v);
                    }}
                    error={errors.problemSolving?.message}
                  />
                );
              }}
            />
            <Controller
              name='leadership'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Dropdown
                    defaultValue={
                      value || storedValue?.leadership || 'selectCity'
                    }
                    label='Leadership'
                    options={[
                      {
                        label: 'Select city',
                        value: 'selectCity',
                        image: '',
                        id: '',
                      },
                      {
                        label: 'Timisoara',
                        value: 'timisoara',
                        image: '',
                        id: '1',
                      },
                      { label: 'Oradea', value: 'oradea', image: '', id: '2' },
                    ]}
                    onChange={(v) => {
                      onChange(v);
                    }}
                    error={errors.leadership?.message}
                  />
                );
              }}
            />
          </div>

          <Spacer size={12} />

          <div className='flex gap-2 items-center '>
            <p>Skill Sets:</p>
            <div
              className='w-6 h-6 flex items-center text-black  bg-green-400 rounded-full justify-center'
              onClick={() => {}}
            >
              <Plus size={20} className='cursor-pointer' />
            </div>
          </div>

          <Spacer size={2} />
        </div>
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

const languagesData = [
  { title: 'Romanian' },
  { title: 'English' },
  { title: 'German' },
  { title: 'Spanish' },
  { title: 'French' },
];

const coreCompetenciesData = [
  {
    label: 'Select competence',
    value: 'coreCompetencies',
    image: '',
    id: '',
  },
  {
    label: 'Team player',
    value: 'Team player',
    image: '',
    id: '1',
  },
  {
    label: 'Communication',
    value: 'Communication',
    image: '',
    id: '2',
  },
  {
    label: 'Leadership',
    value: 'Leadership',
    image: '',
    id: '3',
  },
  {
    label: 'Problem solving',
    value: 'Problem solving',
    image: '',
    id: '4',
  },
  {
    label: 'Technical skills',
    value: 'Technical skills',
    image: '',
    id: '5',
  },
];
