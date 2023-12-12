// Cannot load "react-refresh/babel" in production
const plugins = ["@babel/transform-runtime"];
if (process.env.NODE_ENV !== "production") {
	plugins.push("react-refresh/babel");
}

module.exports = {
	presets: [
		"@babel/preset-env",
    "@babel/preset-react"
		// Runtime automatic with React 17+ allows not importing React
		// in files only using JSX (no state or React methods)
		// [
		// 	"transform-runtime",
		// 	{
		// 		regenerator: true,
		// 	},
		// ],
		// [("@babel/preset-react", { runtime: "automatic" })],
	],
	plugins: plugins,
};
