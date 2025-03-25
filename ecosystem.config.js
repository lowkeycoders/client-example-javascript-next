module.exports = {
  apps: [
    {
      name: 'onsurity-app',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3200',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        NEXT_PUBLIC_BASE_PATH: '/onsurity',
        NEXT_PUBLIC_COMPANY_NAME: 'Onsurity'
      }
    }
  ]
};
