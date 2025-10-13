export default function ContactBar() {
  return (
    <div className="card" style={{
      display:"flex", gap:12, alignItems:"center",
      justifyContent:"center", margin:"16px auto", maxWidth:900
    }}>
      <a className="button" href="tel:+35799943596">+357 99943596</a>
      <a className="button ghost" href="https://www.instagram.com/lexylon.cy?igsh=dGJrdmk2a2ZxdXI4" target="_blank" rel="noopener noreferrer">@lexylon.cy</a>
      <a className="button ghost" href="/order">Start Order</a>
    </div>
  );
}
