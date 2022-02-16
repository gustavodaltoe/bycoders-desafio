import { useState } from 'react';
import { FilePickButton } from './FilePickButton';

export const FileForm = () => {
  const [file, setFile] = useState<File | null>(null);
  console.log(file);

  return (
    <form>
      <FilePickButton
        name="file"
        accept=".txt"
        onChange={setFile}
        maxSize={5 * 1024 * 1024}
      />
    </form>
  );
};
