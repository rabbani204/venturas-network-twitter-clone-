export const MAIL_TRANSPORT = {
  MAIL_TRANSPORT_LOCAL: {
    service: 'smtp',
    host: 'localhost',
    port: 1025,
    ignoreTLS: true,
    secure: false,
    auth: {
      user: 'null',
      pass: 'null',
    },
  },

  MAIL_TRANSPORT_DEV: {
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: 'c198895ad8bf92',
      pass: 'c32813e12a0b35',
    },
  },

  // MAIL_TRANSPORT_LIVE: {
  //   host: 'smtp.gmail.com',
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     type: 'OAuth2',
  //     user: 'noreply@myunisearch.com',
  //     clientId:
  //       '134148046838-q5v3sjsifm35766lm70s80hepbf31t6d.apps.googleusercontent.com',
  //     clientSecret: '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',
  //     refreshToken:
  //       '1//04t0gakw_wz46CgYIARAAGAQSNwF-L9IrDZkmvIFWJO0031b8rOV5MgUd1o8-Tvf1yR',
  //     accessToken:
  //       'ya29.a0ARrdaM8PgjDJX_lEPG8J9_Pj9cjTW8h16EIXdDQHnWi6NpidRGSMUsvQnHp6IXXX',
  //   },
  // },
};
