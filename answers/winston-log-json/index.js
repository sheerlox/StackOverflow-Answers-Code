const winston = require('winston')

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      name: 'debug-console',
      level: 'debug',
      prettyPrint: true,
      handleExceptions: true,
      json: false,
      colorize: true
    }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
  exitOnError: false
})

const req = {
  body: {
    name: 'Daniel Duuch',
    email: 'daniel.duuch@greatmail.com',
    password: 'myGreatPassword'
  }
}

logger.debug(`Register ${req.body.name} with email ${req.body.email}`, req.body)
