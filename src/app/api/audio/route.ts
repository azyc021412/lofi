import { NextResponse } from "next/server";
import { getAudioFiles } from "@/utils/getAudioFiles";

export async function GET() {
  const audioFiles = getAudioFiles(); // Fetch files from the server
  return NextResponse.json(audioFiles);
}
