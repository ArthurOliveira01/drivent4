import { ApplicationError } from '@/protocols';

export function internalServerError(): ApplicationError {
  return {
    name: 'InternalServerError',
    message: 'A intenal error has ocurred',
  };
}
