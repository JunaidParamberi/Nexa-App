import React from 'react'


export function ButtonOutlined({img, text, onClick, style, icon}){

    

    return (
        <div className='py-[10px] px-[20px] flex justify-center items-center gap-1 
          bg-black bg-opacity-[0.3] rounded-md text-white cursor-pointer hover:bg-opacity-[0.2] hover:border-opacity-[0.3]
          active:opacity-[0.5] active:border-opacity-[0.3] border-[1px] border-white border-opacity-[0.6] '
        onClick={onClick}
        style={style}
        >
            {img && <img src={img} className='h-[15px]' />}
    
            {icon}
            
                <button 
                className=' font-[500] text-[16px]'
                >
                 {text}
                </button>
        </div>
      )
}

function Button({img, text, onClick, style, icon}) {
  return (
    <div className='py-[10px] px-[20px] flex justify-center items-center gap-1 
     bg-white rounded-md text-black cursor-pointer hover:bg-opacity-[0.8] active:bg-opacity-[0.6]  '
    onClick={onClick}
    style={style}
    >
        {img && <img src={img} className='h-[15px]' />}

        {icon}
        
            <button 
            className=' font-[500] text-[16px]'
            >
             {text}
            </button>
    </div>
  )
}

export default Button
