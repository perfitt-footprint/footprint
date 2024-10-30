import { forwardRef } from 'react';
import Select, { Props } from 'react-select';
import { selectStyles } from '../../../styles/selectStyles';

type TAuthSelectProps = {
  fieldChange?: (value: string) => void;
} & Props;

const AuthSelect = forwardRef<any, TAuthSelectProps>((props, ref) => {
  const { fieldChange, onChange, value, styles, ...rest } = props;

  const handleSelect = (newValue: unknown) => {
    if (fieldChange) {
      fieldChange((newValue as { value: string }).value || '');
    }
  };

  return (
    <Select
      {...rest}
      ref={ref}
      value={value ? { value: value, label: value } : null}
      onChange={fieldChange ? handleSelect : onChange}
      styles={styles || selectStyles}
    />
  );
});

AuthSelect.displayName = 'AuthSelect';

export default AuthSelect;
