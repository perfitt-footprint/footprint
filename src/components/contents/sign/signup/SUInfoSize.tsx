import { useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import AuthInputField from '../../../common/auth/AuthInputField';
import AuthSelectButton from '../../../common/auth/AuthSelectButton';
import AuthSelect from '../../../common/auth/AuthSelect';
import InfoMessage from '../../../common/InfoMessage';

function SUInfoSize({ edit }: { edit?: boolean }) {
  const {
    control,
    setValue,
    formState: { errors, submitCount },
    trigger,
    clearErrors,
  } = useFormContext();

  const sizeTypeValue = useWatch({
    control,
    name: 'sizeType',
  });

  const sizeData = [
    {
      type: 'mm',
      size: [220, 310],
      gap: 5,
    },
    {
      type: 'EU',
      size: [35.5, 46],
      gap: 0.5,
    },
    {
      type: 'US',
      size: [5, 13],
      gap: 0.5,
    },
  ];

  const sizeOptions = useMemo(() => {
    const sizeTypeData = sizeData.find(data => data.type === sizeTypeValue);
    if (!sizeTypeData) return [];

    const { type, size, gap } = sizeTypeData;
    const sizeOptions = Array.from({ length: Math.floor((size[1] - size[0]) / gap) + 1 }, (_, i) => {
      const optionSize = size[0] + i * gap;
      const option = type === 'mm' ? `${optionSize}mm` : `${type} ${optionSize}`;
      return { value: option, label: option };
    });

    return sizeOptions;
  }, [sizeTypeValue]);

  const handleSizeTypeClick = (type: string, handleClick: (...event: any[]) => void) => {
    handleClick(type);
    clearErrors('sizeType');
    setValue('size', '');
    if (submitCount > 0) trigger('size');
  };

  const handleSizeFocus = async () => {
    if (!sizeTypeValue) await trigger('sizeType');
  };

  return (
    <>
      <AuthInputField
        title='사이즈 타입'
        htmlFor='sizeType'
        errorMessage={errors.sizeType?.message as string}
      >
        <Controller
          name='sizeType'
          control={control}
          rules={{ required: '* 사이즈 타입을 선택해 주세요.' }}
          render={({ field }) => (
            <div className='w-full flex gap-2'>
              {['mm', 'EU', 'US'].map(type => (
                <AuthSelectButton
                  key={type}
                  isActive={field.value === type}
                  onClick={() => handleSizeTypeClick(type, field.onChange)}
                >
                  {type}
                </AuthSelectButton>
              ))}
            </div>
          )}
        />
      </AuthInputField>
      <AuthInputField
        title='평소 신는 스니커즈 사이즈'
        htmlFor='size'
        errorMessage={errors.size?.message as string}
      >
        <Controller
          name='size'
          control={control}
          rules={{ required: '* 사이즈를 선택해 주세요.' }}
          render={({ field }) => (
            <AuthSelect
              {...field}
              id={field.name}
              options={sizeOptions}
              placeholder='사이즈를 선택해 주세요'
              fieldChange={field.onChange}
              onFocus={handleSizeFocus}
            />
          )}
        />
      </AuthInputField>

      {!edit && (
        <InfoMessage>
          나에게 편한 신발 사이즈를 고려해서 추천사이즈를 알려드리기 위해 평소 신는 스니커즈 사이즈를 받고 있어요.
        </InfoMessage>
      )}
    </>
  );
}

export default SUInfoSize;
