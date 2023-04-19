// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: "John Doe" });
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("body", req.body);
  const { type, documents, secret } = req.body;
  // res.status(200).json({ name: "John Doe" });

  if (
    type === "api-update" &&
    documents.length > 0 &&
    secret === "5231233dbea5c2d189f1279dead1507c"
  ) {
    // const result = await fetch("https://test-for-me.prismic.io/api/v2").then(
    //   (rawRes) => rawRes.json()
    // );
    // console.log("ref", result.refs[0]);
    await res.revalidate("/"); // the page will fetch prismic document and log result using @prismicio/client
  }
}
