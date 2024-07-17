import { SingleValue } from 'react-select';
import React, { useCallback, useMemo } from 'react';
import CreateableSelect from 'react-select/creatable';

type SelectProps = {
  value?: string | null | undefined;
  onChange: (value?: string) => void;
  disabled?: boolean;
  onCreate?: (value: string) => void;
  options?: { label: string; value: string }[];
  placeholder?: string;
};

export const Select = ({ value, onChange, disabled, onCreate, options, placeholder }: SelectProps) => {
  const onSelect = useCallback(
    (option: SingleValue<{ label: string; value: string }>) => {
      onChange(option?.value);
    },
    [onChange]
  );

  const formattedValue = useMemo(() => {
    return options?.find((option) => option.value === value);
  }, [options, value]);

  return (
    <CreateableSelect
      className='h-10 text-sm'
      styles={{
        control: (styles) => ({
          ...styles,
          borderColor: '#E5E7EB',
          ':hover': {
            borderColor: '#E5E7EB',
          },
        }),
      }}
      isDisabled={disabled}
      value={formattedValue}
      onChange={onSelect}
      onCreateOption={onCreate}
      options={options}
      placeholder={placeholder}
    />
  );
};
