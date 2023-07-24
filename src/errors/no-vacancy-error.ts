import { ApplicationError } from '@/protocols';

export function noVacancyError(): ApplicationError {
  return {
    name: 'NoVacancyError',
    message: 'This room is not available',
  };
}