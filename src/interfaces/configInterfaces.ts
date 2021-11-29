'use strict';

export interface IApplicationConfig {
  env: string;
  name: string;
  isProd: boolean;
}

export interface IServerConfig {
  port: number;
}

export interface IAppConfig {
  readonly app: IApplicationConfig;
  readonly server: IServerConfig;
}
