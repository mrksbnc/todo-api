'use strict';

type IBaseConfig = {
  node_env: string;
  app_name: string;
  isProd: boolean;
  server: {
    port: number;
    base_url: string;
    enabled_request_methods: string[];
  };
  auth: {
    salt_rounds: number;
    secret: string;
    jwt_exp: string;
  };
  redis: {
    port: number;
    host: string;
  };
  log: {
    log_period: string;
    log_dir_path: string;
    info_log_path: string;
    error_log_path: string;
    max_log_file_count: number;
  };
};

export default IBaseConfig;
