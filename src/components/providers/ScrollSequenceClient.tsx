"use client";

import dynamic from "next/dynamic";

const ScrollImageSequence = dynamic(
  () => import("../motion/ScrollImageSequence"),
  {
    ssr: false,
  },
);

interface Props {
  folder: string;
  totalFrames: number;
}

export default function ScrollSequenceClient({ folder, totalFrames }: Props) {
  return <ScrollImageSequence folder={folder} totalFrames={totalFrames} />;
}
