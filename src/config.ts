import * as convict from "convict";
import * as dotenv from "dotenv";

dotenv.config();

export const config = convict({
  rootFolder: {
    doc: "Root folder of articles",
    format: String,
    default: "blog-articles",
    env: "ROOT_FOLDER",
    arg: "rootFolder"
  },
  devtoApiKey: {
    doc: "DevTo API Key",
    format: String,
    default: "",
    env: "DEVTO_API_KEY",
    arg: "devtoApiKey"
  },
  imageRootUrlGithub: {
    doc:
      "Root Url which is used to replace relative urls. E.g. https://raw.githubusercontent.com/ChristianKohler/Homepage/master",
    format: String,
    default: "",
    env: "IMAGE_ROOT_URL_GITHUB",
    arg: "imageRootUrlGithub"
  }
})
  .validate()
  .getProperties();
