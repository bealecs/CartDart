"use server";

import s3Client from "@/app/lib/S3-Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export default async function DeleteMenuFromS3(itemToDelete) {
    const params = {
        Bucket: process.env.AWS_S3_MENUS_BUCKET_NAME,
        Key: itemToDelete
    };

    const command = new DeleteObjectCommand(params);
    try {
       const response = await s3Client.send(command);
    } catch (error) {
        console.log(error);
    }


}
