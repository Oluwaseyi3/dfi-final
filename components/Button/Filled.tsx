import { Button } from 'antd';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
}

const Filled: React.FC<Props> = ({ children, disabled }) => {
  return (
    <Button
      style={{
        background: disabled ? '#BFBFBF' : '#1890ff',
        border: '2px solid transparent',
        borderRadius: '15px',
        color: '#fff',
        fontWeight: 'bold',
        padding: '10px 35px',
        textAlign: 'center',
        height: '45px',
      }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default Filled;
