export const LoggerOptions: any = {
  pinoHttp: {
    customProps: () => ({
      context: 'HTTP',
    }),
    // transport: {
    //   target: "pino-pretty",
    //   options: {
    //     singleLine: false,
    //   },
    // },
  },
};
