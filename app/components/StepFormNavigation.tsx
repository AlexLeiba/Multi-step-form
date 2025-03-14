'use client';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export function StepFormNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedStep, setSelectedStep] = React.useState(1);

  const allSteps = [
    {
      title: 'Personal info',
      href: '/apply/personal-info',
      step: 1,
    },
    {
      title: 'Additional info',
      href: '/apply/additional-info',
      step: 2,
    },
    {
      title: 'History',
      href: '/apply/history',
      step: 3,
    },
    {
      title: 'Skills',
      href: '/apply/skills',
      step: 4,
    },
    {
      title: 'Review',
      href: '/apply/review',
      step: 5,
    },
  ];

  function handleSelectStep(path: string, step: number) {
    setSelectedStep(step);
    router.push(path);
  }
  return (
    <div className=' flex flex-col mb-6'>
      <div className='flex gap-4 items-center'>
        {allSteps.map((step, index) => {
          return (
            <div className='flex items-center gap-2 ' key={index}>
              <div
                onClick={() => handleSelectStep(step.href, step.step)}
                className='flex items-center gap-2 cursor-pointer'
              >
                <div
                  className={cn(
                    pathname === step.href ? 'bg-sky-300' : 'bg-gray-300',
                    'flex justify-between items-center w-6 h-6  text-black rounded-full p-2'
                  )}
                >
                  <p
                    className={cn(
                      'body-sm',
                      pathname === step.href ? '!font-bold' : 'font-normal'
                    )}
                  >
                    {step.step}
                  </p>
                </div>
                <div className=' '>
                  <p
                    className={cn(
                      'body-sm',
                      pathname === step.href
                        ? '!font-bold !text-white'
                        : '!font-normal !text-gray-400'
                    )}
                  >
                    {step.title}
                  </p>
                </div>
              </div>

              {allSteps.length - 1 > index && (
                <div
                  className={cn(
                    selectedStep > index ? 'bg-gray-300' : 'bg-gray-700',
                    'w-[100px] h-[1px] '
                  )}
                ></div>
              )}
            </div>
          );
        })}
      </div>
      {/* separator */}
      <div className='w-full bg-gray-700 h-px mt-6'></div>
    </div>
  );
}
