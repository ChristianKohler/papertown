import * as convict from "convict";
import * as dotenv from "dotenv";

dotenv.config();

export const config = convict({
  articlesFolder: {
    doc: "Root folder of articles",
    format: String,
    default: "blog-articles",
    env: "ARTICLES_FOLDER"
  },
  devtoApiKey: {
    doc: "DevTo API Key",
    format: String,
    default: "",
    env: "DEVTO_API_KEY"
  }
})
  .validate()
  .getProperties();
