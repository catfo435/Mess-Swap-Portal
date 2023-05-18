import ContentLoader from "react-content-loader"

const ReqSkeleton = (props: any) => (
  <ContentLoader 
    speed={2}
    width={500}
    height={150}
    viewBox="0 0 500 150"
    backgroundColor="#cfe8f7"
    foregroundColor="#ecebeb"
    style={{
      opacity:0.35
    }}
    {...props}
  >
    <rect x="50" y="0" rx="10" ry="10" width="190" height="140" />
    <rect x="250" y="0" rx="10" ry="10" width="190" height="140" />
  </ContentLoader>
)


export default ReqSkeleton
