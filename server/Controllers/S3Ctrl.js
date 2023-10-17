//~ S3 stuff, trying to get it to work but found an easier route. gonna keep this here in case i wanna revive it

// import { client } from "../index.js";
// import { ListObjectsV2Command } from "@aws-sdk/client-s3";
// import CircularJSON from "circular-json";

// export default {
//   getImage: async (req, res) => {
//     try {
//       const presignedUrl = client.getSignedUrl("putObject", {
//         Bucket: "bw-records-bucket",
//         Key: "Mage-Goggles-500x500.jpg",
//         Expires: 3600,
//       });
//       res.send(presignedUrl);
//     } catch (error) {
//       console.log(error);
//     }
//   },
//   getList: async (req, res) => {
//     const command = new ListObjectsV2Command({
//       Bucket: "bw-records-bucket",
//     });
//     let isTruncated = true;

//     console.log("Your bucket contains the following objects:\n");
//     let contents = "";

//     while (isTruncated) {
//       const { Contents, IsTruncated, NextContinuationToken } =
//         await client.send(command);
//       const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
//       contents += contentsList + "\n";
//       isTruncated = IsTruncated;
//       command.input.ContinuationToken = NextContinuationToken;
//     }
//     console.log(contents);
//     res.send(contents);
//   },
// };
