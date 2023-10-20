import { Card, Row, Col } from 'antd';
import { BigNumber } from '@ethersproject/bignumber';
import { parseBalance } from '../../util';
import { parseEther } from '@ethersproject/units';
import { Asset } from '../../lib/asset';
interface Props {
  asset: Asset;
  nav: BigNumber;
  index: number;
}

interface ProgressBarProps {
  progress: number;
}

const AssetCard: React.FC<Props> = (props: Props): React.ReactElement => {
  const progress = Math.round(
    props.asset.amount
      ?.mul(props.asset.price!)
      .div(parseEther('1'))
      .div('10000000000000')
      .toNumber()! / props.nav.div('1000000000000000').toNumber()!
  );

  const percentage = Math.round(progress / 100);

  return (
    <Col xs={24} md={12} style={{ padding: props.index % 2 === 0 ? '0px 15px 0px 0px' : '0px' }}>
      <Card style={{ height: '40px' }}>
        <Row align="middle">
          <Col xs={4} lg={3}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                boxShadow: '2px 2px 4px #00000025',
                backgroundColor: '#fff',
                overflow: 'hidden',
                margin: '-5px 0px 0px -3px',
                alignItems: 'flex-start',
              }}
            >
              <img src={`/assets/${props.asset.symbol.toUpperCase()}.png`} width="50px" height="50px" />
            </div>
          </Col>
          <Col xs={5} md={4} lg={4}>
            <div style={{ fontSize: '16px', fontFamily: 'Visuelt', margin: '3px 10px 0px 10px' }}>
              {props.asset.symbol.toUpperCase()}
            </div>
          </Col>
          <Col xs={9} md={9} lg={9}>
            <div style={{ fontSize: '16px', fontFamily: 'Visuelt', margin: '3px 10px 0px 10px' }}>
              {`$${parseBalance(props.asset.price!, 18, 2, false)}`}
            </div>
          </Col>
          <Col xs={0} md={0} lg={3}>
            <div
              style={{
                width: '90%',
                height: '20px',
                borderRadius: '6px',
                backgroundColor: '#2d2d2d',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: '#1890ff',
                }}
              />
            </div>
          </Col>
          <Col xs={4} md={4} lg={5}>
            <div style={{ fontSize: '16px', color: '#E7694C', margin: '3px 10px 0px 10px' }}>
              {`${percentage}%`}
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default AssetCard;
