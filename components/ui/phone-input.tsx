'use client';

import * as React from 'react';

import * as RPNInput from 'react-phone-number-input';

import flags from 'react-phone-number-input/flags';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input, InputProps } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { Label } from './label';

import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from './tooltip';
import { Check, ChevronDown, InfoIcon } from 'lucide-react';

type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'size'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange: (value: RPNInput.Value) => void;
    value?: RPNInput.Value;
    label?: string;
    hintText?: string;
    error?: string;
    size?: 'small' | 'medium';
    autocomplete?: boolean;
    darkTooltip?: boolean;
    iconHelpTooltip?: {
      title?: string;
      description?: string;
    };
    mandatory?: boolean;
  };

export type PhoneInputValue = RPNInput.Value;

/**
 * PhoneInput component
 *
 * A phone input component. It uses react-phone-number-input under the hood. To use it in a form wrap it with a Controller.
 *
 * @param className - string: classes to be passed to component
 * @param label - string: label to be passed to component
 * @param iconHelpTooltip - object: the tooltip configuration for the icon
 * @param hintText - string: the hint text to display below the input
 * @param error - string: the error message to display below the input
 * @param name - string: the name attribute of the input
 * @param placeholder - string: the placeholder attribute of the input
 * @param flagComponent - jsx.element: the component to render the flag
 * @param countrySelectComponent - jsx.element: the component for selecting the country
 * @param international - boolean: specifies whether it's an international phone number
 * @param defaultCountry - string: the default country for the phone number input
 * @param numberInputProps - object: additional props for customizing the number input component.
 * @param size - small | medium
 * @param autocomplete - boolean: whether the input is read only , the prop is written in lowercase to avoid overwriting the autoComplete prop of the input component
 *
 * [React Phone Number Input](https://www.npmjs.com/package/react-phone-number-input)
 */

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<
    React.ComponentRef<typeof RPNInput.default>,
    PhoneInputProps
  >(
    (
      {
        className,
        label,
        iconHelpTooltip,
        hintText,
        error,
        name,
        size,
        autocomplete,
        darkTooltip,
        mandatory,
        ...props
      },
      ref
    ) => (
      <div className='relative w-full'>
        {label && (
          <Label
            className={cn(
              error && 'text-red-500',
              autocomplete && 'text-gray-400',
              size === 'small' ? 'body-xs' : 'body-sm'
            )}
            htmlFor={name}
          >
            {label}
            {mandatory && (
              <span
                className={cn(
                  error ? 'text-red-500' : 'text-black',
                  size === 'small' ? 'body-xs' : 'body-sm'
                )}
              >
                {' '}
                *
              </span>
            )}
          </Label>
        )}

        <div className='relative'>
          <RPNInput.default
            countrySelectProps={{
              tabIndex: 0,
            }}
            readOnly={autocomplete}
            name={name}
            ref={ref}
            className={cn('flex', className)}
            flagComponent={FlagComponent}
            international={true}
            countrySelectComponent={(props) =>
              CountrySelect(props, size ? size : 'medium', error, autocomplete)
            }
            defaultCountry='RO'
            inputComponent={InputComponent}
            numberInputProps={{
              className: cn([
                !!error && '!border-red-500 focus-visible:outline-none',
              ]),
              mandatory: mandatory,
              autocomplete: autocomplete,
            }}
            {...props}
            size={size}
          />
          {/* ICON HELP TEXT TOOLTIP */}
          {iconHelpTooltip?.title && (
            <TooltipProvider delayDuration={250} disableHoverableContent>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon
                    size={20}
                    className={cn([
                      'z-20 cursor-help',
                      'absolute right-2 top-1/2 -translate-y-1/2',
                      'text-gray-200 stroke-[1.5px]',
                    ])}
                  />
                </TooltipTrigger>
                <TooltipContent
                  dark={darkTooltip}
                  iconHelpTooltip={iconHelpTooltip}
                />
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {!!hintText && !error && (
          <p className={cn('body-xs text-black mt-0.5')}>{hintText}</p>
        )}
        {error && (
          <p className={cn('body-xs text-red-500 mt-0.5 font-normal')}>
            {error}
          </p>
        )}
      </div>
    )
  );

PhoneInput.displayName = 'PhoneInput';

/**
 * InputComponent component
 *
 * A phone input component. It uses react-phone-number-input under the hood. To use it in a form wrap it with a Controller.
 *
 * @param className - string: additional CSS class for the input container
 * @param label - string: the label for the input
 * @param hintText - string: the hint text to display below the input
 * @param iconHelpText - string: the help text to display in the tooltip for the help icon
 * @param iconLeft - reactNode: the icon to display on the left side of the input
 * @param error - string: the error message to display below the input
 * @param size - string: the size of the input. Possible values: 'small', 'medium', 'large'
 * @param type - string: the type of the input. Possible values: 'text', 'password', 'email', 'number', 'search', etc
 * @param darkTooltip - boolean: whether to use a dark theme for the tooltip
 * @param onRightIconClick - function: the callback function to be called when the right icon is clicked
 * @param name - string: the name attribute of the input
 * @param value - string: the value of the input
 * @param onChange - function: (value: RPNInput.Country) => void: the callback function to be called when the input value changes
 * @param size - string: the size of the input. Possible values: 'small', 'medium'
 * @param autocomplete - boolean: whether the input is read only , the prop is written in lowercase to avoid overwriting the autoComplete prop of the input component
 *
 */

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, size, autocomplete, error, iconHelpTooltip, ...props },
    ref
  ) => (
    <Input
      autoComplete='off'
      type='number'
      className={cn([
        [
          size === 'small' ? 'body-sm' : 'body-base',
          'relative',
          'rounded-lg rounded-l-none',
          'bg-white',
          'text-black z-10 flex w-full -translate-x-px border py-1 !pl-2 pr-2',
          'placeholder:text-light',
          'disabled:text-gray-400 disabled:border-border-lightest disabled:cursor-not-allowed',

          // focus
          'focus:border-sky-500 focus:ring-sky-500 focus:border focus:ring-1',

          error && 'focus:border-red-500 focus:ring-red-border-red-500',
          autocomplete && 'bg-surface-disabled pointer-events-none',
          !!iconHelpTooltip?.title && 'pr-10',
        ],
        className,
      ])}
      {...props}
      ref={ref}
      size={size}
    />
  )
);

InputComponent.displayName = 'InputComponent';

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
  size: 'small' | 'medium';
};

/**
 * CountrySelect component
 *
 * @param disabled - boolena: indicates whether the component is disabled or not
 * @param value - string: the value of the input
 * @param onChange - function: (value: RPNInput.Country) => void: the callback function to be called when the input value changes
 * @param options -  CountrySelectOption[]: an array of options for countries to be displayed in the select dropdown
 * @param size - small | medium
 * @param mandatory - boolean: whether the field is mandatory
 *
 */

const CountrySelect = (
  { disabled, value, onChange, options }: CountrySelectProps,
  size: 'small' | 'medium',
  error?: string,
  autocomplete?: boolean,
  mandatory?: boolean
) => {
  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country);
    },
    [onChange]
  );

  return (
    <Popover>
      {/* COUNTRY BUTTON */}

      <PopoverTrigger
        asChild
        className={cn(
          'rounded-lg rounded-r-none bg-white',
          'mt-0.5 w-[70px] !pl-3 ',
          'data-[state=open]:relative data-[state=open]:z-20',
          'border-0 data-[state=open]:border-sky-500 data-[state=open]:border',
          'ring-sky-500 data-[state=open]:ring-1',

          error &&
            'data-[state=open]:border-red-500 border-red-500 ring-red-border-red-500 data-[state=open]:border data-[state=open]:ring-1',

          // Disabled prop here stands for conditionally set ui on (disabled or autocomplete prop) without overwriting each other
          disabled &&
            'disabled:bg-surface-disabled disabled:border-border-lightest disabled:text-gray-400 disabled:cursor-not-allowed',
          autocomplete && 'bg-surface-disabled text-gray-400 cursor-not-allowed'
        )}
      >
        <Button
          type='button'
          variant={'ghost'}
          size={'sm'}
          className={cn(
            size === 'small' ? 'h-8' : 'h-10',
            'flex gap-1 pl-3 pr-3'
          )}
          disabled={disabled || !!autocomplete}
        >
          <span className='flex items-center gap-1 truncate'>
            <div className='bg-surface-base flex h-4 w-6'>
              {value && <FlagComponent country={value} countryName={value} />}
            </div>

            <ChevronDown size={12} color='black' />
          </span>
        </Button>
      </PopoverTrigger>

      {/* COUNTRY LIST */}
      <PopoverContent
        className={cn(
          'border-none p-0 ',
          size === 'small' ? 'min-w-[200px]' : 'min-w-[240px]'
        )}
        align='start'
      >
        <Command
          filter={(value, search) => {
            if (value.toLowerCase().startsWith(search.toLowerCase())) return 1;
            return 0;
          }}
        >
          <div className='p-2'>
            <CommandInput placeholder='Search country...' inputsize={size} />
          </div>
          <CommandList
            className='transition-height ease-ease bg-surface-base overscroll-contain duration-100'
            inputsize={size}
          >
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x.value)
                .map((option) => (
                  <CommandItem
                    inputsize={size}
                    className={'gap-2'}
                    key={option.value}
                    onSelect={() => {
                      console.log(option.value);
                      handleSelect(option.value);
                    }}
                  >
                    <FlagComponent
                      country={option.value}
                      countryName={option.label}
                    />

                    <span>
                      {option.label}
                      {mandatory && (
                        <span
                          className={cn(
                            error ? 'text-red-500' : 'text-black',

                            size === 'small' ? 'body-xs' : 'body-sm'
                          )}
                        >
                          {' '}
                          *
                        </span>
                      )}
                    </span>

                    <span className='text-black'>
                      {`+${RPNInput.getCountryCallingCode(option.value)}`}
                    </span>

                    <Check
                      className={cn(
                        `ml-auto ${
                          option.value === value
                            ? 'text-black opacity-100'
                            : 'opacity-0'
                        }`
                      )}
                      size={20}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

/**
 * FlagComponent component
 *
 * @param country - CountryCode: the country code representing the country whose flag will be displayed
 * @param countryName - string: the name of the country
 *
 */

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className={'inline h-4 w-6 overflow-hidden object-contain'}>
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

const isValidPhoneNumber = RPNInput.isValidPhoneNumber;

export { PhoneInput, isValidPhoneNumber };
