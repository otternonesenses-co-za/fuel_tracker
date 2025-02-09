import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async () => {
    const { data, error} = await supabase.from('fuel').select('*').order('date', {
        ascending: false,
    });

    if (error) {
        return {
            error: error.message
        }
    }


    return {
        fueling: data
    }
}

export const actions: Actions = {
    default: async ({request, fetch}) => {

        console.log("saving the fuel item")
        const formData = await request.formData()

        const fuel = {
            date: formData.get('date'),
            kilometers: formData.get('total_kms'),
            liters: formData.get('liters'),
            cost: formData.get('amount')
        }

        console.log(fuel)
        const resp = await fetch('/api/fuel/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fuel)
        })

        console.log(resp)

        const res = await resp.json()
        console.log(res)

        if (!resp.ok) {
            return fail(res.status, {
                success:false, 
                errors: res.error,
            })
        }

        return {
            success: true,
            data: JSON.stringify(res)
        }
    } 
}