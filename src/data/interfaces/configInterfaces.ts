'use strict';
export interface IApplicationConfig {
  env: string;
  name: string;
  isProd: boolean;
}

export interface IServerConfig {
  port: number;
}

export interface ILogConfig {
  period: string;
  logDirPath: string;
  maxLogcount: number;
  infoLogPath: string;
  errorLogPath: string;
}

export interface IAuthConfig {
  saltRounds: number;
}
export interface IConfig {
  readonly app: IApplicationConfig;
  readonly server: IServerConfig;
  readonly log: ILogConfig;
  readonly auth: IAuthConfig;
}
