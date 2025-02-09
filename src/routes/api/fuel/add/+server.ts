import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabaseClient';

export const POST: RequestHandler = async ({request, params}) => {

    console.log("Handling post requset")
    try {
        const body = await request.json()

        const {data, error} = await supabase.from('fuel')
        .insert({
            date: body.date,
            kilometers: body.kilometers,
            liters: body.liters,
            cost: body.cost,
        })

        console.log(data, error)

        if (error) {
            throw error
        }

        return json(data, {status: 200})
    } catch (error) {
        return json({error: error.messasge}, {status: 500})
    }
    

}