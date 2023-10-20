import { Card } from 'antd';
import React from 'react';

interface Props {
    image: string;
    imageSecondary?: string;
    name: string;
    ticker: string;
    apy?: string;
    width?: string;
    cardStyle?: React.CSSProperties;
    imgStyle?: React.CSSProperties;
}

const RewardCard: React.FC<Props> = (props: Props): React.ReactElement => {
    return (
        <Card style={{ width: props.width ? props.width : '100%', borderRadius: '15px', margin: '10px', overflow: 'hidden', backgroundColor: '#1f1f1f' }} bodyStyle={{ padding: '10px 20px', backgroundColor: '#ffffff', borderRadius: '15px' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', boxShadow: '2px 2px 5px #00000012', zIndex: 2, backgroundColor: '#ffffff' }}>
                    <img src={props.image} width={50} height={50} style={props.imgStyle} alt="" />
                </div>
                {props.imageSecondary ? (
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', boxShadow: '2px 2px 5px #00000012', zIndex: 1, position: 'relative', right: '20px' }}>
                        <img src={props.imageSecondary} width={50} height={50} style={props.imgStyle} alt="" />
                    </div>
                ) : (
                    <></>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '15px', marginLeft: props.imageSecondary ? '-20px' : '0px', marginTop: '7px' }}>
                    <h1 style={{ fontSize: '15px', margin: '0px', transition: '0.25s font-size', color: '#000000' }}>{props.name}</h1>
                    <p style={{ fontSize: '12px', margin: '0px !important', transition: '0.25s font-size', color: '#8c8c8c' }}>{props.ticker}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', paddingLeft: '15px', marginTop: '7px' }}>
                    <h1 style={{ color: '#1890ff', margin: '0px', fontSize: '20px', fontWeight: 'bold' }}>{props.apy}</h1>
                    <p style={{ fontSize: '12px', margin: '0px !important', color: '#8c8c8c' }}>APY</p>
                </div>
            </div>
        </Card>
    );
};

export default RewardCard;