import { Upload } from 'lucide-react';
import { useCSVReader } from 'react-papaparse';
import { Button } from '~/components/ui/button';

type UploadButtonProps = {
  onUpload: (res: any) => void;
};

export const UploadButton = ({ onUpload }: UploadButtonProps) => {
  const { CSVReader } = useCSVReader();
  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button className='flex items-center space-x-2 w-full lg:w-auto' {...getRootProps({ onDrop: onUpload })}>
          <Upload className='size-4 mr-2' /> Upload
        </Button>
      )}
    </CSVReader>
  );
};
