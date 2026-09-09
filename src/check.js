// Prüft eine überarbeitete Quizdatei: node check.js new_QuizN.json
const fs=require("fs");
const f=process.argv[2];
const d=JSON.parse(fs.readFileSync(f,"utf8"));
const errs=[];
if(!Array.isArray(d.mc)||d.mc.length!==20)errs.push("mc muss genau 20 Fragen haben, hat "+(d.mc&&d.mc.length));
const dist=[0,0,0,0];
(d.mc||[]).forEach((x,i)=>{
  const n="Frage "+(i+1)+": ";
  if(typeof x.q!=="string"||x.q.trim().length<10)errs.push(n+"q fehlt oder zu kurz");
  if(!Array.isArray(x.o)||x.o.length!==4)errs.push(n+"o muss 4 Optionen haben");
  else{
    const set=new Set(x.o.map(s=>s.trim().toLowerCase()));
    if(set.size!==4)errs.push(n+"doppelte Optionen");
    x.o.forEach((o,k)=>{if(typeof o!=="string"||!o.trim())errs.push(n+"Option "+k+" leer");});
    x.o.forEach((o,k)=>{if(/^(alle|keine) (genannten|der genannten|antworten)/i.test(o.trim()))errs.push(n+"Option "+k+" ist 'alle/keine genannten'");});
  }
  if(!Number.isInteger(x.c)||x.c<0||x.c>3)errs.push(n+"c muss 0 bis 3 sein");else dist[x.c]++;
  if(typeof x.e!=="string"||x.e.trim().length<20)errs.push(n+"e (Erklärung) fehlt oder zu kurz");
  Object.keys(x).forEach(k=>{if(!["q","o","c","e"].includes(k))errs.push(n+"unbekanntes Feld "+k);});
});
if(d.mc&&d.mc.length===20&&dist.some(v=>v!==5))errs.push("Verteilung der richtigen Antwort muss 5/5/5/5 sein, ist "+dist.join("/"));
["day","name","topic","src"].forEach(k=>{if(d[k]===undefined)errs.push("Feld "+k+" fehlt");});
if(errs.length){console.log("FEHLER in "+f+":\n"+errs.join("\n"));process.exit(1);}
console.log("OK "+f+" Verteilung "+dist.join("/"));
