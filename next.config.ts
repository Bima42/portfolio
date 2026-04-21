import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
	output: "standalone",
	turbopack: {
		root: __dirname,
	},
	async rewrites() {
		return [
			// Blog article images are colocated in src/blog-content/<slug>/resources/
			// and copied to public/blog/resources/ at build time.
			// MDX relative paths (e.g. "resources/foo.png") resolve to
			// /:locale/blog/resources/foo.png
			{
				source: "/:locale/blog/resources/:file*",
				destination: "/blog/resources/:file*",
			},
		];
	},
};

export default withNextIntl(nextConfig);
