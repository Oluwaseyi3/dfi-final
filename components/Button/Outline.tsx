import { Button } from 'antd';

interface Props {
  children: string;
  disabled?: boolean;
  selected?: boolean;
}

const Outline = ({ children, disabled, selected }: Props) => {
  return (
    <Button
      type="default"
      disabled={disabled}
      style={{
        background: disabled
          ? '#f5f5f5'
          : selected
          ? '#1890ff'
          : '#fff',
        border: `2px solid ${disabled ? '#d9d9d9' : '#1890ff'}`,
        borderRadius: '10px',
        color: selected ? '#fff' : disabled ? '#a6a6a6' : '#1890ff',
        padding: '10px 35px 10px 35px',
        textAlign: 'center',
        height: '45px',
        fontWeight: 'normal',
      }}
    >
      {children}
    </Button>
  );
};

export default Outline;
