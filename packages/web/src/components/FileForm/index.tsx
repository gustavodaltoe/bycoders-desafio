import { useState } from 'react';
import * as S from './styles';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FilePickButton } from './FilePickButton';
import { axios } from '../../services/axios';
import toast from 'react-hot-toast';
import { queryClient } from '../../services/queryClient';

export const FileForm = () => {
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();

    formData.append('textFile', file, file.name);

    const toastId = toast.loading('Enviando arquivo...');
    try {
      await axios.post('/cnab/upload', formData);
      toast.success('Arquivo enviado com sucesso', { id: toastId });
      queryClient.invalidateQueries('importsData');
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error('Verifique seu arquivo e tente novamente.', {
          id: toastId,
        });
        return;
      }
      toast.error('Erro ao enviar arquivo.', { id: toastId });
    }
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
