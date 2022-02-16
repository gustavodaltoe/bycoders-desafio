import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as S from './styles';

type Props = Omit<React.ComponentProps<typeof S.HiddenInput>, 'onChange'> & {
  onChange: (file: File | null) => void;
  maxSize?: number;
};

export const FilePickButton = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInput = React.useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }

  function onFileChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const file = target.files ? target.files[0] : null;

    if (file && file.type !== 'text/plain') {
      toast.error('Apenas arquivos .txt são autorizados.');
      return;
    }
    if (props.maxSize && file && file.size > props.maxSize) {
      toast.error(`O tamanho limite do arquivo é ${props.maxSize} bytes.`);
      return;
    }

    setFile(file);
    props.onChange(file);
  }

  const fileSizeInKB = file ? (file.size / 1024).toFixed(2) : 0;
  const fileInfo = file
    ? `${file.name} (${fileSizeInKB} KBs)`
    : 'Nenhum arquivo selecionado';

  return (
    <>
      <S.HiddenInput
        {...props}
        ref={fileInput}
        type="file"
        onChange={onFileChange}
      />
      <S.FileInfo>{fileInfo}</S.FileInfo>
      <S.Button type="button" onClick={handleButtonClick}>
        Escolher arquivo
      </S.Button>
    </>
  );
};
