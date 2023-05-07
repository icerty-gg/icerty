/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ajvfiitmeqcfguupmscm.supabase.co",
				port: "",
				pathname: "/storage/v1/object/public/offers/**",
			},
			{
				protocol: "https",
				hostname: "ajvfiitmeqcfguupmscm.supabase.co",
				port: "",
				pathname: "/storage/v1/object/public/categories/**",
			},
			{
				protocol: "https",
				hostname: "upload.wikimedia.org",
				port: "",
				pathname: "/wikipedia/commons/8/89/**",
			},
		],
	},
};
