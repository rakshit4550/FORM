import React from 'react'
import Spiner from './Spiner'

const LoddingButoon = ({loading,title}) => {
  return (
    <div className='auth_inner'>
        <span>{loading ? 'ples wait..' :title}</span>

        {loading && <Spiner/>}
    </div>
  )
}

export default LoddingButoon