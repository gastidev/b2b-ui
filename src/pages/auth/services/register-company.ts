import { gastiClient } from '@/lib/api';
import { AxiosError } from 'axios';

type RegisterCompanyProps = {
  name: string;
  identifier: string;
};

export type RegisterCompanyResponseDTO = {
  id: string;
  name: string;
};

export const registerCompany = async ({
  name,
  identifier,
}: RegisterCompanyProps) => {
  try {
    const response = await gastiClient.post(
      '/companies/enroll',
      {
        name,
        identifier,
      }
    );

    const data =
      response.data as RegisterCompanyResponseDTO;

    return data;
  } catch (error) {
    const isAxiosError = error instanceof AxiosError;
    if (isAxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
