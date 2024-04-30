import React, { useState, useEffect } from 'react';
import { useSignMessage, useWalletClient } from 'wagmi';
import { recoverMessageAddress } from 'viem';

export function SignMessage() {
  const [recoveredAddress, setRecoveredAddress] = useState('');
  const [signMessageData, setSignMessageData] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { signMessageAsync, variables } = useSignMessage()

  const handleSignMessage = async () => {
    try {
      const signMessageData = await signMessageAsync({ message });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    handleSignMessage();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="message">Enter a message to sign</label>
      <textarea
        id="message"
        name="message"
        placeholder="The quick brown fox…"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button disabled={isLoading}>
        {isLoading ? 'Check Wallet' : 'Sign Message'}
      </button>

      {signMessageData && (
        <div>
          <div>Signature: {signMessageData}</div>
        </div>
      )}

      {error && <div>{error.message}</div>}
    </form>
  );
}
