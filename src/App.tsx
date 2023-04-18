import { Provider } from 'react-redux'

import Game from './components/Game'
import Settings from './components/Settings'

import store from './redux'

export default function
    () {
    return (
        <div>
            <Provider store={store}>
                <Settings />
                <Game />
            </Provider>
        </div>
    )
}
