
import { useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';

import { FieldGroup, Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export default function Personal({ data, setData, errors }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);

    return (
        <FieldGroup>
            <div className="flex justify-center gap-2">
                <User size={20} className="sm:w-6 sm:h-6" />
                <h1 className='text-2xl font-bold'>Account Registration</h1>
            </div>

            <Field>
                <FieldLabel htmlFor='name'>Your Name</FieldLabel>
                <Input id="name" name="name" type="text" required placeholder="Juan Doe" className="h-10 sm:h-11 text-sm sm:text-base"
                    value={data.name} onChange={(e) => setData('name', e.target.value)}
                />
            </Field>
        
            <Field className='gap-1'>
                <FieldLabel htmlFor="email" className="text-sm sm:text-base">Email Address</FieldLabel>
                <Input id="email" name="email" type="email" required placeholder="name@email.com" className="h-10 sm:h-11 text-sm sm:text-base"
                    value={data.email} onChange={(e) => setData('email', e.target.value)}
                />
            </Field>

            <Field>
                <Field className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                    <Field className='gap-1'>
                        <FieldLabel htmlFor="password" className="text-sm sm:text-base">Password</FieldLabel>
                        <div className='relative'>
                            <Input id="password" name="password" type={showPassword ? "text" : "password"} required placeholder="********" className="h-10 sm:h-11 text-sm sm:text-base pr-10"
                                value={data.password} onChange={(e) => setData('password', e.target.value)}
                            />
                            <button type="button" className='absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 touch-manipulation'
                                onClick={() => setShowPassword(!showPassword)}
                            > {showPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}</button>
                        </div>
                    </Field>
                    <Field className='gap-1'>
                        <FieldLabel htmlFor='password' className="text-sm sm:text-base">Confirm Password</FieldLabel>
                        <div className='relative'>
                            <Input id="password_confirmation" name="password_confirmation" type={showConfPassword ? "text" : "password"} required placeholder="********" className="h-10 sm:h-11 text-sm sm:text-base pr-10"
                                value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            <button type="button" className='absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 touch-manipulation'
                                onClick={() => setShowConfPassword(!showConfPassword)}
                            > {showConfPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}</button>
                        </div>
                    </Field>
                </Field>
                <FieldDescription  className='text-xs sm:text-sm'>Must be at least 8 characters long.</FieldDescription>
            </Field>
            
            <Field>
                <FieldLabel htmlFor="phone_number" className="text-sm sm:text-base">Phone Number</FieldLabel>
                <Input id="phone_number" name="phone_number" type="tel" required placeholder="+63 912 345 6789" className="h-10 sm:h-11 text-sm sm:text-base"
                    value={data.phone_number} onChange={(e) => setData('phone_number', e.target.value)}
                />
            </Field>
        </FieldGroup>
    );
}