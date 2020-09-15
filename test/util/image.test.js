require("../test.setup");

const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const { upload, isImage } = require("../../src/util/image.util");

describe("Image Util", () => {
  it("Image Upload", async () => {
    const data = fs.readFileSync(
      path.resolve(__dirname, "files", "gon.base64.txt"),
      "utf-8"
    );
    const url = await upload(data);

    expect(url !== null && url !== undefined && url !== "").toBe(true);

    const res = await fetch(url);

    expect(res).not.toBe(null);
    expect(res.status).toBe(200);
  });

  it("Is Image", async () => {
    const file = fs.readFileSync(
      path.resolve(__dirname, "files", "pdf.base64.txt"),
      "utf-8"
    );
    const image = fs.readFileSync(
      path.resolve(__dirname, "files", "gon.base64.txt"),
      "utf-8"
    );

    await expect(isImage(file)).resolves.toBe(false);
    await expect(isImage(image)).resolves.toBe(true);
  });
});
