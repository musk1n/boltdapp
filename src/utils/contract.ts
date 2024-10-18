import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890'; // Replace with your deployed contract address
const CONTRACT_ABI = [
  // Add the ABI of your deployed contract here
];

export const getContract = async () => {
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }
  throw new Error('Please install MetaMask to interact with the contract');
};

export const addReview = async (courseId: number, rating: number, comment: string) => {
  const contract = await getContract();
  const tx = await contract.addReview(courseId, rating, comment);
  await tx.wait();
};