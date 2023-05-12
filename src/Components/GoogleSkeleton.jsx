import React from "react"
import ContentLoader from "react-content-loader"

const GoogleSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={250}
    height={50}
    viewBox="0 0 250 50"
    backgroundColor="#cfe8f7"
    foregroundColor="#ecebeb"
    style={{
      opacity:0.35
    }}
    {...props}
  >
    {/* <rect x="48" y="5" rx="3" ry="3" width="110" height="8" /> 
    <rect x="48" y="28" rx="3" ry="3" width="410" height="6" /> 
    <rect x="48" y="48" rx="3" ry="3" width="380" height="6" /> 
    <rect x="48" y="68" rx="3" ry="3" width="178" height="6" />  */}
    <rect x="30" y="0" rx="10" ry="10" width="200" height="50" />
  </ContentLoader>
)


export default GoogleSkeleton