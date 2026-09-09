// Baut index.html und sw.js aus src/template.html, src/sw.js und src/data/quiz1..10.json
// Aufruf: node src/build.js   (aus dem Repo-Root)
const fs=require("fs"),path=require("path"),crypto=require("crypto");
const src=__dirname,root=path.join(src,"..");
const titles={1:"Seminartag 1",2:"Seminartag 2",3:"Seminartag 3",4:"Seminartag 4",5:"Seminartag 5"};
const days={};
for(let n=1;n<=10;n++){
  const f=path.join(src,"data","quiz"+n+".json");
  const q=JSON.parse(fs.readFileSync(f,"utf8"));
  days[q.day]=days[q.day]||{day:q.day,title:titles[q.day],parts:[]};
  days[q.day].parts.push({name:q.name,topic:q.topic,src:q.src,mc:q.mc.map(x=>({q:x.q,o:x.o,c:x.c,e:x.e}))});
}
const DATA=Object.values(days).sort((a,b)=>a.day-b.day);
let total=0;DATA.forEach(d=>d.parts.forEach(p=>total+=p.mc.length));
if(total!==200){console.error("Fragenzahl ist "+total);process.exit(1);}
const tpl=fs.readFileSync(path.join(src,"template.html"),"utf8");
if(!tpl.includes("/*__DATA__*/")){console.error("Platzhalter /*__DATA__*/ fehlt");process.exit(1);}
const html=tpl.replace("/*__DATA__*/",()=>"const DATA="+JSON.stringify(DATA)+";");
fs.writeFileSync(path.join(root,"index.html"),html,"utf8");
// Version aus dem Inhalt aller ausgelieferten Dateien, damit der Service Worker bei jeder Änderung neu cached
const hash=crypto.createHash("sha1");
hash.update(html);
["manifest.webmanifest","fonts/manrope-latin.woff2","fonts/manrope-latin-ext.woff2","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable-512.png","icons/apple-touch-icon.png"].forEach(f=>{
  const p=path.join(root,f);if(fs.existsSync(p))hash.update(fs.readFileSync(p));
});
const version=hash.digest("hex").slice(0,10);
const sw=fs.readFileSync(path.join(src,"sw.js"),"utf8").replace("__VERSION__",version);
fs.writeFileSync(path.join(root,"sw.js"),sw,"utf8");
console.log("index.html ("+html.length+" Zeichen, "+total+" Fragen), sw.js Version "+version);
