'use client';

import { Button, TextField } from '@radix-ui/themes';
import { BiGlasses } from 'react-icons/bi';
import SimpleMdeReact from 'react-simplemde-editor';


export default function NewIssuePage() {
  return (
    <div className='space-y-3 max-w-4xl'>
      <TextField.Root placeholder='Search the ...'>
        <TextField.Slot>
          <BiGlasses />
        </TextField.Slot>
      </TextField.Root>
      <SimpleMdeReact placeholder='Description...' />
      <Button className=''>Submit</Button>
    </div>
  );
}
