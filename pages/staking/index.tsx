import React from 'react';
import { Layout, Row, Col , Card, Typography} from 'antd';
import styled from 'styled-components';
import { useBalance } from 'wagmi';
import { useAccount } from 'wagmi';
import VaultCard from '../../components/StakingCard/VaultCard';
import Image from 'next/image';

const RowContainer = ({ children }: any) => {
    return (
        <Row justify="center" align="middle" style={{ width: '100vw', padding: '100px' }}>
            <p style={{ marginTop: '10px' }}>{children}</p>
        </Row>
    );
};

const StakingRow = ({ children }:any) => {
    const rowStyle = {
        maxWidth: '1500px', // Set your desired max-width
        width: '100%',
    };

    return <Row style={rowStyle}>{children}</Row>;
};

const StakingCol = ({ children }: any) => {
    const colStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return <Col>{children}</Col>;
};
const BoxImage = () => {
    const imageStyle = {
        marginRight: '-20%',
        display: 'none',
    };

    return (
        <Image
        src="/assets/LAPTOP.png"
            alt="Image Alt Text"
            width={100}
            height={100}
            style={imageStyle}
        />
    );
};
const { Title } = Typography;

const RewardsContainer = ({children}:any) => {
  return (
    <Row justify="center" align="middle" style={{ width: '100%', maxWidth: '450px' }}>
      <Col span={24} style={{ display: 'flex', flexDirection: 'column' }}>
        <Title level={4} style={{ fontSize: '30px' }}>
         {children}
        </Title>
      </Col>
    </Row>
  );
};
const { Paragraph } = Typography;

  const RewardRow = ({children}:any) => {
    return (
      <Row align="middle">
        <Paragraph style={{ margin: '0px 0px 0px 25px', fontFamily: 'Visuelt' }}>
          {children}
        </Paragraph>
      </Row>
    );
  };

interface ClaimButtonProps {
    enabled?: boolean;
}

const ClaimButton = ({ enabled, theme, children }:any) => {
    return (
      <Row
        style={{
          cursor: 'pointer',
          width: '100%',
          padding: '35px 0px 5px 0px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: enabled ? theme.white : 'default',
          backgroundColor: enabled ? theme.primary : theme.white,
          zIndex: 1,
          marginTop: '-23px',
          borderRadius: '15px',
          transition: 'background-color 100ms linear',
        }}
        onMouseEnter={() => {
          if (enabled) {
            theme.primaryDark = theme.primaryDark || '#d15e43'; // Replace with the desired color
          }
        }}
        onMouseLeave={() => {
          if (enabled) {
            theme.primaryDark = theme.primary; // Reset to the original color
          }
        }}
      >
        <Paragraph
          style={{
            margin: '0px',
            fontWeight: 'bold',
            fontSize: '17px',
            fontFamily: 'Visuelt',
          }}
        >
          {children}
        </Paragraph>
      </Row>
    );
  };
  
  
//   const { Title } = Typography;

  const StakingContainer = ({children}:any) => {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Title level={4} style={{ fontSize: '30px' }}>
       
        </Title>
        {children}
      </div>
    );
  };

  const { Text } = Typography;

const RewardCard = ({children}:any) => {
    return (
      <Card
        style={{
          height: '75px',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          boxShadow: '0px 1px 8px #29292921',
          backgroundColor: 'white', // You can replace this with your theme variable
          zIndex: 2,
          borderRadius: '15px',
          overflow: 'hidden',
          margin: '10px 0px',
        }}
      >
        <Text
          style={{
            margin: '0px 15px 0px 0px',
            fontSize: '17px',
            fontFamily: 'Visuelt', // You can add your custom font here
          }}
        >
        </Text>
        {children}
      </Card>
    );
  };
  

const Landing = () => {
    const { address } = useAccount();

    const { data: derphiBalance } = useBalance({
        address: address,
        token: '0x4987131473ccC84FEdbf22Ab383b6188D206cc9C',
    });

    return (
        <div>
            <Layout.Content>
                <RowContainer>
                    <StakingRow>
                        <StakingCol md={12}>
                            <BoxImage />
                        </StakingCol>
                        <StakingCol xs={24} sm={24} md={12}>
                            <RewardsContainer>
                                <h1>Rewards</h1>
                                <RewardCard>
                                    <RewardRow>
                                        <img height="100%" src="/assets/wallet.png" />
                                        <p>
                                            Derpfi <br /> Balance
                                        </p>
                                    </RewardRow>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <p>{`${
                                            derphiBalance ? Number(derphiBalance?.formatted).toFixed(2) : 0.0
                                        }DFI`}</p>
                                    </div>
                                </RewardCard>
                                <RewardCard>
                                    <RewardRow>
                                        <img height="100%" src="/assets/lock-closed.png" />
                                        <p>
                                            Locked <br /> Rewards
                                        </p>
                                    </RewardRow>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {/* <p>{`${!!lockedBalance ? lockedBalance : '0.0'} DFI`}</p> */}
                                    </div>
                                </RewardCard>
                                <RewardCard style={{ marginBottom: '0px' }}>
                                    <RewardRow>
                                        <img height="100%" src="/assets/lock-open.png" />
                                        <p>
                                            Unlocked <br /> Rewards
                                        </p>
                                    </RewardRow>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {/* <p>{`${!!unlockedBalance ? unlockedBalance : '0.0'} DFI`}</p> */}
                                    </div>
                                </RewardCard>
                                <ClaimButton
                                // enabled={unlockedBalance > 0}
                                // onClick={() => {
                                //     if (unlockedBalance > 0) {
                                //         bundleToken
                                //             ?.unlock()
                                //             .then((tx: TransactionResponse) => {
                                //                 txMessage(tx);
                                //                 return tx.wait(1);
                                //             })
                                //             .then((tx: TransactionReceipt) => {
                                //                 unlockMessage(tx);
                                //             })
                                //             .catch((e: any) => {
                                //                 errorMessage(e.data.message);
                                //             });
                                //     }
                                // }}
                                >
                                    <p>Claim</p>
                                </ClaimButton>
                            </RewardsContainer>
                        </StakingCol>
                    </StakingRow>
                </RowContainer>
                <RowContainer style={{ paddingTop: '50px' }}>
                    <StakingRow>
                        <StakingCol span={24}>
                            <StakingContainer>
                                <h1>Available Staking Options</h1>
                                <VaultCard
                                    image="/assets/derpfi.png"
                                    name="DFI Vault"
                                    imageStyle={{ marginTop: '3px', marginLeft: '2px', zIndex: 2 }}
                                    pid="0"
                                    // vault={getNamedAddress(chainId, 'BundleVault')!}
                                    disabled={false}
                                    // account={account!}
                                    balance={derphiBalance}
                                />
                                {/* <StakingCard
                                image="/assets/derpfi.png"
                                imageSecondary="/assets/BNB.png"
                                name="DFI-BNB"
                                imageStyle={{ marginTop: '3px', marginLeft: '2px', zIndex: 2 }}
                                pid="0"
                                stakeToken={getNamedAddress(chainId, 'DFIBNB')!}
                                disabled={false}
                                account={account!}
                                tokenA="0x620F9998cf912F38030610690e2F164A54F5d44b" // Bundle (BDL) (@$0.00)
                                tokenB="0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd" //Wrapped BNB (WBNB) (@$242.685)
                            />
                            <StakingCard
                                image="/assets/derpfi.png"
                                imageSecondary="/assets/BUSD.png"
                                name="bDFI-BUSD"
                                imageStyle={{ marginTop: '3px', marginLeft: '2px', zIndex: 2 }}
                                pid="1"
                                stakeToken={'0x107a78f4e90141bb4aacdb6b4c903f27baf43e58'} // Pancake LPs (Cake-LP)
                                disabled={false}
                                account={account!}
                                tokenA="0x045FE47f58b673402D79Ee13c509bB9E745b793B" // bDeFi Index (bDEFI)
                                tokenB="0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd" //Binance-Peg BUSD Token (BUSD) (@$1.0001)
                            />
                            <StakingCard
                                image="/assets/derpfi.png"
                                imageSecondary="/assets/BUSD.png"
                                name="bDFI-BUSD"
                                imageStyle={{ marginTop: '3px', marginLeft: '2px', zIndex: 2 }}
                                pid="2"
                                stakeToken={'0x3666d1eE816852A6BD08196243567D3945058E40'} // Pancake LPs (Cake-LP)
                                disabled={false}
                                account={account!}
                                tokenA="0x3E96F79a607d0d2199976c292f9CDF73991A3439" //bChain Index (bCHAIN)
                                tokenB="0xe9e7cea3dedca5984780bafc599bd69add087d56" //Binance-Peg BUSD Token (BUSD) (@$1.0001)
                            />
                            <StakingCard
                                image="/assets/derpfi.png"
                                imageSecondary="/assets/BUSD.png"
                                name="bDFI-BUSD"
                                imageStyle={{ marginTop: '3px', marginLeft: '2px', zIndex: 2 }}
                                pid="3"
                                stakeToken={'0xaF748cE79E2c966a660A34c803e63A3e6553E670'} //Pancake LPs (Cake-LP)
                                disabled={false}
                                account={account!}
                                tokenA="0x934C7F600d6eE2fb60CdFf61d1b9fC82C6b8C011" //bStable (bSTBL)
                                tokenB="0xe9e7cea3dedca5984780bafc599bd69add087d56" //Binance-Peg BUSD Token (BUSD) (@$1.0001)
                            /> */}
                            </StakingContainer>
                        </StakingCol>
                    </StakingRow>
                </RowContainer>
            </Layout.Content>
        </div>
    );
};

export default Landing;
