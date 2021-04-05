import winston from "winston";

export const Logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "logs.txt",
    }),
  ],
});
