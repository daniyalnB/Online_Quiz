import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import RenderRoutes from "../routes/routes.jsx";
import "../styles/index.scss";

const App = () => {

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				refetchInterval: 1,
			},
		},
	});

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<RenderRoutes />
				</BrowserRouter>
			</QueryClientProvider>
		</>
	);
};

export default App;