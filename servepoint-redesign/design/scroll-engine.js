/* ServePoint Canada: scroll engine (direction v3)
   Same code that runs in design/direction-specimen.html. Port to src/scripts/scroll-engine.ts without changing behaviour.

   Contract
   - Writes only CSS custom properties and two attributes on <html>: data-solid, data-hide.
   - Reads layout once per animation frame. No scroll listeners that touch layout outside requestAnimationFrame.
   - The CSS defaults in design/tokens.css are the FINISHED state, so no script, reduced motion and print all show a complete page.
   - Reduced motion: the script sets every variable to its final value and returns. No listeners are added.

   Variables written
     :root  --sp   page progress 0..1                (header progress bar)
     :root  --hp   hero progress 0..1                (paper stack drift)
     :root  --f1..--f4  focus weight of each step    (sheet spotlight)
     [data-reveal], #map, .price-rows  --r  reveal progress 0..1 (set on the element)
   Attributes on <html>
     data-solid  header turns paper after the hero
     data-hide   header slides away while scrolling down, returns on scroll up

   Required markup hooks: #sheet (adds .drawn on load), .hero-band, .step (4 of them, in order), [data-reveal],
   #map, .price-rows, main section[id], .nav a[href^="#"]
*/
/* ===== scroll engine (same logic as design/scroll-engine.js) ===== */
(function(){
  var root=document.documentElement, reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};

  // One orchestrated moment on load: marks draw, then the signature is written.
  var sheet=document.getElementById("sheet");
  if(reduce){sheet.classList.add("drawn");root.classList.add("reduced")}
  else{requestAnimationFrame(function(){setTimeout(function(){sheet.classList.add("drawn")},350)})}
  if(reduce){return init(true)}
  init(false);

  function init(still){
    var steps=[].slice.call(document.querySelectorAll(".step"));
    var reveals=[].slice.call(document.querySelectorAll("[data-reveal]"));
    var map=document.getElementById("map");
    var hero=document.querySelector(".hero-band");
    var rows=document.querySelector(".price-rows");
    var sections=[].slice.call(document.querySelectorAll("main section[id], .flow[id]"));
    var navLinks=[].slice.call(document.querySelectorAll(".nav a[href^='#']"));
    var lastY=0,ticking=false;

    function frame(){
      ticking=false;
      var y=window.scrollY,vh=window.innerHeight,docH=root.scrollHeight-vh;
      root.style.setProperty("--sp",docH>0?clamp(y/docH,0,1).toFixed(4):0);
      // header: solid after the hero, hides while scrolling down
      var heroBottom=hero.offsetTop+hero.offsetHeight-vh*0.12;
      if(y>heroBottom)root.setAttribute("data-solid","");else root.removeAttribute("data-solid");
      if(y>lastY+4&&y>vh*0.6)root.setAttribute("data-hide","");else if(y<lastY-4||y<vh*0.6)root.removeAttribute("data-hide");
      lastY=y;
      // hero weight: everything on the sheet is lit while the hero is on screen
      var h=clamp(1-y/(vh*0.75),0,1);
      root.style.setProperty("--hp",clamp(y/(hero.offsetHeight),0,1).toFixed(3));
      // step focus: each step lights its part of the sheet
      var pinned=matchMedia("(min-width:1000px)").matches;
      var lastR=steps[steps.length-1].getBoundingClientRect();
      var end=clamp((vh*0.95-lastR.bottom)/(vh*0.3),0,1);
      steps.forEach(function(s,i){
        var r=s.getBoundingClientRect();
        var c=r.top+Math.min(r.height*0.3,vh*0.28);
        var f=clamp(1-Math.abs(c-vh*0.42)/(vh*0.5),0,1);
        if(i===0&&c>vh*0.42)f=1;          // leaving the hero: part 1 takes focus first
        f=Math.max(f,h,end);              // hero and end of the story: whole sheet lit
        if(!pinned)f=1;                   // no pinned sheet on small screens
        root.style.setProperty("--f"+(i+1),f.toFixed(3));
      });
      // reveals
      reveals.forEach(function(el){
        var t=el.getBoundingClientRect().top;
        el.style.setProperty("--r",clamp((vh*0.92-t)/(vh*0.3),0,1).toFixed(3));
      });
      if(map){var mt=map.getBoundingClientRect();map.style.setProperty("--r",clamp((vh*0.95-mt.top)/(vh*0.7),0,1).toFixed(3))}
      if(rows){var rt=rows.getBoundingClientRect().top;rows.style.setProperty("--r",clamp((vh*0.9-rt)/(vh*0.4),0,1).toFixed(3))}
      // nav spy
      var cur=null;sections.forEach(function(sec){var b=sec.getBoundingClientRect();if(b.top<vh*0.4&&b.bottom>vh*0.4)cur=sec.id});
      navLinks.forEach(function(a){if(a.getAttribute("href")==="#"+cur)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current")});
    }
    function req(){if(!ticking){ticking=true;requestAnimationFrame(frame)}}
    if(still){
      root.style.setProperty("--sp","0");
      document.querySelectorAll("[data-reveal],#map,.price-rows").forEach(function(e){e.style.setProperty("--r","1")});
      return;
    }
    addEventListener("scroll",req,{passive:true});
    addEventListener("resize",req);
    frame();
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(frame);
  }
})();
