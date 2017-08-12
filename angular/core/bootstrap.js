import app from 'app'

// Styles
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'thirdparty/flexy.css'
import 'styles/main.styl'

// Babel Stuff
import 'babel-polyfill'

// Core
import 'core/setup'
import 'core/router'

// Directives
var directiveRequire = require.context("directives", true, /^(.*\.(js$))[^.]*$/igm)
directiveRequire.keys().forEach(function(key){
    directiveRequire(key)
})

// Services
var serviceRequire = require.context("services", true, /^(.*\.(js$))[^.]*$/igm)
serviceRequire.keys().forEach(function(key){
    serviceRequire(key)
})

// Managers
var managerRequire = require.context("managers", true, /^(.*\.(js$))[^.]*$/igm)
managerRequire.keys().forEach(function(key){
    managerRequire(key)
})

// Filters
var filterRequire = require.context("filters", true, /^(.*\.(js$))[^.]*$/igm)
filterRequire.keys().forEach(function(key){
    filterRequire(key)
})