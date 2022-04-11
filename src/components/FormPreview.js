import React from 'react'

const FormPreview = ({preview}) => {
  return (
	<>
		<div className={preview ? "" : "hidden"}>

			form preview
		</div>
	</>
  )
}

export default FormPreview