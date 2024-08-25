import React, { FC } from 'react'

interface TreeGroupProps {
  children: React.ReactNode;
  name: string,

}

const TreeGroup: FC<TreeGroupProps> = ({ children, name }) => {


  return (

    <div className={`relative ml-2 group`}>
      <div className='flex items-center justify-between gap-4'>
        <h3 className={`font-bold whitespace-nowrap`}>
          {name ? name : "Group"}
        </h3>

      </div>
      {children}

    </div >
  )
}

export default TreeGroup
