interface StatusMessageProps {
  status: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ status }) => {
  if (!status) return null;

  const isError = status.toLowerCase().includes('error');
  const className = `mt-4 p-4 rounded ${
    isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
  }`;

  return <div className={className}>{status}</div>;
};

export default StatusMessage; 