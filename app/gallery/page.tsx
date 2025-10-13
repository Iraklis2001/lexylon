import Image from "next/image";

const IMAGES = [
  "/gallery/logo.jpg", "/gallery/argiro.jpg", "/gallery/argiro2.jpg",
  "/gallery/Mariana.jpg", "/gallery/woood.jpg", "/gallery/IrmgDog.jpg",
]; // put these files in /public/gallery/

export default function Gallery() {
  return (
    <main className="container">
      <h1 className="hero-title">Gallery</h1>
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))",
        gap:16
      }}>
        {IMAGES.map((src,i)=>(
          <figure key={i} className="card" style={{padding:8}}>
            <Image src={src} alt={`Gallery ${i+1}`} width={800} height={600} style={{width:"100%", height:"auto", borderRadius:8}} />
          </figure>
        ))}
      </div>
    </main>
  );
}
