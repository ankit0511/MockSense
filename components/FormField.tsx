
import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface FromFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>
    label: string
    placeholder?: string
    type?: 'text' | 'email' | 'password' | 'file'
}

import {
    FormControl,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
const FormField = ({ control, name, label, placeholder, type = "text" }: FromFieldProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <FormItem>
                <FormLabel className='labal'>{label}</FormLabel>
                <FormControl>
                    <Input className='input'
                     placeholder={placeholder} 
                     type={type} 
                     {...field} 
                     />
                </FormControl>
                {/* <FormDescription>
                   {placeholder}
                </FormDescription> */}
                {/* <FormMessage /> */}
            </FormItem>
        )}
    />

)

export default FormField