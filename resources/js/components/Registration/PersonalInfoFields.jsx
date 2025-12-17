
import { useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';

import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import InputError from '@/components/InputError';

export default function Personal({ data, setData, errors }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);

    return (
        <>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="inline-flex items-center md:text-2xl justify-center text-lg font-bold gap-1"><User size={25}/>Account Registration</h1>
            </div>

            <Field className='gap-1'>
                <FieldLabel htmlFor='name'>Full Name</FieldLabel>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Juan Doe"
                    required
                    autoFocus
                />
                <div className='h-[16px]'>
                    {errors.name && (
                        <InputError message={errors.name} className="mt-2 text-right text-xs"/>
                    )}
                </div>
            </Field>
        
            <Field className='gap-1'>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="name@email.com"
                    required
                />
                <div className='h-[16px]'>
                    <InputError message={errors.email} className="mt-2 text-right text-xs"/>
                </div>
            </Field>

            <Field className='gap-1'>
                <Field className='grid grid-cols-2 gap-4'>
                    <Field className='gap-1'>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <div className='relative'>
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="********"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </Field>
                    <Field className='gap-1'>
                        <FieldLabel htmlFor='password'>Confirm Password</FieldLabel>

                        <div className='relative'>
                            <Input
                                id="password_confirmation"
                                name="password_confirmation"
                                type={showConfPassword ? "text" : "password"}
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="********"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfPassword(!showConfPassword)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                            >
                                {showConfPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        
                    </Field>
                </Field>
                <div className='h-[16px]'>
                    <InputError message={errors.password} className="mt-2 text-right text-xs"/>
                    <InputError message={errors.password_confirmation} className="mt-2 text-right text-xs"/>
                </div>
                

                <FieldDescription  className='text-xs'>Must be at least 8 characters long.</FieldDescription>
            </Field>
            <Field className='gap-1 flex-1'>
                <FieldLabel htmlFor="phone_number">Phone Number</FieldLabel>
                <Input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    value={data.phone_number}
                    onChange={(e) => setData('phone_number', e.target.value)}
                    placeholder="+63 912 345 6789"
                    required
                />
                <InputError message={errors.phone_number} className="mt-2 text-right text-xs"/>
            </Field>
        </>
    );
}