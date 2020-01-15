const monitor = require('express').Router()
const statusMonitor = require('express-status-monitor')({ path: '' })

monitor.use(statusMonitor.middleware)
monitor.get('/', statusMonitor.pageRoute)

module.exports = { monitor: () => monitor }