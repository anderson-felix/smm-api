export type LocaleErrorType =
  | 'invalidToken'
  | 'missingToken'
  | 'tokenExpired'
  | 'invalidLogin'
  | 'userNotAuthorized'
  | 'operationNotPermitted'
  | 'userNotFound'
  | 'emailAlreadyExists'
  | 'documentAlreadyExists'
  | 'contentTypeRequired'
  | 'invalidFileType'
  | 'oldPasswordIsRequired'
  | 'passwordsNotMatch'
  | 'populateTokenInvalid'
  | 'orderNotFound'
  | 'customerNotFound'
  | 'collaboratorNotFound'
  | 'sectorNotFound'
  | 'commentNotFound'
  | 'sectorAlreadyExists';

export const localeErrorLanguage = <const>['pt', 'en'];

export type LocaleErrorLanguage = typeof localeErrorLanguage[number];

export const defaultLocaleErrorLanguage: LocaleErrorLanguage = 'pt';

export type LocaleErrorMessage = Record<LocaleErrorLanguage, string>;

export type LocaleErrorObject = {
  status: number;
  message: LocaleErrorMessage;
};

export const localeErrors: Record<LocaleErrorType, LocaleErrorObject> = {
  invalidToken: {
    status: 401,
    message: {
      pt: 'Token JWT inválido',
      en: 'Invalid JTW token',
    },
  },
  missingToken: {
    status: 401,
    message: {
      pt: 'Token JWT faltando',
      en: 'Missing JWT token',
    },
  },
  tokenExpired: {
    status: 403,
    message: {
      pt: 'Token expirado',
      en: 'Token expired',
    },
  },
  invalidLogin: {
    status: 401,
    message: {
      pt: 'Nome de usuário e/ou senha incorretos',
      en: 'Incorrect username/password combination',
    },
  },
  userNotAuthorized: {
    status: 401,
    message: {
      pt: 'Usuário não autorizado',
      en: 'User not authorized',
    },
  },
  operationNotPermitted: {
    status: 403,
    message: {
      pt: 'Operação não permitida',
      en: 'Operation not permitted',
    },
  },
  userNotFound: {
    status: 404,
    message: {
      pt: 'Usuário não encontrado',
      en: 'User not found',
    },
  },
  emailAlreadyExists: {
    status: 403,
    message: {
      pt: 'Esse e-mail já está cadastrado',
      en: 'This email already register',
    },
  },
  documentAlreadyExists: {
    status: 403,
    message: {
      pt: 'Esse documento já está cadastrado',
      en: 'This document already register',
    },
  },
  contentTypeRequired: {
    status: 400,
    message: {
      pt: 'O tipo do arquivo é obrigatório',
      en: 'The file content type is required',
    },
  },
  invalidFileType: {
    status: 400,
    message: {
      pt: 'Formato de arquivo inválido',
      en: 'Invalid file format',
    },
  },
  oldPasswordIsRequired: {
    status: 403,
    message: {
      pt: 'A senha antiga é obrigatória para redefinição de senha',
      en: 'Old password is required for password reset',
    },
  },
  passwordsNotMatch: {
    status: 403,
    message: {
      pt: 'As senhas não correspodem',
      en: 'Passwords not match',
    },
  },
  populateTokenInvalid: {
    status: 401,
    message: {
      pt: 'Populate token inválido',
      en: 'Populate token invalid',
    },
  },
  orderNotFound: {
    status: 403,
    message: {
      pt: 'Pedido não encontrado',
      en: 'Order not found',
    },
  },
  customerNotFound: {
    status: 403,
    message: {
      pt: 'Cliente não encontrado',
      en: 'Customer not found',
    },
  },
  collaboratorNotFound: {
    status: 403,
    message: {
      pt: 'Colaborador não encontrado',
      en: 'Collaborator not found',
    },
  },
  sectorNotFound: {
    status: 403,
    message: {
      pt: 'Setor não encontrado',
      en: 'Sector not found',
    },
  },
  commentNotFound: {
    status: 403,
    message: {
      pt: 'Comentário não encontrado',
      en: 'comment not found',
    },
  },
  sectorAlreadyExists: {
    status: 403,
    message: {
      pt: 'Este setor já está registrado',
      en: 'This sector already register',
    },
  },
};
