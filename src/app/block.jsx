import { mainnet } from 'wagmi/chains';
import { useEffect, useState } from "react";
import { useWeb3js } from '@/components/web3/useWeb3';

function BlockComponent() {
    const web3js = useWeb3js({ chainId: mainnet.id });
    const [block, setBlock] = useState(null);

    useEffect(() => {
        if (web3js && web3js.eth) {
            web3js.eth.getBlock(19235006).then((b) => {
                setBlock(b);
            }).catch(console.error);
        }
    }, [web3js, setBlock]);

    if (!block) return (<div>Loading...</div>);

    return (
        <>
            <div id='hash'>{block.hash}</div>
            <div id='extraData'>{block.extraData}</div>
            <div id='miner'>{block.miner}</div>
        </>
    );
}

export default BlockComponent;
