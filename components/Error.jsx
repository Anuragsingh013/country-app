import React from 'react'
import { useRouteError } from "react-router-dom";
const Error = () => {
    const error = useRouteError();
    console.log(error)
  return (
    <div>this page is not found error 404</div>
  )
}

export default Error