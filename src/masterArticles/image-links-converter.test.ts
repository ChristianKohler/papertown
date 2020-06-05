import { stripIndents } from "common-tags";
import { convertRelativeToGithubRaw } from "./image-links-converter";

const baseUrl = "https://abc.com/files";
const mdPath = "posts/first-post/index.md";

describe("convert relative to github raw", () => {
  it("should replace a relative link with quotation marks", () => {
    // arrange
    const content = stripIndents`
        ---
        hero: "./images/heroa.png"
        ---
        ![alt text](./images/logo.png "Logo")
    `;
    // act
    const result = convertRelativeToGithubRaw(content, baseUrl, mdPath);
    // assert
    expect(result).toBe(stripIndents`
        ---
        hero: "https://abc.com/files/posts/first-post/images/heroa.png"
        ---
        ![alt text](https://abc.com/files/posts/first-post/images/logo.png "Logo")
    `);
  });

  it("should replace a relative link without quotation marks", () => {
    // arrange
    const content = stripIndents` 
        ---
        a: ./images/heroa.png
        ---
        ![alt text]("./images/logo.png" "Logo")
    `;
    // act
    const result = convertRelativeToGithubRaw(content, baseUrl, mdPath);
    // assert
    expect(result).toBe(stripIndents`
        ---
        a: https://abc.com/files/posts/first-post/images/heroa.png
        ---
        ![alt text]("https://abc.com/files/posts/first-post/images/logo.png" "Logo")
    `);
  });

  it("should not replace a absolute link", () => {
    // arrange
    const content = stripIndents` 
        ---
        a: https://abc.com/images/heroa.png
        ---
    `;
    // act
    const result = convertRelativeToGithubRaw(content, baseUrl, mdPath);
    // assert
    expect(result).toBe(stripIndents`
        ---
        a: https://abc.com/images/heroa.png
        ---
    `);
  });

  it("should work with underscore in a link", () => {
    // arrange
    const content = stripIndents` 
      ![alt text]("./images/logo_1.png" "Logo")
    `;
    // act
    const result = convertRelativeToGithubRaw(content, baseUrl, mdPath);
    // assert
    expect(result).toBe(stripIndents`
      ![alt text]("https://abc.com/files/posts/first-post/images/logo_1.png" "Logo")
    `);
  });
});
