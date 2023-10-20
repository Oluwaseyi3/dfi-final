import { Col, Row } from 'antd';
import React from 'react';

const Footer: React.FC = (): React.ReactElement => {
    return (
        <Row justify="center" align="middle" style={{ height: '60px', background: 'darkGrey' }}>
            <Col xs={24} sm={24} md={24}>
                <Row justify="start" align="middle">
                    <Col>
                        <a style={{ color: 'white', margin: '0px 20px', fontSize: '16px' }} href="#">Discord</a>
                        <a style={{ color: 'white', margin: '0px 20px', fontSize: '16px' }} href="#">Twitter</a>
                        <a style={{ color: 'white', margin: '0px 20px', fontSize: '16px' }} href="#">Medium</a>
                        <a style={{ color: 'white', margin: '0px 20px', fontSize: '16px' }} href="#">Github</a>
                        <a style={{ color: 'white', margin: '0px 20px', fontSize: '16px' }} href="#">Docs</a>
                    </Col>
                </Row>
            </Col>
            <Col>
                <img height="46px" width="55px" src="/assets/derpfi.png" style={{ opacity: '0.3', position: 'absolute', bottom: '7px', left: '50%' }} />
            </Col>
            <Col>
                <img height="172px" width="162px" src="/assets/footer_dots.svg" style={{ opacity: '0.3', position: 'absolute', right: '25px', transform: 'matrix(0.84, -0.54, 0.54, 0.84, 0, 0)', marginRight: '55px' }} />
            </Col>
        </Row>
    );
};

export default Footer;