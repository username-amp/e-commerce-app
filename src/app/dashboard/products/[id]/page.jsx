
export default function Page({ params }) {
 
  const { id } = params;

  return <p>Post: {id}</p>;
}
