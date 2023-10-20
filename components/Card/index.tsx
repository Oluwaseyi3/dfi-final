import { Card } from 'antd';

interface CardProps {
    children?: React.ReactNode;
}

const CustomCard = (props: CardProps) => {
    return (
        <Card style={{ width: '100%', borderRadius: '15px', margin: '10px 0px', overflow: 'hidden' }}>
            {props.children}
        </Card>
    );
};

export default CustomCard;