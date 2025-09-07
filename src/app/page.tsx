import { redirect } from "next/navigation";


export default function HomePage() {

  const shouldRedirect = true;

  if (shouldRedirect) {
    redirect('/applications');
  }

  return null;
}