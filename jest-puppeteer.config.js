module.exports = {
  launch: {
    headless: false
  },
  server: {
    command: 'cd example && yarn start:test',
    port: 3001,
    usedPortAction: 'kill',
    debug: true,
    launchTimeout: 10000
  }
}
