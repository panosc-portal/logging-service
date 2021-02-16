import {LogLevel} from '../models/enumerations';

function fromLogLevelToInt(aLogLevel: LogLevel): number {

  let intValue: number;

  switch (aLogLevel) {
    case LogLevel.ERROR: {
      intValue = 0;
      break;
    }
    case LogLevel.WARN: {
      intValue = 1;
      break;
    }
    case LogLevel.INFO: {
      intValue = 2;
      break;
    }
    case LogLevel.DEBUG: {
      intValue = 3;
      break;
    }
    default:
      throw new Error("Log level not defined: " + aLogLevel);
  }

  return intValue;
}

export const compareLogLevel = function (logLevelA: LogLevel, logLevelB: LogLevel): number {

  let _logLevelA: number, _logLevelB: number;

  _logLevelA = fromLogLevelToInt(logLevelA);
  _logLevelB = fromLogLevelToInt(logLevelB);


  if (_logLevelA < _logLevelB) {
    return -1;
  } else if (_logLevelA == _logLevelB) {
    return 0
  } else {
    return 1;
  }
}
