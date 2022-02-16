import { useState } from 'react';
import * as S from './styles';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FilePickButton } from './FilePickButton';

export const FileForm = () => {
  const [file, setFile] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(file);
  }

  return (
    <S.Wrapper>
      <S.Title>Importar dados de um arquivo CNAB</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <FilePickButton
          name="file"
          accept=".txt"
          onChange={setFile}
          maxSize={5 * 1024 * 1024}
        />
        <S.SubmitButton type="submit" disabled={!file} title="Enviar">
          <AiOutlineCloudUpload size={28} />
        </S.SubmitButton>
      </S.Form>
    </S.Wrapper>
  );
};
