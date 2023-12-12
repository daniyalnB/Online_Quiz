import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const Home = lazy(() => import("../app/components/Home"));

const RenderRoutes = () => {
	return (
		<Suspense>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</Suspense>
	);
};

export default RenderRoutes;