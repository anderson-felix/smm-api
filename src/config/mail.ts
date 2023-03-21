export interface IMailConfig {
  driver: string;
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver:
    process.env.NODE_ENV?.toLowerCase() === 'production' ? 'SES' : 'NODEMAILER',
  defaults: {
    from: {
      email: 'dev@darklabs.com.br',
      name: 'Dark Labs',
    },
  },
} as IMailConfig;
