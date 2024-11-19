import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import { isUri } from "valid-url";
import { filterImageFromURL, deleteLocalFiles } from "./util/util.js";

const app = express();
const port = process.env.PORT || 8082;
app.use(bodyParser.json());

app.get("/filteredimage", async (req: Request, res: Response): Promise<any> => {
  const { image_url }: any = req.query;
  const imageRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/i;

  if (!image_url) {
    return res.status(422).send({ message: "Unprocessable entity" });
  }

  if (!imageRegex.test(image_url)) {
    return res.status(404).send({ message: "Image url not found" });
  }

  if (!image_url || (typeof image_url === "string" && !isUri(image_url))) {
    return res
      .status(400)
      .send({ auth: false, message: "Image url is missing or malformed" });
  }

  const filteredPath = await filterImageFromURL(image_url);
  res.sendFile(filteredPath, {}, () => deleteLocalFiles([filteredPath]));
});

app.get("/", async (req: Request, res: Response) => {
  res.send("try GET /filteredimage?image_url={{}}");
});

app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
