module.exports = {
  launch: {
    headless: true
  },
  args: ['--no-sandbox'],
  server: {
    command: 'cd example && yarn start:test',
    port: 3001,
    usedPortAction: 'kill',
    debug: true,
    launchTimeout: 10000
  }
}
