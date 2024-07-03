"use server"
import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "@/app/lib/S3-Client";
import { User } from "@/app/lib/Supabase-Client";
import { GetCurrentUser } from "@/app/lib/GetCurrentUser";

async function uploadFileToS3(file, fileName) {
  const fileBuffer = file;
  console.log(fileName);

  const params = {
    Bucket: process.env.AWS_S3_MENUS_BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return "Successfully uploaded file to S3";
}

export async function POST(request) {

  const user: User = await GetCurrentUser();

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(
      buffer,
      `${user.name}Menu${request.headers.get("uuid")}`
    );

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
