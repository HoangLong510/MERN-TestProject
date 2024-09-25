import { Helmet } from "react-helmet"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import publicRoutes from "~/routes/publicRoutes"
import AuthDialog from "~/components/Auth/AuthDialog"
import Popup from "~/components/Popup/Popup"
import UserProvider from "./provider/UserProvider"
import Logout from "./components/Auth/Logout/Logout"

export default function App() {

	return (
		<UserProvider>
			<Helmet>
				<link rel="icon" type="image/svg+xml" href="/images/logo/logo-title.png" />
				<title>{import.meta.env.VITE_APP_NAME}</title>
			</Helmet>

			<BrowserRouter>
				<Routes>
					{publicRoutes.map((route, index) => {
						const Page = route.component
						const Layout = route.layout

						return (
							<Route key={index} path={route.path} element={
								<Layout>
									<Page />
								</Layout>
							} />
						)
					})}
				</Routes>

				{/*  */}
				<AuthDialog />
				<Popup />
				<Logout />

			</BrowserRouter>
		</UserProvider>
	)
}
