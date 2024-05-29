import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default  {
    mode: "development",
    entry:   "./src/admin/client.js",
    devtool: "source-map",    
    output: {
        path: path.resolve(__dirname, "dist/admin"),
        filename: "bundle.js"
    },
    devServer: {
        watchFiles: ["templates/admin"],
        port: 5100,	
        client: { webSocketURL: "http://localhost:5000/ws" }
    }
};
