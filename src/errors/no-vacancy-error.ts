import { ApplicationError } from '@/protocols';

export function noVacancyError(): ApplicationError {
  return {
    name: 'NoVacancyError',
    message: 'no have vacancy for this room',
  };
}
