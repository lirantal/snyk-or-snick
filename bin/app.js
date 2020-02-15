'use strict'

var _readline = _interopRequireDefault(require('readline'))

var _react = _interopRequireDefault(require('react'))

var _ink = require('ink')

var _inkProgressBar = _interopRequireDefault(require('ink-progress-bar'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

class App extends _react.default.Component {
  constructor() {
    super()
    this.state = {
      progress: 1
    }
  }

  render() {
    const text = 'Snyk'
    return _react.default.createElement(
      _react.default.Fragment,
      null,
      _react.default.createElement(
        _ink.Color,
        {
          green: true
        },
        text
      ),
      _react.default.createElement(
        _ink.Color,
        {
          green: true
        },
        _react.default.createElement(_inkProgressBar.default, {
          left: text.length,
          percent: this.state.progress / 100
        })
      )
    )
  }

  componentDidMount() {
    _readline.default.emitKeypressEvents(process.stdin)

    process.stdin.setRawMode(true)
    process.stdin.on('keypress', (key, data) => {
      if (data.ctrl && data.name === 'c') {
        process.exit()
      } else {
        this.setState(prevState => {
          if (prevState.progress >= 100) {
            console.log('you win!')
            process.exit(1)
          }

          return {
            progress: prevState.progress + 1
          }
        })
      }
    })
  }
}

const clearScreenOp = '\x1B[2J\x1B[0f'
process.stdout.write(clearScreenOp)
;(0, _ink.render)(_react.default.createElement(App, null))
