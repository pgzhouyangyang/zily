module.exports = {
  apps: [
    {
      name: 'admin',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'index.js',
      args: 'start',
      watch: true,
      ignore_watch: ["uploads"]
    }
  ]
}