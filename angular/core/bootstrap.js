import app from 'app'

// Styles
import 'bootstrap/dist/css/bootstrap'
import 'sweetalert2/dist/sweetalert2.css'
import 'font-awesome/css/font-awesome'
import 'thirdparty/css/flexy'
import 'styles/main'

// Third party js
import 'bootstrap'

// Babel Stuff
import 'babel-polyfill'

// Core
import 'core/setup'
import 'core/transition'
import 'core/router'

import { env } from 'config'

console.log(`%c\
ENV:     ${env}
VERSION: ${VERSION}
`, 'color: #999;')

var directiveRequire = require.context("directives", true, /^(.*\.(js$))[^.]*$/igm)
var serviceRequire   = require.context("services",   true, /^(.*\.(js$))[^.]*$/igm)
var managerRequire   = require.context("managers",   true, /^(.*\.(js$))[^.]*$/igm)
var filterRequire    = require.context("filters",    true, /^(.*\.(js$))[^.]*$/igm)

directiveRequire.keys().forEach(key => directiveRequire(key))
serviceRequire  .keys().forEach(key => serviceRequire  (key))
managerRequire  .keys().forEach(key => managerRequire  (key))
filterRequire   .keys().forEach(key => filterRequire   (key))