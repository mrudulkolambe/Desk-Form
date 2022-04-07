import React from 'react'

const View = () => {
	return (
		<>
			<h1 className='text-2xl font-bold mt-3 text-center'>Your Quizes</h1>
			<hr className='w-11/12 m-auto my-3' />
			<div className='p-3 border-2 w-72 rounded-lg hover:border-blue-600 duration-150 cursor-pointer overflow-hidden'>
				<div className='font-bold text-ellipsis whitespace-nowrap overflow-hidden'>
					Lorem ipsum dolor sit amet consectetur.
				</div>
				<p>Date: </p>
			</div>
		</>
	)
}

export default View