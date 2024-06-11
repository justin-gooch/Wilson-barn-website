'use server'

import { uploadImage } from "@/app/lib/cloudinary";
import { storeEvent } from "@/app/lib/database";
import { redirect } from "next/navigation";

export async function createEvent(prevState, formData) {
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = [];

    if (!title || title.trim().length === 0) {
        errors.push('Title is required');
    }

    if(!content || content.trim().length === 0) {
        errors.push('Content is required');
    }

    if(!image || image.size === 0) {
        errors.push('Image is required');
    }

    if(errors.length > 0) {
        return {errors};
    }

    let image_url;

    try {
        image_url = await uploadImage(image);
    } catch (error) {
        throw new Error(
            `Image upload failed, post was not created. Please try again later. error was: ${error}`
        )
    }

    storeEvent({
        image_url,
        title,
        content,
        userId: 1
    })

    redirect('/events')
}