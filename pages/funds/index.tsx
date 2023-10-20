import { parseEther } from '@ethersproject/units';
import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FundCard from '../../components/FundCard';
import { RowContainer, RowCol, ColRow } from '../../components/Layout';
import { Asset, getAsset } from '../../lib/asset';
import { Fund, getFundByName } from '../../lib/fund';
import { parseBalance } from '../../util';

const FundContainer = styled.div`
    width: 100%;
    border-radius: 15px;
    background-color: ${(props) => props.theme.white};
    box-shadow: 0px 2px 4px #0000004d;
    margin: 10px 0px;
    overflow: hidden;
`;

const Field = styled.span`
    color: ${(props) => props.theme.grey};
`;

const FUNDS = ['dDEFI', 'dCHAIN', 'dSTBL'];

const Landing: React.FC = (): React.ReactElement => {
    const funds: Fund[] = [];
    const [fundAssets, setFundAssets] = useState<{ [key: string]: Asset }>({});

    FUNDS.forEach((fund) => {
        funds.push(getFundByName(fund)!);
    });

    useEffect(() => {
        const fetchPromises: Promise<any>[] = [];

        funds.forEach((fund) => {
            // fetchPromises.push(getAsset(fund.address, library, undefined, true));
            fetchPromises.push(getAsset(fund.address, undefined, true));
        });

        console.log(fetchPromises);
        console.log(funds);

        Promise.all(fetchPromises).then((values) => {
            const newFundAssets: { [key: string]: Asset } = {};

            values.forEach((value) => {
                newFundAssets[value.symbol] = value;
            });

            setFundAssets(newFundAssets);
        });
        // }, [library]);
    }, []);

    const fundCards: React.ReactElement[] = [];
    funds.forEach((fund, index) => {
        fundCards.push(
            <FundCard
                index={index}
                price={fundAssets[fund.symbol] ? parseBalance(fundAssets[fund.symbol].price!, 18, 2, false) : '0.00'}
                fund={fund}
                priceChange={'N/A'}
                marketCap={
                    fundAssets[fund.symbol]
                        ? parseBalance(
                              fundAssets[fund.symbol].price!.mul(fundAssets[fund.symbol].cap!).div(parseEther('1')),
                              18,
                              2,
                              false
                          )
                        : '0.00'
                }
            />
        );
    });

    return (
        <Layout.Content>
            <RowContainer style={{ flexDirection: 'column' }}>
                <RowCol>
                    <ColRow span={24} style={{ alignItems: 'flex-start' }}>
                        <h2 style={{ marginBottom: '0px' }}>Available Bundles</h2>
                        <span style={{ marginBottom: '30px' }}>Passively managed, non-custodial crypto-funds.</span>
                    </ColRow>
                </RowCol>
                <RowCol hideOnMobile={true}>
                    <ColRow xs={5} md={5} style={{ alignItems: 'flex-start' }}>
                        <Field style={{ paddingLeft: '10px' }}>Name</Field>
                    </ColRow>
                    <ColRow xs={9} md={9}>
                        <Field>Assets</Field>
                    </ColRow>
                    <ColRow xs={3} md={3}>
                        <Field>24H</Field>
                    </ColRow>
                    <ColRow xs={4} md={4}>
                        <Field>Market Cap</Field>
                    </ColRow>
                    <ColRow xs={3} md={3}>
                        <Field>Price</Field>
                    </ColRow>
                </RowCol>
                <RowCol>
                    <ColRow span={24} mobilePadding="0px">
                        <FundContainer>{fundCards}</FundContainer>
                    </ColRow>
                </RowCol>
            </RowContainer>
        </Layout.Content>
    );
};

export default Landing;
