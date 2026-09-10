import { publicUrl } from "@/lib/publicUrl";

export default function NotFound() {
  return (
    <main className="atlas-app not-found-page">
      <h1>Page not found</h1>
      <p>That route is not part of the atlas.</p>
      <a href={publicUrl("")}>Back to mineral connections</a>
    </main>
  );
}
