import app from '../../app'
import './styles.styl'

app.directive('dropdown2', function($filter) {
	function link(scope, element, attrs) {
		const config = scope.config
		const items = scope.items

		window.dropdown = scope

		scope.unique = parseInt(Math.random() * 99999)

		scope.selected = config.multiple ? [] : null
		
		scope.config.orders = scope.config.orders ? scope.config.orders : []

		scope.context = 'blurred'

		scope.keyboardFocus = null
		scope.supressKeyboardFocus = false

		scope.filtered = []

		scope.simplify = item => {
			return {
				id: item[config.id],
				text: item[config.text]
			}
		}

		scope.simpleItems = scope.items.map(item => scope.simplify(item))

		scope.initialize = () => {
			if (config.multiple) {
				if (scope.ngModel) {
					scope.selected = scope.ngModel.map(realItem =>
						scope.simpleItems.find(simpleItem =>
							simpleItem.id === realItem[config.id]))
				}
				
				if (!scope.selected.length) {
					scope.ngModel = scope.items
				}
			} else {
				if (scope.ngModel) {
					scope.selected = scope.simplify(scope.ngModel)
				}
			}

			scope.updateInput()
		}

		scope.focus = () => {
			scope.context = 'focused'
			scope.keyboardFocus = scope.filtered[0]
			angular.element(document).on('click', scope.handleBodyClick)
			scope.updateInput()
		}

		scope.blur = () => {
			scope.context = 'blurred'
			element.find('input').blur()
			angular.element(document).off('click', scope.handleBodyClick)
			scope.updateInput()
		}

		scope.isFocused = () => {
			return scope.context === 'focused'
		}

		scope.isBlurred = () => {
			return scope.context === 'blurred'
		}

		scope.isSelected = (item) => {
			if (config.multiple) {
				return !!scope.selected.find(i => i === item)
			} else {
				return scope.selected === item
			}
		}

		scope.hasSelected = () => {
			if (config.multiple) {
				return !!scope.selected.length
			} else {
				return !!scope.selected
			}
		}

		scope.getRealSelected = (item) => {
			return scope.items.find(y => y[config.id] === item.id)
		}

		scope.updateInput = () => {
			if (scope.context === 'blurred') {
				if (config.multiple) {
					scope.input = ''
				} else {
					scope.input = scope.selected ? scope.selected.text : ''
				}
			}

			if (scope.context === 'focused' && !config.multiple) {
				scope.input = ''
			}

			if (config.multiple) {
				config.placeholder = [
					scope.selected.length,
					scope.selected.length === 1 ? 'item' : 'items',
					'selected'
				].join(' ')
			}
		}
		
		scope.choose = (item) => {
			scope.select(item)

			if (config.multiple) {
				scope.updateInput()
			} else {
				scope.blur()
			}
		}

		scope.select = (item) => {
			if (config.multiple) {
				if (scope.isSelected(item)) {
					scope.selected = scope.selected.filter(x => x !== item)
				} else {
					scope.selected.push(item)
				}

				if (!scope.selected.length) {
					scope.ngModel = scope.items
				} else {
					scope.ngModel = scope.selected.map(x => {
						return scope.getRealSelected(x)
					})
				}
				
			} else {
				scope.selected = item
				scope.ngModel = scope.getRealSelected(item)
			}

			console.log(scope.selected)
		}

		scope.clear = () => {
			if (config.multiple) {
				scope.selected = []

				scope.ngModel = scope.items
			} else {
				scope.selected = null
				scope.ngModel = null
			}

			scope.updateInput()
		}

		//  | filter: input | orderBy: config.orders
		scope.doFilter = () => {
			const filter = $filter('filter')
			const orderBy = $filter('orderBy')
			
			scope.filtered = filter(orderBy(scope.simpleItems, scope.config.orders), scope.input)
		}

		scope.$watch('simpleItems', scope.doFilter)
		scope.$watch('input', () => {
			scope.doFilter()
			scope.keyboardFocus = scope.filtered[0]
		})

		scope.itemIndex = item => scope.filtered.findIndex(x => x === item)

		scope.nextItem = item => {
			let index = scope.itemIndex(item)
			let next = scope.filtered[index + 1]
			return next || scope.filtered[0]
		}

		scope.prevItem = item => {
			let index = scope.itemIndex(item)
			let prev = scope.filtered[index - 1]
			return prev || scope.filtered[scope.filtered.length - 1]
		}

		scope.fixScroll = () => {
			const scrollFrame = element.find('.ns-dropdown2-list')
			const scrollElem = scrollFrame[0]
			const scrollHeight = scrollFrame.height()
			const scrollTop = scrollElem.scrollTop
			const scrollBottom = scrollTop + scrollHeight
			const focusElem = element.find('.ns-dropdown2-item')[scope.itemIndex(scope.keyboardFocus)]
			const focusElemTop = focusElem.offsetTop
			const focusElemBottom = focusElemTop + focusElem.clientHeight

			if (focusElemBottom > scrollBottom) {
				scrollFrame.scrollTop((focusElemTop + focusElem.clientHeight) - scrollHeight)
			} else if (focusElemTop < scrollTop) {
				scrollFrame.scrollTop(focusElemTop)
			}
		}

		// event listener stuff
		element
			.on('focus', '.ns-dropdown2-input', () => {
				scope.$apply(scope.focus)
			})
			.on('mousemove', () => {
				scope.$apply(() => scope.supressKeyboardFocus = true)
			})

		scope.handleBodyClick = (e) => {
			let target = angular.element(e.target)

			if (scope.isFocused() && target.closest('#dropdown-' + scope.unique).length === 0) {
				e.preventDefault()
				scope.$apply(() => scope.blur())
			}
		}


		// keyboard stuff
		// 38 up, 40 down
		angular.element(document).on('keydown', function(e) {
			if (scope.isFocused()) {
				if (e.which === 38) { // up
					e.preventDefault()
					scope.keyboardFocus = scope.prevItem(scope.keyboardFocus)
					scope.supressKeyboardFocus = false
					scope.fixScroll()
				}

				if (e.which === 40) { // down
					e.preventDefault()
					scope.keyboardFocus = scope.nextItem(scope.keyboardFocus)
					scope.supressKeyboardFocus = false
					scope.fixScroll()
				}

				if (e.which === 27) { // esc
					e.preventDefault()
					scope.blur()
				}

				if (e.which === 13) { // enter
					e.preventDefault()
					scope.choose(scope.keyboardFocus)
				}

				scope.$apply()
			}
		})

		// initialize
		scope.initialize()
	}

	return {
		link,
		restrict: 'E',
		replace: true,
		template: require('./view.html'),
		scope: {
			'ngModel': '=',
			'items': '=',
			'config': '='
		}
	}
})