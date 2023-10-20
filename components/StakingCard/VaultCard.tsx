import React from 'react';

import { useEffect, useState, useRef, ReactNode } from 'react';
import styled from 'styled-components';
import { formatNumber, getNamedAddress, parseBalance } from '../../util';
import BundleTokenABI from '../../contracts/BundleToken.json';
import VaultABI from '../../contracts/Vault.json';
import Image from 'next/image';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Col, Row, InputNumber, Card, Typography, Button, Avatar, Collapse, Divider } from 'antd';
import Outline from '../Button/Outline';
import { fetchPrice } from '../../lib/coingecko';
import { formatUnits, parseEther } from '@ethersproject/units';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';

import { approveMessage, depositMessage, txMessage, withdrawMessage } from '../Messages';
import { prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core';
import { useAccount } from 'wagmi';
import { useContractRead } from 'wagmi';
import { message } from 'antd';
import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider';

import { ethers } from 'ethers';

interface Props {
    image?: any;
    name?: string;
    imageStyle?: React.CSSProperties;
    pid?: string;
    vault?: string;
    account?: string | undefined;
    disabled?: boolean;
    balance?: any;
}

interface VaultDisplayProps {
    expanded: boolean;
}

interface Disableable {
    disabled?: boolean;
}

const customStyles = {
    width: '100%',
    height: 'auto',
    borderRadius: '15px',
    backgroundColor: 'white', // Replace with your desired white color
    boxShadow: '0px 2px 4px #0000004d',
    margin: '15px 0px',
    transition: 'box-shadow 0.1s linear',
};

const hoverStyles = {
    boxShadow: '0px 3px 4px #0000004d',
};

export const VaultCardContainer = ({ children }: any) => {
    const [isHovered, setHovered] = React.useState(false);

    return (
        <Card
            style={isHovered ? { ...customStyles, ...hoverStyles } : customStyles}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {children}
        </Card>
    );
};

const customSztyles = {
    width: '100%',
    padding: '10px 20px',
    minHeight: '75px',
    cursor: 'pointer',
};

export const VaultInfoRow = ({ children }: any) => <Row style={customSztyles}>{children}</Row>;

const cusstomStyles = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
};

export const InfoBlock = ({ children }: any) => <Col style={cusstomStyles}>{children}</Col>;

const { Text } = Typography;

const custasaomStyles = {
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: 'Visuelt',
    margin: '3px 10px 0px 10px',
};

export const TextBold = ({ children }: any) => <Text style={custasaomStyles}>{children}</Text>;

const PrimaryContainer = ({ disabled, children }: any) => {
    const containerStyles = {
        height: '100%',
        backgroundColor: disabled ? '#808080' : '#0000FF',
        color: disabled ? 'default' : 'white',
        borderRadius: '15px',
        margin: '0px 10px',
    };

    return <div style={containerStyles}>{children}</div>;
};

const customASStyles = {
    width: '55px',
    height: '55px',
    boxShadow: '2px 2px 5px #00000012',
    marginRight: '10px',
    zIndex: 2,
    backgroundColor: 'white', // Replace with your desired background color
};

const ImageContainer = ({ children }: any) => (
    <Avatar size={55} style={customASStyles}>
        {children}
    </Avatar>
);

const { Panel } = Collapse;

interface CustomCollapsePanelProps {
    header: ReactNode;
    children: ReactNode;
    expanded: boolean;
}

const VaultDisplay = ({ header, children, expanded }: CustomCollapsePanelProps) => {
    return (
        <Collapse ghost defaultActiveKey={expanded ? '1' : undefined}>
            {expanded && (
                <Panel key="1" header={header}>
                    {children}
                </Panel>
            )}
        </Collapse>
    );
};

const PercentageContainer = ({ children }: any) => (
    <Row justify="center">
        <Col span={20}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    border: `1px solid your-grey-color`, // Replace with your desired grey color
                    borderRadius: '15px',
                    height: '26px',
                    overflow: 'hidden',
                }}
            >
                {children}
            </div>
        </Col>
    </Row>
);

const customStueyles = {
    cursor: 'pointer',
    flex: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 100ms linear',
};

const hoversStyles = {
    backgroundColor: '#0000FF', // Replace with your desired space grey color
};

const Percentage = ({ children }: any) => (
    <Col span={24} style={{ ...customStueyles, ...hoversStyles }}>
        {children}
    </Col>
);

const acustomStyles = {
    width: '1px',
    height: '100%',
    backgroundColor: '#808080', // Replace with your desired grey color
};

const PercentageDivider = () => <Divider style={acustomStyles} type="vertical" />;

const HideOnMobile = ({ children }: any) => (
    <Col xs={{ span: 24 }} lg={{ span: 0 }}>
        {children}
    </Col>
);

const customSsstyles = {
    color: '#0000FF', // Replace with your desired primary color
};

const LiquidityText = ({ children }: any) => <Text style={customStyles}>{children}</Text>;

const getApr = async (
    setApr: React.Dispatch<React.SetStateAction<string>>,
    bundleToken?: Contract | undefined,
    vault?: Contract | undefined,
    chainId?: number | undefined
) => {
    if (!!bundleToken && !!vault && !!chainId) {
        const priceData = await fetchPrice('bundle-dao');
        const price = priceData['bundle-dao']['usd'];
        const total = await bundleToken.balanceOf(vault.address);
        const tvl = price * total.div(parseEther('1'));

        const apr = (2000 / 200000) * 12;

        setApr(`${formatNumber(apr * 100)}%`);
    }
};

const VaultCard: React.FC<Props> = (props: Props): React.ReactElement => {
    const [expanded, setExpanded] = useState(false);
    const [apr, setApr] = useState('5');
    const [toStake, setToStake] = useState(BigNumber.from(0));
    const [toUnstake, setToUnstake] = useState(BigNumber.from(0));
    const [approved, setApproved] = useState(false);
    const [deposited, setDeposited] = useState(false);
    const [isHovered, setHovered] = React.useState(false);
    const [withdraw, setWithdraw] = useState(false);
    const approvedRef = useRef(false);
    const { address, isConnected } = useAccount();

    async function handleApproveClick() {
        const tokenAddress = '0x4987131473ccC84FEdbf22Ab383b6188D206cc9C'; // Address of the ERC20 token contract
        const vaultAddress = '0xf6f6928cac8e59b2b12216282a3f2cd5a2b366c0'; // Address of the vault contract

        const { request } = await prepareWriteContract({
            address: tokenAddress,
            abi: BundleTokenABI,
            functionName: 'approve',
            args: [vaultAddress, toStake],
        }); // Use the prepareWriteContract hook to prepare the contract write transaction

        const { hash } = await writeContract(request); // Use the writeContract hook to send the contract write transaction

        const transactionReceipt = await waitForTransaction({ hash }); // Use the waitForTransaction hook to wait for the transaction to be confirmed
        console.log(transactionReceipt); // Log the transaction receipt to the console
        if (transactionReceipt) {
            approveMessage(transactionReceipt);
        }

        approvedRef.current = true;
        console.log(approvedRef);
        setApproved(true);
    }

    async function handleDepositClick() {
        const vaultAddress = '0xf6f6928cac8e59b2b12216282a3f2cd5a2b366c0'; // Address of the vault contract
        const amount = 100; // Amount to deposit (in ether)
        const amountInWei = amount * 10 ** 18;

        const { request } = await prepareWriteContract({
            address: vaultAddress,
            abi: VaultABI,
            functionName: 'deposit',
            args: [toStake],
        }); // Use the prepareWriteContract hook to prepare the contract write transaction

        const { hash } = await writeContract(request); // Use the writeContract hook to send the contract write transaction

        const transactionReceipt = await waitForTransaction({ hash }); // Use the waitForTransaction hook to wait for the transaction to be confirmed
        txMessage(transactionReceipt);

        if (transactionReceipt) {
            depositMessage(transactionReceipt);
        }

        setDeposited(true);
        console.log(deposited);
    }

    async function handleWithdrawClick() {
        const vaultAddress = '0xf6f6928cac8e59b2b12216282a3f2cd5a2b366c0'; // Address of the vault contract

        const { request } = await prepareWriteContract({
            address: vaultAddress,
            abi: VaultABI,
            functionName: 'withdraw',
            args: [toUnstake],
        }); // Use the prepareWriteContract hook to prepare the contract write transaction

        const { hash } = await writeContract(request); // Use the writeContract hook to send the contract write transaction

        const transactionReceipt = await waitForTransaction({ hash }); // Use the waitForTransaction hook to wait for the transaction to be confirmed
        txMessage(transactionReceipt);
        if (transactionReceipt) {
            withdrawMessage(transactionReceipt);
        }

        setWithdraw(true);
    }

    const [vbal, setVal] = useState(null);

    const {
        data: VaultBalance,
        isLoading,
        isError,
    } = useContractRead({
        address: '0xf6f6928cac8e59b2b12216282a3f2cd5a2b366c0',
        abi: VaultABI,
        functionName: 'getBalance',
        args: [address],
        onSuccess(VaultBalance) {
            console.log('Sucess', VaultBalance);
        },
    });

    const { data: derphiBal } = useContractRead({
        address: '0x4987131473ccC84FEdbf22Ab383b6188D206cc9C',
        abi: BundleTokenABI,
        functionName: 'balanceOf',
        args: [address],
        onSuccess(derphiBal) {
            console.log('Sucess', derphiBal);
        },
    });

    //   console.log(VaultBalance)
    //   console.log(isLoading)
    //   console.log(toStake)
    //   console.log(vbal)
    const vaultBalance: BigNumber | string | number = VaultBalance as BigNumber | string | number;

    const dfiBalance: BigNumber | string | number = derphiBal as BigNumber | string | number;

    // If VaultBalance is not a BigNumber, convert it to one
    const balanceInWei: BigNumber =
        typeof vaultBalance === 'string' || typeof vaultBalance === 'number'
            ? BigNumber.from(vaultBalance.toString())
            : vaultBalance;

    // Now, you can pass balanceInWei to your parseBalance function
    const formattedBalance = parseBalance(balanceInWei);

    function handlePercentageClick() {
        const balance = props.balance?.formatted;
        if (balance) {
            const value = BigNumber.from(balance).div(4);
            console.log(value);

            setToStake(value);
        }
    }

    useEffect(() => {
        if (!props.disabled) {
            getApr(setApr);
        }
    }, [props.disabled]);

    console.log(approved);

    // const fixedPointValue = vaultBalance.toFixed(2) // Convert to a fixed-point integer
    const bigNumberValue = BigNumber.from(vaultBalance?.toString() ?? '0');

    const secNumberValue = BigNumber.from(dfiBalance?.toString() ?? '0'); // Convert to a BigNumber

    return (
        <div>
            <VaultCardContainer>
                <VaultInfoRow onClick={() => setExpanded(!expanded)} align="middle" gutter={[0, 10]}>
                    <InfoBlock xs={24} sm={24} md={24} lg={5} style={{ flexGrow: 1 }}>
                        <ImageContainer style={{ marginLeft: '20px' }}>
                            <Image width={55} height={55} style={props.imageStyle} alt="" src={props.image} />
                        </ImageContainer>
                        <TextBold style={{ marginLeft: '20px' }}>{props.name}</TextBold>
                    </InfoBlock>
                    <HideOnMobile>
                        <Divider type="vertical" style={{ height: '55px' }} />
                    </HideOnMobile>
                    <InfoBlock xs={24} sm={24} md={24} lg={8} style={{ justifyContent: 'center', flexGrow: 1 }}>
                        <PrimaryContainer disabled={props.disabled}>
                            <TextBold>{`APR: ${apr}`}</TextBold>
                        </PrimaryContainer>
                    </InfoBlock>
                    <HideOnMobile>
                        <Divider type="vertical" style={{ height: '55px' }} />
                    </HideOnMobile>
                    <InfoBlock xs={23} sm={23} md={23} lg={9} style={{ justifyContent: 'center', flexGrow: 2 }}>
                        {/* <Text>{`Staked: ${stakedBalance ? parseBalance(stakedBalance) : '0.00'} BDL`}</Text> */}
                    </InfoBlock>
                    <InfoBlock xs={1} sm={1} md={1} lg={1}>
                        {expanded ? (
                            <UpOutlined style={{ marginBottom: '3px' }} />
                        ) : (
                            <DownOutlined style={{ marginBottom: '3px' }} />
                        )}
                    </InfoBlock>
                </VaultInfoRow>
                <VaultDisplay expanded={true} header="Your Header Text">
                    <Divider style={{ margin: '5px 0px' }} />
                    <Row justify="center" align="middle" style={{ padding: '10px 20px 0px 20px' }}>
                        <Col xs={24} sm={24} md={6} flex="">
                            {/* <Text style={{ margin: '0px' }}>Available: {`${parseBalance(unstakedBalance) || '0.00'}`}</Text> */}
                            <Text style={{ margin: '0px' }}>
                                Available:{' '}
                                {`${props.balance?.formatted ? Number(props.balance.formatted).toFixed(2) : '0.00'}`}
                            </Text>

                            {/* <Text style={{ margin: '0px' }}>Available: {`${  parseBalance(VaultBalance) || '0.00' }`}</Text> */}

                            <InputNumber
                                stringMode={true}
                                min={'0'}
                                style={{ width: '100%', margin: '10px 0px 10px 0px' }}
                                value={formatUnits(toStake, 18)}
                                onChange={(newValue) => {
                                    if (newValue !== null) {
                                        setToStake(parseEther(newValue));
                                    }
                                }}
                                disabled={
                                    props.disabled ||
                                    !props.balance?.formatted ||
                                    (props.balance?.formatted <= BigNumber.from(0) && typeof props.account === 'string')
                                }
                                size="large"
                            />
                        </Col>
                        <Col xs={24} sm={24} md={6}>
                            <PercentageContainer>
                                <Percentage onClick={() => setToStake(secNumberValue.div(4))}>
                                    <div>25%</div>
                                </Percentage>
                                <PercentageDivider />
                                <Percentage onClick={() => setToStake(secNumberValue.div(2))}>
                                    <div>50%</div>
                                </Percentage>
                                <PercentageDivider />
                                <Percentage onClick={() => setToStake(secNumberValue.mul(3).div(4))}>
                                    <div>75%</div>
                                </Percentage>
                                <PercentageDivider />
                                <Percentage onClick={() => setToStake(secNumberValue)}>
                                    <div>100%</div>
                                </Percentage>
                            </PercentageContainer>
                            <div
                                style={{
                                    height: '38px',
                                    margin: '12px auto',
                                    width: '80%',
                                    padding: '0px',
                                    display: 'block',
                                }}
                            >
                                <Outline
                                    disabled={
                                        props.disabled ||
                                        (approvedRef &&
                                            (!props.balance?.formatted ||
                                                (props.balance?.formatted <= 0 && typeof props.account === 'string')))
                                    }
                                    onClick={() => {
                                        if (approvedRef) {
                                            handleDepositClick();
                                        } else {
                                            handleApproveClick();
                                        }
                                    }}
                                >
                                    {approvedRef ? 'Deposit' : 'Approve'}
                                </Outline>
                            </div>

                            {/* <OutlinedButton  onClick={() => handleApproveClick()}>
                            Approve
                        </OutlinedButton>
                        <OutlinedButton  onClick={() => handleDepositClick()}>
                            Deposit
                        </OutlinedButton> */}
                            {/* <OutlinedButton  onClick={() => handleWithdrawClick()}>
                            Withdraw
                        </OutlinedButton> */}
                        </Col>
                        <Col xs={24} sm={24} md={6}>
                            <Text style={{ margin: '0px' }}>Available: {`${formattedBalance}`}</Text>
                            <InputNumber
                                stringMode={true}
                                min={'0'}
                                style={{ width: '100%', margin: '10px 0px 10px 0px' }}
                                value={formatUnits(toUnstake, 18)}
                                onChange={(newValue) => {
                                    if (newValue !== null) {
                                        setToUnstake(parseEther(newValue));
                                    }
                                }}
                                disabled={
                                    props.disabled ||
                                    !vaultBalance ||
                                    (vaultBalance <= BigNumber.from(0) && typeof props.account === 'string')
                                }
                                size="large"
                            />
                        </Col>
                        <Col xs={24} sm={24} md={6}>
                            <PercentageContainer>
                                <Percentage onClick={() => setToUnstake(bigNumberValue.div(4))}>
                                    <div>25%</div>
                                </Percentage>
                                <PercentageDivider />
                                <Percentage onClick={() => setToUnstake(bigNumberValue.div(2))}>
                                    <div>50%</div>
                                </Percentage>
                                <PercentageDivider />
                                <Percentage onClick={() => setToUnstake(bigNumberValue.mul(3).div(4))}>
                                    <div>75%</div>
                                </Percentage>
                                <PercentageDivider />
                                <Percentage onClick={() => setToUnstake(bigNumberValue)}>
                                    <div>100%</div>
                                </Percentage>
                            </PercentageContainer>
                            <div
                                style={{
                                    height: '38px',
                                    margin: '12px auto',
                                    width: '80%',
                                    padding: '0px',
                                    display: 'block',
                                }}
                            >
                                <Outline
                                    disabled={props.disabled || (approvedRef && !formattedBalance)}
                                    onClick={() => {
                                        if (approvedRef) {
                                            handleWithdrawClick();
                                        } else {
                                            handleApproveClick();
                                        }
                                    }}
                                >
                                    {approvedRef ? 'Withdraw' : 'Approve'}
                                </Outline>
                            </div>
                        </Col>
                    </Row>
                </VaultDisplay>
            </VaultCardContainer>
        </div>
    );
};

export default VaultCard;
