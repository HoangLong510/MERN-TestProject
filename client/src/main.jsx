import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import { store } from '~/libs/store'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.jsx'
import theme from '~/theme'
import '~/style.css'
import '~/i18n'

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</Provider>
)
