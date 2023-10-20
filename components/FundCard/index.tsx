import { Card, Row, Col } from 'antd';
import { Fund } from '../../lib/fund';
import Link from 'next/link';

interface Props {
  index: number;
  fund: Fund;
  priceChange: string;
  marketCap: string;
  price: string;
}

const FundCard: React.FC<Props> = (props: Props): React.ReactElement => {
  const assets = [];

  for (let i = 0; i < Math.min(props.fund.assets.length, 6); i++) {
    if (i === 5 && props.fund.assets.length > 6) {
      assets.push(
        <span key={i} style={{ fontSize: '14px', paddingLeft: '5px' }}>{`+${props.fund.assets.length - i}`}</span>
      );
    } else {
      assets.push(
        <div key={i} style={{ width: '40px', height: '40px', borderRadius: '50%', boxShadow: '2px 2px 4px #00000025', marginLeft: i === 0 ? '0px' : '-15px', zIndex: 10 - i, backgroundColor: '#fff', overflow: 'hidden' }}>
          <img src={`/assets/${props.fund.assets[i]}.png`} width="40px" height="40px" />
        </div>
      );
    }
  }

  return (
    <Link href={`/funds/${props.fund.symbol}`}>
      <Card
        style={{
          backgroundColor: props.index % 2 === 0 ? '#fff' : '#2d2d2d',
          minHeight: '70px',
          overflow: 'hidden',
          transition: 'transform 0.2s',
        }}
        hoverable
        className="fund-card"
      >
        <Row align="middle">
          <Col xs={24} md={5} style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
            <img src="/assets/logo.svg" width="40px" height="40px" style={{ margin: '0px 5px 0px 20px' }} />
            <div style={{ fontSize: '16px', fontFamily: 'Visuelt', margin: '3px 10px 0px 10px', fontWeight: 'bold' }}>
              {props.fund.name}
            </div>
          </Col>
          <Col xs={24} md={9} style={{ justifyContent: 'center', flexDirection: 'row' }} hidden={true}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{assets}</div>
          </Col>
          <Col xs={8} md={3}>
            <span style={{ color: '#ccc', fontSize: '12px' }}>24H</span>
            <div style={{ fontSize: '16px', fontFamily: 'Visuelt', margin: '3px 10px 0px 10px' }}>{props.priceChange}</div>
          </Col>
          <Col xs={8} md={4}>
            <span style={{ color: '#ccc', fontSize: '12px' }}>Market Cap</span>
            <div style={{ fontSize: '16px', fontFamily: 'Visuelt', margin: '3px 10px 0px 10px' }}>{`$${props.marketCap}`}</div>
          </Col>
          <Col xs={8} md={3}>
            <span style={{ color: '#ccc', fontSize: '12px' }}>Price</span>
            <div style={{ fontSize: '16px', fontFamily: 'Visuelt', margin: '3px 10px 0px 10px' }}>{`$${props.price}`}</div>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default FundCard;
