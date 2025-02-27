import { NextResponse } from "next/server";
import { getAudioFiles } from "@/app/utils/getAudioFiles";

export async function GET() {
  const audioFiles = getAudioFiles();
  return NextResponse.json(audioFiles);
}
