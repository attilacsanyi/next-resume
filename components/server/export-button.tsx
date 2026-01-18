import { FaFilePdf, FaSpinner } from 'react-icons/fa6';
import { Button } from './button';

type ExportButtonProps = {
  isLoading?: boolean;
  onClick?: () => void;
};

export const ExportButton = ({
  isLoading = false,
  onClick,
}: ExportButtonProps) => (
  <Button
    disabled={isLoading}
    variant="primary"
    onClick={onClick}
  >
    {isLoading ? <FaSpinner className="animate-spin" /> : <FaFilePdf />}
    Export
  </Button>
);
