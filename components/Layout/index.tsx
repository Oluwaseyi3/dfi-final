import { Row, Col } from 'antd';

export const RowContainer = ({ children }: any) => {
    return (
        <Row justify="center" align="middle" style={{ width: '100vw', padding: '100px' }}>
            <p style={{ marginTop: '10px' }}>{children}</p>
        </Row>
    );
};

interface RowProps {
    hideOnMobile?: boolean;
}

export const RowCol = (props: any) => {
    return (
        <Row
            justify="center"
            align="middle"
            style={{ maxWidth: '100%', display: props.hideOnMobile ? 'none' : 'default' }}
        >
            {props.children}
        </Row>
    );
};

interface ColProps {
    mobilePadding?: string;
    justify?: string;
    align?: string;
    hideOnMobile?: boolean;
    padding?: string;
}

export const ColRow = (props: any) => {
    return (
        <Col
            xs={24}
            sm={24}
            md={24}
            style={{
                display: props.hideOnMobile ? 'none' : 'default',
                padding: props.padding ? props.padding : '0px',
                justifyContent: props.justify ? props.justify : 'center',
                alignItems: props.align ? props.align : 'center',
            }}
        >
            {props.children}
        </Col>
    );
};
